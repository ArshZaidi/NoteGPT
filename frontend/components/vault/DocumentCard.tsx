"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatDue } from "@/lib/utils/formatDate";
import { formatBytes } from "@/lib/utils/format";
import type { Document, DocumentType } from "@/types";

const typeLabel: Record<DocumentType, string> = {
  assignment: "Assignment",
  lab: "Lab",
  project: "Project",
  reference: "Reference",
  "question-paper": "Question Paper",
  other: "Other",
};

export function DocumentCard({
  doc,
  index = 0,
}: {
  doc: Document;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link
        href={`/vault/${doc.id}`}
        className="group flex items-start gap-3 rounded-xl border border-line bg-surface p-4 transition-all hover:border-line-strong hover:shadow-sm"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-ink-muted">
          <FileText className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 flex-1 text-pretty text-[14px] font-medium leading-snug text-ink">
              {doc.title}
            </h3>
            <Badge tone="neutral" className="shrink-0">
              {typeLabel[doc.type]}
            </Badge>
          </div>
          <p className="mt-1 text-[12px] text-ink-muted">{doc.subject}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-ink-muted">
            <span>{formatDate(doc.uploadedAt)}</span>
            <span aria-hidden>·</span>
            <span>{formatBytes(doc.sizeBytes)}</span>
            {doc.deadline ? (
              <>
                <span aria-hidden>·</span>
                <span className="text-warning">
                  Due {formatDue(doc.deadline)}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}