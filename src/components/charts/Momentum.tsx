"use client";

import { motion } from "framer-motion";
import { team } from "@/lib/data";

/**
 * Pressure momentum: positive bars favour the home side, negative the away side.
 * Rendered as a smooth baseline column chart — the shape broadcasters use.
 */
export function Momentum({
  values,
  homeId,
  awayId,
  height = 140,
}: {
  values: number[];
  homeId: string;
  awayId: string;
  height?: number;
}) {
  const h = team(homeId);
  const a = team(awayId);
  const w = 100;
  const mid = height / 2;
  const barW = w / values.length;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[11px] font-medium">
        <span className="text-accent">{h.short}</span>
        <span className="uppercase tracking-wider text-ink-3">Momentum</span>
        <span className="text-info">{a.short}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <line x1={0} y1={mid} x2={w} y2={mid} stroke="rgba(255,255,255,0.12)" strokeWidth={0.4} />
        {values.map((v, i) => {
          const barH = (Math.abs(v) / 100) * (mid - 4);
          const x = i * barW + barW * 0.16;
          const bw = barW * 0.68;
          const up = v >= 0;
          return (
            <motion.rect
              key={i}
              x={x}
              width={bw}
              rx={0.8}
              fill={up ? "var(--color-accent)" : "var(--color-info)"}
              fillOpacity={0.85}
              initial={{ height: 0, y: mid }}
              animate={{ height: barH, y: up ? mid - barH : mid }}
              transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-ink-3">
        <span>KO</span>
        <span>HT</span>
        <span>{values.length > 12 ? "FT" : "Now"}</span>
      </div>
    </div>
  );
}
