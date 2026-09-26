export const APP_NAME = "NoteGPT";
export const APP_TAGLINE = "Your personal academic operating system.";

export const SIDEBAR_WIDTH = 260;

export const MOBILE_BREAKPOINT = 1024;

export const PRIORITY_ORDER = ["urgent", "high", "medium", "low"] as const;

export const STORAGE_KEYS = {
  scratchpad: "notegpt.scratchpad",
  theme: "notegpt.theme",
  sidebarCollapsed: "notegpt.sidebar.collapsed",
} as const;

export const REMINDER_OPTIONS = [
  { value: "7-days", label: "7 days before" },
  { value: "3-days", label: "3 days before" },
  { value: "1-day", label: "1 day before" },
  { value: "3-hours", label: "3 hours before" },
] as const;