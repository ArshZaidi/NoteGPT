"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import type { DocumentType } from "@/types";

export type VaultTab = "all" | DocumentType;

export interface VaultFiltersProps {
  value: VaultTab;
  onChange: (v: VaultTab) => void;
  counts: Record<VaultTab, number>;
  query: string;
  onQuery: (v: string) => void;
}

export function VaultFilters({
  value,
  onChange,
  counts,
  query,
  onQuery,
}: VaultFiltersProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <Tabs
        items={[
          { id: "all", label: "All", count: counts.all },
          { id: "assignment", label: "Assignments", count: counts.assignment },
          { id: "lab", label: "Labs", count: counts.lab },
          { id: "project", label: "Projects", count: counts.project },
          { id: "reference", label: "References", count: counts.reference },
          {
            id: "question-paper",
            label: "Question Papers",
            count: counts["question-paper"],
          },
          { id: "other", label: "Other", count: counts.other },
        ]}
        value={value}
        onChange={(v) => onChange(v as VaultTab)}
        layoutId="vault-tab"
      />
      <div className="w-full lg:max-w-[280px]">
        <Input
          placeholder="Search documents"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          leading={<Search className="h-4 w-4" />}
          aria-label="Search documents"
        />
      </div>
    </div>
  );
}