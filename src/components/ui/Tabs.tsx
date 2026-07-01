"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export interface TabDef {
  id: string;
  label: string;
  icon?: string;
}

export function Tabs({
  tabs,
  panels,
  initial,
}: {
  tabs: TabDef[];
  panels: Record<string, React.ReactNode>;
  initial?: string;
}) {
  const [active, setActive] = useState(initial ?? tabs[0].id);

  return (
    <div>
      <div className="no-scrollbar sticky top-16 z-30 -mx-4 mb-4 overflow-x-auto border-b border-line bg-canvas/80 px-4 backdrop-blur-lg md:mx-0 md:rounded-xl md:border md:px-1.5 md:py-1.5">
        <div className="flex min-w-max items-center gap-1">
          {tabs.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                  on ? "text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg bg-white/[0.06] ring-1 ring-white/10"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {t.icon && (
                  <Icon
                    name={t.icon}
                    className={cn("relative h-4 w-4", on ? "text-accent" : "text-ink-3")}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {panels[active]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
