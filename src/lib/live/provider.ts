import type { Match, MatchStatus, Stage } from "@/lib/types";
import { TEAMS } from "@/lib/data/teams";

// ─────────────────────────────────────────────────────────────────────────
// Live data adapter — API-Football (api-sports.io, v3).
//
// Set API_FOOTBALL_KEY to enable live results. Optional overrides:
//   API_FOOTBALL_SEASON  (default 2026)   API_FOOTBALL_LEAGUE (default 1 = World Cup)
//
// Note: the API-Football *Free* plan only exposes seasons 2022–2024, so the
// 2026 World Cup requires a paid plan. Without a usable response this returns
// null and the app falls back to the bundled snapshot in src/lib/data.
// ─────────────────────────────────────────────────────────────────────────

const ENDPOINT = "https://v3.football.api-sports.io/fixtures";
const REVALIDATE_SECONDS = 60;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
const BY_NAME = new Map(TEAMS.map((t) => [norm(t.name), t.id]));
const BY_SHORT = new Map(TEAMS.map((t) => [norm(t.short), t.id]));

// Normalised API-Football name → our team id, for spellings that differ.
const ALIASES: Record<string, string> = {
  usa: "usa",
  unitedstates: "usa",
  southkorea: "south-korea",
  korearepublic: "south-korea",
  czechrepublic: "czechia",
  turkey: "turkiye",
  bosniaandherzegovina: "bosnia",
  bosniaherzegovina: "bosnia",
  curacao: "curacao",
  capeverdeislands: "cape-verde",
  capeverde: "cape-verde",
  congodr: "dr-congo",
  drcongo: "dr-congo",
  cotedivoire: "ivory-coast",
  ivorycoast: "ivory-coast",
  newzealand: "new-zealand",
  saudiarabia: "saudi-arabia",
  southafrica: "south-africa",
};

function resolveTeam(name?: string): string | undefined {
  if (!name) return undefined;
  const n = norm(name);
  return ALIASES[n] ?? BY_NAME.get(n) ?? BY_SHORT.get(n);
}

function mapStatus(short: string): MatchStatus {
  if (["1H", "2H", "ET", "BT", "P", "LIVE", "INT"].includes(short)) return "live";
  if (short === "HT") return "halftime";
  if (["FT", "AET", "PEN"].includes(short)) return "finished";
  return "scheduled";
}

function mapStage(round: string): Stage {
  const r = round.toLowerCase();
  if (r.startsWith("group")) return "Group";
  if (r.includes("round of 32")) return "Round of 32";
  if (r.includes("round of 16")) return "Round of 16";
  if (r.includes("quarter")) return "Quarter-final";
  if (r.includes("semi")) return "Semi-final";
  if (r.includes("3rd") || r.includes("third")) return "Third place";
  if (r.includes("final")) return "Final";
  return "Group";
}

interface AFFixture {
  fixture: {
    id: number;
    date: string;
    referee: string | null;
    venue: { name: string | null; city: string | null };
    status: { short: string; elapsed: number | null };
  };
  league: { round: string };
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
  score: { penalty: { home: number | null; away: number | null } };
}

export const liveConfigured = () => !!process.env.API_FOOTBALL_KEY;

export async function fetchLiveMatches(): Promise<Match[] | null> {
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) return null;

  const league = process.env.API_FOOTBALL_LEAGUE ?? "1";
  const season = process.env.API_FOOTBALL_SEASON ?? "2026";

  try {
    const res = await fetch(`${ENDPOINT}?league=${league}&season=${season}`, {
      headers: { "x-apisports-key": key },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["wc-matches"] },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { response?: AFFixture[]; results?: number };
    if (!data.response || data.response.length === 0) return null;

    const out: Match[] = [];
    for (const f of data.response) {
      const homeId = resolveTeam(f.teams?.home?.name);
      const awayId = resolveTeam(f.teams?.away?.name);
      if (!homeId || !awayId) continue; // unresolved names / TBD slots

      out.push({
        id: `af-${f.fixture.id}`,
        stage: mapStage(f.league.round),
        homeId,
        awayId,
        homeScore: f.goals?.home ?? 0,
        awayScore: f.goals?.away ?? 0,
        homePens: f.score?.penalty?.home ?? undefined,
        awayPens: f.score?.penalty?.away ?? undefined,
        status: mapStatus(f.fixture.status.short),
        minute: f.fixture.status.elapsed ?? undefined,
        kickoff: f.fixture.date,
        venue: f.fixture.venue?.name ?? "TBD",
        city: f.fixture.venue?.city ?? "",
        country: "us",
        referee: f.fixture.referee ?? "TBA",
        refereeCountry: "",
        events: [],
      });
    }
    return out.length ? out : null;
  } catch {
    return null;
  }
}
