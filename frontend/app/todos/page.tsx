"use client";

import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Loading } from "@/components/ui/Loading";
import { TodoList } from "@/components/todos/TodoList";
import { useTodos } from "@/hooks/useTodos";
import { useModals } from "@/components/layout/ModalsProvider";

export default function TodosPage() {
  const { todos, loading, updateStatus, removeTodo } = useTodos();
  const { open } = useModals();

  const toggleComplete = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    updateStatus(id, todo.status === "completed" ? "pending" : "completed");
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Planning"
        title="To-Do"
        description="Everything you need to get done, in one calm list."
        actions={
          <MagneticButton onClick={() => open({ kind: "new-task" })}>
            <Plus className="h-4 w-4" />
            Add Task
          </MagneticButton>
        }
      />

      {loading ? (
        <Loading label="Loading tasks" />
      ) : (
        <TodoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onStatusChange={updateStatus}
          onDelete={removeTodo}
        />
      )}
    </AppShell>
  );
}