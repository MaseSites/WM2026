import Link from "next/link";
import type { Team } from "@/lib/types";
import { advanced } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { FormDots } from "@/components/ui/FormDots";
import { cn } from "@/lib/utils";

// Group-stage outcome card. Teams that reached the Round of 32 are marked;
// the rest were eliminated. Order surfaces advancing teams first.
export function StandingsTable({
  group,
  teams,
  compact = false,
}: {
  group: string;
  teams: Team[];
  compact?: boolean;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-[13px] font-semibold">Group {group}</span>
        <span className="text-[10px] uppercase tracking-wider text-ink-3">Group stage · final</span>
      </div>
      <div className="divide-y divide-line/50">
        {teams.map((t) => {
          const adv = advanced(t.id);
          return (
            <Link
              key={t.id}
              href={`/team/${t.id}`}
              className="relative flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.02]"
            >
              {adv && (
                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
              )}
              <Flag code={t.code} size={22} />
              <span className={cn("flex-1 truncate text-[13.5px]", adv ? "font-medium" : "text-ink-2")}>
                {compact ? t.short : t.name}
              </span>
              {!compact && <FormDots form={t.form} className="hidden sm:flex" />}
              <span className="tabular text-[11px] text-ink-3">#{t.fifaRank}</span>
              {adv ? (
                <span className="rounded bg-accent/12 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                  R32
                </span>
              ) : (
                <span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-ink-3">
                  OUT
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
