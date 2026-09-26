import type { Deadline, Reminder } from "@/types";
import { mockDeadlines, mockReminders } from "@/lib/mock/data";

export async function listDeadlines(): Promise<Deadline[]> {
  return mockDeadlines;
}

export async function listReminders(): Promise<Reminder[]> {
  return mockReminders;
}