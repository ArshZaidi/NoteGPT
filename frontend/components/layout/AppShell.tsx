import { Sidebar } from "./Sidebar";
import { MobileTopBar } from "./MobileTopBar";
import { BottomNav } from "./BottomNav";
import { PageTransition } from "./PageTransition";
import { GlobalModals } from "./GlobalModals";
import { ProcessingSimulator } from "./ProcessingSimulator";

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-canvas">
      <Sidebar />
      <MobileTopBar />
      <main className="lg:pl-[260px]">
        <div className="mx-auto w-full max-w-[1180px] px-4 pb-28 pt-5 sm:px-6 sm:pt-7 lg:px-10 lg:pb-16 lg:pt-10">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
      <BottomNav />
      <GlobalModals />
      <ProcessingSimulator />
    </div>
  );
}