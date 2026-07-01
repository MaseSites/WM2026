import type { Metadata } from "next";
import Link from "next/link";
import { MATCHES, team, GOLDEN_BOOT } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { TitleRace } from "@/components/home/TitleRace";
import { ProbBar } from "@/components/charts/ProbBar";
import { Ring } from "@/components/ui/Ring";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { Meter } from "@/components/charts/Meter";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Predictions",
  description: "Model-driven match predictions, title odds and the Golden Boot race.",
};

export default function PredictionsPage() {
  const predicted = MATCHES.filter((m) => m.prediction && m.status !== "finished");
  const bootMax = GOLDEN_BOOT[0].goals + 3;

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="WorldMap AI · Model v4"
        title="Predictions"
        icon="Sparkles"
        subtitle="12,000 Monte-Carlo simulations per match, blended with form, xG and squad availability."
      />

      <Section title="Match predictions" kicker="Quarter-finals" icon="Percent">
        <div className="grid gap-4 lg:grid-cols-2">
          {predicted.map((m, idx) => {
            const h = team(m.homeId);
            const a = team(m.awayId);
            const p = m.prediction!;
            return (
              <Reveal key={m.id} delay={(idx % 2) * 0.05}>
                <div className="panel p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Flag code={h.code} size={22} />
                        <span className="text-[14px] font-semibold">{h.short}</span>
                      </div>
                      <span className="text-[11px] text-ink-3">vs</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold">{a.short}</span>
                        <Flag code={a.code} size={22} />
                      </div>
                    </div>
                    <Ring value={p.confidence} size={46} stroke={5} sublabel="conf." />
                  </div>

                  <ProbBar home={p.homeWin} draw={p.draw} away={p.awayWin} homeLabel={h.short} awayLabel={a.short} />

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {[
                      ["Likely score", p.likelyScore],
                      ["Top scorer", p.likelyScorer.split(" ").slice(-1)[0]],
                      ["Danger man", p.mostDangerous.split(" ").slice(-1)[0]],
                    ].map(([l, v]) => (
                      <div key={l} className="rounded-lg bg-white/[0.02] py-2">
                        <div className="text-[13px] font-semibold">{v}</div>
                        <div className="text-[10px] uppercase tracking-wider text-ink-3">{l}</div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 line-clamp-2 text-[12.5px] leading-relaxed text-ink-2">{p.narrative[0]}</p>

                  <Link href={`/match/${m.id}`} className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-accent">
                    Full analysis <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <TitleRace />
        </Reveal>

        <Reveal delay={0.05}>
          <Section title="Golden Boot projection" kicker="Model" icon="Goal">
            <div className="panel divide-y divide-line/60">
              {GOLDEN_BOOT.map((p, i) => {
                const t = team(p.teamId);
                const proj = p.goals + Math.round((6 - i) / 2);
                return (
                  <div key={p.id} className="flex items-center gap-3 px-4 py-2.5">
                    <span className="tabular w-4 text-center text-[12px] font-bold text-ink-3">{i + 1}</span>
                    <Avatar name={p.name} teamId={p.teamId} seed={p.photoSeed} size={30} />
                    <div className="w-24 shrink-0">
                      <div className="truncate text-[13px] font-medium">{p.name.split(" ").slice(-1)}</div>
                      <div className="flex items-center gap-1 text-[10px] text-ink-3"><Flag code={t.code} size={11} />{t.short}</div>
                    </div>
                    <div className="flex-1"><Meter value={p.goals} max={bootMax} delay={i * 0.05} height={6} /></div>
                    <span className="tabular text-[12px] text-ink-3">now {p.goals}</span>
                    <span className="tabular w-10 text-right text-[13px] font-semibold text-accent">{proj}<span className="text-[10px] text-ink-3"> proj</span></span>
                  </div>
                );
              })}
            </div>
          </Section>
        </Reveal>
      </div>
    </div>
  );
}
