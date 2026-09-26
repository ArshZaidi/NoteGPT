"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils/formatDate";
import type { Deadline, DeadlineStatus } from "@/types";

const tone: Record<DeadlineStatus, BadgeTone> = {
  upcoming: "info",
  today: "warning",
  overdue: "danger",
  completed: "success",
};

const label: Record<DeadlineStatus, string> = {
  upcoming: "Upcoming",
  today: "Today",
  overdue: "Overdue",
  completed: "Done",
};

export function DeadlineCard({
  deadline,
  index = 0,
}: {
  deadline: Deadline;
  index?: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.03 }}
      className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-ink-muted">
        <Calendar className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[14px] font-medium text-ink">{deadline.title}</h3>
          <Badge tone={tone[deadline.status]}>{label[deadline.status]}</Badge>
        </div>
        {deadline.subject ? (
          <p className="mt-1 text-[12px] text-ink-muted">{deadline.subject}</p>
        ) : null}
        <p className="mt-2 text-[12px] text-ink-muted">
          {formatDateTime(deadline.dueAt)}
        </p>
        {deadline.notes ? (
          <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-ink-soft">
            {deadline.notes}
          </p>
        ) : null}
      </div>
    </motion.li>
  );
}