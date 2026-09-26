"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/components/ui/Toast";
import { useNotebooks } from "@/hooks/useNotebooks";
import { SUBJECTS, type Notebook, type Subject } from "@/types";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function UploadModal({ open, onClose }: UploadModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { addNotebook } = useNotebooks();
  const { toast } = useToast();

  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject | "">("");
  const [topic, setTopic] = useState("");

  const reset = () => {
    setFiles([]);
    setTitle("");
    setSubject("");
    setTopic("");
  };

  const accept = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list));
  };

  const submit = () => {
    if (!title.trim()) {
      toast("error", "Add a title for this notebook.");
      return;
    }
    if (!subject) {
      toast("error", "Choose a subject.");
      return;
    }
    if (files.length === 0) {
      toast("error", "Add at least one file to upload.");
      return;
    }

    const id = `nb_${Date.now().toString(36)}`;
    const notebook: Notebook = {
      id,
      title: title.trim(),
      subject,
      topic: topic.trim() || "General",
      preview: "Processing notes…",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      noteCount: 0,
      stage: "uploading",
    };

    addNotebook(notebook);
    toast("success", "Notebook created. Processing notes…");
    reset();
    onClose();
    router.push(`/notebooks/${id}`);
  };

  const close = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="New Notebook"
      description="Upload handwritten notes, images, or PDFs."
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={close}>
            Cancel
          </Button>
          <Button onClick={submit}>Start processing</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="e.g. Boolean Algebra — Week 3"
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
          <Input
            label="Topic (optional)"
            placeholder="e.g. Combinational Logic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

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
            Drag &amp; drop files here
          </p>
          <p className="mt-1 text-[12px] text-ink-muted">
            PDF, JPG, PNG — up to 25 MB each
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Choose files
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
            accept="image/*,application/pdf"
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