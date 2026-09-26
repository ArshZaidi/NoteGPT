"use client";

import { useModals } from "./ModalsProvider";
import { UploadModal } from "@/components/notebooks/UploadModal";
import { TodoForm } from "@/components/todos/TodoForm";
import { DeadlineForm } from "@/components/deadlines/DeadlineForm";
import { DocumentUploadModal } from "@/components/vault/DocumentUploadModal";
import { SearchModal } from "./SearchModal";

export function GlobalModals() {
  const { current, close } = useModals();

  return (
    <>
      <UploadModal
        open={current?.kind === "new-notebook"}
        onClose={close}
      />
      <TodoForm
        open={current?.kind === "new-task"}
        onClose={close}
        initialTitle={
          current?.kind === "new-task" ? current.initialTitle : undefined
        }
        initialDescription={
          current?.kind === "new-task" ? current.initialDescription : undefined
        }
      />
      <DeadlineForm
        open={current?.kind === "new-deadline"}
        onClose={close}
      />
      <DocumentUploadModal
        open={current?.kind === "upload-doc"}
        onClose={close}
      />
      <SearchModal open={current?.kind === "search"} onClose={close} />
    </>
  );
}