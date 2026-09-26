"use client";

import { useEffect, useRef } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAppStore } from "@/lib/store/AppStore";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

interface ProfileResponse {
  id: string;
  email: string;
  profile: {
    name: string;
    university?: string | null;
    program?: string | null;
    year?: number | null;
    avatar_url?: string | null;
  };
}

async function fetchProfile(
  accessToken: string,
): Promise<ProfileResponse | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      // Avoid hanging on a dead backend during dev.
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return (await res.json()) as ProfileResponse;
  } catch {
    return null;
  }
}

const EMPTY_USER = {
  id: "",
  email: "",
  name: "",
  university: undefined,
  program: undefined,
  year: undefined,
  avatarUrl: undefined,
} as const;

/**
 * Syncs the Supabase auth session into AppStore.user.
 * Fetching is one-shot per user id to avoid repeated network calls.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { dispatch } = useAppStore();
  const lastUserId = useRef<string | null>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let mounted = true;
    const supabase = createClient();

    const applySession = (session: Session | null) => {
      if (!mounted) return;

      const user = session?.user;

      if (!user) {
        lastUserId.current = null;
        dispatch({ type: "UPDATE_USER", payload: EMPTY_USER });
        return;
      }

      // Already applied this user — skip profile re-fetch.
      if (lastUserId.current === user.id) return;
      lastUserId.current = user.id;

      // Immediate: seed from the JWT metadata.
      dispatch({
        type: "UPDATE_USER",
        payload: {
          id: user.id,
          email: user.email ?? "",
          name: (user.user_metadata?.name as string | undefined) ?? "",
        },
      });

      // Background: enrich with the DB profile.
      if (inFlight.current) return;
      inFlight.current = true;
      void fetchProfile(session!.access_token)
        .then((profile) => {
          if (!mounted || !profile) return;
          dispatch({
            type: "UPDATE_USER",
            payload: {
              id: profile.id,
              email: profile.email,
              name: profile.profile.name,
              university: profile.profile.university ?? undefined,
              program: profile.profile.program ?? undefined,
              year: profile.profile.year ?? undefined,
              avatarUrl: profile.profile.avatar_url ?? undefined,
            },
          });
        })
        .finally(() => {
          inFlight.current = false;
        });
    };

    // Initial session read.
    void supabase.auth.getSession().then(({ data }) => {
      applySession(data.session);
    });

    // Live subscription.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
}