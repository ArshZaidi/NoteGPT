"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
  fullWidth?: boolean;
  ariaLabel?: string;
}

/**
 * SegmentedControl — a compact, single-select toggle.
 * Uses a shared `layoutId` for the sliding active indicator.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  size = "md",
  fullWidth,
  ariaLabel,
}: SegmentedControlProps<T>) {
  const layoutId = useId();

  const height = size === "sm" ? "h-7" : "h-9";
  const text = size === "sm" ? "text-[12.5px]" : "text-[13px]";
  const padding = size === "sm" ? "px-2.5" : "px-3";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-soft p-0.5",
        fullWidth && "flex w-full",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 rounded-md font-medium",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
              height,
              padding,
              text,
              fullWidth && "flex-1",
              active ? "text-ink" : "text-ink-muted hover:text-ink-soft",
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-md bg-surface shadow-xs"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            {Icon ? (
              <Icon
                className={cn(
                  "relative",
                  size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
                )}
              />
            ) : null}
            <span className="relative whitespace-nowrap">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}