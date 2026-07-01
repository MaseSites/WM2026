import type { Metadata } from "next";
import Link from "next/link";
import { LIVE_MATCHES, UPCOMING, RESULTS, team, match } from "@/lib/data";
import { Scoreboard } from "@/components/match/Scoreboard";
import { Momentum } from "@/components/charts/Momentum";
import { PageHeader } from "@/components/ui/PageHeader";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { kickoffLabel } from "@/lib/utils";
import type { Match } from "@/lib/types";

export const metadata: Metadata = {
  title: "Live Center",
  description: "Real-time World Cup 2026 scores, momentum and events.",
};

function LatestEvents({ m }: { m: Match }) {
  const events = m.events
    .filter((e) => !["kickoff", "halftime", "fulltime"].includes(e.type))
    .slice(-4)
    .reverse();
  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold">
        <Icon name="Activity" className="h-4 w-4 text-accent" />
        Latest events
      </div>
      <div className="space-y-2.5">
        {events.map((e, i) => {
          const t = e.teamId ? team(e.teamId) : null;
          const isGoal = e.type.includes("goal");
          return (
            <div key={i} className="flex items-center gap-2.5 text-[12.5px]">
              <span className="tabular w-8 text-right font-semibold text-ink-3">{e.minute}′</span>
              <Icon
                name={isGoal ? "Goal" : e.type === "var" ? "ShieldAlert" : e.type === "sub" ? "Repeat" : "ShieldAlert"}
                className={isGoal ? "h-3.5 w-3.5 text-accent" : e.type === "var" ? "h-3.5 w-3.5 text-info" : "h-3.5 w-3.5 text-draw"}
              />
              {t && <Flag code={t.code} size={14} />}
              <span className={isGoal ? "font-medium text-ink" : "text-ink-2"}>{e.playerName ?? e.detail}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LiveEntry({ m }: { m: Match }) {
  return (
    <div className="space-y-4">
      <Scoreboard m={m} />
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {m.momentum && (
          <div className="panel p-4 sm:p-5">
            <Momentum values={m.momentum} homeId={m.homeId} awayId={m.awayId} />
          </div>
        )}
        <LatestEvents m={m} />
      </div>
      <div className="flex justify-center">
        <Link
          href={`/match/${m.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-white/[0.03] px-4 py-2 text-[13px] font-medium transition-colors hover:bg-white/[0.06]"
        >
          Open full match centre
          <Icon name="ArrowRight" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function LivePage() {
  const next = UPCOMING.slice(0, 2);
  const recent = RESULTS.slice(0, 3);

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Real-time"
        title="Live Center"
        icon="Radio"
        subtitle="Every goal, card and momentum swing as it happens — powered by our live model."
      >
        <Pill variant="live" dot>
          {LIVE_MATCHES.length} live now
        </Pill>
      </PageHeader>

      {LIVE_MATCHES.length === 0 ? (
        <div className="panel flex flex-col items-center justify-center py-20 text-center">
          <Icon name="Radio" className="mb-3 h-8 w-8 text-ink-3" />
          <div className="text-[15px] font-semibold">No matches live right now</div>
          <div className="mt-1 text-[13px] text-ink-3">Check the schedule for the next kick-off.</div>
        </div>
      ) : (
        <div className="space-y-10">
          {LIVE_MATCHES.map((m) => (
            <LiveEntry key={m.id} m={m} />
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-ink-3">
            <Icon name="Clock" className="h-3.5 w-3.5" /> Coming up
          </div>
          <div className="panel divide-y divide-line/60">
            {next.map((m) => {
              const h = team(m.homeId);
              const a = team(m.awayId);
              const { day, time } = kickoffLabel(m.kickoff);
              return (
                <Link key={m.id} href={`/match/${m.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02]">
                  <span className="w-16 text-[11px] text-ink-3">{day}<br />{time}</span>
                  <Flag code={h.code} size={20} />
                  <span className="text-[13px] font-medium">{h.short}</span>
                  <span className="text-[11px] text-ink-3">vs</span>
                  <span className="text-[13px] font-medium">{a.short}</span>
                  <Flag code={a.code} size={20} />
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-ink-3">
            <Icon name="CalendarCheck" className="h-3.5 w-3.5" /> Recent results
          </div>
          <div className="panel divide-y divide-line/60">
            {recent.map((m) => {
              const h = team(m.homeId);
              const a = team(m.awayId);
              return (
                <Link key={m.id} href={`/match/${m.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02]">
                  <span className="w-8 text-[10px] font-semibold text-ink-3">FT</span>
                  <Flag code={h.code} size={20} />
                  <span className="flex-1 text-[13px] font-medium">{h.short}</span>
                  <span className="tabular text-[13px] font-semibold">{m.homeScore}–{m.awayScore}</span>
                  <span className="flex-1 text-right text-[13px] font-medium">{a.short}</span>
                  <Flag code={a.code} size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
