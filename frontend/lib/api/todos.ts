import type { Todo } from "@/types";
import { mockTodos } from "@/lib/mock/data";

export async function listTodos(): Promise<Todo[]> {
  return mockTodos;
}