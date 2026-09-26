"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
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
        <textarea
          id={inputId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          className={cn(
            "w-full resize-none rounded-lg border border-line bg-surface px-3 py-2.5",
            "text-[15px] leading-relaxed text-ink",
            "outline-none transition-colors duration-150",
            "placeholder:text-ink-faint focus:border-ink-faint",
            error && "border-danger",
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-[12px] text-danger">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-[12px] text-ink-muted">{hint}</p>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";