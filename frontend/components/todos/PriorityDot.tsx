import { cn } from "@/lib/utils/cn";
import type { Priority } from "@/types";

const colors: Record<Priority, string> = {
  low: "bg-ink-faint",
  medium: "bg-info",
  high: "bg-warning",
  urgent: "bg-danger",
};

const labels: Record<Priority, string> = {
  low: "Low priority",
  medium: "Medium priority",
  high: "High priority",
  urgent: "Urgent",
};

export function PriorityDot({ priority }: { priority: Priority }) {
  return (
    <span
      className="flex items-center gap-1.5"
      title={labels[priority]}
      aria-label={labels[priority]}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", colors[priority])} />
    </span>
  );
}