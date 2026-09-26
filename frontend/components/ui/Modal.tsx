"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils/cn";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  mobileFullscreen?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  mobileFullscreen = true,
}: ModalProps) {
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

  const maxWidth =
    size === "sm"
      ? "sm:max-w-md"
      : size === "lg"
        ? "sm:max-w-2xl"
        : "sm:max-w-lg";

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
          />
          <motion.div
            initial={{
              y: mobileFullscreen ? "100%" : 8,
              opacity: mobileFullscreen ? 1 : 0,
            }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: mobileFullscreen ? "100%" : 8,
              opacity: mobileFullscreen ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={cn(
              "relative z-10 flex w-full flex-col overflow-hidden border border-line bg-surface shadow-lg",
              "rounded-t-2xl sm:rounded-2xl",
              maxWidth,
              mobileFullscreen
                ? "max-h-[92dvh] sm:max-h-[85dvh]"
                : "max-h-[85dvh]",
            )}
          >
            <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-line-strong sm:hidden" />
            {title || description ? (
              <header className="flex shrink-0 items-start justify-between gap-4 px-5 pt-4 sm:pt-5">
                <div className="min-w-0">
                  {title ? (
                    <h2 className="font-display text-[19px] tracking-[-0.015em] text-ink">
                      {title}
                    </h2>
                  ) : null}
                  {description ? (
                    <p className="mt-1 text-[13px] text-ink-muted">
                      {description}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>
            ) : null}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 pt-4">
              {children}
            </div>
            {footer ? (
              <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-line bg-surface-soft px-5 py-3.5 pb-safe">
                {footer}
              </footer>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}