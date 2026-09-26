import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SectionBlock } from "@/components/notebooks/SectionBlock";
import { ProcessingBadge } from "@/components/notebooks/ProcessingBadge";
import { ProcessingView } from "@/components/notebooks/ProcessingView";
import { getNotebook, getNotebookSections, getProcessingJob } from "@/lib/api/notebooks";
import { formatRelative } from "@/lib/utils/formatDate";

interface NotebookDetailProps {
  params: Promise<{ notebookId: string }>;
}

export default async function NotebookDetailPage({
  params,
}: NotebookDetailProps) {
  const { notebookId } = await params;
  const notebook = await getNotebook(notebookId);
  if (!notebook) notFound();

  const [sections, job] = await Promise.all([
    getNotebookSections(notebookId),
    getProcessingJob(notebookId),
  ]);

  const isProcessing =
    notebook.stage !== "completed" && notebook.stage !== "failed";

  return (
    <AppShell>
      <div className="mb-6">
        <Link
          href="/notebooks"
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Notebooks
        </Link>
      </div>

      <header className="mb-7">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-ink-faint">
          {notebook.subject} · {notebook.topic}
        </p>
        <h1 className="font-display text-[26px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px]">
          {notebook.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[12.5px] text-ink-muted">
          <ProcessingBadge stage={notebook.stage} />
          <span>{notebook.noteCount} notes</span>
          <span>Updated {formatRelative(notebook.updatedAt)}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          {isProcessing && job ? (
            <ProcessingView
              stage={job.stage}
              progress={job.progress}
              message={job.message}
            />
          ) : null}

          {sections.length === 0 && !isProcessing ? (
            <div className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40 p-10 text-center text-[13px] text-ink-muted">
              This notebook doesn&apos;t have any sections yet.
            </div>
          ) : (
            sections.map((s) => <SectionBlock key={s.id} section={s} />)
          )}
        </div>

        <aside className="space-y-3 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-ink-faint">
              Metadata
            </p>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">Stage</dt>
                <dd className="truncate text-ink">{notebook.stage}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">Sections</dt>
                <dd className="text-ink">{sections.length}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">Notes</dt>
                <dd className="text-ink">{notebook.noteCount}</dd>
              </div>
              {notebook.tags && notebook.tags.length > 0 ? (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Tags</dt>
                  <dd className="truncate text-ink">
                    {notebook.tags.join(", ")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}