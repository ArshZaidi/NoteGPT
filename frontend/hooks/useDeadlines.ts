"use client";

import { useEffect, useState } from "react";
import type { Deadline, Reminder } from "@/types";
import { listDeadlines, listReminders } from "@/lib/api/deadlines";

export function useDeadlines() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([listDeadlines(), listReminders()])
      .then(([d, r]) => {
        if (!active) return;
        setDeadlines(d);
        setReminders(r);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { deadlines, reminders, loading };
}