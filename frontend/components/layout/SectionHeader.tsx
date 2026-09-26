import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SectionHeaderProps {
  title: string;
  meta?: string;
  href?: string;
  className?: string;
}

export function SectionHeader({
  title,
  meta,
  href,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-3 flex items-baseline justify-between gap-3",
        className,
      )}
    >
      <div className="flex items-baseline gap-2.5">
        <h2 className="font-display text-[16px] tracking-[-0.01em] text-ink sm:text-[17px]">
          {title}
        </h2>
        {meta ? (
          <span className="text-[12px] text-ink-muted">{meta}</span>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink"
        >
          View all
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}