"use client";

import { useEffect, useState } from "react";
import type { Notebook, NotebookSection } from "@/types";
import {
  getNotebook,
  getNotebookSections,
  listNotebooks,
} from "@/lib/api/notebooks";

export function useNotebooks() {
  const [data, setData] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    listNotebooks()
      .then((n) => active && setData(n))
      .catch((e: unknown) =>
        active && setError(e instanceof Error ? e.message : "Failed"),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { notebooks: data, loading, error };
}

export function useNotebook(id: string | null) {
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [sections, setSections] = useState<NotebookSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    Promise.all([getNotebook(id), getNotebookSections(id)])
      .then(([nb, secs]) => {
        if (!active) return;
        setNotebook(nb);
        setSections(secs);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  return { notebook, sections, loading };
}