"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    // Native momentum scrolling is better on touch devices.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return <>{children}</>;
}