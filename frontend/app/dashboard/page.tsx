"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Greeting } from "@/components/dashboard/Greeting";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TodayTasks } from "@/components/dashboard/TodayTasks";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { RecentNotebooks } from "@/components/dashboard/RecentNotebooks";
import { RecentDocuments } from "@/components/dashboard/RecentDocuments";
import { Loading } from "@/components/ui/Loading";
import { useAppStore } from "@/lib/store/AppStore";

export default function DashboardPage() {
  const { state } = useAppStore();
  const { user, notebooks, documents, todos, deadlines, hydrated } = state;

  const todayTasks = [...todos]
    .filter((t) => t.status !== "completed")
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 4);

  const upcoming = [...deadlines]
    .filter((d) => d.status !== "completed")
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    .slice(0, 3);

  const recentNotes = [...notebooks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 4);

  const recentDocs = [...documents]
    .sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    )
    .slice(0, 4);

  return (
    <AppShell>
      <Greeting name={user.name} />
      <QuickActions />

      {!hydrated ? (
        <Loading label="Loading your workspace" />
      ) : (
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-9 lg:col-span-2">
            <TodayTasks tasks={todayTasks} />
            <RecentNotebooks notebooks={recentNotes} />
          </div>
          <div className="space-y-9">
            <UpcomingDeadlines deadlines={upcoming} />
            <RecentDocuments documents={recentDocs} />
          </div>
        </div>
      )}
    </AppShell>
  );
}