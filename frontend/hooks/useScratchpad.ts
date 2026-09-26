"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store/AppStore";
import { countWords } from "@/lib/utils/format";

export type SaveState = "idle" | "saving" | "saved";

export function useScratchpad() {
  const { state, dispatch } = useAppStore();
  const [content, setContent] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const seededRef = useRef(false);

  // Seed from store once hydrated.
  useEffect(() => {
    if (state.hydrated && !seededRef.current) {
      seededRef.current = true;
      setContent(state.scratchpad.content);
    }
  }, [state.hydrated, state.scratchpad.content]);

  // Debounced save to store.
  useEffect(() => {
    if (!seededRef.current) return;
    if (content === state.scratchpad.content) return;
    setSaveState("saving");
    const t = setTimeout(() => {
      dispatch({ type: "SET_SCRATCHPAD", payload: content });
      setSaveState("saved");
      setLastSaved(new Date());
    }, 600);
    return () => clearTimeout(t);
  }, [content, state.scratchpad.content, dispatch]);

  const clear = useCallback(() => {
    setContent("");
    dispatch({ type: "SET_SCRATCHPAD", payload: "" });
    setSaveState("saved");
    setLastSaved(new Date());
  }, [dispatch]);

  return {
    content,
    setContent,
    wordCount: countWords(content),
    saveState,
    lastSaved,
    clear,
  };
}