"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  className,
}: SwitchProps) {
  const id = useId();
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      {label || description ? (
        <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer">
          {label ? (
            <span className="block text-[14px] font-medium text-ink">
              {label}
            </span>
          ) : null}
          {description ? (
            <span className="mt-0.5 block text-[12.5px] text-ink-muted">
              {description}
            </span>
          ) : null}
        </label>
      ) : null}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          checked ? "bg-accent" : "bg-line-strong",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "mx-0.5 block h-5 w-5 rounded-full bg-white shadow-sm",
            checked ? "ml-auto" : "",
          )}
        />
      </button>
    </div>
  );
}