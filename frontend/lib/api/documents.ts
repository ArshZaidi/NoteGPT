import type { Document } from "@/types";
import { mockDocuments } from "@/lib/mock/data";

export async function listDocuments(): Promise<Document[]> {
  return mockDocuments;
}

export async function getDocument(id: string): Promise<Document | null> {
  return mockDocuments.find((d) => d.id === id) ?? null;
}