import { BRACKET_R32, BRACKET_R16 } from "@/lib/data";
import { getMatches } from "@/lib/live";
import { BracketMatch } from "./BracketMatch";
import type { BracketNode } from "@/lib/types";

function empty(id: string): BracketNode {
  return { id, round: "QF" };
}

function Column({
  title,
  nodes,
  liveIds,
  placeholder,
}: {
  title: string;
  nodes: BracketNode[];
  liveIds: Set<string>;
  placeholder?: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
        {title}
      </div>
      <div className="flex flex-1 flex-col justify-around gap-2">
        {nodes.map((n) => (
          <BracketMatch
            key={n.id}
            node={n}
            homePlaceholder={placeholder ?? "TBD"}
            awayPlaceholder={placeholder ?? "TBD"}
            live={!!n.matchId && liveIds.has(n.matchId)}
          />
        ))}
      </div>
    </div>
  );
}

export async function Bracket() {
  const matches = await getMatches();
  const liveIds = new Set(
    matches.filter((m) => m.status === "live" || m.status === "halftime").map((m) => m.id),
  );
  const qf = Array.from({ length: 4 }, (_, i) => empty(`qf-${i}`));
  const sf = Array.from({ length: 2 }, (_, i) => empty(`sf-${i}`));
  const f = [empty("final")];

  return (
    <div className="edge-fade-x -mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
      <div
        className="grid min-w-[1040px] gap-4"
        style={{ gridTemplateColumns: "1.1fr 1fr 1fr 1fr 1.1fr", minHeight: 980 }}
      >
        <Column title="Round of 32" nodes={BRACKET_R32} liveIds={liveIds} />
        <Column title="Round of 16" nodes={BRACKET_R16} liveIds={liveIds} placeholder="R32 winner" />
        <Column title="Quarter-finals" nodes={qf} liveIds={liveIds} placeholder="R16 winner" />
        <Column title="Semi-finals" nodes={sf} liveIds={liveIds} placeholder="QF winner" />
        <Column title="Final" nodes={f} liveIds={liveIds} placeholder="SF winner" />
      </div>
    </div>
  );
}
