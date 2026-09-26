"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Scratchpad } from "@/types";
import { getScratchpad } from "@/lib/api/scratchpad";
import { countWords } from "@/lib/utils/format";
import { useAutosave, type SaveState } from "./useAutoSave";

export interface UseScratchpad {
  content: string;
  setContent: (v: string) => void;
  wordCount: number;
  saveState: SaveState;
  lastSaved: Date | null;
  clear: () => void;
}

export function useScratchpad(): UseScratchpad {
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    let active = true;
    getScratchpad().then((sp: Scratchpad) => {
      if (!active || loadedRef.current) return;
      loadedRef.current = true;
      setContent(sp.content);
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const onSave = useCallback(async (_: string) => {
    // Replace with real persistence later.
  }, []);

  const { state, lastSaved } = useAutosave(content, onSave, 800);

  const clear = useCallback(() => setContent(""), []);

  return {
    content,
    setContent,
    wordCount: countWords(content),
    saveState: loaded ? state : "idle",
    lastSaved,
    clear,
  };
}