import Link from "next/link";
import type { BracketNode } from "@/lib/types";
import { team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { cn } from "@/lib/utils";

function Side({
  teamId,
  score,
  pens,
  won,
  placeholder,
}: {
  teamId?: string;
  score?: number;
  pens?: number;
  won: boolean;
  placeholder: string;
}) {
  const t = teamId ? team(teamId) : undefined;
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5">
      {t ? (
        <Flag code={t.code} size={18} />
      ) : (
        <span className="h-[13px] w-[18px] rounded-[3px] bg-white/[0.05] ring-1 ring-white/10" />
      )}
      <span
        className={cn(
          "flex-1 truncate text-[12.5px]",
          t ? (won ? "font-semibold text-ink" : "text-ink-2") : "text-ink-3 italic",
        )}
      >
        {t ? t.short : placeholder}
      </span>
      {score != null && (
        <span className={cn("tabular text-[12.5px]", won ? "font-semibold" : "text-ink-2")}>
          {score}
          {pens != null && <sup className="ml-0.5 text-[9px] text-ink-3">({pens})</sup>}
        </span>
      )}
    </div>
  );
}

export function BracketMatch({
  node,
  homePlaceholder = "TBD",
  awayPlaceholder = "TBD",
  live,
}: {
  node: BracketNode;
  homePlaceholder?: string;
  awayPlaceholder?: string;
  live?: boolean;
}) {
  const homeWon = !!node.done && (node.homeScore ?? 0) > (node.awayScore ?? 0);
  const awayWon = !!node.done && (node.awayScore ?? 0) > (node.homeScore ?? 0);

  const inner = (
    <div
      className={cn(
        "w-[150px] divide-y divide-line/60 overflow-hidden rounded-lg border bg-surface-2/70 transition-colors",
        live ? "border-live/40 ring-1 ring-live/20" : "border-line hover:border-line-strong",
      )}
    >
      {live && (
        <div className="flex items-center gap-1 bg-live/10 px-2.5 py-1 text-[9px] font-bold text-live">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
          LIVE
        </div>
      )}
      <Side teamId={node.homeId} score={node.homeScore} pens={node.homePens} won={homeWon} placeholder={homePlaceholder} />
      <Side teamId={node.awayId} score={node.awayScore} pens={node.awayPens} won={awayWon} placeholder={awayPlaceholder} />
    </div>
  );

  return node.matchId ? (
    <Link href={`/match/${node.matchId}`} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}
