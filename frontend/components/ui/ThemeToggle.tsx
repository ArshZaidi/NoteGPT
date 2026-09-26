"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type Theme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils/cn";
import { useHaptics } from "@/hooks/useHaptics";

const ORDER: Theme[] = ["light", "dark", "system"];

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const LABEL: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

/**
 * Compact cycle button: light → dark → system → light.
 * Renders as a native-feeling icon button.
 */
export function ThemeToggle({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const { theme, setTheme } = useTheme();
  const { tap } = useHaptics();

  const cycle = () => {
    tap();
    const idx = ORDER.indexOf(theme);
    const next = ORDER[(idx + 1) % ORDER.length];
    setTheme(next);
  };

  const Icon = ICONS[theme];
  const dim = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const icon = size === "sm" ? "h-[15px] w-[15px]" : "h-[17px] w-[17px]";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABEL[theme]}. Tap to change.`}
      title={`Theme: ${LABEL[theme]}`}
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-lg",
        "text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink",
        "active:bg-surface-sunken active:scale-95",
        dim,
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.7, rotate: 30 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon className={icon} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}