"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckSquare,
  LayoutDashboard,
  Notebook,
  PenLine,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/notebooks", label: "Notes", icon: Notebook },
  { href: "/todos", label: "Tasks", icon: CheckSquare },
  { href: "/deadlines", label: "Dates", icon: CalendarClock },
  { href: "/scratchpad", label: "Pad", icon: PenLine },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/90 backdrop-blur-md pb-safe lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 pt-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className="relative flex flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10.5px] font-medium touch-manipulation"
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={cn(
                    "relative flex h-8 w-12 items-center justify-center rounded-full transition-colors",
                    active ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="bottom-nav-pill"
                      className="absolute inset-0 rounded-full bg-surface-soft"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  ) : null}
                  <Icon className="relative h-[18px] w-[18px]" />
                </span>
                <span
                  className={cn(
                    "transition-colors",
                    active ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}