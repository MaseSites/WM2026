import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { TEAMS, team, squad, MATCHES } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { FormDots } from "@/components/ui/FormDots";
import { Icon } from "@/components/ui/Icon";
import { Radar } from "@/components/charts/Radar";
import { Meter } from "@/components/charts/Meter";
import { MatchCard } from "@/components/match/MatchCard";
import { PlayerRow } from "@/components/player/PlayerRow";
import { FormationPitch } from "@/components/team/FormationPitch";
import { Section } from "@/components/ui/Section";
import { formatValue } from "@/lib/utils";
import type { Position } from "@/lib/types";

export function generateStaticParams() {
  return TEAMS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = team(id);
  return { title: t ? t.name : "Team" };
}

const POS_LABEL: Record<Position, string> = { GK: "Goalkeepers", DF: "Defenders", MF: "Midfielders", FW: "Forwards" };

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = team(id);
  if (!t) notFound();

  const matches = MATCHES.filter((m) => m.homeId === id || m.awayId === id).sort(
    (a, b) => +new Date(a.kickoff) - +new Date(b.kickoff),
  );
  const roster = squad(id);
  const byPos = (["GK", "DF", "MF", "FW"] as Position[]).map((pos) => ({
    pos,
    players: roster.filter((p) => p.position === pos),
  }));

  const radar = [
    { label: "ATT", value: t.ratings.attack },
    { label: "MID", value: t.ratings.midfield },
    { label: "DEF", value: t.ratings.defense },
    { label: "EXP", value: t.ratings.experience },
    { label: "FORM", value: t.ratings.form },
  ];

  const stats = [
    { label: "FIFA rank", value: `#${t.fifaRank}` },
    { label: "Squad value", value: formatValue(t.marketValue) },
    { label: "Avg. age", value: t.avgAge.toFixed(1) },
    { label: "World titles", value: t.titles },
    { label: "Title odds", value: `${t.winProbability.toFixed(1)}%`, accent: true },
  ];

  return (
    <div className="space-y-6">
      <Link href="/teams" className="inline-flex items-center gap-1.5 text-[13px] text-ink-2 hover:text-ink">
        <Icon name="ChevronRight" className="h-3.5 w-3.5 rotate-180" /> All teams
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-line panel">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `radial-gradient(600px 240px at 12% -30%, ${t.color}33, transparent 60%)` }} />
        <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <Flag code={t.code} size={72} rounded="rounded-xl" className="shadow-xl" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[26px] font-bold tracking-tight">{t.name}</h1>
                <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-ink-2">
                  Group {t.group}
                </span>
              </div>
              <p className="text-[13px] text-ink-2">{t.nickname} · {t.confederation}</p>
              <div className="mt-2 flex items-center gap-3">
                <FormDots form={t.form} size="md" />
                <span className="text-[11px] text-ink-3">Last 5</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-[13px] sm:text-right">
            <div className="flex items-center gap-2 sm:justify-end">
              <Icon name="UserRound" className="h-4 w-4 text-ink-3" />
              <span className="text-ink-2">Coach</span>
              <span className="font-medium">{t.coach}</span>
              <Flag code={t.coachCountry} size={15} />
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <Icon name="Users" className="h-4 w-4 text-ink-3" />
              <span className="text-ink-2">Formation</span>
              <span className="font-medium">{t.formation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="panel p-4">
            <div className="text-[11px] font-medium uppercase tracking-wider text-ink-3">{s.label}</div>
            <div className={`tabular mt-1 text-xl font-semibold ${s.accent ? "text-accent" : ""}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Ratings */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div className="panel flex flex-col items-center justify-center p-5">
          <div className="mb-1 self-start text-[13px] font-semibold">Strength profile</div>
          <Radar data={radar} size={260} />
        </div>
        <div className="panel p-5">
          <div className="mb-4 text-[13px] font-semibold">Department ratings</div>
          <div className="space-y-4">
            {[
              { l: "Attack", v: t.ratings.attack },
              { l: "Midfield", v: t.ratings.midfield },
              { l: "Defense", v: t.ratings.defense },
              { l: "Experience", v: t.ratings.experience },
              { l: "Current form", v: t.ratings.form },
            ].map((r, i) => (
              <div key={r.l}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="text-ink-2">{r.l}</span>
                  <span className="tabular font-semibold">{r.v}</span>
                </div>
                <Meter value={r.v} delay={i * 0.05} height={7} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournament path */}
      <Section title="World Cup path" kicker="Knockouts" icon="Trophy">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {matches.map((m) => (
            <MatchCard key={m.id} m={m} />
          ))}
        </div>
      </Section>

      {/* Squad + lineup */}
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Section title="Squad" kicker={`${roster.length} players listed`} icon="Users">
          <div className="panel divide-y divide-line/60">
            {byPos.map(
              (grp) =>
                grp.players.length > 0 && (
                  <div key={grp.pos}>
                    <div className="bg-white/[0.02] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
                      {POS_LABEL[grp.pos]}
                    </div>
                    {grp.players.map((p) => (
                      <PlayerRow key={p.id} p={p} />
                    ))}
                  </div>
                ),
            )}
            {roster.length === 0 && (
              <div className="px-4 py-10 text-center text-[13px] text-ink-3">
                Full squad list published closer to kick-off.
              </div>
            )}
          </div>
        </Section>

        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-white/[0.05] ring-1 ring-white/10">
              <Icon name="Users" className="h-4 w-4 text-ink-2" />
            </span>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent/80">Expected XI</div>
              <h2 className="text-[17px] font-semibold">{t.formation}</h2>
            </div>
          </div>
          <div className="panel p-4">
            <FormationPitch teamId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
