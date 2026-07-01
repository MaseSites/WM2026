// ============================================================================
// WorldMap 26 — Domain model
// A single source of truth for the tournament. Mirrors a normalized Postgres
// schema (see README → Database). Everything downstream is derived from these.
// ============================================================================

export type Confederation =
  | "UEFA"
  | "CONMEBOL"
  | "CONCACAF"
  | "CAF"
  | "AFC"
  | "OFC";

export type MatchStatus =
  | "scheduled"
  | "live"
  | "halftime"
  | "finished"
  | "extra_time"
  | "penalties";

export type Stage =
  | "Group"
  | "Round of 32"
  | "Round of 16"
  | "Quarter-final"
  | "Semi-final"
  | "Third place"
  | "Final";

export type EventType =
  | "goal"
  | "own_goal"
  | "penalty_goal"
  | "penalty_miss"
  | "yellow"
  | "red"
  | "second_yellow"
  | "sub"
  | "var"
  | "kickoff"
  | "halftime"
  | "fulltime";

export type Position = "GK" | "DF" | "MF" | "FW";

export interface Team {
  id: string;
  name: string;
  short: string;
  code: string; // ISO 3166-1 alpha-2, for flags
  confederation: Confederation;
  group: string; // "A".."L"
  fifaRank: number;
  color: string; // primary brand color
  coach: string;
  coachCountry: string;
  formation: string;
  marketValue: number; // € millions
  avgAge: number;
  nickname: string;
  founded: number;
  titles: number; // World Cups won
  // Radar ratings (0-100)
  ratings: { attack: number; midfield: number; defense: number; experience: number; form: number };
  winProbability: number; // % chance to win the tournament
  form: ("W" | "D" | "L")[];
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  number: number;
  position: Position;
  detailPosition: string;
  age: number;
  height: number; // cm
  foot: "Left" | "Right" | "Both";
  club: string;
  clubCountry: string;
  marketValue: number; // € millions
  rating: number; // avg tournament rating 0-10
  goals: number;
  assists: number;
  minutes: number;
  photoSeed: number; // deterministic avatar seed
  stats: {
    passAccuracy: number;
    shotsPerGame: number;
    keyPasses: number;
    dribbles: number;
    tackles: number;
    duelsWon: number;
  };
  strengths: string[];
  weaknesses: string[];
}

export interface MatchEvent {
  minute: number;
  addedTime?: number;
  type: EventType;
  teamId?: string;
  playerId?: string;
  playerName?: string;
  assistName?: string;
  detail?: string;
}

export interface LineupPlayer {
  playerId: string;
  x: number; // 0-100 pitch coords (attacking →)
  y: number;
  captain?: boolean;
}

export interface MatchStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  xg: [number, number];
  corners: [number, number];
  fouls: [number, number];
  passes: [number, number];
  passAccuracy: [number, number];
  offsides: [number, number];
  yellow: [number, number];
  saves: [number, number];
}

export interface Match {
  id: string;
  stage: Stage;
  group?: string;
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
  homePens?: number;
  awayPens?: number;
  status: MatchStatus;
  minute?: number;
  kickoff: string; // ISO
  venue: string;
  city: string;
  country: string;
  attendance?: number;
  referee: string;
  refereeCountry: string;
  temperature?: number;
  weather?: "Clear" | "Cloudy" | "Rain" | "Humid";
  round?: string; // bracket label e.g. "QF1"
  events: MatchEvent[];
  stats?: MatchStats;
  momentum?: number[]; // -100..100 sampled per ~5min
  winProb?: { home: number; draw: number; away: number };
  prediction?: MatchPrediction;
}

export interface MatchPrediction {
  homeWin: number;
  draw: number;
  awayWin: number;
  expectedGoals: [number, number];
  likelyScore: string;
  likelyScorer: string;
  firstGoal: string;
  cleanSheet: [number, number];
  upset: number;
  penalty: number;
  confidence: number;
  mostDangerous: string;
  narrative: string[];
}

export interface Standing {
  teamId: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  gf: number;
  ga: number;
  points: number;
  form: ("W" | "D" | "L")[];
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: "Match" | "Transfer" | "Analysis" | "Injury" | "Feature";
  source: string;
  minutesAgo: number;
  imageSeed: number;
  tag?: string;
  reading: number; // minutes
}

export interface Transfer {
  playerName: string;
  from: string;
  to: string;
  fee: string;
  minutesAgo: number;
  status: "Done" | "Loan" | "Rumour";
}

export interface Discussion {
  id: string;
  title: string;
  author: string;
  replies: number;
  likes: number;
  minutesAgo: number;
  tag: string;
  hot?: boolean;
}

export interface BracketNode {
  id: string;
  round: "R32" | "R16" | "QF" | "SF" | "F";
  matchId?: string;
  homeId?: string;
  awayId?: string;
  homeScore?: number;
  awayScore?: number;
  homePens?: number;
  awayPens?: number;
  done?: boolean;
}
