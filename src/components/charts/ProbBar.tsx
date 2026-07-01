"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Three-way win-probability bar (home / draw / away), animated on mount. */
export function ProbBar({
  home,
  draw,
  away,
  homeLabel,
  awayLabel,
  className,
}: {
  home: number;
  draw: number;
  away: number;
  homeLabel: string;
  awayLabel: string;
  className?: string;
}) {
  const seg = [
    { v: home, color: "var(--color-accent)" },
    { v: draw, color: "var(--color-draw)" },
    { v: away, color: "var(--color-info)" },
  ];
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-[12px] font-semibold">
        <span className="text-accent">{home}%</span>
        <span className="text-draw">Draw {draw}%</span>
        <span className="text-info">{away}%</span>
      </div>
      <div className="flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full">
        {seg.map((s, i) => (
          <motion.div
            key={i}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: s.color }}
            initial={{ width: 0 }}
            animate={{ width: `${s.v}%` }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px] text-ink-2">
        <span>{homeLabel}</span>
        <span>{awayLabel}</span>
      </div>
    </div>
  );
}
