"use client";

import { useCallback } from "react";
import { useAppStore } from "@/lib/store/AppStore";
import type { Notebook } from "@/types";

export function useNotebooks() {
  const { state, dispatch } = useAppStore();

  const addNotebook = useCallback(
    (nb: Notebook) => dispatch({ type: "ADD_NOTEBOOK", payload: nb }),
    [dispatch],
  );

  const updateNotebook = useCallback(
    (id: string, patch: Partial<Notebook>) =>
      dispatch({ type: "UPDATE_NOTEBOOK", payload: { id, patch } }),
    [dispatch],
  );

  const removeNotebook = useCallback(
    (id: string) => dispatch({ type: "DELETE_NOTEBOOK", payload: id }),
    [dispatch],
  );

  return {
    notebooks: state.notebooks,
    loading: !state.hydrated,
    addNotebook,
    updateNotebook,
    removeNotebook,
  };
}

export function useNotebook(id: string | null) {
  const { state } = useAppStore();
  const notebook = id
    ? state.notebooks.find((n) => n.id === id) ?? null
    : null;
  return {
    notebook,
    loading: !state.hydrated,
  };
}