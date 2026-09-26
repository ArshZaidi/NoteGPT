"use client";

import { useCallback } from "react";
import { useAppStore } from "@/lib/store/AppStore";
import type { Deadline, Reminder } from "@/types";

export function useDeadlines() {
  const { state, dispatch } = useAppStore();

  const addDeadline = useCallback(
    (deadline: Deadline) =>
      dispatch({ type: "ADD_DEADLINE", payload: deadline }),
    [dispatch],
  );

  const updateDeadline = useCallback(
    (id: string, patch: Partial<Deadline>) =>
      dispatch({ type: "UPDATE_DEADLINE", payload: { id, patch } }),
    [dispatch],
  );

  const removeDeadline = useCallback(
    (id: string) => dispatch({ type: "DELETE_DEADLINE", payload: id }),
    [dispatch],
  );

  const addReminder = useCallback(
    (reminder: Reminder) =>
      dispatch({ type: "ADD_REMINDER", payload: reminder }),
    [dispatch],
  );

  return {
    deadlines: state.deadlines,
    reminders: state.reminders,
    loading: !state.hydrated,
    addDeadline,
    updateDeadline,
    removeDeadline,
    addReminder,
  };
}