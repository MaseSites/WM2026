import type { Metadata } from "next";
import Link from "next/link";
import { NEWS } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { timeAgo, seeded } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: "The latest World Cup 2026 news, analysis and features.",
};

function cover(seed: number) {
  const hue = Math.round(seeded(seed) * 60 + 140);
  const hue2 = Math.round(seeded(seed + 3) * 80 + 190);
  return `linear-gradient(135deg, hsl(${hue} 45% 18%), hsl(${hue2} 40% 12%))`;
}

export default function NewsPage() {
  const [lead, ...rest] = NEWS;
  return (
    <div className="space-y-6">
      <PageHeader kicker="Newsroom" title="News & Analysis" icon="Newspaper" subtitle="Reporting, tactics and long reads from around the tournament." />

      <Reveal>
        <Link href="#" className="panel panel-hover group grid overflow-hidden lg:grid-cols-2">
          <div className="relative h-56 lg:h-full" style={{ background: cover(lead.imageSeed) }}>
            <div className="absolute left-4 top-4">
              <Pill variant={lead.tag === "LIVE" ? "live" : "accent"} dot={lead.tag === "LIVE"}>{lead.category}</Pill>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6">
            <h2 className="text-balance text-[22px] font-bold leading-tight transition-colors group-hover:text-accent">{lead.title}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{lead.excerpt}</p>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-ink-3">
              <span className="font-medium text-ink-2">{lead.source}</span>
              <span>·</span><span>{timeAgo(lead.minutesAgo)}</span>
              <span>·</span><span>{lead.reading} min read</span>
            </div>
          </div>
        </Link>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((n, i) => (
          <Reveal key={n.id} delay={(i % 3) * 0.05}>
            <Link href="#" className="panel panel-hover group flex h-full flex-col overflow-hidden">
              <div className="relative h-40" style={{ background: cover(n.imageSeed) }}>
                <div className="absolute left-3 top-3">
                  <Pill variant="outline">{n.category}</Pill>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-balance text-[15px] font-semibold leading-snug transition-colors group-hover:text-accent">{n.title}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-ink-2">{n.excerpt}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-3">
                  <span className="font-medium text-ink-2">{n.source}</span>
                  <span>·</span><span>{timeAgo(n.minutesAgo)}</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
