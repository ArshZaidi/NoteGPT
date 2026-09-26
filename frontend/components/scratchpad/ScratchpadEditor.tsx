"use client";

import { CheckCircle2, Loader2, Save, Trash2, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { useToast } from "@/components/ui/Toast";
import { useScratchpad } from "@/hooks/useScratchpad";
import { useModals } from "@/components/layout/ModalsProvider";
import { formatRelative } from "@/lib/utils/formatDate";
import { cn } from "@/lib/utils/cn";

export function ScratchpadEditor() {
  const { content, setContent, wordCount, saveState, lastSaved, clear } =
    useScratchpad();
  const { open } = useModals();
  const { toast } = useToast();

  const convertToTask = () => {
    if (!content.trim()) {
      toast("error", "Nothing to convert yet.");
      return;
    }
    const firstLine = content.trim().split("\n")[0].slice(0, 80);
    open({
      kind: "new-task",
      initialTitle: firstLine,
      initialDescription: content.trim(),
    });
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden rounded-xl border border-line bg-surface"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing. Notes, reminders, half-formed ideas…"
          spellCheck
          className={cn(
            "block h-[52dvh] min-h-[320px] w-full resize-none bg-transparent px-5 py-5",
            "text-[15px] leading-[1.75] text-ink outline-none",
            "placeholder:text-ink-faint sm:min-h-[420px] sm:px-7 sm:py-6",
          )}
          aria-label="Scratchpad"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface-soft/60 px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-3 text-[11.5px] text-ink-muted">
            <span>
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              {saveState === "saving" ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Saving…
                </>
              ) : saveState === "saved" ? (
                <>
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="h-3 w-3" />
                  Idle
                </>
              )}
            </span>
            {lastSaved ? (
              <>
                <span aria-hidden>·</span>
                <span>{formatRelative(lastSaved)}</span>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5">
            <Tooltip content="Convert to task">
              <Button variant="ghost" size="sm" onClick={convertToTask}>
                <Wand2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Convert</span>
              </Button>
            </Tooltip>
            <Tooltip content="Clear scratchpad">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  clear();
                  toast("info", "Scratchpad cleared.");
                }}
                disabled={!content}
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            </Tooltip>
          </div>
        </div>
      </motion.div>
    </div>
  );
}