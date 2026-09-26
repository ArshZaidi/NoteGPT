"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  layoutId?: string;
}

export function Tabs({
  items,
  value,
  onChange,
  className,
  layoutId = "tabs-pill",
}: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "no-scrollbar flex items-center gap-1 overflow-x-auto",
        className,
      )}
    >
      {items.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-[13.5px] font-medium transition-colors",
              active ? "text-ink" : "text-ink-muted hover:text-ink-soft",
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-md bg-surface-sunken"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">{item.label}</span>
            {typeof item.count === "number" ? (
              <span
                className={cn(
                  "relative rounded-full px-1.5 py-0.5 text-[10.5px] font-medium",
                  active
                    ? "bg-surface text-ink-soft"
                    : "bg-surface-soft text-ink-muted",
                )}
              >
                {item.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}