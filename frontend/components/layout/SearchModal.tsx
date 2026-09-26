"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAppStore } from "@/lib/store/AppStore";

interface SearchResult {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  href: string;
}

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { state } = useAppStore();
  const router = useRouter();
  const [q, setQ] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];

    const out: SearchResult[] = [];

    state.notebooks.forEach((n) => {
      if (
        n.title.toLowerCase().includes(query) ||
        n.subject.toLowerCase().includes(query) ||
        n.topic.toLowerCase().includes(query)
      ) {
        out.push({
          id: n.id,
          kind: "Notebook",
          title: n.title,
          subtitle: n.subject,
          href: `/notebooks/${n.id}`,
        });
      }
    });

    state.documents.forEach((d) => {
      if (
        d.title.toLowerCase().includes(query) ||
        d.subject.toLowerCase().includes(query)
      ) {
        out.push({
          id: d.id,
          kind: "Document",
          title: d.title,
          subtitle: d.subject,
          href: `/vault/${d.id}`,
        });
      }
    });

    state.todos.forEach((t) => {
      if (
        t.title.toLowerCase().includes(query) ||
        (t.description ?? "").toLowerCase().includes(query)
      ) {
        out.push({
          id: t.id,
          kind: "Task",
          title: t.title,
          subtitle: t.subject ?? "Task",
          href: "/todos",
        });
      }
    });

    state.deadlines.forEach((d) => {
      if (d.title.toLowerCase().includes(query)) {
        out.push({
          id: d.id,
          kind: "Deadline",
          title: d.title,
          subtitle: d.subject ?? "Deadline",
          href: "/deadlines",
        });
      }
    });

    return out.slice(0, 20);
  }, [q, state]);

  const go = (href: string) => {
    onClose();
    setQ("");
    router.push(href);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setQ("");
        onClose();
      }}
      title="Search"
      description="Notebooks, documents, tasks, deadlines."
      size="md"
      mobileFullscreen={false}
    >
      <Input
        autoFocus
        placeholder="Start typing…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        leading={<Search className="h-4 w-4" />}
      />

      <div className="mt-4">
        {!q ? (
          <p className="py-6 text-center text-[12.5px] text-ink-muted">
            Type to search across your workspace.
          </p>
        ) : results.length === 0 ? (
          <p className="py-6 text-center text-[12.5px] text-ink-muted">
            No matches.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {results.map((r) => (
              <li key={`${r.kind}-${r.id}`}>
                <button
                  type="button"
                  onClick={() => go(r.href)}
                  className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-surface-soft"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] text-ink">
                      {r.title}
                    </p>
                    <p className="truncate text-[11.5px] text-ink-muted">
                      {r.subtitle}
                    </p>
                  </div>
                  <Badge>{r.kind}</Badge>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}