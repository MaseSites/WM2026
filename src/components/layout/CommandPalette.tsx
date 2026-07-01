"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Flag } from "@/components/ui/Flag";
import { Avatar } from "@/components/ui/Avatar";
import { TEAMS, PLAYERS, MATCHES, team } from "@/lib/data";
import { cn } from "@/lib/utils";

type Result = {
  id: string;
  type: "Team" | "Player" | "Match" | "Page";
  title: string;
  subtitle: string;
  href: string;
  code?: string;
  seed?: number;
  teamId?: string;
};

const PAGES: Result[] = [
  { id: "p-live", type: "Page", title: "Live Center", subtitle: "Real-time match hub", href: "/live" },
  { id: "p-bracket", type: "Page", title: "Knockout Bracket", subtitle: "Road to the final", href: "/bracket" },
  { id: "p-standings", type: "Page", title: "Group Standings", subtitle: "All 12 groups", href: "/standings" },
  { id: "p-pred", type: "Page", title: "Predictions", subtitle: "Model & AI analysis", href: "/predictions" },
  { id: "p-lead", type: "Page", title: "Leaderboard", subtitle: "Prediction rankings", href: "/leaderboard" },
];

const INDEX: Result[] = [
  ...TEAMS.map((t) => ({
    id: t.id, type: "Team" as const, title: t.name,
    subtitle: `Group ${t.group} · FIFA #${t.fifaRank}`, href: `/team/${t.id}`, code: t.code,
  })),
  ...PLAYERS.map((p) => ({
    id: p.id, type: "Player" as const, title: p.name,
    subtitle: `${team(p.teamId)?.name} · ${p.detailPosition}`, href: `/player/${p.id}`,
    seed: p.photoSeed, teamId: p.teamId,
  })),
  ...MATCHES.map((m) => ({
    id: m.id, type: "Match" as const,
    title: `${team(m.homeId)?.short} vs ${team(m.awayId)?.short}`,
    subtitle: `${m.stage}`, href: `/match/${m.id}`,
  })),
  ...PAGES,
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) {
      return [
        ...INDEX.filter((r) => r.type === "Page"),
        ...INDEX.filter((r) => r.type === "Match").slice(0, 3),
      ];
    }
    return INDEX.filter(
      (r) =>
        r.title.toLowerCase().includes(query) ||
        r.subtitle.toLowerCase().includes(query),
    ).slice(0, 12);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  const go = (r: Result) => {
    setOpen(false);
    router.push(r.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      go(results[active]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex h-9 w-full max-w-sm items-center gap-2.5 rounded-lg border border-line bg-white/[0.02] px-3 text-ink-3 transition-colors hover:border-line-strong hover:bg-white/[0.04]"
      >
        <Icon name="Search" className="h-4 w-4" />
        <span className="text-[13px]">Search teams, players, matches…</span>
        <span className="ml-auto hidden items-center gap-0.5 rounded border border-line px-1.5 py-0.5 text-[10px] font-medium text-ink-3 sm:flex">
          <Icon name="Command" className="h-3 w-3" />K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-canvas/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="glass relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong shadow-2xl shadow-black/50"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Icon name="Search" className="h-4.5 w-4.5 text-ink-3" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search the tournament…"
                  className="h-14 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-3">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <div className="px-4 py-10 text-center text-sm text-ink-3">
                    No results for “{q}”
                  </div>
                )}
                {results.map((r, i) => (
                  <button
                    key={r.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      i === active ? "bg-white/[0.06]" : "hover:bg-white/[0.03]",
                    )}
                  >
                    {r.type === "Team" && r.code ? (
                      <Flag code={r.code} size={22} />
                    ) : r.type === "Player" ? (
                      <Avatar name={r.title} teamId={r.teamId} seed={r.seed} size={26} />
                    ) : (
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-white/[0.05] text-ink-3">
                        <Icon
                          name={r.type === "Match" ? "Goal" : "ArrowUpRight"}
                          className="h-3.5 w-3.5"
                        />
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="truncate text-[13.5px] font-medium text-ink">
                        {r.title}
                      </div>
                      <div className="truncate text-[11.5px] text-ink-3">{r.subtitle}</div>
                    </div>
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-ink-3">
                      {r.type}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
