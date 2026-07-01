import { QUICK_STATS } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {QUICK_STATS.map((s) => (
        <div key={s.label} className="panel p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-3">
              {s.label}
            </span>
            {s.trend !== 0 && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-[10px] font-semibold",
                  s.trend > 0 ? "text-accent" : "text-live",
                )}
              >
                <Icon name={s.trend > 0 ? "TrendingUp" : "TrendingDown"} className="h-3 w-3" />
                {Math.abs(s.trend)}%
              </span>
            )}
          </div>
          <div className="tabular mt-2 text-2xl font-semibold tracking-tight">{s.value}</div>
          <div className="mt-0.5 text-[11.5px] text-ink-2">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
