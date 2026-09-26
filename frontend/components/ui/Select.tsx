"use client";

import { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, children, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? props.name ?? generatedId;

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-[13px] font-medium text-ink-soft"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            aria-invalid={error ? true : undefined}
            className={cn(
              "h-11 w-full appearance-none rounded-lg border border-line bg-surface pl-3 pr-9",
              "text-[15px] text-ink outline-none transition-colors duration-150",
              "focus:border-ink-faint",
              error && "border-danger",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        </div>
        {error ? (
          <p className="mt-1.5 text-[12px] text-danger">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-[12px] text-ink-muted">{hint}</p>
        ) : null}
      </div>
    );
  },
);
Select.displayName = "Select";