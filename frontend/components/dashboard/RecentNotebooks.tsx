"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Notebook as NotebookIcon } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatRelative } from "@/lib/utils/formatDate";
import type { Notebook } from "@/types";

export function RecentNotebooks({ notebooks }: { notebooks: Notebook[] }) {
  return (
    <section>
      <SectionHeader
        title="Recent notebooks"
        meta={`${notebooks.length}`}
        href="/notebooks"
      />
      {notebooks.length === 0 ? (
        <EmptyState
          icon={<NotebookIcon className="h-4 w-4" />}
          title="No notebooks yet"
          description="Create your first AI notebook to get started."
          className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40 py-8"
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {notebooks.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                href={`/notebooks/${n.id}`}
                className="group block h-full rounded-xl border border-line bg-surface p-4 transition-all hover:border-line-strong hover:shadow-sm"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                  {n.subject}
                </p>
                <p className="mt-1.5 line-clamp-2 font-display text-[15px] leading-snug tracking-[-0.01em] text-ink">
                  {n.title}
                </p>
                <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-ink-muted">
                  {n.preview}
                </p>
                <p className="mt-3 text-[11.5px] text-ink-faint">
                  Updated {formatRelative(n.updatedAt)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}