import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MATCHES, team } from "@/lib/data";
import { getMatchById } from "@/lib/live";
import { Scoreboard } from "@/components/match/Scoreboard";
import { StatsPanel } from "@/components/match/StatsPanel";
import { Timeline } from "@/components/match/Timeline";
import { Lineups } from "@/components/match/Lineups";
import { Prediction } from "@/components/match/Prediction";
import { InfoStrip } from "@/components/match/InfoStrip";
import { PlayerRatings } from "@/components/match/PlayerRatings";
import { Commentary } from "@/components/match/Commentary";
import { H2H } from "@/components/match/H2H";
import { Momentum } from "@/components/charts/Momentum";
import { Tabs, type TabDef } from "@/components/ui/Tabs";
import { Icon } from "@/components/ui/Icon";

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return MATCHES.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const m = await getMatchById(id);
  if (!m) return { title: "Match" };
  return { title: `${team(m.homeId).name} vs ${team(m.awayId).name}` };
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await getMatchById(id);
  if (!m) notFound();

  const hasEvents = m.events.filter((e) => !["kickoff", "halftime", "fulltime"].includes(e.type)).length > 0;

  const tabs: TabDef[] = [{ id: "overview", label: "Overview", icon: "Activity" }];
  if (m.stats) tabs.push({ id: "stats", label: "Statistics", icon: "BarChart3" });
  tabs.push({ id: "lineups", label: "Lineups", icon: "Users" });
  if (hasEvents) tabs.push({ id: "timeline", label: "Timeline", icon: "Clock" });
  if (m.prediction) tabs.push({ id: "ai", label: "AI Analysis", icon: "Sparkles" });
  tabs.push({ id: "h2h", label: "H2H", icon: "Handshake" });

  const overview = (
    <div className="space-y-4">
      {m.momentum && (
        <div className="panel p-4 sm:p-5">
          <Momentum values={m.momentum} homeId={m.homeId} awayId={m.awayId} />
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {hasEvents ? (
          <Commentary m={m} />
        ) : m.status === "finished" ? (
          <div className="panel flex flex-col justify-center p-6">
            <Icon name="CalendarCheck" className="mb-2 h-5 w-5 text-accent" />
            <h3 className="text-[15px] font-semibold">Full-time</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-2">
              {team(m.homeScore >= m.awayScore ? m.homeId : m.awayId).name}
              {m.homePens != null
                ? " advance on penalties"
                : m.homeScore === m.awayScore
                  ? " and their opponents shared the points"
                  : " progress to the Round of 16"}
              . Detailed event data for this tie is limited — final score confirmed.
            </p>
          </div>
        ) : (
          <div className="panel flex flex-col justify-center p-6">
            <Icon name="CalendarDays" className="mb-2 h-5 w-5 text-accent" />
            <h3 className="text-[15px] font-semibold">Match preview</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-2">
              Kick-off approaches. Predicted lineups and our full AI breakdown are
              live in the tabs above — check back for minute-by-minute commentary.
            </p>
          </div>
        )}
        <PlayerRatings m={m} />
      </div>
      <InfoStrip m={m} />
    </div>
  );

  const panels: Record<string, React.ReactNode> = {
    overview,
    stats: m.stats ? <StatsPanel m={m} /> : null,
    lineups: <Lineups m={m} />,
    timeline: <Timeline m={m} />,
    ai: m.prediction ? <Prediction m={m} /> : null,
    h2h: (
      <div className="space-y-4">
        <H2H m={m} />
        <InfoStrip m={m} />
      </div>
    ),
  };

  return (
    <div className="space-y-5">
      <Link
        href="/matches"
        className="inline-flex items-center gap-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink"
      >
        <Icon name="ChevronRight" className="h-3.5 w-3.5 rotate-180" />
        All matches
      </Link>

      <Scoreboard m={m} />

      <Tabs tabs={tabs} panels={panels} initial={m.status === "scheduled" && m.prediction ? "ai" : "overview"} />
    </div>
  );
}
