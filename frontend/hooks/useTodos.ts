"use client";

import { useCallback, useEffect, useState } from "react";
import type { Todo, TodoStatus } from "@/types";
import { listTodos } from "@/lib/api/todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listTodos()
      .then((t) => active && setTodos(t))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const addTodo = useCallback((todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
  }, []);

  const updateStatus = useCallback((id: string, status: TodoStatus) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              completedAt:
                status === "completed" ? new Date().toISOString() : undefined,
            }
          : t,
      ),
    );
  }, []);

  const removeTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { todos, loading, addTodo, updateStatus, removeTodo };
}