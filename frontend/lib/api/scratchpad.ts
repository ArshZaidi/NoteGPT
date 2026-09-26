import type { Scratchpad } from "@/types";
import { mockScratchpad } from "@/lib/mock/data";

export async function getScratchpad(): Promise<Scratchpad> {
  return mockScratchpad;
}