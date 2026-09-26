import { cn } from "@/lib/utils/cn";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-2 text-[11.5px] font-medium uppercase tracking-[0.1em] text-ink-faint">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-[26px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[30px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl text-pretty text-[14px] leading-relaxed text-ink-muted">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </header>
  );
}