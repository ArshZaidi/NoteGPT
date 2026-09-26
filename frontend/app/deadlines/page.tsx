"use client";

import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Loading } from "@/components/ui/Loading";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { DeadlineList } from "@/components/deadlines/DeadlineList";
import { ReminderList } from "@/components/deadlines/ReminderList";
import { useDeadlines } from "@/hooks/useDeadlines";
import { useModals } from "@/components/layout/ModalsProvider";

export default function DeadlinesPage() {
  const { deadlines, reminders, loading } = useDeadlines();
  const { open } = useModals();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Planning"
        title="Deadlines"
        description="Upcoming due dates and the reminders that keep you on track."
        actions={
          <MagneticButton onClick={() => open({ kind: "new-deadline" })}>
            <Plus className="h-4 w-4" />
            Add Deadline
          </MagneticButton>
        }
      />

      {loading ? (
        <Loading label="Loading deadlines" />
      ) : (
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <DeadlineList deadlines={deadlines} />
          </div>
          <div>
            <SectionHeader title="Reminders" meta={`${reminders.length}`} />
            <ReminderList reminders={reminders} deadlines={deadlines} />
          </div>
        </div>
      )}
    </AppShell>
  );
}