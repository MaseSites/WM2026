import { cn } from "@/lib/utils";

/** Circular progress with a crisp SVG stroke. Value 0–100. */
export function Ring({
  value,
  size = 64,
  stroke = 6,
  color = "var(--color-accent)",
  track = "rgba(255,255,255,0.08)",
  label,
  sublabel,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  label?: string;
  sublabel?: string;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;

  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          style={{ transition: "stroke-dasharray 900ms cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none">
        <div>
          {label !== undefined ? (
            <span className="tabular font-semibold" style={{ fontSize: size * 0.26 }}>
              {label}
            </span>
          ) : (
            <span className="tabular font-semibold" style={{ fontSize: size * 0.26 }}>
              {Math.round(value)}
            </span>
          )}
          {sublabel && (
            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-ink-3">
              {sublabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
