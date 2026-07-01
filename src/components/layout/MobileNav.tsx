"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_NAV } from "@/lib/nav";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas/85 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {MOBILE_NAV.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                active ? "text-ink" : "text-ink-3",
              )}
            >
              <span className="relative">
                <Icon
                  name={item.icon}
                  className={cn("h-[22px] w-[22px]", active && "text-accent")}
                />
                {item.badge === "live" && (
                  <span className="live-dot absolute -right-1 -top-0.5 h-1.5 w-1.5 rounded-full bg-live" />
                )}
              </span>
              {item.label}
              {active && (
                <span className="absolute -top-px h-0.5 w-8 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
