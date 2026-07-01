import type { Metadata } from "next";
import { PlayersExplorer } from "@/components/player/PlayersExplorer";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Players",
  description: "Star players, ratings and the Golden Boot race at the World Cup 2026.",
};

export default function PlayersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Stars of the tournament"
        title="Players"
        icon="Users"
        subtitle="Sortable ratings, goals and market values for the players lighting up the World Cup."
      />
      <PlayersExplorer />
    </div>
  );
}
