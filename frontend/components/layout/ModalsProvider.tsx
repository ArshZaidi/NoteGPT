"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ModalState =
  | { kind: "new-notebook" }
  | {
      kind: "new-task";
      initialTitle?: string;
      initialDescription?: string;
    }
  | { kind: "new-deadline" }
  | { kind: "upload-doc" }
  | { kind: "search" }
  | null;

interface ModalsContextValue {
  current: ModalState;
  open: (m: NonNullable<ModalState>) => void;
  close: () => void;
}

const ModalsContext = createContext<ModalsContextValue | null>(null);

export function ModalsProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<ModalState>(null);

  const open = useCallback((m: NonNullable<ModalState>) => setCurrent(m), []);
  const close = useCallback(() => setCurrent(null), []);

  const value = useMemo(
    () => ({ current, open, close }),
    [current, open, close],
  );

  return (
    <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
  );
}

export function useModals() {
  const ctx = useContext(ModalsContext);
  if (!ctx) throw new Error("useModals must be used within ModalsProvider");
  return ctx;
}