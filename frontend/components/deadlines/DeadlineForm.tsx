"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toast";
import { useDeadlines } from "@/hooks/useDeadlines";
import { SUBJECTS, type Deadline, type Subject } from "@/types";
import { REMINDER_OPTIONS } from "@/lib/utils/constants";

interface DeadlineFormProps {
  open: boolean;
  onClose: () => void;
}

export function DeadlineForm({ open, onClose }: DeadlineFormProps) {
  const { addDeadline, addReminder } = useDeadlines();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject | "">("");
  const [dueAt, setDueAt] = useState("");
  const [notes, setNotes] = useState("");
  const [reminders, setReminders] = useState<Record<string, boolean>>({
    "7-days": true,
    "1-day": true,
  });

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setSubject("");
    setDueAt("");
    setNotes("");
    setReminders({ "7-days": true, "1-day": true });
  }, [open]);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast("error", "Add a title.");
      return;
    }
    if (!dueAt) {
      toast("error", "Set a due date and time.");
      return;
    }

    const id = `dl_${Date.now().toString(36)}`;
    const due = new Date(dueAt);

    const deadline: Deadline = {
      id,
      title: title.trim(),
      subject: subject || undefined,
      dueAt: due.toISOString(),
      status: "upcoming",
      notes: notes.trim() || undefined,
    };

    addDeadline(deadline);

    const offsets: Record<string, number> = {
      "7-days": 7 * 24 * 60 * 60 * 1000,
      "3-days": 3 * 24 * 60 * 60 * 1000,
      "1-day": 24 * 60 * 60 * 1000,
      "3-hours": 3 * 60 * 60 * 1000,
    };

    Object.entries(reminders).forEach(([key, enabled]) => {
      if (!enabled) return;
      const offset = offsets[key];
      if (!offset) return;
      const option = REMINDER_OPTIONS.find((r) => r.value === key);
      addReminder({
        id: `r_${id}_${key}`,
        deadlineId: id,
        label: option?.label ?? key,
        at: new Date(due.getTime() - offset).toISOString(),
        sent: false,
      });
    });

    toast("success", "Deadline added.");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New Deadline"
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim() || !dueAt}>
            Add deadline
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="e.g. Assignment 4 submission"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject | "")}
          >
            <option value="">None</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Input
            label="Due"
            type="datetime-local"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
          />
        </div>
        <Textarea
          label="Notes (optional)"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div>
          <p className="mb-2 text-[13px] font-medium text-ink-soft">Reminders</p>
          <div className="space-y-3 rounded-lg border border-line bg-surface p-3.5">
            {REMINDER_OPTIONS.map((r) => (
              <Switch
                key={r.value}
                label={r.label}
                checked={!!reminders[r.value]}
                onCheckedChange={(v) =>
                  setReminders((prev) => ({ ...prev, [r.value]: v }))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}