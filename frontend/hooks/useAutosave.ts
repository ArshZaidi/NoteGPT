"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SaveState = "idle" | "saving" | "saved";

export function useAutosave<T>(
  value: T,
  onSave: (v: T) => Promise<void> | void,
  delay = 900,
) {
  const [state, setState] = useState<SaveState>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const firstRun = useRef(true);
  const saveRef = useRef(onSave);
  saveRef.current = onSave;

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setState("saving");
    const t = setTimeout(async () => {
      await saveRef.current(value);
      setState("saved");
      setLastSaved(new Date());
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  const reset = useCallback(() => {
    firstRun.current = true;
    setState("idle");
    setLastSaved(null);
  }, []);

  return { state, lastSaved, reset };
}