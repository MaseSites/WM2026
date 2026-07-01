import { cn } from "@/lib/utils";

/**
 * A two-sided comparison bar (home | away). The dominant side is tinted with
 * the accent, the other stays muted — a Sofascore-grade stat row.
 */
export function StatBar({
  label,
  home,
  away,
  suffix = "",
  invert = false,
}: {
  label: string;
  home: number;
  away: number;
  suffix?: string;
  invert?: boolean; // lower is better (e.g. fouls)
  }) {
  const total = home + away || 1;
  const homePct = (home / total) * 100;
  const homeBetter = invert ? home < away : home > away;
  const awayBetter = invert ? away < home : away > home;

  return (
    <div className="grid grid-cols-[3rem_1fr_3rem] items-center gap-3 py-2">
      <div
        className={cn(
          "text-right text-sm tabular font-semibold",
          homeBetter ? "text-ink" : "text-ink-2",
        )}
      >
        {home}
        {suffix}
      </div>
      <div className="relative">
        <div className="mb-1 text-center text-[11px] font-medium uppercase tracking-wider text-ink-3">
          {label}
        </div>
        <div className="flex h-1.5 items-center gap-0.5">
          <div className="flex h-full flex-1 justify-end overflow-hidden rounded-l-full bg-white/[0.05]">
            <div
              className={cn(
                "h-full rounded-l-full transition-[width] duration-700 ease-out",
                homeBetter ? "bg-accent" : "bg-ink-3/60",
              )}
              style={{ width: `${homePct}%` }}
            />
          </div>
          <div className="flex h-full flex-1 overflow-hidden rounded-r-full bg-white/[0.05]">
            <div
              className={cn(
                "h-full rounded-r-full transition-[width] duration-700 ease-out",
                awayBetter ? "bg-accent" : "bg-ink-3/60",
              )}
              style={{ width: `${100 - homePct}%` }}
            />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "text-left text-sm tabular font-semibold",
          awayBetter ? "text-ink" : "text-ink-2",
        )}
      >
        {away}
        {suffix}
      </div>
    </div>
  );
}
