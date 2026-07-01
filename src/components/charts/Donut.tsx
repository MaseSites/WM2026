"use client";

import { motion } from "framer-motion";

/** Animated donut for two-way splits (possession, xG share, etc.). */
export function Donut({
  home,
  away,
  size = 132,
  stroke = 14,
  centerTop,
  centerBottom,
}: {
  home: number;
  away: number;
  size?: number;
  stroke?: number;
  centerTop?: string;
  centerBottom?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = home + away || 1;
  const homeArc = (home / total) * c;

  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-info)" strokeWidth={stroke} opacity={0.85} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={stroke}
          strokeLinecap="butt"
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={{ strokeDasharray: `${homeArc} ${c}` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="tabular text-xl font-semibold">{centerTop ?? `${Math.round(home)}%`}</div>
          {centerBottom && <div className="text-[10px] uppercase tracking-wider text-ink-3">{centerBottom}</div>}
        </div>
      </div>
    </div>
  );
}
