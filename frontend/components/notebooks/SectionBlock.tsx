import { BookOpen, FileText, Link2, Sparkles } from "lucide-react";
import type { NotebookSection, SectionKind } from "@/types";
import { cn } from "@/lib/utils/cn";

interface SectionMeta {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  surface: string;
  border: string;
}

const meta: Record<SectionKind, SectionMeta> = {
  original: {
    label: "Original Notes",
    icon: FileText,
    accent: "text-ink-muted",
    surface: "bg-surface",
    border: "border-line",
  },
  organized: {
    label: "AI Organized",
    icon: Sparkles,
    accent: "text-info",
    surface: "bg-info-soft/35",
    border: "border-info/15",
  },
  additional: {
    label: "Additional Information",
    icon: BookOpen,
    accent: "text-success",
    surface: "bg-success-soft/35",
    border: "border-success/15",
  },
  sources: {
    label: "Sources",
    icon: Link2,
    accent: "text-warning",
    surface: "bg-warning-soft/35",
    border: "border-warning/15",
  },
};

export function SectionBlock({ section }: { section: NotebookSection }) {
  const m = meta[section.kind];
  const Icon = m.icon;

  return (
    <article className={cn("rounded-xl border p-5 sm:p-6", m.surface, m.border)}>
      <div className="mb-3 flex items-center gap-2">
        <Icon className={cn("h-3.5 w-3.5", m.accent)} />
        <span
          className={cn(
            "text-[11px] font-medium uppercase tracking-[0.1em]",
            m.accent,
          )}
        >
          {m.label}
        </span>
      </div>
      <h3 className="mb-3 font-display text-[18px] leading-snug tracking-[-0.01em] text-ink sm:text-[19px]">
        {section.title}
      </h3>
      <div className="whitespace-pre-wrap text-[14.5px] leading-[1.75] text-ink-soft">
        {section.content}
      </div>
      {section.sources && section.sources.length > 0 ? (
        <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
          {section.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[13px] text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}