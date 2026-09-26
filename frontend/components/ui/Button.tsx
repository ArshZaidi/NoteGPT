"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-canvas hover:bg-accent-hover active:bg-accent-hover shadow-xs",
  secondary:
    "bg-surface text-ink border border-line hover:bg-surface-soft active:bg-surface-soft",
  ghost:
    "text-ink-soft hover:bg-surface-soft hover:text-ink active:bg-surface-sunken",
  outline:
    "border border-line-strong text-ink hover:bg-surface-soft active:bg-surface-sunken",
  danger: "bg-danger text-white hover:opacity-90 active:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] rounded-md gap-1.5",
  md: "h-10 px-4 text-[14px] rounded-lg gap-2",
  lg: "h-12 px-5 text-[15px] rounded-lg gap-2",
  icon: "h-9 w-9 rounded-lg justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      fullWidth,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium tracking-[-0.005em]",
        "transition-[background-color,color,box-shadow,transform] duration-150 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        "disabled:opacity-50 disabled:pointer-events-none",
        "select-none touch-manipulation",
        fullWidth && "w-full",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-current border-r-transparent" />
      ) : null}
      {children}
    </button>
  ),
);
Button.displayName = "Button";