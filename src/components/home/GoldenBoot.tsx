import Link from "next/link";
import { GOLDEN_BOOT, team } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Flag } from "@/components/ui/Flag";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function GoldenBoot() {
  return (
    <Section title="Golden Boot race" kicker="Top scorers" icon="Goal" action="Full chart" actionHref="/players">
      <div className="panel divide-y divide-line/60">
        {GOLDEN_BOOT.map((p, i) => {
          const t = team(p.teamId);
          return (
            <Link
              key={p.id}
              href={`/player/${p.id}`}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.02]"
            >
              <span
                className={
                  "tabular w-5 text-center text-[12px] font-bold " +
                  (i === 0 ? "text-draw" : "text-ink-3")
                }
              >
                {i + 1}
              </span>
              <Avatar name={p.name} teamId={p.teamId} seed={p.photoSeed} size={34} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-medium">{p.name}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-ink-3">
                  <Flag code={t.code} size={13} />
                  {t.short} · {p.detailPosition}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="tabular flex items-center gap-1 text-[15px] font-semibold">
                    <Icon name="Goal" className="h-3.5 w-3.5 text-accent" />
                    {p.goals}
                  </div>
                </div>
                <div className="hidden text-right text-[11px] text-ink-3 sm:block">
                  <span className="tabular">{p.assists}</span> ast
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
