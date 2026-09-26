"use client";

import { useCallback } from "react";
import { useAppStore } from "@/lib/store/AppStore";
import type { User } from "@/types";

export interface AuthState {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export function useAuth(): AuthState {
  const { state, dispatch } = useAppStore();

  const signIn = useCallback(
    async (email: string, _password: string) => {
      // Placeholder — Supabase Auth will replace this.
      dispatch({ type: "UPDATE_USER", payload: { email } });
      await new Promise((r) => setTimeout(r, 350));
    },
    [dispatch],
  );

  const signUp = useCallback(
    async (name: string, email: string, _password: string) => {
      dispatch({ type: "UPDATE_USER", payload: { name, email } });
      await new Promise((r) => setTimeout(r, 350));
    },
    [dispatch],
  );

  const signOut = useCallback(() => {
    // Auth is a placeholder — nothing to do yet.
  }, []);

  return {
    user: state.user,
    loading: !state.hydrated,
    signIn,
    signUp,
    signOut,
  };
}