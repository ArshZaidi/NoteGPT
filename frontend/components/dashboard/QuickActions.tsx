"use client";

import { motion } from "framer-motion";
import {
  FileUp,
  Notebook as NotebookIcon,
  PenLine,
  PlusSquare,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { useModals } from "@/components/layout/ModalsProvider";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  primary?: boolean;
}

const actions: QuickAction[] = [
  {
    id: "new-notebook",
    label: "New Notebook",
    icon: NotebookIcon,
    primary: true,
  },
  { id: "upload-notes", label: "Upload Notes", icon: UploadCloud },
  { id: "add-task", label: "Add Task", icon: PlusSquare },
  { id: "upload-doc", label: "Upload Document", icon: FileUp },
  { id: "scratchpad", label: "Open Scratchpad", icon: PenLine },
];

export function QuickActions() {
  const { open } = useModals();
  const router = useRouter();

  const handle = (id: string) => {
    switch (id) {
      case "new-notebook":
      case "upload-notes":
        open({ kind: "new-notebook" });
        break;
      case "add-task":
        open({ kind: "new-task" });
        break;
      case "upload-doc":
        open({ kind: "upload-doc" });
        break;
      case "scratchpad":
        router.push("/scratchpad");
        break;
    }
  };

  return (
    <motion.section
      aria-label="Quick actions"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
      }}
      className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {actions.map((a) => {
        const Icon = a.icon;
        const inner = (
          <>
            <Icon className="h-4 w-4" />
            <span className="whitespace-nowrap">{a.label}</span>
          </>
        );
        return (
          <motion.div
            key={a.id}
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: { opacity: 1, y: 0 },
            }}
            className="shrink-0"
          >
            {a.primary ? (
              <MagneticButton onClick={() => handle(a.id)}>
                {inner}
              </MagneticButton>
            ) : (
              <Button variant="secondary" onClick={() => handle(a.id)}>
                {inner}
              </Button>
            )}
          </motion.div>
        );
      })}
    </motion.section>
  );
}