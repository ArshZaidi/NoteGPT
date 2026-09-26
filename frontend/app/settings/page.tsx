"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Database, LogOut, Trash2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useToast } from "@/components/ui/Toast";
import { useAppStore, type Preferences } from "@/lib/store/AppStore";

type Density = "comfortable" | "compact";

export default function SettingsPage() {
  const { state, dispatch } = useAppStore();
  const prefs = state.preferences;
  const user = state.user;
  const { toast } = useToast();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [university, setUniversity] = useState(user.university ?? "");
  const [program, setProgram] = useState(user.program ?? "");
  const [year, setYear] = useState(String(user.year ?? 1));

  // Sync with store once hydrated.
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setUniversity(user.university ?? "");
    setProgram(user.program ?? "");
    setYear(String(user.year ?? 1));
  }, [user]);

  const updatePref = (patch: Partial<Preferences>) =>
    dispatch({ type: "SET_PREFERENCES", payload: patch });

  const saveProfile = () => {
    dispatch({
      type: "UPDATE_USER",
      payload: {
        name: name.trim() || user.name,
        email: email.trim() || user.email,
        university: university.trim(),
        program: program.trim(),
        year: Number(year) || user.year,
      },
    });
    toast("success", "Profile saved.");
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Customize your NoteGPT experience."
      />

      <div className="space-y-10">
        {/* Profile */}
        <section>
          <SectionHeader title="Profile" />
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-[16px] font-semibold text-ink">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-ink">{name}</p>
                <p className="text-[12.5px] text-ink-muted">{email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
              <Input
                label="Program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              />
              <Select
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </Select>
            </div>
            <div className="mt-5 flex justify-end">
              <Button onClick={saveProfile}>Save changes</Button>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section>
          <SectionHeader title="Appearance" />
          <div className="space-y-3 rounded-xl border border-line bg-surface p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-medium text-ink">Density</p>
                <p className="mt-0.5 text-[12.5px] text-ink-muted">
                  How much whitespace the interface uses.
                </p>
              </div>
              <SegmentedControl<Density>
                value={prefs.density}
                onChange={(v) => updatePref({ density: v })}
                options={[
                  { value: "comfortable", label: "Comfortable" },
                  { value: "compact", label: "Compact" },
                ]}
              />
            </div>
            <div className="h-px bg-line" />
            <Switch
              label="Reduce motion"
              description="Minimize animations and transitions across the app."
              checked={prefs.reduceMotion}
              onCheckedChange={(v) => updatePref({ reduceMotion: v })}
            />
          </div>
        </section>

        {/* Notifications */}
        <section>
          <SectionHeader title="Notifications" />
          <div className="space-y-3.5 rounded-xl border border-line bg-surface p-5">
            <Switch
              label="Deadline reminders"
              description="Get reminded before a deadline is due."
              checked={prefs.deadlineReminders}
              onCheckedChange={(v) => updatePref({ deadlineReminders: v })}
            />
            <div className="h-px bg-line" />
            <Switch
              label="Task reminders"
              description="Nudges for tasks that are due soon."
              checked={prefs.taskReminders}
              onCheckedChange={(v) => updatePref({ taskReminders: v })}
            />
            <div className="h-px bg-line" />
            <Switch
              label="Daily digest"
              description="A short morning summary of what matters today."
              checked={prefs.dailyDigest}
              onCheckedChange={(v) => updatePref({ dailyDigest: v })}
            />
            <div className="h-px bg-line" />
            <Switch
              label="Overdue alerts"
              description="Notify me when something becomes overdue."
              checked={prefs.notifyOnOverdue}
              onCheckedChange={(v) => updatePref({ notifyOnOverdue: v })}
            />
          </div>
        </section>

        {/* AI */}
        <section>
          <SectionHeader title="AI Preferences" />
          <div className="space-y-3.5 rounded-xl border border-line bg-surface p-5">
            <Switch
              label="Auto-organize notes"
              description="Structure new notes automatically after OCR."
              checked={prefs.autoOrganize}
              onCheckedChange={(v) => updatePref({ autoOrganize: v })}
            />
            <div className="h-px bg-line" />
            <Switch
              label="Research additional context"
              description="Look up related concepts and cite sources when useful."
              checked={prefs.autoResearch}
              onCheckedChange={(v) => updatePref({ autoResearch: v })}
            />
            <div className="h-px bg-line" />
            <Select
              label="Writing tone"
              value={prefs.aiTone}
              onChange={(e) => updatePref({ aiTone: e.target.value })}
            >
              <option value="academic">Academic</option>
              <option value="concise">Concise</option>
              <option value="conversational">Conversational</option>
              <option value="exam-ready">Exam-ready</option>
            </Select>
          </div>
        </section>

        {/* Data */}
        <section>
          <SectionHeader title="Data" />
          <div className="space-y-3 rounded-xl border border-line bg-surface p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-medium text-ink">
                  Reset to sample data
                </p>
                <p className="mt-0.5 text-[12.5px] text-ink-muted">
                  Restores the demo workspace. Your changes will be lost.
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch({ type: "RESET" });
                  toast("success", "Workspace reset.");
                }}
              >
                <Database className="h-3.5 w-3.5" />
                Reset
              </Button>
            </div>
            <div className="h-px bg-line" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-medium text-ink">
                  Clear scratchpad
                </p>
                <p className="mt-0.5 text-[12.5px] text-ink-muted">
                  Removes the current scratchpad text.
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch({ type: "SET_SCRATCHPAD", payload: "" });
                  toast("success", "Scratchpad cleared.");
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </Button>
            </div>
          </div>
        </section>

        {/* Account */}
        <section>
          <SectionHeader title="Account" />
          <div className="space-y-3 rounded-xl border border-line bg-surface p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-medium text-ink">Sign out</p>
                <p className="mt-0.5 text-[12.5px] text-ink-muted">
                  End this session on this device.
                </p>
              </div>
              <Link href="/login">
                <Button variant="secondary">
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}