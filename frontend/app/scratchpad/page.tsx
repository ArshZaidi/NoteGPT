import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScratchpadEditor } from "@/components/scratchpad/ScratchpadEditor";

export default function ScratchpadPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Write"
        title="Scratchpad"
        description="A distraction-free space. Jot it down, save it automatically."
      />
      <ScratchpadEditor />
    </AppShell>
  );
}