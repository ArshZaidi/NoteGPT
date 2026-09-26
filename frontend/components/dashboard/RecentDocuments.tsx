"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatRelative } from "@/lib/utils/formatDate";
import { formatBytes } from "@/lib/utils/format";
import type { Document } from "@/types";

export function RecentDocuments({ documents }: { documents: Document[] }) {
  return (
    <section>
      <SectionHeader title="Recent documents" href="/vault" />
      {documents.length === 0 ? (
        <EmptyState
          title="No documents yet"
          description="Upload a PDF or image to get started."
          className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40 py-8"
        />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {documents.map((d) => (
            <li key={d.id}>
              <Link
                href={`/vault/${d.id}`}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-soft/60"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-soft text-ink-muted">
                  <FileText className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">
                    {d.title}
                  </span>
                  <span className="block truncate text-[11.5px] text-ink-muted">
                    {d.subject} · {formatBytes(d.sizeBytes)}
                  </span>
                </span>
                <span className="shrink-0 text-[11.5px] text-ink-faint">
                  {formatRelative(d.uploadedAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}