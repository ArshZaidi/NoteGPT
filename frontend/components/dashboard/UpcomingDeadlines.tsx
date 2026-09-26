"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDue } from "@/lib/utils/formatDate";
import type { Deadline, DeadlineStatus } from "@/types";

const toneFor = (status: DeadlineStatus): BadgeTone => {
  switch (status) {
    case "overdue":
      return "danger";
    case "today":
      return "warning";
    case "completed":
      return "success";
    default:
      return "info";
  }
};

export function UpcomingDeadlines({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <section>
      <SectionHeader title="Deadlines" meta="Next up" href="/deadlines" />
      {deadlines.length === 0 ? (
        <EmptyState
          title="Nothing ahead"
          description="You're ahead of schedule."
          className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40 py-8"
        />
      ) : (
        <ul className="space-y-2.5">
          {deadlines.map((d, i) => (
            <motion.li
              key={d.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                href="/deadlines"
                className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-line-strong"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-ink">
                    {d.title}
                  </p>
                  {d.subject ? (
                    <p className="mt-0.5 truncate text-[12px] text-ink-muted">
                      {d.subject}
                    </p>
                  ) : null}
                </div>
                <Badge tone={toneFor(d.status)}>{formatDue(d.dueAt)}</Badge>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}