import type { Metadata } from "next";
import { TeamsExplorer } from "@/components/team/TeamsExplorer";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Teams",
  description: "All 48 national teams at the FIFA World Cup 2026.",
};

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        kicker="48 nations"
        title="Teams"
        icon="Shield"
        subtitle="Squad values, form and title odds for every side in the expanded 48-team field."
      />
      <TeamsExplorer />
    </div>
  );
}
