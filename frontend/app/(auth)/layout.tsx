import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas lg:flex-row">
      {/* Editorial panel — desktop only */}
      <aside className="relative hidden flex-1 items-stretch overflow-hidden border-r border-line bg-surface-soft/40 lg:flex">
        <div className="flex w-full flex-col justify-between p-12 xl:p-16">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2.5 self-start"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-canvas">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-display text-[20px] tracking-[-0.02em]">
              NoteGPT
            </span>
          </Link>

          <div className="max-w-[460px]">
            <p className="mb-4 text-[11.5px] font-medium uppercase tracking-[0.16em] text-ink-faint">
              Personal Academic OS
            </p>
            <h2 className="font-display text-[40px] leading-[1.1] tracking-[-0.025em] text-ink xl:text-[46px]">
              A calmer place for everything academic.
            </h2>
            <p className="mt-5 max-w-[400px] text-pretty text-[15px] leading-relaxed text-ink-muted">
              AI notebooks, a document vault, tasks, deadlines, and a
              distraction-free scratchpad — thoughtfully organized for a
              serious student.
            </p>

            <ul className="mt-8 space-y-2.5 text-[13.5px] text-ink-soft">
              <li className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-ink-faint" />
                Upload handwritten notes and let AI organize them
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-ink-faint" />
                Keep every assignment, lab, and reference in one vault
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-ink-faint" />
                Track deadlines, tasks, and reminders without the clutter
              </li>
            </ul>
          </div>

          <p className="text-[12px] text-ink-faint">
            © {new Date().getFullYear()} NoteGPT
          </p>
        </div>
      </aside>

      {/* Form column */}
      <div className="flex flex-1 flex-col">
        {/* Mobile brand */}
        <div className="flex items-center justify-center px-6 pt-8 pt-safe lg:hidden">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-canvas">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-display text-[18px] tracking-[-0.02em]">
              NoteGPT
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10 pb-safe sm:px-8 lg:py-16">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
      </div>
    </div>
  );
}