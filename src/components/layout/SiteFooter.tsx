import Link from "next/link";
import { Logo } from "./Logo";
import { Flag } from "@/components/ui/Flag";

const COLS = [
  { title: "Tournament", links: [["Home", "/"], ["Live Center", "/live"], ["Matches", "/matches"], ["Bracket", "/bracket"], ["Standings", "/standings"]] },
  { title: "Explore", links: [["Teams", "/teams"], ["Players", "/players"], ["News", "/news"], ["Predictions", "/predictions"]] },
  { title: "Compete", links: [["Leaderboard", "/leaderboard"], ["Profile", "/profile"], ["Fantasy", "/leaderboard"], ["Badges", "/profile"]] },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-line px-4 py-10 md:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
            The definitive companion to the FIFA World Cup 2026. Built for fans who
            live for the detail.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Flag code="us" size={22} />
            <Flag code="ca" size={22} />
            <Flag code="mx" size={22} />
            <span className="ml-1 text-[11px] text-ink-3">11 June – 19 July 2026</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 sm:gap-14">
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label + href}>
                    <Link
                      href={href}
                      className="text-[13px] text-ink-2 transition-colors hover:text-ink"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1200px] flex-col items-start justify-between gap-3 border-t border-line pt-6 text-[11.5px] text-ink-3 sm:flex-row sm:items-center">
        <span>© 2026 WorldMap. A demo product — not affiliated with FIFA.</span>
        <div className="flex gap-5">
          <Link href="#" className="hover:text-ink-2">Privacy</Link>
          <Link href="#" className="hover:text-ink-2">Terms</Link>
          <Link href="#" className="hover:text-ink-2">Press kit</Link>
        </div>
      </div>
    </footer>
  );
}
