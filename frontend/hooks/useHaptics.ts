"use client";

import { useCallback } from "react";

/**
 * Lightweight haptic feedback for Android via the Vibration API.
 * No-ops silently on iOS Safari and desktops.
 */
export function useHaptics() {
  const vibrate = useCallback((pattern: number | number[]) => {
    if (typeof navigator === "undefined") return;
    if (!("vibrate" in navigator)) return;
    try {
      navigator.vibrate(pattern);
    } catch {
      // Some browsers throw if the user hasn't interacted yet — ignore.
    }
  }, []);

  const tap = useCallback(() => vibrate(8), [vibrate]);
  const press = useCallback(() => vibrate(12), [vibrate]);
  const success = useCallback(() => vibrate([10, 40, 14]), [vibrate]);
  const error = useCallback(() => vibrate([18, 60, 18]), [vibrate]);

  return { tap, press, success, error };
}