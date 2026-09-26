import { cn } from "@/lib/utils/cn";

export function Loading({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 py-12 text-ink-muted",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span className="h-4 w-4 animate-spin rounded-full border-[1.5px] border-ink-faint border-r-transparent" />
      {label ? <span className="text-[13px]">{label}</span> : null}
    </div>
  );
}