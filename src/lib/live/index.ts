import { cache } from "react";
import type { Match } from "@/lib/types";
import { MATCHES } from "@/lib/data";
import { fetchLiveMatches, liveConfigured } from "./provider";

// A stable key for pairing a live match with the bundled snapshot fixture,
// regardless of home/away orientation.
const pairKey = (m: Match) => [m.homeId, m.awayId].sort().join("~") + "|" + m.stage;

function merge(snapshot: Match[], live: Match[]): Match[] {
  const liveByKey = new Map(live.map((m) => [pairKey(m), m]));
  const used = new Set<string>();

  const merged = snapshot.map((s) => {
    const l = liveByKey.get(pairKey(s));
    if (!l) return s;
    used.add(pairKey(s));
    // Live provider wins on score/status; we keep our curated venue, prediction, etc.
    return {
      ...s,
      homeScore: l.homeScore,
      awayScore: l.awayScore,
      homePens: l.homePens ?? s.homePens,
      awayPens: l.awayPens ?? s.awayPens,
      status: l.status,
      minute: l.minute ?? s.minute,
    };
  });

  // Surface any live fixtures we didn't have in the snapshot.
  for (const l of live) if (!used.has(pairKey(l))) merged.push(l);
  return merged;
}

/**
 * The single source of truth for match state. Deduped per request via
 * React cache(). Returns live-merged data when an API key is set, otherwise
 * the bundled snapshot — so the app renders identically with zero config.
 */
export const getMatches = cache(async (): Promise<Match[]> => {
  const live = await fetchLiveMatches();
  if (!live || live.length === 0) return MATCHES;
  return merge(MATCHES, live);
});

export const LIVE_MODE = liveConfigured();

export async function getLive() {
  return (await getMatches()).filter((m) => m.status === "live" || m.status === "halftime");
}
export async function getUpcoming() {
  return (await getMatches())
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => +new Date(a.kickoff) - +new Date(b.kickoff));
}
export async function getResults() {
  return (await getMatches())
    .filter((m) => m.status === "finished")
    .sort((a, b) => +new Date(b.kickoff) - +new Date(a.kickoff));
}
export async function getNextMatch() {
  return (await getUpcoming())[0];
}
export async function getMatchById(id: string) {
  return (await getMatches()).find((m) => m.id === id);
}
