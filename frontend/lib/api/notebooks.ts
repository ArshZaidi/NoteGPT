import type { Notebook, NotebookSection, ProcessingJob } from "@/types";
import { mockNotebooks, mockSections } from "@/lib/mock/data";

/**
 * Notebook API surface — mock-backed for now.
 * Swap the internals with `apiFetch` when the FastAPI backend is ready.
 */

export async function listNotebooks(): Promise<Notebook[]> {
  return mockNotebooks;
}

export async function getNotebook(id: string): Promise<Notebook | null> {
  return mockNotebooks.find((n) => n.id === id) ?? null;
}

export async function getNotebookSections(
  notebookId: string,
): Promise<NotebookSection[]> {
  return mockSections[notebookId] ?? [];
}

export async function getProcessingJob(
  notebookId: string,
): Promise<ProcessingJob | null> {
  const nb = mockNotebooks.find((n) => n.id === notebookId);
  if (!nb) return null;
  const progress =
    nb.stage === "completed" ? 100 : nb.stage === "failed" ? 0 : 45;
  return {
    id: `job_${notebookId}`,
    notebookId,
    stage: nb.stage,
    progress,
    startedAt: nb.createdAt,
    updatedAt: nb.updatedAt,
  };
}