import { Hero } from "@/components/home/Hero";
import { QuickStats } from "@/components/home/QuickStats";
import { MatchCard } from "@/components/match/MatchCard";
import { TitleRace } from "@/components/home/TitleRace";
import { GoldenBoot } from "@/components/home/GoldenBoot";
import { Bracket } from "@/components/bracket/Bracket";
import { NewsGrid } from "@/components/home/NewsGrid";
import { StandingsTable } from "@/components/standings/StandingsTable";
import { FanPoll } from "@/components/home/FanPoll";
import { TransfersCard, DiscussionsCard } from "@/components/home/SocialRail";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RESULTS, UPCOMING, GROUP_TEAMS, POLLS } from "@/lib/data";

export default function HomePage() {
  // A live-relevant mix: the latest results next to the next kick-offs.
  const knockout = [...RESULTS.slice(0, 2), ...UPCOMING.slice(0, 2)];

  return (
    <div className="space-y-9">
      <Hero />

      <Reveal>
        <QuickStats />
      </Reveal>

      <Reveal>
        <Section
          title="Round of 32"
          kicker="Knockouts"
          icon="CalendarDays"
          action="All matches"
          actionHref="/matches"
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {knockout.map((m) => (
              <MatchCard key={m.id} m={m} />
            ))}
          </div>
        </Section>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <TitleRace />
        </Reveal>
        <Reveal delay={0.05}>
          <GoldenBoot />
        </Reveal>
      </div>

      <Reveal>
        <Section
          title="Knockout bracket"
          kicker="Road to the final"
          icon="Trophy"
          action="Open bracket"
          actionHref="/bracket"
        >
          <div className="panel p-4 md:p-6">
            <Bracket />
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <NewsGrid />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Reveal>
            <Section
              title="Group stage"
              kicker="Final"
              icon="ListOrdered"
              action="All 12 groups"
              actionHref="/standings"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <StandingsTable group="J" teams={GROUP_TEAMS.J} />
                <StandingsTable group="I" teams={GROUP_TEAMS.I} />
              </div>
            </Section>
          </Reveal>
          <Reveal>
            <FanPoll poll={POLLS[1]} />
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal>
            <FanPoll poll={POLLS[0]} />
          </Reveal>
          <Reveal delay={0.05}>
            <TransfersCard />
          </Reveal>
          <Reveal delay={0.1}>
            <DiscussionsCard />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
