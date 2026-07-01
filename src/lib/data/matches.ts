import type { Match, MatchEvent, MatchPrediction, BracketNode } from "../types";

// Real tournament clock: early on 1 July 2026. The group stage is complete and
// the Round of 32 is under way (28 June – 3 July). At this hour NO match is live
// — 7 ties are finished, 3 kick off later today, the rest across 2–3 July.
export const NOW = new Date("2026-07-01T13:00:00Z");

function ev(minute: number, type: MatchEvent["type"], teamId?: string, playerName?: string): MatchEvent {
  return { minute, type, teamId, playerName };
}

// The 32 sides that reached the knockout stage (real, from the group tables).
export const QUALIFIED = new Set<string>([
  "mexico", "south-africa", "canada", "bosnia", "switzerland", "brazil", "morocco",
  "usa", "paraguay", "australia", "germany", "ivory-coast", "ecuador", "netherlands",
  "japan", "sweden", "belgium", "egypt", "spain", "cape-verde", "france", "senegal",
  "norway", "argentina", "algeria", "austria", "portugal", "dr-congo", "colombia",
  "england", "croatia", "ghana",
]);

type Fin = {
  id: string; home: string; away: string; hs: number; as: number;
  hp?: number; ap?: number; kickoff: string; venue: string; city: string; country: string;
  att: number; goals?: MatchEvent[];
};

const FINISHED: Fin[] = [
  { id: "r32-can-rsa", home: "canada", away: "south-africa", hs: 1, as: 0,
    kickoff: "2026-06-28T20:00:00Z", venue: "SoFi Stadium", city: "Los Angeles", country: "us", att: 68210 },
  { id: "r32-mex-ecu", home: "mexico", away: "ecuador", hs: 2, as: 0,
    kickoff: "2026-06-28T23:00:00Z", venue: "Estadio Azteca", city: "Mexico City", country: "mx", att: 83260 },
  { id: "r32-bra-jpn", home: "brazil", away: "japan", hs: 2, as: 1,
    kickoff: "2026-06-29T19:00:00Z", venue: "NRG Stadium", city: "Houston", country: "us", att: 71040 },
  { id: "r32-ger-par", home: "germany", away: "paraguay", hs: 1, as: 1, hp: 3, ap: 4,
    kickoff: "2026-06-29T22:00:00Z", venue: "Gillette Stadium", city: "Boston", country: "us", att: 64980 },
  { id: "r32-ned-mar", home: "netherlands", away: "morocco", hs: 1, as: 1, hp: 2, ap: 3,
    kickoff: "2026-06-29T23:30:00Z", venue: "Estadio Akron", city: "Guadalajara", country: "mx", att: 46320 },
  { id: "r32-civ-nor", home: "ivory-coast", away: "norway", hs: 1, as: 2,
    kickoff: "2026-06-30T19:00:00Z", venue: "AT&T Stadium", city: "Dallas", country: "us", att: 74510,
    goals: [ev(0, "kickoff"), ev(58, "goal", "norway", "Erling Haaland"), ev(90, "fulltime")] },
  { id: "r32-fra-swe", home: "france", away: "sweden", hs: 3, as: 0,
    kickoff: "2026-06-30T22:00:00Z", venue: "Gillette Stadium", city: "Boston", country: "us", att: 65110,
    goals: [ev(0, "kickoff"), ev(19, "goal", "france", "Kylian Mbappé"), ev(67, "goal", "france", "Kylian Mbappé"), ev(90, "fulltime")] },
];

type Upc = {
  id: string; home: string; away: string; kickoff: string; venue: string; city: string;
  country: string; stage: Match["stage"]; round: string;
  wp?: [number, number, number]; pred?: MatchPrediction;
};

function pred(
  hw: number, d: number, aw: number, score: string, scorer: string, first: string,
  danger: string, conf: number, narrative: string[],
): MatchPrediction {
  return {
    homeWin: hw, draw: d, awayWin: aw, expectedGoals: [1.4, 1.3], likelyScore: score,
    likelyScorer: scorer, firstGoal: first, cleanSheet: [28, 26], upset: Math.min(hw, aw),
    penalty: 22, confidence: conf, mostDangerous: danger, narrative,
  };
}

const UPCOMING_DEFS: Upc[] = [
  // ── Round of 32 · remaining ─────────────────────────────────────────────
  { id: "r32-eng-cod", home: "england", away: "dr-congo", kickoff: "2026-07-01T18:00:00Z",
    venue: "Mercedes-Benz Stadium", city: "Atlanta", country: "us", stage: "Round of 32", round: "R32",
    wp: [78, 15, 7],
    pred: pred(78, 15, 7, "2–0", "Harry Kane", "England 71%", "Jude Bellingham", 74, [
      "England were the tournament's most controlled group winners — three clean sheets and a division-best 61% average possession.",
      "DR Congo's threat is transition speed; if England's rest-defence holds, the model sees a comfortable passage.",
      "Kane converts penalties at 92% — any set-piece contact in the box swings this further toward the Three Lions.",
    ]) },
  { id: "r32-bel-sen", home: "belgium", away: "senegal", kickoff: "2026-07-01T21:00:00Z",
    venue: "Lincoln Financial Field", city: "Philadelphia", country: "us", stage: "Round of 32", round: "R32",
    wp: [42, 27, 31],
    pred: pred(42, 27, 31, "1–1", "Romelu Lukaku", "Belgium 52%", "Nicolas Jackson", 58, [
      "A genuine coin-flip: Senegal's athletic midfield can smother Belgium's build-up, exactly where De Bruyne needs time.",
      "Belgium's edge is finishing quality; Senegal's is the press. Expect a low-event tie decided in the margins.",
      "History is level — the model gives the draw a healthy 27% and rates penalties a real possibility.",
    ]) },
  { id: "r32-usa-bih", home: "usa", away: "bosnia", kickoff: "2026-07-02T00:00:00Z",
    venue: "SoFi Stadium", city: "Los Angeles", country: "us", stage: "Round of 32", round: "R32",
    wp: [55, 24, 21],
    pred: pred(55, 24, 21, "2–1", "Christian Pulisic", "USA 58%", "Christian Pulisic", 62, [
      "Home advantage is real: the USMNT have won all three group games in front of record crowds.",
      "Bosnia will sit deep and counter through Džeko's hold-up play — the USA's high line is the risk.",
      "Pulisic on the left against a converted full-back is the mismatch the model keeps flagging.",
    ]) },
  { id: "r32-esp-aut", home: "spain", away: "austria", kickoff: "2026-07-02T19:00:00Z",
    venue: "AT&T Stadium", city: "Dallas", country: "us", stage: "Round of 32", round: "R32",
    wp: [72, 19, 9],
    pred: pred(72, 19, 9, "2–0", "Lamine Yamal", "Spain 68%", "Lamine Yamal", 71, [
      "Spain are the model's outright favourites — a 94-rated midfield that has yet to concede from open play.",
      "Rangnick's Austria press ferociously, but Rodri and Pedri rank first for progressive passes under pressure.",
      "Yamal versus a back-three wing-back is the evening's defining duel; he leads all wingers for completed dribbles.",
    ]) },
  { id: "r32-sui-alg", home: "switzerland", away: "algeria", kickoff: "2026-07-02T22:00:00Z",
    venue: "BC Place", city: "Vancouver", country: "ca", stage: "Round of 32", round: "R32",
    wp: [45, 30, 25] },
  { id: "r32-por-cro", home: "portugal", away: "croatia", kickoff: "2026-07-02T23:30:00Z",
    venue: "Estadio Akron", city: "Guadalajara", country: "mx", stage: "Round of 32", round: "R32",
    wp: [50, 27, 23],
    pred: pred(50, 27, 23, "1–1", "Cristiano Ronaldo", "Portugal 54%", "Rafael Leão", 57, [
      "A heavyweight last-32 tie and a rematch of the Euro 2016 final — Ronaldo and Modrić still centre stage.",
      "Portugal carry more raw threat, but Croatia's midfield control games; the model splits it almost evenly.",
      "Set pieces are the tiebreak — both sides rank top-eight for aerial goals this tournament.",
    ]) },
  { id: "r32-aus-egy", home: "australia", away: "egypt", kickoff: "2026-07-03T19:00:00Z",
    venue: "Levi's Stadium", city: "San Francisco Bay", country: "us", stage: "Round of 32", round: "R32",
    wp: [38, 30, 32] },
  { id: "r32-arg-cpv", home: "argentina", away: "cape-verde", kickoff: "2026-07-03T22:00:00Z",
    venue: "Hard Rock Stadium", city: "Miami", country: "us", stage: "Round of 32", round: "R32",
    wp: [83, 12, 5],
    pred: pred(83, 12, 5, "3–0", "Lionel Messi", "Argentina 74%", "Lionel Messi", 76, [
      "The holders roll on: Argentina top the model's control metrics and Messi is joint-top scorer on six.",
      "Cape Verde's fairytale run has been built on organisation, but the talent gap here is the widest of the round.",
      "Expect Argentina to rotate late — the danger is complacency, not the opposition.",
    ]) },
  { id: "r32-col-gha", home: "colombia", away: "ghana", kickoff: "2026-07-03T23:30:00Z",
    venue: "Arrowhead Stadium", city: "Kansas City", country: "us", stage: "Round of 32", round: "R32",
    wp: [58, 24, 18] },

  // ── Round of 16 · confirmed matchups ────────────────────────────────────
  { id: "r16-can-mar", home: "canada", away: "morocco", kickoff: "2026-07-04T17:00:00Z",
    venue: "NRG Stadium", city: "Houston", country: "us", stage: "Round of 16", round: "R16",
    wp: [30, 27, 43],
    pred: pred(30, 27, 43, "1–2", "Achraf Hakimi", "Morocco 55%", "Achraf Hakimi", 61, [
      "Morocco arrive as one of the tournament's form sides after edging the Netherlands on penalties.",
      "Canada have already made history and will counter through Davies — but Morocco's structure is elite.",
      "The model leans Atlas Lions, though a partisan Houston crowd keeps Canada live.",
    ]) },
  { id: "r16-par-fra", home: "paraguay", away: "france", kickoff: "2026-07-04T21:00:00Z",
    venue: "Lincoln Financial Field", city: "Philadelphia", country: "us", stage: "Round of 16", round: "R16",
    wp: [16, 22, 62],
    pred: pred(16, 22, 62, "0–2", "Kylian Mbappé", "France 66%", "Kylian Mbappé", 70, [
      "France dispatched Sweden 3–0 and look ominous; Mbappé is joint-top scorer and in vintage form.",
      "Paraguay stunned Germany on penalties on the back of a superb defensive block — that resilience travels.",
      "The model expects France to break through eventually, but Paraguay's low block makes the first goal pivotal.",
    ]) },
  { id: "r16-bra-nor", home: "brazil", away: "norway", kickoff: "2026-07-05T20:00:00Z",
    venue: "MetLife Stadium", city: "New York / New Jersey", country: "us", stage: "Round of 16", round: "R16",
    wp: [58, 22, 20],
    pred: pred(58, 22, 20, "2–1", "Vinícius Júnior", "Brazil 60%", "Erling Haaland", 63, [
      "A blockbuster: Brazil's front line against Haaland's Norway, who dumped out Ivory Coast.",
      "Vinícius and Raphinha give Brazil the edge in sustained pressure, but Haaland only needs one chance.",
      "The model favours Brazil, yet flags Norway's set-piece and transition threat as the great equaliser.",
    ]) },
];

// ── Assemble Match objects ────────────────────────────────────────────────
const finishedMatches: Match[] = FINISHED.map((f) => ({
  id: f.id, stage: "Round of 32", round: "R32",
  homeId: f.home, awayId: f.away, homeScore: f.hs, awayScore: f.as,
  homePens: f.hp, awayPens: f.ap, status: "finished", minute: 90,
  kickoff: f.kickoff, venue: f.venue, city: f.city, country: f.country,
  attendance: f.att, referee: "FIFA appointee", refereeCountry: "",
  events: f.goals ?? [ev(0, "kickoff"), ev(90, "fulltime")],
  winProb: { home: f.hs > f.as ? 100 : 0, draw: 0, away: f.as > f.hs ? 100 : 0 },
}));

const upcomingMatches: Match[] = UPCOMING_DEFS.map((u) => ({
  id: u.id, stage: u.stage, round: u.round,
  homeId: u.home, awayId: u.away, homeScore: 0, awayScore: 0,
  status: "scheduled", kickoff: u.kickoff, venue: u.venue, city: u.city, country: u.country,
  referee: "To be appointed", refereeCountry: "",
  weather: "Clear", temperature: 27,
  events: [],
  winProb: u.wp ? { home: u.wp[0], draw: u.wp[1], away: u.wp[2] } : undefined,
  prediction: u.pred,
}));

export const MATCHES: Match[] = [...finishedMatches, ...upcomingMatches];

export const MATCH_MAP: Record<string, Match> = Object.fromEntries(
  MATCHES.map((m) => [m.id, m]),
);
export function match(id: string): Match | undefined {
  return MATCH_MAP[id];
}

export const LIVE_MATCHES = MATCHES.filter(
  (m) => m.status === "live" || m.status === "halftime",
);
export const TODAY_MATCHES = MATCHES.filter(
  (m) => new Date(m.kickoff).toDateString() === NOW.toDateString(),
);
export const UPCOMING = MATCHES.filter((m) => m.status === "scheduled").sort(
  (a, b) => +new Date(a.kickoff) - +new Date(b.kickoff),
);
export const RESULTS = MATCHES.filter((m) => m.status === "finished").sort(
  (a, b) => +new Date(b.kickoff) - +new Date(a.kickoff),
);
export const NEXT_MATCH = UPCOMING[0];

// ── Knockout bracket (real Round of 32 → Round of 16, then TBD) ────────────
function node(
  id: string, round: BracketNode["round"], matchId: string | undefined,
  home?: string, away?: string, hs?: number, as?: number, hp?: number, ap?: number,
): BracketNode {
  const done = hs != null && as != null;
  return { id, round, matchId, homeId: home, awayId: away, homeScore: hs, awayScore: as, homePens: hp, awayPens: ap, done };
}

// Grouped bracket structure for the Bracket component.
export const BRACKET_R32: BracketNode[] = [
  node("n32-1", "R16", "r32-can-rsa", "canada", "south-africa", 1, 0),
  node("n32-2", "R16", "r32-ned-mar", "netherlands", "morocco", 1, 1, 2, 3),
  node("n32-3", "R16", "r32-ger-par", "germany", "paraguay", 1, 1, 3, 4),
  node("n32-4", "R16", "r32-fra-swe", "france", "sweden", 3, 0),
  node("n32-5", "R16", "r32-eng-cod", "england", "dr-congo"),
  node("n32-6", "R16", "r32-bel-sen", "belgium", "senegal"),
  node("n32-7", "R16", "r32-usa-bih", "usa", "bosnia"),
  node("n32-8", "R16", "r32-esp-aut", "spain", "austria"),
  node("n32-9", "R16", "r32-bra-jpn", "brazil", "japan", 2, 1),
  node("n32-10", "R16", "r32-civ-nor", "ivory-coast", "norway", 1, 2),
  node("n32-11", "R16", "r32-mex-ecu", "mexico", "ecuador", 2, 0),
  node("n32-12", "R16", "r32-por-cro", "portugal", "croatia"),
  node("n32-13", "R16", "r32-sui-alg", "switzerland", "algeria"),
  node("n32-14", "R16", "r32-col-gha", "colombia", "ghana"),
  node("n32-15", "R16", "r32-arg-cpv", "argentina", "cape-verde"),
  node("n32-16", "R16", "r32-aus-egy", "australia", "egypt"),
];

export const BRACKET_R16: BracketNode[] = [
  node("n16-1", "QF", "r16-can-mar", "canada", "morocco"),
  node("n16-2", "QF", "r16-par-fra", "paraguay", "france"),
  node("n16-3", "QF", undefined),
  node("n16-4", "QF", undefined),
  node("n16-5", "QF", "r16-bra-nor", "brazil", "norway"),
  node("n16-6", "QF", "r16-mex-x", "mexico"),
  node("n16-7", "QF", undefined),
  node("n16-8", "QF", undefined),
];
