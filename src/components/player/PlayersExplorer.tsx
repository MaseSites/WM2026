"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PLAYERS, team } from "@/lib/data";
import { PlayerRow } from "./PlayerRow";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const POS = ["All", "GK", "DF", "MF", "FW"];
const SORTS = [
  { id: "rating", label: "Rating" },
  { id: "goals", label: "Goals" },
  { id: "value", label: "Value" },
] as const;

export function PlayersExplorer() {
  const [pos, setPos] = useState("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("rating");
  const [q, setQ] = useState("");

  const players = useMemo(() => {
    let list = PLAYERS.filter((p) => (pos === "All" ? true : p.position === pos));
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(s) || team(p.teamId)?.name.toLowerCase().includes(s),
      );
    }
    return [...list].sort((a, b) => {
      if (sort === "goals") return b.goals - a.goals || b.assists - a.assists;
      if (sort === "value") return b.marketValue - a.marketValue;
      return b.rating - a.rating;
    });
  }, [pos, sort, q]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-1.5 rounded-xl border border-line bg-surface/40 p-1.5">
          {POS.map((p) => (
            <button
              key={p}
              onClick={() => setPos(p)}
              className={cn(
                "relative rounded-lg px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                p === pos ? "text-ink" : "text-ink-2 hover:text-ink",
              )}
            >
              {p === pos && (
                <motion.span
                  layoutId="pos-pill"
                  className="absolute inset-0 rounded-lg bg-white/[0.06] ring-1 ring-white/10"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative">{p}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3">
            <Icon name="Search" className="h-4 w-4 text-ink-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a player"
              className="w-36 bg-transparent text-[13px] outline-none placeholder:text-ink-3"
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

      <div className="panel divide-y divide-line/60">
        {players.map((p) => (
          <PlayerRow key={p.id} p={p} showTeam />
        ))}
        {players.length === 0 && (
          <div className="py-14 text-center text-[13px] text-ink-3">No players match your filters.</div>
        )}
      </div>
    </div>
  );
}
