"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Notebook as NotebookIcon } from "lucide-react";
import { ProcessingBadge } from "./ProcessingBadge";
import { formatRelative } from "@/lib/utils/formatDate";
import type { Notebook } from "@/types";

export function NotebookCard({
  notebook,
  index = 0,
}: {
  notebook: Notebook;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link
        href={`/notebooks/${notebook.id}`}
        className="group block h-full rounded-xl border border-line bg-surface p-5 transition-all duration-200 hover:border-line-strong hover:shadow-sm"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-ink-muted">
            <NotebookIcon className="h-4 w-4" />
          </span>
          <ProcessingBadge stage={notebook.stage} />
        </div>
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
          {notebook.subject}
        </p>
        <h3 className="mt-1.5 line-clamp-2 font-display text-[16px] leading-snug tracking-[-0.01em] text-ink">
          {notebook.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-ink-muted">
          {notebook.preview}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11.5px] text-ink-muted">
          <span>{notebook.noteCount} notes</span>
          <span>{formatRelative(notebook.updatedAt)}</span>
        </div>
      </Link>
    </motion.div>
  );
}