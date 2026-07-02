import type { NewsItem, Transfer, Discussion } from "../types";

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "Mbappé brace sends France past Sweden and level at the top of the scoring charts",
    excerpt:
      "Two clinical finishes in a 3–0 win over Sweden took Kylian Mbappé to six goals, tied with Lionel Messi in a captivating Golden Boot race as France cruise into the last 16.",
    category: "Match", source: "WorldMap Newsroom", minutesAgo: 42, imageSeed: 11,
    reading: 4,
  },
  {
    id: "n2",
    title: "Penalty heartbreak: Paraguay stun Germany to reach the Round of 16",
    excerpt:
      "A resolute defensive display and nerveless spot-kicks saw Paraguay knock out four-time winners Germany in the shock of the knockout round so far.",
    category: "Match", source: "WorldMap Newsroom", minutesAgo: 70, imageSeed: 22,
    tag: "UPSET", reading: 5,
  },
  {
    id: "n3",
    title: "Morocco march on, edging the Netherlands from the spot",
    excerpt:
      "Regragui's side held their nerve to send the Dutch home 3–2 on penalties, underlining their status as one of the tournament's most complete teams.",
    category: "Match", source: "WorldMap Newsroom", minutesAgo: 96, imageSeed: 33,
    reading: 3,
  },
  {
    id: "n4",
    title: "History for Canada: first-ever World Cup knockout win over South Africa",
    excerpt:
      "A 1–0 victory in Los Angeles gave the co-hosts their first knockout-stage win, and Jesse Marsch's youthful side are only just getting started.",
    category: "Feature", source: "Data Room", minutesAgo: 150, imageSeed: 44,
    reading: 5,
  },
  {
    id: "n5",
    title: "Haaland's Norway see off Ivory Coast to book a blockbuster date with Brazil",
    excerpt:
      "The striker's second-half strike settled a tense tie in Dallas, setting up a last-16 meeting with the five-time champions at MetLife Stadium.",
    category: "Match", source: "Team Reporter", minutesAgo: 200, imageSeed: 55,
    reading: 3,
  },
  {
    id: "n6",
    title: "Golden Boot race: Messi and Mbappé lead the pack on six",
    excerpt:
      "With the field down to the last 32, the scoring chart has rarely been tighter. We rank the contenders by goals, minutes and underlying xG.",
    category: "Feature", source: "Long Read", minutesAgo: 260, imageSeed: 66,
    reading: 7,
  },
];

export const TRANSFERS: Transfer[] = [
  { playerName: "Alphonso Davies", from: "Bayern Munich", to: "Real Madrid", fee: "€65m", minutesAgo: 34, status: "Done" },
  { playerName: "Victor Osimhen", from: "Napoli", to: "Al-Ahli", fee: "€75m", minutesAgo: 90, status: "Done" },
  { playerName: "Bruno Guimarães", from: "Newcastle", to: "Man City", fee: "€90m", minutesAgo: 180, status: "Rumour" },
  { playerName: "Xavi Simons", from: "RB Leipzig", to: "Chelsea", fee: "€70m", minutesAgo: 240, status: "Done" },
  { playerName: "Rafael Leão", from: "AC Milan", to: "Liverpool", fee: "€85m", minutesAgo: 320, status: "Rumour" },
  { playerName: "Joško Gvardiol", from: "Man City", to: "Real Madrid", fee: "Loan", minutesAgo: 410, status: "Loan" },
];

export const DISCUSSIONS: Discussion[] = [
  { id: "d1", title: "Paraguay over Germany — the upset of the tournament?", author: "albirroja", replies: 642, likes: 2280, minutesAgo: 55, tag: "Round of 32", hot: true },
  { id: "d2", title: "Messi vs Mbappé — who wins the Golden Boot from here?", author: "goat_debate", replies: 812, likes: 3410, minutesAgo: 25, tag: "Golden Boot", hot: true },
  { id: "d3", title: "How did Morocco break down that Dutch block?", author: "tactics_ma", replies: 298, likes: 940, minutesAgo: 70, tag: "Tactics" },
  { id: "d4", title: "Brazil vs Norway is the last-16 tie of the round — agree?", author: "bracketology", replies: 476, likes: 1810, minutesAgo: 88, tag: "Round of 16", hot: true },
  { id: "d5", title: "Can anyone stop Spain? The model has them clear favourites", author: "la_roja_10", replies: 364, likes: 1020, minutesAgo: 120, tag: "Spain" },
];

export interface PollOption {
  label: string;
  votes: number;
  teamId?: string;
}
export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

export const POLLS: Poll[] = [
  {
    id: "poll-winner",
    question: "Who lifts the trophy on July 19?",
    options: [
      { label: "Spain", teamId: "spain", votes: 5210 },
      { label: "Argentina", teamId: "argentina", votes: 4820 },
      { label: "France", teamId: "france", votes: 4470 },
      { label: "Brazil", teamId: "brazil", votes: 3560 },
      { label: "England", teamId: "england", votes: 2870 },
    ],
  },
  {
    id: "poll-shock",
    question: "Biggest shock of the Round of 32?",
    options: [
      { label: "Paraguay knock out Germany", teamId: "paraguay", votes: 3120 },
      { label: "Morocco end the Dutch run", teamId: "morocco", votes: 2440 },
      { label: "Canada's first knockout win", teamId: "canada", votes: 1980 },
      { label: "Norway edge Ivory Coast", teamId: "norway", votes: 1210 },
    ],
  },
];

export const BADGES = [
  { id: "b1", name: "Prediction Master", desc: "90%+ accuracy over 20 tips", icon: "target", earned: true, rarity: "Legendary" },
  { id: "b2", name: "Perfect Week", desc: "All predictions correct in a round", icon: "calendar-check", earned: true, rarity: "Epic" },
  { id: "b3", name: "Goal Hunter", desc: "Called 10 exact scorelines", icon: "crosshair", earned: false, rarity: "Rare" },
  { id: "b4", name: "Hot Streak", desc: "8 correct picks in a row", icon: "flame", earned: true, rarity: "Rare" },
  { id: "b5", name: "Top Analyst", desc: "Top 1% on the leaderboard", icon: "trending-up", earned: false, rarity: "Epic" },
  { id: "b6", name: "World Champion", desc: "Win a public prediction group", icon: "trophy", earned: false, rarity: "Legendary" },
];

export const LEADERBOARD = [
  { rank: 1, name: "Sofia Marchetti", handle: "@sofiam", points: 2840, streak: 9, delta: 2 },
  { rank: 2, name: "Diego Herrera", handle: "@dherrera", points: 2790, streak: 6, delta: -1 },
  { rank: 3, name: "Amara Okafor", handle: "@amaraok", points: 2710, streak: 4, delta: 1 },
  { rank: 4, name: "You", handle: "@enea", points: 2680, streak: 7, delta: 3 },
  { rank: 5, name: "Kenji Watanabe", handle: "@kenjiw", points: 2650, streak: 5, delta: -2 },
  { rank: 6, name: "Lucas Silva", handle: "@lucassilva", points: 2590, streak: 3, delta: 0 },
];

export const HOST_CITIES = [
  { city: "New York / NJ", country: "us", stadium: "MetLife Stadium", capacity: 82500, lat: 40.81, lng: -74.07, matches: 8 },
  { city: "Los Angeles", country: "us", stadium: "SoFi Stadium", capacity: 70240, lat: 33.95, lng: -118.34, matches: 8 },
  { city: "Dallas", country: "us", stadium: "AT&T Stadium", capacity: 80000, lat: 32.75, lng: -97.09, matches: 9 },
  { city: "Atlanta", country: "us", stadium: "Mercedes-Benz Stadium", capacity: 71000, lat: 33.76, lng: -84.40, matches: 8 },
  { city: "Mexico City", country: "mx", stadium: "Estadio Azteca", capacity: 87523, lat: 19.30, lng: -99.15, matches: 5 },
  { city: "Toronto", country: "ca", stadium: "BMO Field", capacity: 45500, lat: 43.63, lng: -79.42, matches: 6 },
  { city: "Miami", country: "us", stadium: "Hard Rock Stadium", capacity: 65000, lat: 25.96, lng: -80.24, matches: 7 },
  { city: "Vancouver", country: "ca", stadium: "BC Place", capacity: 54500, lat: 49.28, lng: -123.11, matches: 7 },
];
