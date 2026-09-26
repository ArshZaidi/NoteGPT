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
  Search,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { initials } from "@/lib/utils/format";
import { useAppStore } from "@/lib/store/AppStore";
import { useModals } from "./ModalsProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useHaptics } from "@/hooks/useHaptics";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const sections: NavSection[] = [
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
  const { state } = useAppStore();
  const { open: openModal } = useModals();
  const { tap } = useHaptics();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleSearch = () => {
    tap();
    onClose();
    // Defer so the drawer exit animation finishes cleanly.
    setTimeout(() => openModal({ kind: "search" }), 180);
  };

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
            className="absolute inset-0 bg-overlay backdrop-blur-[3px]"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-[340px] flex-col bg-canvas shadow-lg"
          >
            {/* ---------- Header ---------- */}
            <div className="relative pt-safe">
              <div className="flex items-start justify-between gap-3 px-6 pt-8 pb-6">
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-canvas shadow-xs">
                    <BookOpen className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-display text-[20px] tracking-[-0.02em] text-ink">
                      NoteGPT
                    </span>
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                      Personal Academic OS
                    </span>
                  </span>
                </Link>

                <div className="flex items-center gap-1">
                  <ThemeToggle size="sm" />
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => {
                      tap();
                      onClose();
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink active:bg-surface-sunken"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* ---------- Quick search ---------- */}
              <div className="px-5">
                <button
                  type="button"
                  onClick={handleSearch}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left",
                    "text-[13.5px] text-ink-muted transition-colors",
                    "hover:border-line-strong active:bg-surface-soft",
                  )}
                >
                  <Search className="h-4 w-4 shrink-0" />
                  <span className="flex-1">Search your workspace</span>
                  <kbd className="hidden rounded border border-line bg-surface-soft px-1.5 py-0.5 text-[10px] font-medium text-ink-faint sm:inline">
                    ⌘K
                  </kbd>
                </button>
              </div>
            </div>

            {/* ---------- Nav ---------- */}
            <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-4">
              {sections.map((section, idx) => (
                <div key={idx} className={idx === 0 ? "mb-1" : "mt-4 mb-1"}>
                  {section.title ? (
                    <div className="px-3 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                      {section.title}
                    </div>
                  ) : null}
                  <ul className="space-y-0.5">
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
                            onClick={() => {
                              tap();
                              onClose();
                            }}
                            className={cn(
                              "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-[14.5px] font-medium transition-colors",
                              active
                                ? "bg-surface text-ink shadow-xs"
                                : "text-ink-soft hover:bg-surface-soft active:bg-surface-sunken",
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                                active
                                  ? "bg-accent-soft text-ink"
                                  : "bg-surface-soft/60 text-ink-muted group-hover:bg-surface-soft group-hover:text-ink",
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="flex-1">{item.label}</span>
                            {active ? (
                              <motion.span
                                layoutId="drawer-active-dot"
                                className="h-1.5 w-1.5 rounded-full bg-ink"
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 30,
                                }}
                              />
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* ---------- User card ---------- */}
            <div className="border-t border-line p-3 pb-safe">
              <Link
                href="/settings"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-surface-soft active:bg-surface-sunken"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[13px] font-semibold text-ink">
                  {initials(state.user.name || state.user.email || "U")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">
                    {state.user.name || "Signed in"}
                  </span>
                  <span className="block truncate text-[11.5px] text-ink-muted">
                    {state.user.email}
                  </span>
                </span>
              </Link>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}