"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Meter({
  value,
  max = 100,
  color = "var(--color-accent)",
  track = "rgba(255,255,255,0.06)",
  height = 6,
  delay = 0,
  className,
  rounded = true,
}: {
  value: number;
  max?: number;
  color?: string;
  track?: string;
  height?: number;
  delay?: number;
  className?: string;
  rounded?: boolean;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={cn("w-full overflow-hidden", rounded && "rounded-full", className)}
      style={{ height, background: track }}
    >
      <motion.div
        className={cn("h-full", rounded && "rounded-full")}
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
