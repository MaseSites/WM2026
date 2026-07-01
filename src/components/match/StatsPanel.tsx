import type { Match } from "@/lib/types";
import { team } from "@/lib/data";
import { Donut } from "@/components/charts/Donut";
import { StatBar } from "@/components/ui/StatBar";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";

export function StatsPanel({ m }: { m: Match }) {
  const s = m.stats;
  if (!s) return null;
  const h = team(m.homeId);
  const a = team(m.awayId);

  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon name="BarChart3" className="h-4 w-4 text-accent" />
        <h3 className="text-[14px] font-semibold">Match statistics</h3>
      </div>

      {/* Possession + xG headline */}
      <div className="mb-5 grid grid-cols-3 items-center gap-2 border-b border-line/60 pb-5">
        <div className="flex flex-col items-center gap-1.5">
          <Flag code={h.code} size={26} />
          <span className="text-[12px] font-medium text-ink-2">{h.short}</span>
        </div>
        <div className="flex justify-center">
          <Donut home={s.possession[0]} away={s.possession[1]} centerBottom="Poss." />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Flag code={a.code} size={26} />
          <span className="text-[12px] font-medium text-ink-2">{a.short}</span>
        </div>
      </div>

      {/* xG */}
      <div className="mb-4 grid grid-cols-3 items-center gap-2">
        <div className="text-right text-2xl font-semibold tabular text-accent">
          {s.xg[0].toFixed(1)}
        </div>
        <div className="text-center text-[11px] font-medium uppercase tracking-wider text-ink-3">
          Expected goals
        </div>
        <div className="text-left text-2xl font-semibold tabular text-info">
          {s.xg[1].toFixed(1)}
        </div>
      </div>

      <div className="divide-y divide-line/40">
        <StatBar label="Shots" home={s.shots[0]} away={s.shots[1]} />
        <StatBar label="On target" home={s.shotsOnTarget[0]} away={s.shotsOnTarget[1]} />
        <StatBar label="Corners" home={s.corners[0]} away={s.corners[1]} />
        <StatBar label="Fouls" home={s.fouls[0]} away={s.fouls[1]} invert />
        <StatBar label="Offsides" home={s.offsides[0]} away={s.offsides[1]} invert />
        <StatBar label="Passes" home={s.passes[0]} away={s.passes[1]} />
        <StatBar label="Pass accuracy" home={s.passAccuracy[0]} away={s.passAccuracy[1]} suffix="%" />
        <StatBar label="Saves" home={s.saves[0]} away={s.saves[1]} />
        <StatBar label="Yellow cards" home={s.yellow[0]} away={s.yellow[1]} invert />
      </div>
    </div>
  );
}
