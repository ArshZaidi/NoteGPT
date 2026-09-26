"use client";

import { Bell } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils/formatDate";
import type { Deadline, Reminder } from "@/types";

export function ReminderList({
  reminders,
  deadlines,
}: {
  reminders: Reminder[];
  deadlines: Deadline[];
}) {
  const titleFor = (deadlineId: string) =>
    deadlines.find((d) => d.id === deadlineId)?.title ?? "Deadline";

  if (reminders.length === 0) {
    return (
      <EmptyState
        icon={<Bell className="h-4 w-4" />}
        title="No reminders set"
        description="Add reminders when creating a deadline."
        className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40 py-8"
      />
    );
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      {reminders.map((r) => (
        <li
          key={r.id}
          className="flex items-center gap-3 px-4 py-3.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-soft text-ink-muted">
            <Bell className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-medium text-ink">
              {titleFor(r.deadlineId)}
            </p>
            <p className="mt-0.5 text-[11.5px] text-ink-muted">
              {r.label} · {formatDateTime(r.at)}
            </p>
          </div>
          <Badge tone={r.sent ? "success" : "info"}>
            {r.sent ? "Sent" : "Scheduled"}
          </Badge>
        </li>
      ))}
    </ul>
  );
}