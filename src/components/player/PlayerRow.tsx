import Link from "next/link";
import type { Player } from "@/lib/types";
import { team } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Flag } from "@/components/ui/Flag";
import { formatValue } from "@/lib/utils";

export function PlayerRow({ p, showTeam = false }: { p: Player; showTeam?: boolean }) {
  const t = team(p.teamId);
  const rc =
    p.rating >= 8 ? "var(--color-accent)" : p.rating >= 7 ? "var(--color-info)" : "var(--color-ink-3)";
  return (
    <Link
      href={`/player/${p.id}`}
      className="group flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-white/[0.02]"
    >
      <span className="tabular w-6 text-center text-[12px] font-semibold text-ink-3">{p.number}</span>
      <Avatar name={p.name} teamId={p.teamId} seed={p.photoSeed} size={36} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 truncate text-[13.5px] font-medium transition-colors group-hover:text-accent">
          {p.name}
          {showTeam && <Flag code={t.code} size={14} />}
        </div>
        <div className="truncate text-[11.5px] text-ink-3">
          {p.detailPosition} · {p.club}
        </div>
      </div>
      <div className="hidden text-right text-[11px] text-ink-3 sm:block">
        <div className="text-ink-2">{p.age} yrs</div>
        <div>{formatValue(p.marketValue)}</div>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="hidden text-right text-[11px] text-ink-3 md:block">
          <span className="tabular text-ink-2">{p.goals}</span>G{" "}
          <span className="tabular text-ink-2">{p.assists}</span>A
        </div>
        <span
          className="tabular w-9 rounded-md px-1 py-0.5 text-center text-[12px] font-bold"
          style={{ background: `${rc}22`, color: rc }}
        >
          {p.rating.toFixed(1)}
        </span>
      </div>
    </Link>
  );
}
