import Link from "next/link";
import { team, squad, formationSlots } from "@/lib/data";

export function FormationPitch({ teamId }: { teamId: string }) {
  const t = team(teamId);
  const xi = squad(teamId).slice(0, 11);
  const slots = formationSlots(t.formation);
  if (xi.length < 11) {
    return (
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
        {xi.map((p) => (
          <Link key={p.id} href={`/player/${p.id}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12.5px] hover:bg-white/[0.03]">
            <span className="tabular w-5 text-ink-3">{p.number}</span>
            <span className="truncate">{p.name}</span>
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl ring-1 ring-white/10"
      style={{
        aspectRatio: "3 / 4",
        background:
          "linear-gradient(180deg, #0f2a1c, #123421 50%, #0f2a1c), repeating-linear-gradient(180deg, transparent, transparent 9%, rgba(255,255,255,0.02) 9%, rgba(255,255,255,0.02) 18%)",
      }}
    >
      <svg viewBox="0 0 62 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <g fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.3">
          <rect x="2" y="2" width="58" height="96" />
          <line x1="2" y1="50" x2="60" y2="50" />
          <circle cx="31" cy="50" r="8" />
          <rect x="16" y="86" width="30" height="12" />
          <rect x="16" y="2" width="30" height="12" />
        </g>
      </svg>
      {xi.map((p, i) => {
        // slots are horizontal (x own→attack). Rotate to vertical: attack upward.
        const left = slots[i].y;
        const top = 100 - slots[i].x;
        const last = p.name.split(" ").slice(-1)[0];
        return (
          <Link
            key={p.id}
            href={`/player/${p.id}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className="flex flex-col items-center gap-1">
              <span
                className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-bold text-white shadow-lg ring-2 ring-black/30 transition-transform group-hover:scale-110"
                style={{ background: t.color }}
              >
                {p.number}
              </span>
              <span className="max-w-[70px] truncate rounded bg-black/50 px-1 text-[9px] font-medium text-white/90 backdrop-blur-sm">
                {last}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
