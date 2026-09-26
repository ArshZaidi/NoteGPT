"use client";

import { useCallback } from "react";
import { useAppStore } from "@/lib/store/AppStore";
import type { Todo, TodoStatus } from "@/types";

export function useTodos() {
  const { state, dispatch } = useAppStore();

  const addTodo = useCallback(
    (todo: Todo) => dispatch({ type: "ADD_TODO", payload: todo }),
    [dispatch],
  );

  const updateTodo = useCallback(
    (id: string, patch: Partial<Todo>) =>
      dispatch({ type: "UPDATE_TODO", payload: { id, patch } }),
    [dispatch],
  );

  const updateStatus = useCallback(
    (id: string, status: TodoStatus) => {
      dispatch({
        type: "UPDATE_TODO",
        payload: {
          id,
          patch: {
            status,
            completedAt:
              status === "completed" ? new Date().toISOString() : undefined,
          },
        },
      });
    },
    [dispatch],
  );

  const removeTodo = useCallback(
    (id: string) => dispatch({ type: "DELETE_TODO", payload: id }),
    [dispatch],
  );

  return {
    todos: state.todos,
    loading: !state.hydrated,
    addTodo,
    updateTodo,
    updateStatus,
    removeTodo,
  };
}