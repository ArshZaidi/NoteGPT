import type {
  Deadline,
  Document,
  Notebook,
  NotebookSection,
  ProcessingJob,
  Reminder,
  Scratchpad,
  Todo,
  User,
} from "@/types";

/**
 * MOCK DATA — frontend-only.
 * Keep every consumer pointing at `lib/api/*` so this file can be deleted
 * without touching UI code.
 */

const now = Date.now();
const hours = (n: number) => n * 60 * 60 * 1000;
const days = (n: number) => n * 24 * hours(1);
const iso = (ms: number) => new Date(ms).toISOString();

export const mockUser: User = {
  id: "u_arsh",
  name: "Arsh",
  email: "arsh@university.edu",
  university: "State University",
  program: "Computer Engineering",
  year: 2,
};

export const mockNotebooks: Notebook[] = [
  {
    id: "nb_boolean",
    title: "Boolean Algebra & Logic Gates",
    subject: "Digital Design Theory",
    topic: "Combinational Logic",
    preview:
      "Fundamentals of Boolean algebra, De Morgan's laws, and minimization using Karnaugh maps.",
    updatedAt: iso(now - hours(1)),
    createdAt: iso(now - days(12)),
    noteCount: 14,
    stage: "completed",
    tags: ["k-maps", "logic"],
  },
  {
    id: "nb_odes",
    title: "Differential Equations — First Order",
    subject: "Mathematics Theory",
    topic: "ODEs",
    preview:
      "Separable equations, integrating factors, and applications to physics problems.",
    updatedAt: iso(now - hours(5)),
    createdAt: iso(now - days(8)),
    noteCount: 9,
    stage: "organizing",
    tags: ["odes"],
  },
  {
    id: "nb_newton",
    title: "Newtonian Mechanics — Lab 3",
    subject: "Physics Lab",
    topic: "Friction & Inclined Planes",
    preview:
      "Measurements, uncertainty analysis, and comparison with theoretical predictions.",
    updatedAt: iso(now - hours(26)),
    createdAt: iso(now - days(4)),
    noteCount: 6,
    stage: "researching",
  },
  {
    id: "nb_react",
    title: "React Fundamentals",
    subject: "Web Development",
    topic: "Components & State",
    preview:
      "Props, state, hooks, and component composition. Includes mental model diagrams.",
    updatedAt: iso(now - days(2)),
    createdAt: iso(now - days(20)),
    noteCount: 21,
    stage: "completed",
  },
  {
    id: "nb_ecosystems",
    title: "Ecosystems & Energy Flow",
    subject: "Environmental Science",
    topic: "Trophic Levels",
    preview:
      "Energy transfer, food webs, and the 10% rule with worked examples.",
    updatedAt: iso(now - days(5)),
    createdAt: iso(now - days(15)),
    noteCount: 8,
    stage: "completed",
  },
];

export const mockSections: Record<string, NotebookSection[]> = {
  nb_boolean: [
    {
      id: "sec_b_1",
      notebookId: "nb_boolean",
      kind: "original",
      title: "Original handwritten notes",
      content:
        "Boolean algebra is a branch of algebra where variables are truth values (0/1).\n\nBasic operations: AND (·), OR (+), NOT (¯).\n\nLaws:\n— Identity: A·1 = A, A+0 = A\n— Null: A·0 = 0, A+1 = 1\n— Idempotent: A·A = A, A+A = A\n— Complement: A·Ā = 0, A+Ā = 1",
      createdAt: iso(now - days(12)),
      updatedAt: iso(now - days(12)),
    },
    {
      id: "sec_b_2",
      notebookId: "nb_boolean",
      kind: "organized",
      title: "AI-organized summary",
      content:
        "Boolean algebra formalizes binary logic using three primitive operations: AND, OR, and NOT. Every Boolean expression can be reduced to an equivalent form using a small set of identities.\n\nKey identities:\n1. Identity — A·1 = A, A+0 = A\n2. Null — A·0 = 0, A+1 = 1\n3. Idempotent — A·A = A, A+A = A\n4. Complement — A·Ā = 0, A+Ā = 1\n5. De Morgan — ¬(A·B) = ¬A + ¬B, ¬(A+B) = ¬A·¬B\n\nThese laws enable simplification of arbitrary Boolean functions into minimal sum-of-products or product-of-sums forms.",
      createdAt: iso(now - days(11)),
      updatedAt: iso(now - days(11)),
    },
    {
      id: "sec_b_3",
      notebookId: "nb_boolean",
      kind: "additional",
      title: "Additional concepts worth knowing",
      content:
        "• Karnaugh maps provide a visual method for minimizing expressions with up to 5–6 variables.\n• The Quine–McCluskey algorithm generalizes K-map minimization for larger variable counts.\n• Canonical forms: minterms (sum-of-products) and maxterms (product-of-sums).",
      createdAt: iso(now - days(10)),
      updatedAt: iso(now - days(10)),
    },
    {
      id: "sec_b_4",
      notebookId: "nb_boolean",
      kind: "sources",
      title: "Sources",
      content: "References consulted while organizing these notes.",
      createdAt: iso(now - days(10)),
      updatedAt: iso(now - days(10)),
      sources: [
        { title: "GeeksforGeeks — Karnaugh Maps", url: "https://www.geeksforgeeks.org" },
        { title: "Neso Academy — Boolean Algebra", url: "https://www.nesoacademy.org" },
      ],
    },
  ],
};

export const mockProcessingJobs: ProcessingJob[] = [
  {
    id: "job_nb_odes",
    notebookId: "nb_odes",
    stage: "organizing",
    progress: 42,
    message: "Structuring sections from handwritten pages…",
    startedAt: iso(now - hours(2)),
    updatedAt: iso(now - hours(1)),
  },
  {
    id: "job_nb_newton",
    notebookId: "nb_newton",
    stage: "researching",
    progress: 68,
    message: "Looking up related concepts on the web…",
    startedAt: iso(now - hours(3)),
    updatedAt: iso(now - hours(2)),
  },
];

export const mockDocuments: Document[] = [
  {
    id: "d_assign4",
    title: "Assignment 4 — Combinational Logic",
    subject: "Digital Design Theory",
    type: "assignment",
    sizeBytes: 320_000,
    uploadedAt: iso(now - days(1)),
    deadline: iso(now + days(2)),
    status: "draft",
  },
  {
    id: "d_lab_rc",
    title: "Lab Record — RC Circuits",
    subject: "Physics Lab",
    type: "lab",
    sizeBytes: 1_240_000,
    uploadedAt: iso(now - days(3)),
    status: "final",
  },
  {
    id: "d_midterm_math",
    title: "Midterm Question Paper 2023",
    subject: "Mathematics Theory",
    type: "question-paper",
    sizeBytes: 480_000,
    uploadedAt: iso(now - days(6)),
    status: "final",
  },
  {
    id: "d_webdev_project",
    title: "Web Dev Project — Notes App",
    subject: "Web Development",
    type: "project",
    sizeBytes: 5_120_000,
    uploadedAt: iso(now - days(9)),
    deadline: iso(now + days(12)),
    status: "draft",
  },
  {
    id: "d_env_ref",
    title: "Reference — Environmental Policy Brief",
    subject: "Environmental Science",
    type: "reference",
    sizeBytes: 720_000,
    uploadedAt: iso(now - days(14)),
    status: "final",
  },
  {
    id: "d_tut6",
    title: "Tutorial 6 — Series Solutions",
    subject: "Mathematics Tutorial",
    type: "assignment",
    sizeBytes: 260_000,
    uploadedAt: iso(now - days(2)),
    deadline: iso(now - hours(6)),
    status: "submitted",
  },
];

export const mockTodos: Todo[] = [
  {
    id: "t_kmap",
    title: "Finish Karnaugh map reduction for Assignment 4",
    description: "Complete Q3 and Q4 with worked steps.",
    subject: "Digital Design Theory",
    priority: "urgent",
    status: "in-progress",
    dueDate: iso(now + days(1)),
    linkedDocumentId: "d_assign4",
    createdAt: iso(now - hours(20)),
  },
  {
    id: "t_integrating",
    title: "Review integrating factors before tutorial",
    subject: "Mathematics Theory",
    priority: "high",
    status: "pending",
    dueDate: iso(now + hours(4)),
    createdAt: iso(now - hours(30)),
  },
  {
    id: "t_viva",
    title: "Prepare physics lab viva questions",
    subject: "Physics Lab",
    priority: "medium",
    status: "pending",
    dueDate: iso(now + days(3)),
    createdAt: iso(now - hours(48)),
  },
  {
    id: "t_readme",
    title: "Draft README for web dev project",
    subject: "Web Development",
    priority: "low",
    status: "pending",
    createdAt: iso(now - hours(6)),
  },
  {
    id: "t_tut6",
    title: "Submit Tutorial 6",
    subject: "Mathematics Tutorial",
    priority: "high",
    status: "completed",
    completedAt: iso(now - hours(12)),
    createdAt: iso(now - hours(60)),
  },
];

export const mockDeadlines: Deadline[] = [
  {
    id: "dl_assign4",
    title: "Assignment 4 submission",
    subject: "Digital Design Theory",
    dueAt: iso(now + days(2)),
    status: "upcoming",
    linkedDocumentId: "d_assign4",
  },
  {
    id: "dl_physics_lab",
    title: "Physics Lab record",
    subject: "Physics Lab",
    dueAt: iso(now + hours(8)),
    status: "today",
  },
  {
    id: "dl_webdev",
    title: "Web Dev project checkpoint",
    subject: "Web Development",
    dueAt: iso(now + days(12)),
    status: "upcoming",
    linkedDocumentId: "d_webdev_project",
  },
  {
    id: "dl_tut6_missed",
    title: "Tutorial 6 (missed)",
    subject: "Mathematics Tutorial",
    dueAt: iso(now - hours(30)),
    status: "overdue",
  },
  {
    id: "dl_env_quiz",
    title: "Environmental Science quiz prep",
    subject: "Environmental Science",
    dueAt: iso(now + days(5)),
    status: "upcoming",
  },
];

export const mockReminders: Reminder[] = [
  {
    id: "r_assign4_1d",
    deadlineId: "dl_assign4",
    label: "1 day before",
    at: iso(now + days(1)),
    sent: false,
  },
  {
    id: "r_assign4_2h",
    deadlineId: "dl_assign4",
    label: "2 hours before",
    at: iso(now + days(2) - hours(2)),
    sent: false,
  },
  {
    id: "r_physics_1h",
    deadlineId: "dl_physics_lab",
    label: "1 hour before",
    at: iso(now + hours(7)),
    sent: false,
  },
];

export const mockScratchpad: Scratchpad = {
  id: "sp_main",
  content: "",
  updatedAt: iso(now),
  wordCount: 0,
};