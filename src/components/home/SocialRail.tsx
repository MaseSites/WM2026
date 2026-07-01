import Link from "next/link";
import { TRANSFERS, DISCUSSIONS } from "@/lib/data";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/ui/Icon";
import { timeAgo, formatNumber } from "@/lib/utils";

export function TransfersCard() {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon name="Repeat" className="h-4 w-4 text-accent" />
          <span className="text-[13px] font-semibold">Latest transfers</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-ink-3">Window</span>
      </div>
      <div className="divide-y divide-line/60">
        {TRANSFERS.slice(0, 5).map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium">{t.playerName}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-ink-3">
                <span className="truncate">{t.from}</span>
                <Icon name="ArrowRight" className="h-3 w-3 shrink-0" />
                <span className="truncate text-ink-2">{t.to}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="tabular text-[12.5px] font-semibold">{t.fee}</div>
              <Pill
                variant={t.status === "Done" ? "accent" : t.status === "Loan" ? "info" : "draw"}
                className="mt-0.5"
              >
                {t.status}
              </Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DiscussionsCard() {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon name="Flame" className="h-4 w-4 text-live" />
          <span className="text-[13px] font-semibold">Trending discussions</span>
        </div>
        <Link href="#" className="text-[11px] font-medium text-accent">
          Open forum
        </Link>
      </div>
      <div className="divide-y divide-line/60">
        {DISCUSSIONS.map((d) => (
          <Link
            key={d.id}
            href="#"
            className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Pill variant="outline">{d.tag}</Pill>
                {d.hot && (
                  <span className="flex items-center gap-0.5 text-[10px] font-semibold text-live">
                    <Icon name="Flame" className="h-3 w-3" /> Hot
                  </span>
                )}
              </div>
              <h4 className="mt-1.5 text-[13.5px] font-medium leading-snug transition-colors group-hover:text-accent">
                {d.title}
              </h4>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-ink-3">
                <span>@{d.author}</span>
                <span className="flex items-center gap-1">
                  <Icon name="MessageSquare" className="h-3 w-3" />
                  {formatNumber(d.replies)}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Heart" className="h-3 w-3" />
                  {formatNumber(d.likes)}
                </span>
                <span>{timeAgo(d.minutesAgo)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
