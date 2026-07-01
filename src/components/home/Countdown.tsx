"use client";

import { useEffect, useState } from "react";

function parts(target: number, now: number) {
  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: diff <= 0,
  };
}

export function Countdown({ iso, compact = false }: { iso: string; compact?: boolean }) {
  const target = new Date(iso).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const p = parts(target, now ?? target);
  const cells = [
    { v: p.d, l: "Days" },
    { v: p.h, l: "Hrs" },
    { v: p.m, l: "Min" },
    { v: p.s, l: "Sec" },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {cells.map((c, i) => (
        <div key={c.l} className="flex items-center gap-1.5">
          <div
            className={
              compact
                ? "min-w-[34px] rounded-md bg-white/[0.05] px-1.5 py-1 text-center ring-1 ring-white/10"
                : "min-w-[46px] rounded-lg bg-white/[0.05] px-2 py-1.5 text-center ring-1 ring-white/10"
            }
          >
            <div
              className={
                compact
                  ? "tabular text-[15px] font-semibold leading-none"
                  : "tabular text-xl font-semibold leading-none"
              }
              suppressHydrationWarning
            >
              {now === null ? "–" : String(c.v).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[8px] uppercase tracking-wider text-ink-3">{c.l}</div>
          </div>
          {i < cells.length - 1 && <span className="text-ink-3">:</span>}
        </div>
      ))}
    </div>
  );
}
