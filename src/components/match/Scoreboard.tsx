import type { Match } from "@/lib/types";
import { team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { FormDots } from "@/components/ui/FormDots";
import { Icon } from "@/components/ui/Icon";
import { ProbBar } from "@/components/charts/ProbBar";
import { Countdown } from "@/components/home/Countdown";
import { kickoffLabel, cn } from "@/lib/utils";

function goals(m: Match, teamId: string) {
  return m.events.filter(
    (e) => e.teamId === teamId && (e.type === "goal" || e.type === "penalty_goal"),
  );
}

export function Scoreboard({ m }: { m: Match }) {
  const h = team(m.homeId);
  const a = team(m.awayId);
  const live = m.status === "live" || m.status === "halftime";
  const done = m.status === "finished";
  const played = live || done;
  const { time, day } = kickoffLabel(m.kickoff);

  const TeamBlock = ({ teamId, align }: { teamId: string; align: "left" | "right" }) => {
    const t = team(teamId);
    return (
      <div
        className={cn(
          "flex flex-1 flex-col items-center gap-2.5 sm:gap-3",
          align === "left" ? "sm:items-end" : "sm:items-start",
        )}
      >
        <Flag code={t.code} size={64} rounded="rounded-lg" className="shadow-lg" />
        <div className={cn("text-center", align === "left" ? "sm:text-right" : "sm:text-left")}>
          <div className="text-[15px] font-semibold leading-tight sm:text-[18px]">{t.name}</div>
          <div
            className={cn(
              "mt-1.5 flex items-center justify-center gap-2 sm:justify-start",
              align === "left" && "sm:flex-row-reverse",
            )}
          >
            <span className="text-[11px] text-ink-3">FIFA #{t.fifaRank}</span>
            <FormDots form={t.form} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line panel">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(600px 200px at 15% -30%, ${h.color}22, transparent 60%), radial-gradient(600px 200px at 85% -30%, ${a.color}22, transparent 60%)`,
        }}
      />
      <div className="relative p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between text-[11px] font-medium">
          <span className="flex items-center gap-2 text-ink-3">
            <Icon name="Trophy" className="h-3.5 w-3.5" />
            {m.stage}
            {m.group && ` · Group ${m.group}`}
          </span>
          {live ? (
            <span className="flex items-center gap-1.5 rounded-full bg-live/12 px-2 py-0.5 font-bold text-live">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
              {m.status === "halftime" ? "HALF-TIME" : "LIVE"}
            </span>
          ) : done ? (
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-semibold text-ink-2">
              FULL-TIME
            </span>
          ) : (
            <span className="text-ink-3">{day}</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 sm:gap-6">
          <TeamBlock teamId={m.homeId} align="left" />

          <div className="flex shrink-0 flex-col items-center">
            {played ? (
              <>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="tabular text-4xl font-bold tracking-tight sm:text-5xl">
                    {m.homeScore}
                  </span>
                  <span className="text-2xl font-light text-ink-3">:</span>
                  <span className="tabular text-4xl font-bold tracking-tight sm:text-5xl">
                    {m.awayScore}
                  </span>
                </div>
                {m.homePens != null && (
                  <div className="mt-1 text-[12px] text-ink-3">
                    Pens {m.homePens}–{m.awayPens}
                  </div>
                )}
                {live && (
                  <div className="mt-2 flex items-center gap-1.5 text-[13px] font-bold text-live">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
                    {m.minute}′
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="tabular text-3xl font-bold tracking-tight sm:text-4xl">{time}</div>
                <div className="mt-3">
                  <Countdown iso={m.kickoff} compact />
                </div>
              </>
            )}
          </div>

          <TeamBlock teamId={m.awayId} align="right" />
        </div>

        {played && (
          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line/60 pt-4 text-[12px]">
            <div className="space-y-1 text-right">
              {goals(m, m.homeId).map((g, i) => (
                <div key={i} className="flex items-center justify-end gap-1.5 text-ink-2">
                  {g.playerName} <span className="text-ink-3">{g.minute}′</span>
                  <Icon name="Goal" className="h-3 w-3 text-accent" />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              {goals(m, m.awayId).map((g, i) => (
                <div key={i} className="flex items-center gap-1.5 text-ink-2">
                  <Icon name="Goal" className="h-3 w-3 text-accent" />
                  {g.playerName} <span className="text-ink-3">{g.minute}′</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {m.winProb && (live || m.status === "scheduled") && (
          <div className="mt-5 border-t border-line/60 pt-4">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-3">
              Live win probability
            </div>
            <ProbBar
              home={m.winProb.home}
              draw={m.winProb.draw}
              away={m.winProb.away}
              homeLabel={h.short}
              awayLabel={a.short}
            />
          </div>
        )}
      </div>
    </div>
  );
}
