import Link from "next/link";
import { CommandPalette } from "./CommandPalette";
import { Logo } from "./Logo";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { TOURNAMENT } from "@/lib/data";
import { NotificationsBell } from "./NotificationsBell";

export function Topbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-3 border-b border-line bg-canvas/70 px-4 backdrop-blur-xl md:px-6">
      <Link href="/" className="lg:hidden" aria-label="WorldMap home">
        <Logo size={28} />
      </Link>

      <div className="hidden flex-1 md:block">
        <CommandPalette />
      </div>
      <div className="flex-1 md:hidden" />

      <div className="hidden items-center gap-2 lg:flex">
        <Pill variant="accent" dot>
          {TOURNAMENT.stage}
        </Pill>
      </div>

      <NotificationsBell />

      <button className="flex items-center gap-2 rounded-full border border-line bg-white/[0.02] py-1 pl-1 pr-2.5 transition-colors hover:border-line-strong">
        <span
          className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold text-accent-ink"
          style={{ background: "radial-gradient(120% 120% at 30% 20%, #00E676, #0bbf66)" }}
        >
          EC
        </span>
        <span className="hidden text-[13px] font-medium sm:block">Enea</span>
        <Icon name="ChevronDown" className="hidden h-3.5 w-3.5 text-ink-3 sm:block" />
      </button>
    </header>
  );
}
