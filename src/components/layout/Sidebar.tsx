"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { LIVE_MATCHES } from "@/lib/data";

export function Sidebar() {
  const pathname = usePathname();
  const liveCount = LIVE_MATCHES.length;

  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-line bg-surface/40 lg:flex">
      <div className="flex h-16 items-center px-5">
        <Link href="/" aria-label="WorldMap home">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-3">
        {NAV.map((group) => (
          <div key={group.section}>
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3">
              {group.section}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
                      active
                        ? "bg-white/[0.06] text-ink"
                        : "text-ink-2 hover:bg-white/[0.03] hover:text-ink",
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
                    )}
                    <Icon
                      name={item.icon}
                      className={cn(
                        "h-[18px] w-[18px] transition-colors",
                        active ? "text-accent" : "text-ink-3 group-hover:text-ink-2",
                      )}
                    />
                    {item.label}
                    {item.badge === "live" && liveCount > 0 && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-live/12 px-1.5 py-0.5 text-[10px] font-semibold text-live">
                        <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
                        {liveCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="rounded-xl bg-gradient-to-b from-accent/[0.08] to-transparent p-3 ring-1 ring-accent/15">
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <Icon name="Sparkles" className="h-4 w-4 text-accent" />
            Go Pro
          </div>
          <p className="mt-1 text-[11.5px] leading-snug text-ink-2">
            Advanced xG models, ad-free live, and unlimited prediction groups.
          </p>
          <button className="mt-2.5 w-full rounded-lg bg-accent px-3 py-1.5 text-[12.5px] font-semibold text-accent-ink transition-transform active:scale-[0.98]">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
