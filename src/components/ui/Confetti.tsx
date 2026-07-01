"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";
import { seeded } from "@/lib/utils";

const COLORS = ["#00E676", "#FFC107", "#4d9dff", "#FF4D4D", "#ffffff", "#a855f7"];

export function ConfettiButton({ label = "Claim weekly reward" }: { label?: string }) {
  const [fired, setFired] = useState(false);
  const [done, setDone] = useState(false);

  const pieces = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        color: COLORS[i % COLORS.length],
        x: (seeded(i * 3.1) - 0.5) * 900,
        y: 260 + seeded(i * 5.7) * 520,
        rot: seeded(i * 2.3) * 720 - 360,
        delay: seeded(i * 1.9) * 0.12,
        size: 6 + Math.round(seeded(i * 7.3) * 8),
      })),
    [],
  );

  const fire = () => {
    if (done) return;
    setFired(true);
    setTimeout(() => setFired(false), 1600);
    setTimeout(() => setDone(true), 500);
  };

  return (
    <>
      <button
        onClick={fire}
        disabled={done}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-ink transition-all active:scale-[0.98] disabled:bg-white/[0.06] disabled:text-ink-2"
      >
        <Icon name={done ? "Check" : "Award"} className="h-4 w-4" />
        {done ? "Reward claimed" : label}
      </button>

      <AnimatePresence>
        {fired && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[200] flex items-start justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative top-[24vh]">
              {pieces.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute block rounded-[2px]"
                  style={{ width: p.size, height: p.size * 0.6, background: p.color }}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rot }}
                  transition={{ duration: 1.5, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
