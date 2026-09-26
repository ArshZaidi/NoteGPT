import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas lg:flex-row">
      {/* Brand / editorial panel — desktop only */}
      <aside className="relative hidden flex-1 items-stretch overflow-hidden border-r border-line bg-surface-soft/50 lg:flex">
        <div className="flex w-full flex-col justify-between p-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 self-start"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-canvas">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-display text-[19px] tracking-[-0.02em]">
              NoteGPT
            </span>
          </Link>

          <div className="max-w-[420px]">
            <p className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-faint">
              Personal Academic OS
            </p>
            <h2 className="font-display text-[34px] leading-[1.15] tracking-[-0.02em] text-ink">
              A calmer place for everything academic.
            </h2>
            <p className="mt-4 text-pretty text-[14.5px] leading-relaxed text-ink-muted">
              AI notebooks, a document vault, tasks, deadlines, and a
              distraction-free scratchpad — thoughtfully organized for a
              serious student.
            </p>
          </div>

          <p className="text-[12px] text-ink-faint">
            © {new Date().getFullYear()} NoteGPT
          </p>
        </div>
      </aside>

      {/* Form column */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-6 pt-6 pt-safe lg:hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-canvas">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-display text-[17px] tracking-[-0.02em]">
              NoteGPT
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10 pb-safe sm:px-8 lg:py-16">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  );
}