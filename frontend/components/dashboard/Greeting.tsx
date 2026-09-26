"use client";

import { motion } from "framer-motion";
import { getGreeting } from "@/lib/utils/formatDate";

export function Greeting({ name }: { name: string }) {
  const greeting = getGreeting();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-7 sm:mb-9"
    >
      <h1 className="font-display text-[28px] leading-[1.1] tracking-[-0.025em] text-ink sm:text-[38px]">
        {greeting}, {name}.
      </h1>
      <p className="mt-2.5 max-w-xl text-pretty text-[14.5px] leading-relaxed text-ink-muted sm:text-[15px]">
        Here&apos;s what needs your attention today.
      </p>
    </motion.div>
  );
}