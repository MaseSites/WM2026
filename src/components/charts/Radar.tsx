"use client";

import { motion } from "framer-motion";

export function Radar({
  data,
  size = 240,
  color = "var(--color-accent)",
  compare,
  compareColor = "var(--color-info)",
}: {
  data: { label: string; value: number }[];
  size?: number;
  color?: string;
  compare?: { label: string; value: number }[];
  compareColor?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 34;
  const n = data.length;

  const point = (i: number, v: number) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const r = (v / 100) * R;
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  };
  const poly = (arr: { value: number }[]) =>
    arr.map((d, i) => point(i, d.value).join(",")).join(" ");

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings.map((f) => (
        <polygon
          key={f}
          points={data
            .map((_, i) => point(i, f * 100).join(","))
            .join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      ))}
      {data.map((_, i) => {
        const [x, y] = point(i, 100);
        return (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.05)" />
        );
      })}

      {compare && (
        <motion.polygon
          points={poly(compare)}
          fill={compareColor}
          fillOpacity={0.1}
          stroke={compareColor}
          strokeWidth={1.5}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      )}

      <motion.polygon
        points={poly(data)}
        fill={color}
        fillOpacity={0.14}
        stroke={color}
        strokeWidth={2}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {data.map((d, i) => {
        const [x, y] = point(i, d.value);
        return <circle key={i} cx={x} cy={y} r={2.5} fill={color} />;
      })}

      {data.map((d, i) => {
        const [x, y] = point(i, 118);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink-3 text-[9px] font-medium uppercase tracking-wider"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
