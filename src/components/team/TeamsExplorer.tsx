"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TEAMS } from "@/lib/data";
import { TeamCard } from "./TeamCard";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const CONFEDS = ["All", "UEFA", "CONMEBOL", "CONCACAF", "CAF", "AFC", "OFC"];
const SORTS = [
  { id: "rank", label: "FIFA rank" },
  { id: "value", label: "Squad value" },
  { id: "odds", label: "Title odds" },
] as const;

export function TeamsExplorer() {
  const [confed, setConfed] = useState("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("rank");
  const [q, setQ] = useState("");

  const teams = useMemo(() => {
    let list = TEAMS.filter((t) => (confed === "All" ? true : t.confederation === confed));
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(s) || t.nickname.toLowerCase().includes(s));
    }
    return [...list].sort((a, b) => {
      if (sort === "rank") return a.fifaRank - b.fifaRank;
      if (sort === "value") return b.marketValue - a.marketValue;
      return b.winProbability - a.winProbability;
    });
  }, [confed, sort, q]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto rounded-xl border border-line bg-surface/40 p-1.5">
          {CONFEDS.map((c) => (
            <button
              key={c}
              onClick={() => setConfed(c)}
              className={cn(
                "relative shrink-0 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                c === confed ? "text-ink" : "text-ink-2 hover:text-ink",
              )}
            >
              {c === confed && (
                <motion.span
                  layoutId="confed-pill"
                  className="absolute inset-0 rounded-lg bg-white/[0.06] ring-1 ring-white/10"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3">
            <Icon name="Search" className="h-4 w-4 text-ink-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a team"
              className="w-32 bg-transparent text-[13px] outline-none placeholder:text-ink-3"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="h-9 rounded-lg border border-line bg-surface px-3 text-[13px] text-ink-2 outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id} className="bg-surface">
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teams.map((t) => (
          <TeamCard key={t.id} t={t} />
        ))}
      </div>
      {teams.length === 0 && (
        <div className="panel py-14 text-center text-[13px] text-ink-3">No teams match your filters.</div>
      )}
    </div>
  );
}
