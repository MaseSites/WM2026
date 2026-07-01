"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { timeAgo } from "@/lib/utils";

const NOTIFS = [
  { icon: "Goal", tint: "text-accent", title: "GOAL — France 2–1 Brazil", body: "Dembélé (58′), assist Mbappé", ago: 9 },
  { icon: "Goal", tint: "text-accent", title: "GOAL — Argentina 1–1 Spain", body: "J. Álvarez (44′), assist Messi", ago: 23 },
  { icon: "ShieldAlert", tint: "text-draw", title: "Yellow card", body: "Cucurella booked (Spain, 51′)", ago: 16 },
  { icon: "Medal", tint: "text-info", title: "Leaderboard update", body: "You climbed to #4 (+3 this round)", ago: 40 },
  { icon: "Users", tint: "text-ink-2", title: "Group invite", body: "Sofia invited you to “Semi Sleepers”", ago: 120 },
];

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.02] text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
        aria-label="Notifications"
      >
        <Icon name="Bell" className="h-[18px] w-[18px]" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-live ring-2 ring-canvas" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-xl border border-line-strong shadow-2xl shadow-black/50"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="text-[13px] font-semibold">Notifications</span>
                <button className="text-[11px] font-medium text-accent">Mark all read</button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {NOTIFS.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border-b border-line/60 px-4 py-3 transition-colors last:border-0 hover:bg-white/[0.03]"
                  >
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/[0.05]">
                      <Icon name={n.icon} className={`h-4 w-4 ${n.tint}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-medium leading-snug text-ink">
                        {n.title}
                      </div>
                      <div className="text-[11.5px] text-ink-2">{n.body}</div>
                    </div>
                    <span className="shrink-0 text-[10px] text-ink-3">{timeAgo(n.ago)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
