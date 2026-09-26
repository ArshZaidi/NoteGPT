"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { PriorityDot } from "@/components/todos/PriorityDot";
import { cn } from "@/lib/utils/cn";
import { formatDue } from "@/lib/utils/formatDate";
import type { Todo } from "@/types";

export function TodayTasks({ tasks }: { tasks: Todo[] }) {
  return (
    <section>
      <SectionHeader title="Today" meta={`${tasks.length}`} href="/todos" />
      {tasks.length === 0 ? (
        <EmptyState
          title="Nothing scheduled"
          description="Your day is clear. Add a task if something comes up."
          className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40 py-8"
        />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {tasks.map((task, i) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link
                href="/todos"
                className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-soft/60"
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                    task.status === "completed"
                      ? "border-success bg-success text-white"
                      : "border-line-strong group-hover:border-ink-faint",
                  )}
                  aria-hidden
                >
                  {task.status === "completed" ? (
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block truncate text-[14px] font-medium text-ink",
                      task.status === "completed" &&
                        "text-ink-muted line-through decoration-ink-faint",
                    )}
                  >
                    {task.title}
                  </span>
                  {task.subject ? (
                    <span className="mt-0.5 block truncate text-[12px] text-ink-muted">
                      {task.subject}
                    </span>
                  ) : null}
                </span>
                <span className="flex shrink-0 items-center gap-2.5">
                  {task.dueDate ? (
                    <span className="text-[12px] text-ink-muted">
                      {formatDue(task.dueDate)}
                    </span>
                  ) : null}
                  <PriorityDot priority={task.priority} />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}