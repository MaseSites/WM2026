import type { Metadata } from "next";
import { MatchesExplorer } from "@/components/match/MatchesExplorer";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Matches",
  description: "Every fixture and result from the FIFA World Cup 2026.",
};

export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Fixtures & results"
        title="Matches"
        icon="CalendarDays"
        subtitle="Live coverage, upcoming ties and full results across the tournament."
      />
      <MatchesExplorer />
    </div>
  );
}
