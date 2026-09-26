"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface ProgressProps {
  value: number;
  tone?: "ink" | "success" | "danger";
  className?: string;
}

export function Progress({ value, tone = "ink", className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const barColor =
    tone === "success" ? "bg-success" : tone === "danger" ? "bg-danger" : "bg-ink";

  return (
    <div
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-surface-sunken",
        className,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className={cn("h-full rounded-full", barColor)}
      />
    </div>
  );
}