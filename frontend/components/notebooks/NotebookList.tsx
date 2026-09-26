"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { NotebookCard } from "./NotebookCard";
import type { Notebook } from "@/types";

type Filter = "all" | "processing" | "ready";

export function NotebookList({ notebooks }: { notebooks: Notebook[] }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: notebooks.length,
      processing: notebooks.filter(
        (n) => n.stage !== "completed" && n.stage !== "failed",
      ).length,
      ready: notebooks.filter((n) => n.stage === "completed").length,
    }),
    [notebooks],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notebooks.filter((n) => {
      const matches =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.subject.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q);
      const stageMatch =
        tab === "all" ||
        (tab === "processing" &&
          n.stage !== "completed" &&
          n.stage !== "failed") ||
        (tab === "ready" && n.stage === "completed");
      return matches && stageMatch;
    });
  }, [notebooks, query, tab]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          items={[
            { id: "all", label: "All", count: counts.all },
            { id: "processing", label: "Processing", count: counts.processing },
            { id: "ready", label: "Ready", count: counts.ready },
          ]}
          value={tab}
          onChange={(v) => setTab(v as Filter)}
          layoutId="notebooks-tab"
        />
        <div className="w-full sm:max-w-[260px]">
          <Input
            placeholder="Search notebooks"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leading={<Search className="h-4 w-4" />}
            aria-label="Search notebooks"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No notebooks match"
          description="Try a different search or filter."
          className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((n, i) => (
            <NotebookCard key={n.id} notebook={n} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}