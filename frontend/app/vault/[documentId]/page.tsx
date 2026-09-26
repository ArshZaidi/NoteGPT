import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Download, Share2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getDocument } from "@/lib/api/documents";
import { formatBytes } from "@/lib/utils/format";
import { formatDate, formatDue } from "@/lib/utils/formatDate";
import type { DocumentType } from "@/types";

const typeLabel: Record<DocumentType, string> = {
  assignment: "Assignment",
  lab: "Lab",
  project: "Project",
  reference: "Reference",
  "question-paper": "Question Paper",
  other: "Other",
};

interface DocumentDetailProps {
  params: Promise<{ documentId: string }>;
}

export default async function DocumentDetailPage({
  params,
}: DocumentDetailProps) {
  const { documentId } = await params;
  const doc = await getDocument(documentId);
  if (!doc) notFound();

  return (
    <AppShell>
      <div className="mb-6">
        <Link
          href="/vault"
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Academic Vault
        </Link>
      </div>

      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone="neutral">{typeLabel[doc.type]}</Badge>
            <Badge
              tone={
                doc.status === "final"
                  ? "success"
                  : doc.status === "submitted"
                    ? "info"
                    : "warning"
              }
            >
              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
            </Badge>
          </div>
          <h1 className="font-display text-[24px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[30px]">
            {doc.title}
          </h1>
          <p className="mt-2 text-[13px] text-ink-muted">{doc.subject}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download className="h-3.5 w-3.5" />
            Download
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        <div className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40 p-10 text-center">
          <p className="font-display text-[18px] tracking-[-0.01em] text-ink">
            Preview
          </p>
          <p className="mx-auto mt-2 max-w-sm text-pretty text-[13px] leading-relaxed text-ink-muted">
            Document preview will render here once the storage backend is
            connected.
          </p>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-ink-faint">
              Details
            </p>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">Size</dt>
                <dd className="text-ink">{formatBytes(doc.sizeBytes)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">Uploaded</dt>
                <dd className="text-ink">{formatDate(doc.uploadedAt)}</dd>
              </div>
              {doc.deadline ? (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Deadline</dt>
                  <dd className="text-warning">{formatDue(doc.deadline)}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}