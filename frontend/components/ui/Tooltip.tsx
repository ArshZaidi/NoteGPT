"use client";

import { ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}

      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2
                   -translate-x-1/2 whitespace-nowrap rounded-md
                   border border-[var(--border)]
                   bg-[var(--foreground)] px-2.5 py-1.5
                   text-xs text-white opacity-0 shadow-sm
                   transition-opacity duration-150
                   group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {content}
      </div>
    </div>
  );
}