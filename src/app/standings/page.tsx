import type { Metadata } from "next";
import { GROUP_TEAMS, GROUPS } from "@/lib/data";
import { StandingsTable } from "@/components/standings/StandingsTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Groups",
  description: "Final group-stage outcomes for all 12 groups of the FIFA World Cup 2026.",
};

export default function StandingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Group stage · complete"
        title="Groups"
        icon="ListOrdered"
        subtitle="All twelve groups have been decided. The top two of each group plus the eight best third-placed sides advanced to the Round of 32."
      >
        <div className="flex items-center gap-4 text-[12px]">
          <span className="flex items-center gap-1.5 text-ink-2">
            <span className="rounded bg-accent/12 px-1.5 py-0.5 text-[10px] font-semibold text-accent">R32</span>
            Advanced
          </span>
        </div>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {GROUPS.map((g, i) => (
          <Reveal key={g} delay={(i % 3) * 0.05}>
            <StandingsTable group={g} teams={GROUP_TEAMS[g]} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
