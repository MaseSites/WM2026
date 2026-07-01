"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MATCHES } from "@/lib/data";
import { MatchCard } from "./MatchCard";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "scheduled", label: "Upcoming" },
  { id: "finished", label: "Results" },
] as const;

const STAGE_ORDER = ["Quarter-final", "Round of 16", "Round of 32", "Group"];

export function MatchesExplorer() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const matches = MATCHES.filter((m) => {
    if (filter === "all") return true;
    if (filter === "live") return m.status === "live" || m.status === "halftime";
    return m.status === filter;
  });

  const stages = STAGE_ORDER.filter((s) => matches.some((m) => m.stage === s));

  return (
    <div className="space-y-6">
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto rounded-xl border border-line bg-surface/40 p-1.5">
        {FILTERS.map((f) => {
          const on = f.id === filter;
          const count =
            f.id === "all"
              ? MATCHES.length
              : f.id === "live"
                ? MATCHES.filter((m) => m.status === "live" || m.status === "halftime").length
                : MATCHES.filter((m) => m.status === f.id).length;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                on ? "text-ink" : "text-ink-2 hover:text-ink",
              )}
            >
              {on && (
                <motion.span
                  layoutId="match-filter"
                  className="absolute inset-0 rounded-lg bg-white/[0.06] ring-1 ring-white/10"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                {f.id === "live" && count > 0 && (
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
                )}
                {f.label}
                <span className="tabular text-[11px] text-ink-3">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {matches.length === 0 && (
            <div className="panel flex flex-col items-center justify-center py-16 text-center">
              <div className="text-[14px] font-medium">No matches here right now</div>
              <div className="mt-1 text-[13px] text-ink-3">Try a different filter.</div>
            </div>
          )}
          {stages.map((stage) => (
            <div key={stage}>
              <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-ink-3">
                {stage}
                <div className="h-px flex-1 bg-line" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {matches
                  .filter((m) => m.stage === stage)
                  .map((m) => (
                    <MatchCard key={m.id} m={m} />
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
