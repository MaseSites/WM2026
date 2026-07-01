import type { Metadata } from "next";
import Link from "next/link";
import { RESULTS, team, BADGES } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { BadgeCard } from "@/components/ui/BadgeCard";
import { ConfettiButton } from "@/components/ui/Confetti";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { FormDots } from "@/components/ui/FormDots";
import { seeded, cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Your predictions, achievements and activity.",
};

const STATS = [
  { label: "Global rank", value: "#4", icon: "Medal", accent: true },
  { label: "Points", value: "2,680", icon: "Star" },
  { label: "Win streak", value: "7", icon: "Flame" },
  { label: "Accuracy", value: "78%", icon: "Target" },
  { label: "Correct picks", value: "142", icon: "Check" },
  { label: "Best week", value: "94%", icon: "TrendingUp" },
];

export default function ProfilePage() {
  const fav = team("italy");
  const history = RESULTS.slice(0, 6).map((m, i) => {
    const h = team(m.homeId);
    const a = team(m.awayId);
    const correct = seeded(i * 9 + 2) > 0.35;
    const pick = seeded(i * 4 + 1) > 0.5 ? h.short : a.short;
    return { m, h, a, correct, pick, pts: correct ? (seeded(i) > 0.7 ? 30 : 15) : 0 };
  });
  const earned = BADGES.filter((b) => b.earned);

  return (
    <div className="space-y-8">
      <PageHeader kicker="Account" title="My Profile" icon="CircleUser" />

      {/* Identity */}
      <div className="relative overflow-hidden rounded-2xl border border-line panel">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(600px 220px at 10% -30%, rgba(0,230,118,0.14), transparent 60%)" }} />
        <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <span className="grid h-20 w-20 place-items-center rounded-2xl text-2xl font-bold text-accent-ink shadow-xl" style={{ background: "radial-gradient(120% 120% at 30% 20%, #00E676, #0bbf66)" }}>
              EC
            </span>
            <div>
              <h1 className="text-[24px] font-bold tracking-tight">Enea Cico</h1>
              <p className="text-[13px] text-ink-2">@enea · Joined June 2026</p>
              <div className="mt-2 flex items-center gap-4 text-[12px] text-ink-3">
                <span><span className="font-semibold text-ink">312</span> followers</span>
                <span><span className="font-semibold text-ink">198</span> following</span>
                <Link href="/team/italy" className="flex items-center gap-1.5 hover:text-ink">
                  <Flag code={fav.code} size={14} /> Supports {fav.short}
                </Link>
              </div>
            </div>
          </div>
          <ConfettiButton />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="panel p-4">
            <Icon name={s.icon} className={cn("h-4 w-4", s.accent ? "text-accent" : "text-ink-3")} />
            <div className={cn("tabular mt-2 text-xl font-semibold", s.accent && "text-accent")}>{s.value}</div>
            <div className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-3">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Section title="Prediction history" kicker="Recent picks" icon="Sparkles">
          <div className="panel divide-y divide-line/60">
            {history.map(({ m, h, a, correct, pick, pts }) => (
              <div key={m.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Flag code={h.code} size={18} />
                  <span className="text-[12.5px] font-medium">{h.short}</span>
                  <span className="tabular text-[12.5px] text-ink-2">{m.homeScore}–{m.awayScore}</span>
                  <span className="text-[12.5px] font-medium">{a.short}</span>
                  <Flag code={a.code} size={18} />
                </div>
                <span className="ml-auto text-[11px] text-ink-3">Pick <span className="font-medium text-ink-2">{pick}</span></span>
                <span className={cn("grid h-6 w-6 place-items-center rounded-full", correct ? "bg-accent/12 text-accent" : "bg-live/12 text-live")}>
                  <Icon name={correct ? "Check" : "X"} className="h-3.5 w-3.5" />
                </span>
                <span className={cn("tabular w-10 text-right text-[13px] font-semibold", correct ? "text-accent" : "text-ink-3")}>
                  +{pts}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <div className="space-y-6">
          <Section title="Favourite team" kicker="Following" icon="Shield">
            <Link href="/team/italy" className="panel panel-hover flex items-center gap-3 p-4">
              <Flag code={fav.code} size={44} rounded="rounded-lg" />
              <div className="flex-1">
                <div className="text-[14px] font-semibold">{fav.name}</div>
                <div className="text-[11.5px] text-ink-3">{fav.nickname}</div>
              </div>
              <FormDots form={fav.form} />
            </Link>
          </Section>

          <Section title="Badges earned" kicker={`${earned.length} of ${BADGES.length}`} icon="Award">
            <div className="grid grid-cols-3 gap-3">
              {earned.map((b) => (
                <BadgeCard key={b.id} badge={b} />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
