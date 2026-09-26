"use client";

import { useMemo, useState } from "react";
import { CalendarClock } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { DeadlineCard } from "./DeadlineCard";
import type { Deadline, DeadlineStatus } from "@/types";

type Filter = "all" | DeadlineStatus;

export function DeadlineList({ deadlines }: { deadlines: Deadline[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: deadlines.length,
      upcoming: deadlines.filter((d) => d.status === "upcoming").length,
      today: deadlines.filter((d) => d.status === "today").length,
      overdue: deadlines.filter((d) => d.status === "overdue").length,
      completed: deadlines.filter((d) => d.status === "completed").length,
    }),
    [deadlines],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return deadlines;
    return deadlines.filter((d) => d.status === filter);
  }, [deadlines, filter]);

  return (
    <div>
      <div className="mb-5">
        <Tabs
          items={[
            { id: "all", label: "All", count: counts.all },
            { id: "today", label: "Today", count: counts.today },
            { id: "upcoming", label: "Upcoming", count: counts.upcoming },
            { id: "overdue", label: "Overdue", count: counts.overdue },
            { id: "completed", label: "Completed", count: counts.completed },
          ]}
          value={filter}
          onChange={(v) => setFilter(v as Filter)}
          layoutId="deadlines-tab"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<CalendarClock className="h-4 w-4" />}
          title="Nothing here"
          description="You're all caught up."
          className="rounded-xl border border-dashed border-line-strong bg-surface-soft/40"
        />
      ) : (
        <ul className="space-y-2.5">
          {filtered.map((d, i) => (
            <DeadlineCard key={d.id} deadline={d} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}