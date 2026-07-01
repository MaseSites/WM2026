import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Deterministic pseudo-random in [0,1) from an integer seed. */
export function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function formatValue(millions: number): string {
  if (millions >= 1000) return `€${(millions / 1000).toFixed(2)}bn`;
  return `€${millions.toFixed(millions < 10 ? 1 : 0)}m`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

const RELATIVE: [number, string][] = [
  [60, "s"],
  [60, "m"],
  [24, "h"],
  [7, "d"],
];

export function timeAgo(minutesAgo: number): string {
  if (minutesAgo < 1) return "just now";
  if (minutesAgo < 60) return `${Math.round(minutesAgo)}m ago`;
  const hours = minutesAgo / 60;
  if (hours < 24) return `${Math.round(hours)}h ago`;
  const days = hours / 24;
  return `${Math.round(days)}d ago`;
}

export function kickoffLabel(iso: string): { time: string; day: string } {
  const d = new Date(iso);
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
  const day = d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "America/New_York",
  });
  return { time, day };
}

export function flagUrl(code: string, w = 80): string {
  return `https://flagcdn.com/w${w}/${code.toLowerCase()}.png`;
}

/** Countdown parts to a future ISO date, relative to `now`. */
export function countdown(iso: string, now: Date) {
  const diff = Math.max(0, new Date(iso).getTime() - now.getTime());
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: diff === 0,
  };
}

export function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const RESULT_COLOR = {
  W: "var(--color-win)",
  D: "var(--color-draw)",
  L: "var(--color-live)",
} as const;
