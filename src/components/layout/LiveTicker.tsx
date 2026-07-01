import Link from "next/link";
import { MATCHES, team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { kickoffLabel } from "@/lib/utils";

function Chip({ id }: { id: string }) {
  const m = MATCHES.find((x) => x.id === id)!;
  const h = team(m.homeId);
  const a = team(m.awayId);
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
          {m.minute}′
        </span>
      ) : (
        <span className="text-[10px] font-semibold text-ink-3">
          {done ? "FT" : time}
        </span>
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

export function LiveTicker() {
  // Order: live → upcoming today → finished. Duplicated for a seamless loop.
  const order = [
    "qf2", "qf1", "qf4", "qf3", "r16a", "r16b", "r16c", "r16d",
    "r16e", "r16f", "r16g", "r16h",
  ];
  const items = [...order, ...order];

  return (
    <div className="relative h-9 overflow-hidden border-b border-line bg-surface/60">
      <div className="edge-fade-x flex h-full">
        <div className="marquee-track flex h-full items-center whitespace-nowrap">
          {items.map((id, i) => (
            <Chip key={`${id}-${i}`} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
}
