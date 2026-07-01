import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PLAYERS, player, team, squad, MATCHES } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { Radar } from "@/components/charts/Radar";
import { Section } from "@/components/ui/Section";
import { formatValue, seeded, clamp } from "@/lib/utils";

export function generateStaticParams() {
  return PLAYERS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = player(id);
  return { title: p ? p.name : "Player" };
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = player(id);
  if (!p) notFound();
  const t = team(p.teamId);

  const radar = [
    { label: "PASS", value: p.stats.passAccuracy },
    { label: "SHOT", value: clamp((p.stats.shotsPerGame / 5) * 100, 8, 100) },
    { label: "CREATE", value: clamp((p.stats.keyPasses / 4.2) * 100, 8, 100) },
    { label: "DRIBBLE", value: clamp((p.stats.dribbles / 5) * 100, 8, 100) },
    { label: "DEFEND", value: clamp((p.stats.tackles / 3.5) * 100, 8, 100) },
    { label: "DUELS", value: clamp((p.stats.duelsWon / 8) * 100, 8, 100) },
  ];

  const per90 = (v: number) => (p.minutes ? (v / p.minutes) * 90 : 0);

  const stats = [
    { label: "Goals", value: p.goals, icon: "Goal" },
    { label: "Assists", value: p.assists, icon: "Handshake" },
    { label: "Minutes", value: p.minutes, icon: "Clock" },
    { label: "Avg. rating", value: p.rating.toFixed(1), icon: "Star", accent: true },
    { label: "Market value", value: formatValue(p.marketValue), icon: "TrendingUp" },
    { label: "G+A / 90", value: (per90(p.goals + p.assists)).toFixed(2), icon: "Activity" },
  ];

  const teamMatches = MATCHES.filter(
    (m) => (m.homeId === p.teamId || m.awayId === p.teamId) && m.status === "finished",
  ).slice(0, 5);

  const similar = PLAYERS.filter((o) => o.id !== p.id && o.position === p.position)
    .map((o) => ({ o, d: Math.abs(o.rating - p.rating) * 10 + Math.abs(o.marketValue - p.marketValue) / 20 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 4)
    .map((x) => x.o);

  return (
    <div className="space-y-6">
      <Link href="/players" className="inline-flex items-center gap-1.5 text-[13px] text-ink-2 hover:text-ink">
        <Icon name="ChevronRight" className="h-3.5 w-3.5 rotate-180" /> All players
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-line panel">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `radial-gradient(600px 240px at 12% -30%, ${t.color}33, transparent 60%)` }} />
        <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="relative">
            <Avatar name={p.name} teamId={p.teamId} seed={p.photoSeed} size={96} />
            <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-[13px] font-bold ring-2 ring-canvas">
              {p.number}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-[26px] font-bold tracking-tight">{p.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-2">
              <Link href={`/team/${t.id}`} className="flex items-center gap-1.5 hover:text-accent">
                <Flag code={t.code} size={16} /> {t.name}
              </Link>
              <span className="text-ink-3">·</span>
              <span>{p.detailPosition}</span>
              <span className="text-ink-3">·</span>
              <span className="flex items-center gap-1.5">
                <Flag code={p.clubCountry} size={15} /> {p.club}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
              {[
                ["Age", `${p.age}`],
                ["Height", `${p.height} cm`],
                ["Foot", p.foot],
              ].map(([l, v]) => (
                <span key={l} className="rounded-md bg-white/[0.05] px-2.5 py-1 ring-1 ring-white/10">
                  <span className="text-ink-3">{l} </span>
                  <span className="font-medium">{v}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="panel p-4">
            <Icon name={s.icon} className={`h-4 w-4 ${s.accent ? "text-accent" : "text-ink-3"}`} />
            <div className={`tabular mt-2 text-xl font-semibold ${s.accent ? "text-accent" : ""}`}>{s.value}</div>
            <div className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-3">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Radar + strengths */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="panel flex flex-col items-center p-5">
          <div className="mb-1 self-start text-[13px] font-semibold">Attribute profile</div>
          <Radar data={radar} size={260} color="var(--color-accent)" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel p-5">
            <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold">
              <Icon name="TrendingUp" className="h-4 w-4 text-accent" /> Strengths
            </div>
            <div className="flex flex-wrap gap-2">
              {p.strengths.map((s) => (
                <span key={s} className="rounded-full bg-accent/10 px-2.5 py-1 text-[12px] font-medium text-accent ring-1 ring-accent/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold">
              <Icon name="TrendingDown" className="h-4 w-4 text-live" /> Weaknesses
            </div>
            <div className="flex flex-wrap gap-2">
              {p.weaknesses.map((s) => (
                <span key={s} className="rounded-full bg-live/10 px-2.5 py-1 text-[12px] font-medium text-live ring-1 ring-live/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="panel p-5 sm:col-span-2">
            <div className="mb-3 text-[13px] font-semibold">Per-90 output</div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ["Goals", per90(p.goals).toFixed(2)],
                ["Assists", per90(p.assists).toFixed(2)],
                ["Shots", p.stats.shotsPerGame.toFixed(1)],
                ["Key passes", p.stats.keyPasses.toFixed(1)],
                ["Dribbles", p.stats.dribbles.toFixed(1)],
                ["Duels won", p.stats.duelsWon.toFixed(1)],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-white/[0.02] py-2.5">
                  <div className="tabular text-[16px] font-semibold">{v}</div>
                  <div className="text-[10.5px] uppercase tracking-wider text-ink-3">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Match history + similar */}
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Section title="Recent matches" kicker="Form" icon="CalendarCheck">
          <div className="panel divide-y divide-line/60">
            {teamMatches.map((m, i) => {
              const opp = team(m.homeId === p.teamId ? m.awayId : m.homeId);
              const home = m.homeId === p.teamId;
              const gf = home ? m.homeScore : m.awayScore;
              const ga = home ? m.awayScore : m.homeScore;
              const res = gf > ga ? "W" : gf < ga ? "L" : "D";
              const r = clamp(p.rating + (seeded(p.photoSeed + i * 5) - 0.5) * 1.4, 5.5, 9.6);
              const rc = r >= 8 ? "var(--color-accent)" : r >= 7 ? "var(--color-info)" : "var(--color-ink-3)";
              return (
                <Link key={m.id} href={`/match/${m.id}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.02]">
                  <span className="text-[11px] text-ink-3">{m.stage}</span>
                  <Flag code={opp.code} size={18} />
                  <span className="flex-1 text-[13px]">vs {opp.short}</span>
                  <span className="tabular text-[12.5px] text-ink-2">{gf}–{ga}</span>
                  <span className={`grid h-5 w-5 place-items-center rounded text-[9px] font-bold text-canvas ${res === "W" ? "bg-win/90" : res === "D" ? "bg-draw/90" : "bg-live/90"}`}>{res}</span>
                  <span className="tabular w-9 rounded-md px-1 py-0.5 text-center text-[12px] font-bold" style={{ background: `${rc}22`, color: rc }}>
                    {r.toFixed(1)}
                  </span>
                </Link>
              );
            })}
            {teamMatches.length === 0 && (
              <div className="px-4 py-8 text-center text-[13px] text-ink-3">No completed matches yet.</div>
            )}
          </div>
        </Section>

        <Section title="Similar players" kicker="Scout" icon="Users">
          <div className="panel divide-y divide-line/60">
            {similar.map((o) => {
              const ot = team(o.teamId);
              return (
                <Link key={o.id} href={`/player/${o.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02]">
                  <Avatar name={o.name} teamId={o.teamId} seed={o.photoSeed} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium">{o.name}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-ink-3">
                      <Flag code={ot.code} size={13} /> {ot.short} · {o.detailPosition}
                    </div>
                  </div>
                  <span className="tabular text-[13px] font-semibold text-accent">{o.rating.toFixed(1)}</span>
                </Link>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}
