import type { Match } from "@/lib/types";
import { team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { seeded } from "@/lib/utils";

// Deterministic pseudo-history of the last 5 meetings between the two nations.
function history(homeId: string, awayId: string) {
  const base = (homeId.length * 31 + awayId.length * 17) % 97;
  const comps = ["World Cup", "Friendly", "Nations League", "Confederations Cup", "World Cup Qual."];
  const years = [2022, 2021, 2018, 2016, 2014];
  return years.map((year, i) => {
    const r = seeded(base + i * 7);
    const hs = Math.floor(seeded(base + i * 3) * 4);
    const as = Math.floor(seeded(base + i * 5) * 4);
    return { year, comp: comps[i], hs, as, r };
  });
}

export function H2H({ m }: { m: Match }) {
  const h = team(m.homeId);
  const a = team(m.awayId);
  const games = history(m.homeId, m.awayId);
  const hw = games.filter((g) => g.hs > g.as).length;
  const dr = games.filter((g) => g.hs === g.as).length;
  const aw = games.filter((g) => g.as > g.hs).length;
  const total = games.length;

  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon name="Handshake" className="h-4 w-4 text-accent" />
        <h3 className="text-[14px] font-semibold">Head to head</h3>
        <span className="ml-auto text-[11px] text-ink-3">Last {total} meetings</span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Flag code={h.code} size={20} />
          <span className="tabular text-lg font-bold text-accent">{hw}</span>
        </div>
        <div className="flex h-2 flex-1 overflow-hidden rounded-full">
          <div className="bg-accent" style={{ width: `${(hw / total) * 100}%` }} />
          <div className="bg-draw" style={{ width: `${(dr / total) * 100}%` }} />
          <div className="bg-info" style={{ width: `${(aw / total) * 100}%` }} />
        </div>
        <div className="flex items-center gap-2">
          <span className="tabular text-lg font-bold text-info">{aw}</span>
          <Flag code={a.code} size={20} />
        </div>
      </div>
      <div className="mb-4 flex justify-center gap-4 text-[11px] text-ink-3">
        <span>{hw} {h.short}</span>
        <span>{dr} Draws</span>
        <span>{aw} {a.short}</span>
      </div>

      <div className="divide-y divide-line/50">
        {games.map((g, i) => (
          <div key={i} className="flex items-center gap-3 py-2 text-[12.5px]">
            <span className="tabular w-10 text-ink-3">{g.year}</span>
            <span className="w-28 truncate text-ink-3">{g.comp}</span>
            <span className="ml-auto flex items-center gap-2 font-medium">
              <span className="text-ink-2">{h.short}</span>
              <span className="tabular rounded bg-white/[0.05] px-1.5 py-0.5 font-semibold">
                {g.hs} – {g.as}
              </span>
              <span className="text-ink-2">{a.short}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
