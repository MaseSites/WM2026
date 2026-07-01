import Link from "next/link";
import type { Match } from "@/lib/types";
import { squad, team } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { Meter } from "@/components/charts/Meter";

export function PlayerRatings({ m }: { m: Match }) {
  const players = [...squad(m.homeId).slice(0, 11), ...squad(m.awayId).slice(0, 11)]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  if (players.length === 0) return null;

  const color = (r: number) =>
    r >= 8 ? "var(--color-accent)" : r >= 7 ? "var(--color-info)" : "var(--color-ink-3)";

  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon name="Star" className="h-4 w-4 text-draw" />
        <h3 className="text-[14px] font-semibold">Top performers</h3>
        <span className="ml-auto text-[11px] text-ink-3">Live rating</span>
      </div>
      <div className="space-y-2.5">
        {players.map((p, i) => {
          const t = team(p.teamId);
          return (
            <Link key={p.id} href={`/player/${p.id}`} className="flex items-center gap-3 group">
              <div className="relative">
                <Avatar name={p.name} teamId={p.teamId} seed={p.photoSeed} size={34} />
                {i === 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-draw text-canvas">
                    <Icon name="Crown" className="h-2.5 w-2.5" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[13px] font-medium">
                  <span className="truncate group-hover:text-accent">{p.name}</span>
                  <Flag code={t.code} size={13} />
                </div>
                <div className="mt-1">
                  <Meter value={p.rating} max={10} color={color(p.rating)} height={4} delay={i * 0.04} />
                </div>
              </div>
              <span
                className="tabular w-9 rounded-md px-1.5 py-0.5 text-center text-[12.5px] font-bold"
                style={{ background: `${color(p.rating)}22`, color: color(p.rating) }}
              >
                {p.rating.toFixed(1)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
