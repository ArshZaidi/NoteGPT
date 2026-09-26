"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  BookOpen,
  CalendarClock,
  CheckSquare,
  Folder,
  LayoutDashboard,
  Notebook,
  PenLine,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { initials } from "@/lib/utils/format";
import { mockUser } from "@/lib/mock/data";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  {
    title: "",
    items: [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Study",
    items: [
      { href: "/notebooks", label: "Notebooks", icon: Notebook },
      { href: "/vault", label: "Academic Vault", icon: Folder },
    ],
  },
  {
    title: "Planning",
    items: [
      { href: "/todos", label: "To-Do", icon: CheckSquare },
      { href: "/deadlines", label: "Deadlines", icon: CalendarClock },
    ],
  },
  {
    title: "",
    items: [
      { href: "/scratchpad", label: "Scratchpad", icon: PenLine },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close when route changes
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute inset-y-0 left-0 flex w-[82%] max-w-[320px] flex-col bg-canvas shadow-lg"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3 pt-safe">
              <Link
                href="/dashboard"
                className="flex items-center gap-2"
                onClick={onClose}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-canvas">
                  <BookOpen className="h-4 w-4" />
                </span>
                <span className="font-display text-[18px] tracking-[-0.02em]">
                  NoteGPT
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-md text-ink-muted transition-colors active:bg-surface-soft"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 pb-4">
              {sections.map((section, idx) => (
                <div key={idx} className="mb-1">
                  {section.title ? (
                    <div className="px-3 pb-1 pt-4 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                      {section.title}
                    </div>
                  ) : null}
                  <ul>
                    {section.items.map((item) => {
                      const active =
                        pathname === item.href ||
                        (item.href !== "/dashboard" &&
                          pathname.startsWith(item.href));
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-3 text-[14px] font-medium transition-colors",
                              active
                                ? "bg-surface text-ink shadow-xs"
                                : "text-ink-soft active:bg-surface-soft",
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-[18px] w-[18px] shrink-0",
                                active ? "text-ink" : "text-ink-faint",
                              )}
                            />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="border-t border-line p-3 pb-safe">
              <div className="flex items-center gap-3 rounded-lg p-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[12px] font-semibold text-ink">
                  {initials(mockUser.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-ink">
                    {mockUser.name}
                  </span>
                  <span className="block truncate text-[11.5px] text-ink-muted">
                    {mockUser.email}
                  </span>
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}