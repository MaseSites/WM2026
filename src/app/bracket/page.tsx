import type { Metadata } from "next";
import { Bracket } from "@/components/bracket/Bracket";
import { PageHeader } from "@/components/ui/PageHeader";
import { TITLE_CONTENDERS, team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { Meter } from "@/components/charts/Meter";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Knockout Bracket",
  description: "The full FIFA World Cup 2026 knockout bracket — road to the MetLife final.",
};

export default function BracketPage() {
  const finalists = TITLE_CONTENDERS.slice(0, 4);
  const max = finalists[0].winProbability;

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Road to the final"
        title="Knockout Bracket"
        icon="Trophy"
        subtitle="Sixteen became eight. The final is set for MetLife Stadium on 19 July. Tap any tie to open the match centre."
      />

      <Reveal>
        <div className="panel p-4 md:p-7">
          <Bracket />
        </div>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="panel p-5">
            <div className="mb-4 flex items-center gap-2">
              <Icon name="Percent" className="h-4 w-4 text-accent" />
              <h3 className="text-[14px] font-semibold">Projected champion</h3>
              <span className="ml-auto text-[11px] text-ink-3">12,000 simulations</span>
            </div>
            <div className="space-y-3">
              {finalists.map((t, i) => (
                <div key={t.id} className="flex items-center gap-3">
                  <span className="tabular w-4 text-[12px] font-semibold text-ink-3">{i + 1}</span>
                  <Flag code={t.code} size={22} />
                  <span className="w-28 shrink-0 truncate text-[13.5px] font-medium">{t.name}</span>
                  <div className="flex-1">
                    <Meter value={t.winProbability} max={max} delay={i * 0.06} height={8} />
                  </div>
                  <span className="tabular w-12 text-right text-[13px] font-semibold text-accent">
                    {t.winProbability.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="panel flex flex-col justify-between p-5">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Icon name="MapPin" className="h-4 w-4 text-accent" />
                <h3 className="text-[14px] font-semibold">The final</h3>
              </div>
              <div className="text-[15px] font-semibold">MetLife Stadium</div>
              <div className="text-[13px] text-ink-2">New York / New Jersey</div>
              <div className="mt-3 flex items-center gap-2 text-[13px] text-ink-2">
                <Icon name="CalendarDays" className="h-4 w-4 text-ink-3" />
                Sunday, 19 July 2026 · 19:00 ET
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[13px] text-ink-2">
                <Icon name="Users" className="h-4 w-4 text-ink-3" />
                82,500 capacity
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-white/[0.02] p-3 text-[12px] leading-relaxed text-ink-3">
              A rematch of the 2022 final is the single most likely outcome at 6.4%, with
              five nations still holding double-digit title odds.
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
