"use client";

import { useEffect, useState } from "react";
import type { Document } from "@/types";
import { listDocuments } from "@/lib/api/documents";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listDocuments()
      .then((d) => active && setDocuments(d))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { documents, loading };
}