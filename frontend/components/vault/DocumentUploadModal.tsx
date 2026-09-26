"use client";

import { useRef, useState } from "react";
import {
  Camera,
  FileText,
  Image as ImageIcon,
  UploadCloud,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { useDocuments } from "@/hooks/useDocuments";
import {
  SUBJECTS,
  type Document,
  type DocumentType,
  type Subject,
} from "@/types";

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function DocumentUploadModal({
  open,
  onClose,
}: DocumentUploadModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addDocument } = useDocuments();
  const { toast } = useToast();

  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject | "">("");
  const [type, setType] = useState<DocumentType>("assignment");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  const reset = () => {
    setFiles([]);
    setTitle("");
    setSubject("");
    setType("assignment");
    setDeadline("");
    setNotes("");
  };

  const accept = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list));
  };

  const submit = () => {
    if (!title.trim()) {
      toast("error", "Add a title.");
      return;
    }
    if (!subject) {
      toast("error", "Choose a subject.");
      return;
    }
    if (files.length === 0) {
      toast("error", "Add at least one file.");
      return;
    }

    const totalBytes = files.reduce((acc, f) => acc + f.size, 0);
    const id = `d_${Date.now().toString(36)}`;

    const doc: Document = {
      id,
      title: title.trim(),
      subject,
      type,
      sizeBytes: totalBytes,
      uploadedAt: new Date().toISOString(),
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      status: "final",
      tags: notes.trim() ? [notes.trim().slice(0, 40)] : undefined,
    };

    addDocument(doc);
    toast("success", "Document added to your vault.");
    reset();
    onClose();
  };

  const close = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Upload Document"
      description="Add an assignment, lab record, reference, or project file."
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={close}>
            Cancel
          </Button>
          <Button onClick={submit}>Add to Vault</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="e.g. Assignment 4 — Combinational Logic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject | "")}
          >
            <option value="" disabled>
              Choose subject
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value as DocumentType)}
          >
            <option value="assignment">Assignment</option>
            <option value="lab">Lab</option>
            <option value="project">Project</option>
            <option value="reference">Reference</option>
            <option value="question-paper">Question Paper</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <Input
          label="Deadline (optional)"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <Textarea
          label="Notes (optional)"
          rows={3}
          placeholder="Any context worth remembering."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            accept(e.dataTransfer.files);
          }}
          className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
            dragging
              ? "border-ink-faint bg-surface-soft"
              : "border-line-strong bg-surface-soft/40"
          }`}
        >
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-muted">
            <UploadCloud className="h-5 w-5" />
          </div>
          <p className="text-[14px] font-medium text-ink">
            Drag &amp; drop your document
          </p>
          <p className="mt-1 text-[12px] text-ink-muted">
            PDF, DOCX, JPG, PNG — up to 25 MB
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Choose file
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                inputRef.current?.setAttribute(
                  "capture",
                  "environment",
                ) || inputRef.current?.click()
              }
            >
              <Camera className="h-3.5 w-3.5" />
              Camera
            </Button>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,application/pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              accept(e.target.files);
              inputRef.current?.removeAttribute("capture");
            }}
          />
        </div>

        {files.length > 0 ? (
          <ul className="space-y-1.5">
            {files.map((f) => (
              <li
                key={`${f.name}-${f.size}`}
                className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5"
              >
                <FileText className="h-4 w-4 shrink-0 text-ink-muted" />
                <span className="min-w-0 flex-1 truncate text-[13px] text-ink">
                  {f.name}
                </span>
                <span className="text-[11.5px] text-ink-muted">
                  {(f.size / 1024).toFixed(0)} KB
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Modal>
  );
}