"use client";

import { useCallback, useState } from "react";
import type { User } from "@/types";
import { mockUser } from "@/lib/mock/data";

/**
 * Frontend-only auth facade.
 * Real Supabase Auth will replace the body of this hook cleanly.
 */

export interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  signOut: () => void;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async (_email: string, _password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setUser(mockUser);
    setLoading(false);
  }, []);

  const signUp = useCallback(
    async (_name: string, _email: string, _password: string) => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 400));
      setUser(mockUser);
      setLoading(false);
    },
    [],
  );

  const signOut = useCallback(() => setUser(null), []);

  return { user, loading, signIn, signUp, signOut };
}