"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { useTodos } from "@/hooks/useTodos";
import { SUBJECTS, type Priority, type Subject, type TodoStatus } from "@/types";

interface TodoFormProps {
  open: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialDescription?: string;
}

export function TodoForm({
  open,
  onClose,
  initialTitle,
  initialDescription,
}: TodoFormProps) {
  const { addTodo } = useTodos();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState<Subject | "">("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<TodoStatus>("pending");
  const [dueDate, setDueDate] = useState("");

  // Pre-fill when the modal opens.
  useEffect(() => {
    if (!open) return;
    setTitle(initialTitle ?? "");
    setDescription(initialDescription ?? "");
    setSubject("");
    setPriority("medium");
    setStatus("pending");
    setDueDate("");
  }, [open, initialTitle, initialDescription]);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast("error", "Add a title.");
      return;
    }
    addTodo({
      id: `t_${Date.now().toString(36)}`,
      title: title.trim(),
      description: description.trim() || undefined,
      subject: subject || undefined,
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      createdAt: new Date().toISOString(),
      completedAt: status === "completed" ? new Date().toISOString() : undefined,
    });
    toast("success", "Task added.");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New Task"
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            Add task
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <Textarea
          label="Description (optional)"
          rows={3}
          placeholder="Add context or steps."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TodoStatus)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </Select>
          <Input
            label="Due date (optional)"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}