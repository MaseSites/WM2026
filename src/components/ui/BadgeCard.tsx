import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, string> = {
  target: "Target",
  "calendar-check": "CalendarCheck",
  crosshair: "Crosshair",
  flame: "Flame",
  "trending-up": "TrendingUp",
  trophy: "Trophy",
};

const RARITY: Record<string, string> = {
  Legendary: "#FFC107",
  Epic: "#a855f7",
  Rare: "#00E676",
};

export function BadgeCard({
  badge,
}: {
  badge: { name: string; desc: string; icon: string; earned: boolean; rarity: string };
}) {
  const color = RARITY[badge.rarity] ?? "#9CA3AF";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-4 text-center transition-all",
        badge.earned ? "border-line-strong panel-hover" : "border-line opacity-55 grayscale",
      )}
      style={{ background: badge.earned ? `radial-gradient(120% 90% at 50% -10%, ${color}18, transparent 60%)` : undefined }}
    >
      <div
        className="mx-auto grid h-12 w-12 place-items-center rounded-xl ring-1"
        style={{ background: `${color}1f`, color, boxShadow: badge.earned ? `0 0 24px -8px ${color}` : undefined, borderColor: `${color}40` }}
      >
        <Icon name={ICON_MAP[badge.icon] ?? "Award"} className="h-6 w-6" />
      </div>
      <div className="mt-2.5 text-[13px] font-semibold">{badge.name}</div>
      <div className="mt-0.5 text-[11px] leading-snug text-ink-3">{badge.desc}</div>
      <div className="mt-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
        {badge.earned ? badge.rarity : "Locked"}
      </div>
    </div>
  );
}
