export type Subject =
  | "Digital Design Theory"
  | "Digital Design Lab"
  | "Mathematics Theory"
  | "Mathematics Tutorial"
  | "Physics Theory"
  | "Physics Lab"
  | "Environmental Science"
  | "Web Development";

export const SUBJECTS: Subject[] = [
  "Digital Design Theory",
  "Digital Design Lab",
  "Mathematics Theory",
  "Mathematics Tutorial",
  "Physics Theory",
  "Physics Lab",
  "Environmental Science",
  "Web Development",
];

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  university?: string;
  program?: string;
  year?: number;
}

export type ProcessingStage =
  | "uploading"
  | "ocr"
  | "organizing"
  | "researching"
  | "merging"
  | "completed"
  | "failed";

export interface ProcessingJob {
  id: string;
  notebookId: string;
  stage: ProcessingStage;
  progress: number; // 0..100
  message?: string;
  startedAt: string;
  updatedAt: string;
}

export interface NoteUpload {
  id: string;
  notebookId: string;
  fileName: string;
  fileType: "image" | "pdf";
  sizeBytes: number;
  uploadedAt: string;
  pages: number;
}

export type SectionKind =
  | "original"
  | "organized"
  | "additional"
  | "sources";

export interface NotebookSection {
  id: string;
  notebookId: string;
  kind: SectionKind;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  sources?: { title: string; url: string }[];
}

export interface Notebook {
  id: string;
  title: string;
  subject: Subject;
  topic: string;
  preview: string;
  updatedAt: string;
  createdAt: string;
  noteCount: number;
  stage: ProcessingStage;
  tags?: string[];
}

export type DocumentType =
  | "assignment"
  | "lab"
  | "project"
  | "reference"
  | "question-paper"
  | "other";

export interface Document {
  id: string;
  title: string;
  subject: Subject;
  type: DocumentType;
  sizeBytes: number;
  uploadedAt: string;
  deadline?: string;
  status: "final" | "draft" | "submitted";
  tags?: string[];
}

export type Priority = "low" | "medium" | "high" | "urgent";
export type TodoStatus = "pending" | "in-progress" | "completed";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  subject?: Subject;
  priority: Priority;
  status: TodoStatus;
  dueDate?: string;
  linkedDocumentId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Deadline {
  id: string;
  title: string;
  subject?: Subject;
  dueAt: string;
  status: "upcoming" | "today" | "overdue" | "completed";
  linkedDocumentId?: string;
  notes?: string;
}

export interface Reminder {
  id: string;
  deadlineId: string;
  label: string;
  at: string;
  sent: boolean;
}

export interface Scratchpad {
  id: string;
  content: string;
  updatedAt: string;
  wordCount: number;
}