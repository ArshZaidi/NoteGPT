"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, leading, trailing, id, ...props }, ref) => {
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
        <div
          className={cn(
            "flex h-11 items-center gap-2 rounded-lg border bg-surface px-3",
            "border-line transition-colors duration-150",
            "focus-within:border-ink-faint",
            error && "border-danger",
            className,
          )}
        >
          {leading ? (
            <span className="shrink-0 text-ink-muted">{leading}</span>
          ) : null}
          <input
            id={inputId}
            ref={ref}
            aria-invalid={error ? true : undefined}
            className="h-full w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
            {...props}
          />
          {trailing ? <span className="shrink-0">{trailing}</span> : null}
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
Input.displayName = "Input";