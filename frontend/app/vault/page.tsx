"use client";

import { useMemo, useState } from "react";
import { FolderPlus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Loading } from "@/components/ui/Loading";
import { EmptyState } from "@/components/ui/EmptyState";
import { DocumentCard } from "@/components/vault/DocumentCard";
import { VaultFilters, type VaultTab } from "@/components/vault/VaultFilters";
import { useDocuments } from "@/hooks/useDocuments";
import { useModals } from "@/components/layout/ModalsProvider";
import type { DocumentType } from "@/types";

export default function VaultPage() {
  const { documents, loading } = useDocuments();
  const { open } = useModals();
  const [tab, setTab] = useState<VaultTab>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const base: Record<VaultTab, number> = {
      all: documents.length,
      assignment: 0,
      lab: 0,
      project: 0,
      reference: 0,
      "question-paper": 0,
      other: 0,
    };
    for (const d of documents) {
      const key = d.type as DocumentType;
      base[key] = (base[key] ?? 0) + 1;
    }
    return base;
  }, [documents]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents
      .filter((d) => tab === "all" || d.type === tab)
      .filter(
        (d) =>
          !q ||
          d.title.toLowerCase().includes(q) ||
          d.subject.toLowerCase().includes(q),
      )
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
      );
  }, [documents, tab, query]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Study"
        title="Academic Vault"
        description="Assignments, labs, references, projects, and question papers."
        actions={
          <MagneticButton onClick={() => open({ kind: "upload-doc" })}>
            <FolderPlus className="h-4 w-4" />
            Upload Document
          </MagneticButton>
        }
      />

      <VaultFilters
        value={tab}
        onChange={setTab}
        counts={counts}
        query={query}
        onQuery={setQuery}
      />

      {loading ? (
        <Loading label="Loading documents" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No documents"
          description="Upload a document to keep it safe and searchable."
          className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40"
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filtered.map((d, i) => (
            <DocumentCard key={d.id} doc={d} index={i} />
          ))}
        </div>
      )}
    </AppShell>
  );
}