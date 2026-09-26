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

export const PROCESSING_STAGES: ProcessingStage[] = [
  "uploading",
  "ocr",
  "organizing",
  "researching",
  "merging",
  "completed",
];

export interface ProcessingJob {
  id: string;
  notebookId: string;
  stage: ProcessingStage;
  progress: number;
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

export type SectionKind = "original" | "organized" | "additional" | "sources";

export interface NotebookSource {
  title: string;
  url: string;
}

export interface NotebookSection {
  id: string;
  notebookId: string;
  kind: SectionKind;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  sources?: NotebookSource[];
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

export type DocumentStatus = "draft" | "final" | "submitted";

export interface Document {
  id: string;
  title: string;
  subject: Subject;
  type: DocumentType;
  sizeBytes: number;
  uploadedAt: string;
  deadline?: string;
  status: DocumentStatus;
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

export type DeadlineStatus = "upcoming" | "today" | "overdue" | "completed";

export interface Deadline {
  id: string;
  title: string;
  subject?: Subject;
  dueAt: string;
  status: DeadlineStatus;
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

export type ReminderOption =
  | "7-days"
  | "3-days"
  | "1-day"
  | "3-hours";

export interface Scratchpad {
  id: string;
  content: string;
  updatedAt: string;
  wordCount: number;
}