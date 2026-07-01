import Link from "next/link";
import { NEWS } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Pill";
import { timeAgo, seeded, cn } from "@/lib/utils";

function cover(seed: number) {
  const hue = Math.round(seeded(seed) * 60 + 140);
  const hue2 = Math.round(seeded(seed + 3) * 80 + 190);
  return `linear-gradient(135deg, hsl(${hue} 45% 18%), hsl(${hue2} 40% 12%))`;
}

export function NewsGrid() {
  const [lead, ...rest] = NEWS;
  return (
    <Section title="Top stories" kicker="Newsroom" icon="Newspaper" action="All news" actionHref="/news">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {/* Lead story */}
        <Link href="/news" className="panel panel-hover group overflow-hidden">
          <div className="relative h-48 overflow-hidden sm:h-56" style={{ background: cover(lead.imageSeed) }}>
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 40%)",
            }} />
            <div className="absolute left-3 top-3 flex gap-2">
              <Pill variant={lead.tag === "LIVE" ? "live" : "accent"} dot={lead.tag === "LIVE"}>
                {lead.category}
              </Pill>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-balance text-[17px] font-semibold leading-snug transition-colors group-hover:text-accent">
              {lead.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-2">
              {lead.excerpt}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-3">
              <span className="font-medium text-ink-2">{lead.source}</span>
              <span>·</span>
              <span>{timeAgo(lead.minutesAgo)}</span>
              <span>·</span>
              <span>{lead.reading} min read</span>
            </div>
          </div>
        </Link>

        {/* Secondary list */}
        <div className="panel divide-y divide-line/60">
          {rest.slice(0, 4).map((n) => (
            <Link
              key={n.id}
              href="/news"
              className="group flex gap-3 p-3 transition-colors hover:bg-white/[0.02]"
            >
              <div
                className="h-16 w-16 shrink-0 rounded-lg"
                style={{ background: cover(n.imageSeed) }}
              />
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent/80">
                    {n.category}
                  </span>
                  <span className="text-[10px] text-ink-3">{timeAgo(n.minutesAgo)}</span>
                </div>
                <h4 className={cn(
                  "line-clamp-2 text-[13.5px] font-medium leading-snug transition-colors group-hover:text-accent",
                )}>
                  {n.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
