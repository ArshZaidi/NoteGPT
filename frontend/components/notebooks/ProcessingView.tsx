"use client";

import { motion } from "framer-motion";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import type { ProcessingStage } from "@/types";

const STEPS: { key: ProcessingStage; label: string }[] = [
  { key: "uploading", label: "Uploading" },
  { key: "ocr", label: "OCR" },
  { key: "organizing", label: "Organizing" },
  { key: "researching", label: "Researching" },
  { key: "merging", label: "Merging" },
  { key: "completed", label: "Completed" },
];

function stageIndex(stage: ProcessingStage): number {
  if (stage === "failed") return -1;
  return STEPS.findIndex((s) => s.key === stage);
}

export function ProcessingView({
  stage,
  progress,
  message,
  onRetry,
}: {
  stage: ProcessingStage;
  progress: number;
  message?: string;
  onRetry?: () => void;
}) {
  const current = stageIndex(stage);
  const failed = stage === "failed";

  return (
    <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-faint">
            Processing
          </p>
          <p className="mt-1 text-[15px] font-medium text-ink">
            {failed ? "Something went wrong" : STEPS[current]?.label ?? "Working"}
          </p>
          {message ? (
            <p className="mt-1 text-[12.5px] text-ink-muted">{message}</p>
          ) : null}
        </div>
        {failed ? (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </div>

      <Progress
        value={failed ? 100 : progress}
        tone={failed ? "danger" : progress === 100 ? "success" : "ink"}
      />

      <ol className="mt-5 space-y-2">
        {STEPS.map((s, i) => {
          const done = !failed && current > i;
          const active = !failed && current === i;
          const isFailed = failed && i === 0;
          return (
            <li
              key={s.key}
              className="flex items-center gap-2.5 text-[13px]"
            >
              <span
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                  done && "border-success bg-success text-white",
                  active && "border-ink bg-ink text-canvas",
                  isFailed && "border-danger bg-danger-soft text-danger",
                  !done && !active && !isFailed && "border-line-strong",
                )}
              >
                {done ? (
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                ) : active ? (
                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                ) : isFailed ? (
                  <AlertCircle className="h-2.5 w-2.5" />
                ) : null}
              </span>
              <span
                className={cn(
                  done || active ? "text-ink" : "text-ink-muted",
                )}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}