import type { Match, MatchStatus, Stage } from "@/lib/types";
import { TEAMS } from "@/lib/data/teams";

// ─────────────────────────────────────────────────────────────────────────
// Live data adapter — football-data.org (v4).
//
// Set FOOTBALL_DATA_API_KEY in the environment to enable live results. When no
// key is present (or a request fails) this returns null and the app falls back
// to the bundled snapshot in src/lib/data. Docs: https://www.football-data.org/
// ─────────────────────────────────────────────────────────────────────────

const ENDPOINT = "https://api.football-data.org/v4/competitions/WC/matches";
const REVALIDATE_SECONDS = 60;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
const BY_TLA = new Map(TEAMS.map((t) => [t.short.toUpperCase(), t.id]));
const BY_NAME = new Map(TEAMS.map((t) => [norm(t.name), t.id]));

function resolveTeam(tla?: string, name?: string): string | undefined {
  if (tla && BY_TLA.has(tla.toUpperCase())) return BY_TLA.get(tla.toUpperCase());
  if (name && BY_NAME.has(norm(name))) return BY_NAME.get(norm(name));
  return undefined;
}

function mapStatus(s: string): MatchStatus {
  if (s === "IN_PLAY" || s === "PAUSED" || s === "SUSPENDED") return "live";
  if (s === "FINISHED") return "finished";
  return "scheduled";
}

const STAGES: Record<string, Stage> = {
  GROUP_STAGE: "Group",
  LAST_32: "Round of 32",
  ROUND_OF_32: "Round of 32",
  LAST_16: "Round of 16",
  ROUND_OF_16: "Round of 16",
  QUARTER_FINALS: "Quarter-final",
  QUARTER_FINAL: "Quarter-final",
  SEMI_FINALS: "Semi-final",
  SEMI_FINAL: "Semi-final",
  THIRD_PLACE: "Third place",
  FINAL: "Final",
};

interface FDMatch {
  id: number;
  stage: string;
  group?: string | null;
  utcDate: string;
  status: string;
  minute?: number | null;
  venue?: string | null;
  homeTeam: { tla?: string; name?: string };
  awayTeam: { tla?: string; name?: string };
  score?: {
    fullTime?: { home: number | null; away: number | null };
    penalties?: { home: number | null; away: number | null };
  };
}

export const liveConfigured = () => !!process.env.FOOTBALL_DATA_API_KEY;

export async function fetchLiveMatches(): Promise<Match[] | null> {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) return null;

  // Optionally pin a season (starting year), e.g. FOOTBALL_DATA_SEASON=2026.
  const season = process.env.FOOTBALL_DATA_SEASON;
  const url = season ? `${ENDPOINT}?season=${season}` : ENDPOINT;

  try {
    const res = await fetch(url, {
      headers: { "X-Auth-Token": key },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["wc-matches"] },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { matches?: FDMatch[] };
    const out: Match[] = [];

    for (const m of data.matches ?? []) {
      const homeId = resolveTeam(m.homeTeam?.tla, m.homeTeam?.name);
      const awayId = resolveTeam(m.awayTeam?.tla, m.awayTeam?.name);
      if (!homeId || !awayId) continue; // skip unresolved (e.g. TBD knockout slots)

      out.push({
        id: `fd-${m.id}`,
        stage: STAGES[m.stage] ?? "Group",
        group: m.group ? m.group.replace(/GROUP_?/i, "").trim() : undefined,
        homeId,
        awayId,
        homeScore: m.score?.fullTime?.home ?? 0,
        awayScore: m.score?.fullTime?.away ?? 0,
        homePens: m.score?.penalties?.home ?? undefined,
        awayPens: m.score?.penalties?.away ?? undefined,
        status: mapStatus(m.status),
        minute: m.minute ?? undefined,
        kickoff: m.utcDate,
        venue: m.venue ?? "TBD",
        city: "",
        country: "us",
        referee: "TBA",
        refereeCountry: "",
        events: [],
      });
    }
    return out;
  } catch {
    return null;
  }
}
