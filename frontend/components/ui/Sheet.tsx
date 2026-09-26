"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils/cn";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "bottom" | "left" | "right";
  className?: string;
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  side = "bottom",
  className,
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const positionClasses =
    side === "bottom"
      ? "inset-x-0 bottom-0 rounded-t-2xl max-h-[85dvh]"
      : side === "left"
        ? "left-0 top-0 h-full w-[88%] max-w-sm rounded-r-2xl"
        : "right-0 top-0 h-full w-[88%] max-w-sm rounded-l-2xl";

  const initial =
    side === "bottom"
      ? { y: "100%" }
      : side === "left"
        ? { x: "-100%" }
        : { x: "100%" };

  const exit = initial;

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
          />
          <motion.div
            initial={initial}
            animate={{ x: 0, y: 0 }}
            exit={exit}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className={cn(
              "absolute z-10 flex flex-col overflow-hidden border border-line bg-surface shadow-lg",
              positionClasses,
              className,
            )}
          >
            {side === "bottom" ? (
              <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-line-strong" />
            ) : null}
            {title ? (
              <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
                <h2 className="font-display text-[18px] tracking-[-0.015em] text-ink">
                  {title}
                </h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>
            ) : null}
            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}