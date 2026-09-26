"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CheckSquare } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { TodoCard } from "./TodoCard";
import type { Todo, TodoStatus } from "@/types";

type Filter = "all" | TodoStatus;

export function TodoList({
  todos,
  onToggleComplete,
  onStatusChange,
  onDelete,
}: {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: todos.length,
      pending: todos.filter((t) => t.status === "pending").length,
      "in-progress": todos.filter((t) => t.status === "in-progress").length,
      completed: todos.filter((t) => t.status === "completed").length,
    }),
    [todos],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return todos;
    return todos.filter((t) => t.status === filter);
  }, [todos, filter]);

  return (
    <div>
      <div className="mb-5">
        <Tabs
          items={[
            { id: "all", label: "All", count: counts.all },
            { id: "pending", label: "Pending", count: counts.pending },
            {
              id: "in-progress",
              label: "In progress",
              count: counts["in-progress"],
            },
            { id: "completed", label: "Completed", count: counts.completed },
          ]}
          value={filter}
          onChange={(v) => setFilter(v as Filter)}
          layoutId="todos-tab"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<CheckSquare className="h-4 w-4" />}
          title="Nothing here"
          description="Add a task to get started."
          className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40"
        />
      ) : (
        <ul className="space-y-2.5">
          <AnimatePresence initial={false}>
            {filtered.map((t, i) => (
              <TodoCard
                key={t.id}
                todo={t}
                index={i}
                onToggleComplete={onToggleComplete}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}