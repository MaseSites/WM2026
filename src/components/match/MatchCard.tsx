import Link from "next/link";
import type { Match } from "@/lib/types";
import { team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { kickoffLabel, cn } from "@/lib/utils";

function scorers(m: Match, teamId: string) {
  return m.events
    .filter(
      (e) =>
        e.teamId === teamId &&
        (e.type === "goal" || e.type === "penalty_goal" || e.type === "own_goal"),
    )
    .map((e) => ({ name: e.playerName ?? "", minute: e.minute }));
}

export function MatchCard({ m, className }: { m: Match; className?: string }) {
  const h = team(m.homeId);
  const a = team(m.awayId);
  const live = m.status === "live" || m.status === "halftime";
  const done = m.status === "finished";
  const played = live || done;
  const { time, day } = kickoffLabel(m.kickoff);
  const homeWon = done && m.homeScore > m.awayScore;
  const awayWon = done && m.awayScore > m.homeScore;

  const TeamRow = ({
    teamId,
    code,
    name,
    score,
    won,
    dim,
  }: {
    teamId: string;
    code: string;
    name: string;
    score: number;
    won: boolean;
    dim: boolean;
  }) => (
    <div className="flex items-center gap-2.5">
      <Flag code={code} size={22} />
      <span
        className={cn(
          "truncate text-[14px]",
          won ? "font-semibold text-ink" : dim ? "text-ink-2" : "text-ink",
        )}
      >
        {name}
      </span>
      <span className="ml-auto flex items-center gap-2">
        {won && <span className="h-1 w-1 rounded-full bg-accent" />}
        {played ? (
          <span
            className={cn(
              "tabular text-[15px] font-semibold",
              won ? "text-ink" : dim ? "text-ink-2" : "text-ink",
            )}
          >
            {score}
          </span>
        ) : null}
      </span>
    </div>
  );

  return (
    <Link
      href={`/match/${m.id}`}
      className={cn("panel panel-hover group block p-4", className)}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <span className="truncate text-[11px] font-medium uppercase tracking-wider text-ink-3">
          {m.group ? `Group ${m.group}` : m.stage}
        </span>
        {live ? (
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-live">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
            {m.status === "halftime" ? "HT" : m.minute ? `${m.minute}′` : "LIVE"}
          </span>
        ) : done ? (
          <span className="text-[11px] font-semibold text-ink-3">FT</span>
        ) : (
          <span className="text-right text-[11px] font-medium text-ink-2">
            {day} · {time}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <TeamRow teamId={m.homeId} code={h.code} name={h.name} score={m.homeScore} won={homeWon} dim={awayWon} />
        <TeamRow teamId={m.awayId} code={a.code} name={a.name} score={m.awayScore} won={awayWon} dim={homeWon} />
      </div>

      {played && (m.homePens != null || scorers(m, m.homeId).length > 0 || scorers(m, m.awayId).length > 0) && (
        <div className="mt-3 flex justify-between gap-4 border-t border-line/70 pt-2.5 text-[10.5px] leading-relaxed text-ink-3">
          <span className="truncate">
            {scorers(m, m.homeId).map((s) => `${s.name.split(" ").slice(-1)} ${s.minute}′`).join(", ")}
          </span>
          <span className="truncate text-right">
            {scorers(m, m.awayId).map((s) => `${s.name.split(" ").slice(-1)} ${s.minute}′`).join(", ")}
          </span>
        </div>
      )}

      {live && (
        <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-live/80"
            style={{ width: `${Math.min(100, ((m.minute ?? 0) / 90) * 100)}%` }}
          />
        </div>
      )}
    </Link>
  );
}
