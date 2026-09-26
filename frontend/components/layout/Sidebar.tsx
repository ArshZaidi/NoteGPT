"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarClock,
  CheckSquare,
  Folder,
  LayoutDashboard,
  Notebook,
  PenLine,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { initials } from "@/lib/utils/format";
import { useAppStore } from "@/lib/store/AppStore";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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

export function Sidebar() {
  const pathname = usePathname();
  const { state } = useAppStore();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-line bg-canvas lg:flex">
      {/* Header — with more vertical padding */}
      <div className="flex items-center justify-between gap-2 px-5 pt-7 pb-5">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-canvas shadow-xs">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="font-display text-[19px] tracking-[-0.02em]">
            NoteGPT
          </span>
        </Link>
        <ThemeToggle size="sm" />
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {sections.map((section, idx) => (
          <div key={idx} className={idx === 0 ? "mb-1" : "mt-4 mb-1"}>
            {section.title ? (
              <div className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
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
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-150",
                        active ? "text-ink" : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="sidebar-active"
                          className="absolute inset-0 rounded-lg bg-surface shadow-xs"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      ) : null}
                      <Icon
                        className={cn(
                          "relative h-4 w-4 shrink-0 transition-colors",
                          active ? "text-ink" : "text-ink-faint",
                        )}
                      />
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-surface-soft"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[12px] font-semibold text-ink">
            {initials(state.user.name || state.user.email || "U")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium text-ink">
              {state.user.name || "Signed in"}
            </span>
            <span className="block truncate text-[11.5px] text-ink-muted">
              {state.user.email}
            </span>
          </span>
        </Link>
      </div>
    </aside>
  );
}