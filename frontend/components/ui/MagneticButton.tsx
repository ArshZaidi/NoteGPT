"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { Button, type ButtonProps } from "./Button";

/**
 * MagneticButton — subtle pull-toward-cursor effect.
 * Disabled automatically on touch devices and when prefers-reduced-motion is set.
 */
export function MagneticButton({
  strength = 0.18,
  children,
  ...props
}: ButtonProps & { strength?: number }) {
  const { ref, pos, onPointerMove, onPointerLeave, reduce } =
    useMagnetic(strength);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      animate={reduce ? undefined : { x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.5 }}
      className="inline-flex"
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}