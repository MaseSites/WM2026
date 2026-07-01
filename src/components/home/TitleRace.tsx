import Link from "next/link";
import { TITLE_CONTENDERS, team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { Meter } from "@/components/charts/Meter";
import { Section } from "@/components/ui/Section";

export function TitleRace() {
  const max = TITLE_CONTENDERS[0].winProbability;
  return (
    <Section title="Title race" kicker="Model" icon="Percent" action="All odds" actionHref="/predictions">
      <div className="panel divide-y divide-line/60">
        {TITLE_CONTENDERS.map((t, i) => (
          <Link
            key={t.id}
            href={`/team/${t.id}`}
            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
          >
            <span className="tabular w-4 text-center text-[12px] font-semibold text-ink-3">
              {i + 1}
            </span>
            <Flag code={t.code} size={22} />
            <span className="w-24 shrink-0 truncate text-[13.5px] font-medium sm:w-32">
              {t.name}
            </span>
            <div className="flex-1">
              <Meter value={t.winProbability} max={max} delay={i * 0.05} height={7} />
            </div>
            <span className="tabular w-12 text-right text-[13px] font-semibold text-accent">
              {t.winProbability.toFixed(1)}%
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
