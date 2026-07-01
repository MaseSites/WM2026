import Link from "next/link";
import { team, squad, formationSlots } from "@/lib/data";
import type { Player } from "@/lib/types";

function Token({
  p,
  x,
  y,
  color,
}: {
  p: Player;
  x: number;
  y: number;
  color: string;
}) {
  const last = p.name.split(" ").slice(-1)[0];
  return (
    <Link
      href={`/player/${p.id}`}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="flex flex-col items-center gap-1">
        <span
          className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-bold text-white shadow-lg ring-2 ring-black/30 transition-transform group-hover:scale-110"
          style={{ background: color }}
        >
          {p.number}
        </span>
        <span className="max-w-[64px] truncate rounded bg-black/50 px-1 text-[9px] font-medium text-white/90 backdrop-blur-sm">
          {last}
        </span>
      </div>
    </Link>
  );
}

export function Pitch({ homeId, awayId }: { homeId: string; awayId: string }) {
  const h = team(homeId);
  const a = team(awayId);
  const homeXI = squad(homeId).slice(0, 11);
  const awayXI = squad(awayId).slice(0, 11);
  const homeSlots = formationSlots(h.formation);
  const awaySlots = formationSlots(a.formation);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl ring-1 ring-white/10"
      style={{
        aspectRatio: "16 / 10",
        background:
          "linear-gradient(90deg, #0f2a1c, #123421 50%, #0f2a1c), repeating-linear-gradient(90deg, transparent, transparent 9%, rgba(255,255,255,0.02) 9%, rgba(255,255,255,0.02) 18%)",
      }}
    >
      {/* markings */}
      <svg viewBox="0 0 100 62" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.3">
          <rect x="2" y="2" width="96" height="58" />
          <line x1="50" y1="2" x2="50" y2="60" />
          <circle cx="50" cy="31" r="8" />
          <rect x="2" y="16" width="12" height="30" />
          <rect x="2" y="24" width="5" height="14" />
          <rect x="86" y="16" width="12" height="30" />
          <rect x="93" y="24" width="5" height="14" />
        </g>
        <circle cx="50" cy="31" r="0.7" fill="rgba(255,255,255,0.3)" />
      </svg>

      {/* home — attacks right */}
      {homeXI.map((p, i) => (
        <Token key={p.id} p={p} x={homeSlots[i].x * 0.48} y={homeSlots[i].y * 0.62 + 0.5} color={h.color} />
      ))}
      {/* away — mirrored, attacks left */}
      {awayXI.map((p, i) => (
        <Token
          key={p.id}
          p={p}
          x={100 - awaySlots[i].x * 0.48}
          y={(100 - awaySlots[i].y) * 0.62 + 0.5}
          color={a.color}
        />
      ))}
    </div>
  );
}
