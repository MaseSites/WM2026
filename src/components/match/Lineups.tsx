import Link from "next/link";
import type { Match } from "@/lib/types";
import { team, squad } from "@/lib/data";
import { Pitch } from "./Pitch";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";

function CoachFormation({ teamId, align }: { teamId: string; align: "left" | "right" }) {
  const t = team(teamId);
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div className="flex items-center gap-2" style={{ flexDirection: align === "right" ? "row-reverse" : "row" }}>
        <Flag code={t.code} size={20} />
        <span className="text-[13px] font-semibold">{t.short}</span>
        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-medium text-ink-2">
          {t.formation}
        </span>
      </div>
      <div className="mt-1 text-[11px] text-ink-3">Coach · {t.coach}</div>
    </div>
  );
}

function Bench({ teamId }: { teamId: string }) {
  const subs = squad(teamId).slice(11);
  if (subs.length === 0) return null;
  const t = team(teamId);
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        <Flag code={t.code} size={14} /> Bench
      </div>
      <div className="flex flex-wrap gap-1.5">
        {subs.map((p) => (
          <Link
            key={p.id}
            href={`/player/${p.id}`}
            className="flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] py-1 pl-1 pr-2.5 text-[12px] transition-colors hover:border-line-strong"
          >
            <Avatar name={p.name} teamId={p.teamId} seed={p.photoSeed} size={20} />
            <span className="tabular text-ink-3">{p.number}</span>
            {p.name.split(" ").slice(-1)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Lineups({ m }: { m: Match }) {
  const full = squad(m.homeId).length >= 11 && squad(m.awayId).length >= 11;

  return (
    <div className="space-y-4">
      <div className="panel p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <CoachFormation teamId={m.homeId} align="left" />
          <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
            {m.status === "scheduled" ? "Predicted XI" : "Starting XI"}
          </span>
          <CoachFormation teamId={m.awayId} align="right" />
        </div>

        {full ? (
          <Pitch homeId={m.homeId} awayId={m.awayId} />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {[m.homeId, m.awayId].map((tid) => (
              <div key={tid} className="space-y-1">
                {squad(tid).slice(0, 11).map((p) => (
                  <Link
                    key={p.id}
                    href={`/player/${p.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1 text-[12.5px] hover:bg-white/[0.03]"
                  >
                    <span className="tabular w-5 text-ink-3">{p.number}</span>
                    {p.name}
                  </Link>
                ))}
                {squad(tid).length < 11 && (
                  <div className="px-2 py-1 text-[11px] italic text-ink-3">
                    Full XI confirmed 1h before kick-off
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {full && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel p-4">
            <Bench teamId={m.homeId} />
          </div>
          <div className="panel p-4">
            <Bench teamId={m.awayId} />
          </div>
        </div>
      )}
    </div>
  );
}
