"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, Search } from "lucide-react";
import { useState } from "react";
import { MobileDrawer } from "./MobileDrawer";
import { useModals } from "./ModalsProvider";
import { initials } from "@/lib/utils/format";
import { useAppStore } from "@/lib/store/AppStore";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/notebooks": "Notebooks",
  "/vault": "Academic Vault",
  "/todos": "To-Do",
  "/deadlines": "Deadlines",
  "/scratchpad": "Scratchpad",
  "/settings": "Settings",
};

export function MobileTopBar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { open } = useModals();
  const { state } = useAppStore();

  const match = Object.keys(titleMap).find((k) => pathname.startsWith(k));
  const title = match ? titleMap[match] : "NoteGPT";

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 pt-safe backdrop-blur-md lg:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors active:bg-surface-soft"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>

          <Link href="/dashboard" className="flex min-w-0 items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-canvas">
              <BookOpen className="h-3.5 w-3.5" />
            </span>
            <span className="truncate font-display text-[15px] tracking-[-0.02em]">
              {title}
            </span>
          </Link>

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              aria-label="Search"
              onClick={() => open({ kind: "search" })}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors active:bg-surface-soft"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/settings"
              aria-label="Profile"
              className="flex h-9 w-9 items-center justify-center"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-ink">
                {initials(state.user.name)}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}