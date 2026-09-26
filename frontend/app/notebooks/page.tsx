"use client";

import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Loading } from "@/components/ui/Loading";
import { NotebookList } from "@/components/notebooks/NotebookList";
import { useNotebooks } from "@/hooks/useNotebooks";
import { useModals } from "@/components/layout/ModalsProvider";

export default function NotebooksPage() {
  const { notebooks, loading } = useNotebooks();
  const { open } = useModals();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Study"
        title="Notebooks"
        description="AI-organized notes from lectures, labs, and readings."
        actions={
          <MagneticButton onClick={() => open({ kind: "new-notebook" })}>
            <Plus className="h-4 w-4" />
            New Notebook
          </MagneticButton>
        }
      />

      {loading ? (
        <Loading label="Loading notebooks" />
      ) : (
        <NotebookList notebooks={notebooks} />
      )}
    </AppShell>
  );
}