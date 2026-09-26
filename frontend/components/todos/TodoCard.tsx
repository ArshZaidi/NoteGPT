"use client";

import { motion } from "framer-motion";
import { Calendar, Check, MoreHorizontal, Trash2 } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { PriorityDot } from "./PriorityDot";
import { cn } from "@/lib/utils/cn";
import { formatDue } from "@/lib/utils/formatDate";
import type { Todo, TodoStatus } from "@/types";

const statusLabel: Record<TodoStatus, string> = {
  pending: "Pending",
  "in-progress": "In progress",
  completed: "Completed",
};

export function TodoCard({
  todo,
  onToggleComplete,
  onStatusChange,
  onDelete,
  index = 0,
}: {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
  index?: number;
}) {
  const completed = todo.status === "completed";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, delay: index * 0.02 }}
      className="group"
    >
      <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5 transition-colors hover:border-line-strong sm:p-4">
        <button
          type="button"
          aria-label={completed ? "Mark as pending" : "Mark as completed"}
          onClick={() => onToggleComplete(todo.id)}
          className={cn(
            "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all duration-200",
            completed
              ? "border-success bg-success text-white"
              : "border-line-strong hover:border-ink-faint active:scale-95",
          )}
        >
          {completed ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 24 }}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </motion.span>
          ) : null}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                "text-[14px] font-medium leading-snug text-ink",
                completed && "text-ink-muted line-through decoration-ink-faint",
              )}
            >
              {todo.title}
            </h3>
            <Dropdown
              trigger={
                <span className="flex h-7 w-7 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink">
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              }
            >
              <DropdownItem onClick={() => onStatusChange(todo.id, "pending")}>
                Mark pending
              </DropdownItem>
              <DropdownItem
                onClick={() => onStatusChange(todo.id, "in-progress")}
              >
                Mark in progress
              </DropdownItem>
              <DropdownItem
                onClick={() => onStatusChange(todo.id, "completed")}
              >
                Mark completed
              </DropdownItem>
              <DropdownItem
                onClick={() => onDelete(todo.id)}
                className="text-danger hover:bg-danger-soft hover:text-danger"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </DropdownItem>
            </Dropdown>
          </div>

          {todo.description ? (
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink-muted">
              {todo.description}
            </p>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-ink-muted">
            {todo.subject ? <span>{todo.subject}</span> : null}
            {todo.subject && todo.dueDate ? <span aria-hidden>·</span> : null}
            {todo.dueDate ? (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDue(todo.dueDate)}
              </span>
            ) : null}
            <span aria-hidden>·</span>
            <span>{statusLabel[todo.status]}</span>
            <PriorityDot priority={todo.priority} />
          </div>
        </div>
      </div>
    </motion.li>
  );
}