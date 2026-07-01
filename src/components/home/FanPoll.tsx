"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Poll } from "@/lib/data/content";
import { team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { formatNumber, cn } from "@/lib/utils";

export function FanPoll({ poll }: { poll: Poll }) {
  const [voted, setVoted] = useState<string | null>(null);
  const base = poll.options.reduce((s, o) => s + o.votes, 0);
  const total = base + (voted ? 1 : 0);

  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-white/[0.05] ring-1 ring-white/10">
          <Icon name="BarChart3" className="h-4 w-4 text-accent" />
        </span>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent/80">
            Fan poll
          </div>
          <h3 className="text-[14px] font-semibold leading-tight">{poll.question}</h3>
        </div>
      </div>

      <div className="space-y-1.5">
        {poll.options.map((o) => {
          const votes = o.votes + (voted === o.label ? 1 : 0);
          const pct = total ? (votes / total) * 100 : 0;
          const isChoice = voted === o.label;
          return (
            <button
              key={o.label}
              disabled={!!voted}
              onClick={() => setVoted(o.label)}
              className={cn(
                "relative w-full overflow-hidden rounded-lg border px-3 py-2.5 text-left transition-colors",
                voted
                  ? isChoice
                    ? "border-accent/40 bg-accent/[0.04]"
                    : "border-line bg-transparent"
                  : "border-line hover:border-line-strong hover:bg-white/[0.03]",
              )}
            >
              {voted && (
                <motion.span
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-lg",
                    isChoice ? "bg-accent/15" : "bg-white/[0.04]",
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative flex items-center gap-2.5">
                {o.teamId && <Flag code={team(o.teamId)!.code} size={18} />}
                <span className="text-[13px] font-medium">{o.label}</span>
                {voted && (
                  <span className="ml-auto flex items-center gap-2">
                    {isChoice && <Icon name="Check" className="h-3.5 w-3.5 text-accent" />}
                    <span className="tabular text-[12.5px] font-semibold">
                      {pct.toFixed(0)}%
                    </span>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-ink-3">
        <span>{formatNumber(total)} votes</span>
        {voted ? (
          <span className="text-accent">Thanks for voting</span>
        ) : (
          <span>Tap to cast your vote</span>
        )}
      </div>
    </div>
  );
}
