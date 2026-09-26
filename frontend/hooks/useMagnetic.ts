"use client";

import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useMagnetic(strength = 0.18) {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce) return;
      if (e.pointerType === "touch") return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      setPos({ x: dx * strength, y: dy * strength });
    },
    [reduce, strength],
  );

  const onPointerLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return { ref, pos, onPointerMove, onPointerLeave, reduce };
}