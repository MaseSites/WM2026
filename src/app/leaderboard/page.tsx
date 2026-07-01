import type { Metadata } from "next";
import { LEADERBOARD, BADGES } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { BadgeCard } from "@/components/ui/BadgeCard";
import { Icon } from "@/components/ui/Icon";
import { initials, formatNumber, cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Prediction rankings, badges and tip groups.",
};

const GROUPS = [
  { name: "The MetLife Mystics", members: 24, rank: 3, icon: "Trophy", color: "#00E676" },
  { name: "Semi Sleepers", members: 12, rank: 1, icon: "Flame", color: "#FFC107" },
  { name: "Office League", members: 48, rank: 9, icon: "Users", color: "#4d9dff" },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Compete"
        title="Leaderboard"
        icon="Medal"
        subtitle="Predict every match, climb the global table and earn badges. Create private groups and settle it with friends."
      >
        <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-ink transition-transform active:scale-[0.98]">
          <Icon name="Users" className="h-4 w-4" /> Create group
        </button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Section title="Global ranking" kicker="This round" icon="Medal">
          <div className="panel divide-y divide-line/60">
            {LEADERBOARD.map((u) => {
              const you = u.name === "You";
              return (
                <div key={u.rank} className={cn("flex items-center gap-3 px-4 py-3", you && "bg-accent/[0.05]")}>
                  <span className={cn("tabular w-6 text-center text-[14px] font-bold", u.rank <= 3 ? "text-draw" : "text-ink-3")}>
                    {u.rank}
                  </span>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-[12px] font-bold text-accent-ink"
                    style={{ background: you ? "radial-gradient(120% 120% at 30% 20%, #00E676, #0bbf66)" : "linear-gradient(135deg,#2a3350,#1a2136)" }}
                  >
                    <span className={you ? "" : "text-ink"}>{initials(u.name)}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[13.5px] font-medium">
                      {u.name} {you && <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">YOU</span>}
                    </div>
                    <div className="text-[11px] text-ink-3">{u.handle}</div>
                  </div>
                  <div className="hidden items-center gap-1 text-[11px] text-draw sm:flex">
                    <Icon name="Flame" className="h-3.5 w-3.5" /> {u.streak}
                  </div>
                  <span className="tabular w-16 text-right text-[14px] font-semibold">{formatNumber(u.points)}</span>
                  <span className={cn("flex w-8 items-center justify-end gap-0.5 text-[11px] font-semibold", u.delta > 0 ? "text-accent" : u.delta < 0 ? "text-live" : "text-ink-3")}>
                    {u.delta !== 0 && <Icon name={u.delta > 0 ? "TrendingUp" : "TrendingDown"} className="h-3 w-3" />}
                    {u.delta !== 0 ? Math.abs(u.delta) : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Your groups" kicker="Private leagues" icon="Users">
          <div className="space-y-3">
            {GROUPS.map((g) => (
              <div key={g.name} className="panel panel-hover flex items-center gap-3 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl ring-1 ring-white/10" style={{ background: `${g.color}1f`, color: g.color }}>
                  <Icon name={g.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-semibold">{g.name}</div>
                  <div className="text-[11.5px] text-ink-3">{g.members} members</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-ink-3">Your rank</div>
                  <div className="tabular text-[15px] font-semibold" style={{ color: g.color }}>#{g.rank}</div>
                </div>
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong py-3 text-[13px] font-medium text-ink-2 transition-colors hover:border-accent/40 hover:text-ink">
              <Icon name="Users" className="h-4 w-4" /> Join or create a group
            </button>
          </div>
        </Section>
      </div>

      <Section title="Achievements" kicker="Badges" icon="Award">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {BADGES.map((b) => (
            <BadgeCard key={b.id} badge={b} />
          ))}
        </div>
      </Section>
    </div>
  );
}
