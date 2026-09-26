import { Badge, type BadgeTone } from "@/components/ui/Badge";
import type { ProcessingStage } from "@/types";

const labels: Record<ProcessingStage, string> = {
  uploading: "Uploading",
  ocr: "OCR",
  organizing: "Organizing",
  researching: "Researching",
  merging: "Merging",
  completed: "Ready",
  failed: "Failed",
};

const tones: Record<ProcessingStage, BadgeTone> = {
  uploading: "info",
  ocr: "info",
  organizing: "warning",
  researching: "warning",
  merging: "info",
  completed: "success",
  failed: "danger",
};

export function ProcessingBadge({ stage }: { stage: ProcessingStage }) {
  const isActive = stage !== "completed" && stage !== "failed";
  return (
    <Badge tone={tones[stage]} dot={isActive}>
      {labels[stage]}
    </Badge>
  );
}