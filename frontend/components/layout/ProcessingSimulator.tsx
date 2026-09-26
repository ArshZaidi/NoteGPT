"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store/AppStore";
import type { ProcessingStage } from "@/types";

const ORDER: ProcessingStage[] = [
  "uploading",
  "ocr",
  "organizing",
  "researching",
  "merging",
  "completed",
];

/**
 * Advances notebooks through processing stages on a timer.
 * Purely frontend — the real backend will replace this later.
 */
export function ProcessingSimulator() {
  const { state, dispatch } = useAppStore();

  useEffect(() => {
    const next = state.notebooks.find(
      (n) => n.stage !== "completed" && n.stage !== "failed",
    );
    if (!next) return;

    const idx = ORDER.indexOf(next.stage);
    if (idx < 0 || idx >= ORDER.length - 1) return;

    const target: ProcessingStage = ORDER[idx + 1];

    const timer = setTimeout(() => {
      dispatch({
        type: "UPDATE_NOTEBOOK",
        payload: {
          id: next.id,
          patch: {
            stage: target,
            updatedAt: new Date().toISOString(),
            noteCount:
              target === "completed"
                ? Math.max(next.noteCount, 6)
                : next.noteCount + 2,
            preview:
              target === "completed"
                ? "Notes organized. AI summary and additional context ready."
                : next.preview,
          },
        },
      });
    }, 1400);

    return () => clearTimeout(timer);
  }, [state.notebooks, dispatch]);

  return null;
}