"use client";

import { useCallback } from "react";
import { useAppStore } from "@/lib/store/AppStore";
import type { Document } from "@/types";

export function useDocuments() {
  const { state, dispatch } = useAppStore();

  const addDocument = useCallback(
    (doc: Document) => dispatch({ type: "ADD_DOCUMENT", payload: doc }),
    [dispatch],
  );

  const updateDocument = useCallback(
    (id: string, patch: Partial<Document>) =>
      dispatch({ type: "UPDATE_DOCUMENT", payload: { id, patch } }),
    [dispatch],
  );

  const removeDocument = useCallback(
    (id: string) => dispatch({ type: "DELETE_DOCUMENT", payload: id }),
    [dispatch],
  );

  return {
    documents: state.documents,
    loading: !state.hydrated,
    addDocument,
    updateDocument,
    removeDocument,
  };
}