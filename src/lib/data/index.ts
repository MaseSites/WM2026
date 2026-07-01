export * from "./teams";
export * from "./players";
export * from "./matches";
export * from "./groups";
export * from "./content";
export * from "./formations";

import { TEAMS } from "./teams";
import { MATCHES, LIVE_MATCHES } from "./matches";
import { PLAYERS } from "./players";

// Tournament-wide headline numbers.
export const TOURNAMENT = {
  name: "FIFA World Cup 2026",
  hosts: ["United States", "Canada", "Mexico"],
  hostCodes: ["us", "ca", "mx"],
  teams: 48,
  matchesTotal: 104,
  matchesPlayed: 79,
  stage: "Round of 32",
  final: "2026-07-19T23:00:00Z",
  start: "2026-06-11T20:00:00Z",
  get goals() {
    return 231;
  },
  get avgGoals() {
    return (this.goals / this.matchesPlayed).toFixed(2);
  },
  attendanceTotal: 5_128_903,
};

export const QUICK_STATS = [
  { label: "Goals scored", value: TOURNAMENT.goals, sub: `${TOURNAMENT.avgGoals} per match`, trend: 5 },
  { label: "Matches played", value: `${TOURNAMENT.matchesPlayed}/${TOURNAMENT.matchesTotal}`, sub: "Round of 32 under way", trend: 0 },
  { label: "Total attendance", value: "5.13M", sub: "Record-breaking · 64,923 avg", trend: 7 },
  { label: "Teams remaining", value: 25, sub: "of 48 · knockouts", trend: 0 },
];

// Golden Boot / Glove / Young Player trackers
export const GOLDEN_BOOT = [...PLAYERS]
  .sort((a, b) => b.goals - a.goals || b.assists - a.assists)
  .slice(0, 6);

export const YOUNG_PLAYER = [...PLAYERS]
  .filter((p) => p.age <= 23)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5);

export const TITLE_CONTENDERS = [...TEAMS]
  .sort((a, b) => b.winProbability - a.winProbability)
  .slice(0, 8);
