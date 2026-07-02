import Link from "next/link";
import { team } from "@/lib/data";
import { getLive, getUpcoming, getResults } from "@/lib/live";
import { Flag } from "@/components/ui/Flag";
import { kickoffLabel } from "@/lib/utils";
import type { Match } from "@/lib/types";

function Chip({ m }: { m: Match }) {
  const h = team(m.homeId);
  const a = team(m.awayId);
  if (!h || !a) return null;
  const live = m.status === "live" || m.status === "halftime";
  const done = m.status === "finished";
  const { time } = kickoffLabel(m.kickoff);

  return (
    <Link
      href={`/match/${m.id}`}
      className="group flex shrink-0 items-center gap-2.5 border-r border-line px-4 py-0 text-[12.5px]"
    >
      {live ? (
        <span className="flex items-center gap-1 text-[10px] font-bold text-live">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
          {m.minute ? `${m.minute}′` : "LIVE"}
        </span>
      ) : (
        <span className="text-[10px] font-semibold text-ink-3">{done ? "FT" : time}</span>
      )}
      <span className="flex items-center gap-1.5 text-ink-2 transition-colors group-hover:text-ink">
        <Flag code={h.code} size={16} />
        {h.short}
      </span>
      <span className="tabular font-semibold text-ink">
        {done || live ? `${m.homeScore}–${m.awayScore}` : "vs"}
      </span>
      <span className="flex items-center gap-1.5 text-ink-2 transition-colors group-hover:text-ink">
        {a.short}
        <Flag code={a.code} size={16} />
      </span>
    </Link>
  );
}

export async function LiveTicker() {
  const [live, upcoming, results] = await Promise.all([getLive(), getUpcoming(), getResults()]);
  const order = [...live, ...upcoming, ...results];
  if (order.length === 0) return null;
  const items = [...order, ...order]; // duplicated for a seamless loop

  return (
    <div className="relative h-9 overflow-hidden border-b border-line bg-surface/60">
      <div className="edge-fade-x flex h-full">
        <div className="marquee-track flex h-full items-center whitespace-nowrap">
          {items.map((m, i) => (
            <Chip key={`${m.id}-${i}`} m={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
