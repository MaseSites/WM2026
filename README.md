# WorldMap 26

A world-class live football platform for the **FIFA World Cup 2026** — built to stand next to Flashscore, Sofascore and OneFootball. Live scores, xG, momentum, win-probability models, a full knockout bracket, deep team & player profiles, an AI match analyst, predictions, leaderboards and badges.

Designed to feel handcrafted: a restrained deep-navy canvas, hairline borders, a single confident accent, real 8px rhythm, Inter typography and Framer-Motion micro-interactions throughout.

```
Next.js 15 (App Router)  ·  React 19  ·  TypeScript  ·  Tailwind v4  ·  Framer Motion
```

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # optimized production build (152 static pages)
npm run start    # serve the production build
```

No environment variables are required — the app ships with a real, hand-verified snapshot of the tournament (see `src/lib/data`). Flags are served from `flagcdn.com`; fonts from Google Fonts.

### Live data (optional, auto-updating)

By default the site renders from the bundled snapshot. To make results update **automatically**, add a free [football-data.org](https://www.football-data.org/client/register) key:

```bash
cp .env.example .env.local
# then set FOOTBALL_DATA_API_KEY=your_key
```

With a key set, `src/lib/live` fetches the real World Cup competition, merges live scores/status over the snapshot (keeping our curated venues, predictions, etc.), and every match-facing page revalidates on a **60-second ISR window**. A webhook/cron can force an instant refresh via `POST /api/revalidate?secret=…`. With no key, everything falls back to the snapshot — the app renders identically and never breaks.

---

## What's built

| Area | Route | Highlights |
|------|-------|------------|
| **Home** | `/` | Live hero + countdown, quarter-final grid, title race, Golden Boot, bracket, group tables, news, fan polls, transfers, discussions |
| **Match centre** | `/match/[id]` | Animated scoreboard, live win-probability, momentum chart, tabbed Overview / Stats (xG, possession donut) / Lineups (pitch) / Timeline / **AI Analysis** / H2H |
| **Live Center** | `/live` | Real-time scoreboards, momentum, latest events, up-next & recent results |
| **Bracket** | `/bracket` | Full R16 → Final tree with live ties, projected champion |
| **Standings** | `/standings` | All 12 final group tables with qualification markers |
| **Teams** | `/teams`, `/team/[id]` | Confederation filter; strength radar, department ratings, squad, expected XI on a pitch, tournament path |
| **Players** | `/players`, `/player/[id]` | Sortable ratings; attribute radar, per-90 output, strengths/weaknesses, match history, similar players |
| **Predictions** | `/predictions` | Per-match model cards, title odds, Golden Boot projection |
| **Compete** | `/leaderboard`, `/profile` | Global ranking, private groups, badges, prediction history, confetti reward |
| **States** | `not-found`, `error`, `loading` | Custom 404, error boundary, skeleton loading |

The command palette (**⌘K / Ctrl-K**) searches every team, player, match and page.

---

## Architecture

### Rendering model
- **Server Components by default.** Pages read directly from the typed data layer and prerender to static HTML (`generateStaticParams` fans out all 48 teams, 78 players and 12 matches → 152 pages).
- **Client Components only where interaction lives** — command palette, tabs, filters, charts, polls, confetti, notifications. Server-rendered panels are passed *into* client shells (e.g. `Tabs`) as props, keeping the JS boundary tight (≈105 kB shared First-Load JS).
- **Streaming-ready:** route-level `loading.tsx` provides instant skeletons.

### Directory layout
```
src/
  app/                    # App Router routes + layout, error/loading/not-found
  components/
    layout/               # Sidebar, Topbar, LiveTicker, MobileNav, CommandPalette, Notifications
    ui/                   # Design-system primitives (Flag, Avatar, Pill, Ring, StatBar, Tabs, …)
    charts/               # Handcrafted SVG charts (Radar, Momentum, Donut, ProbBar, Meter)
    match/ team/ player/  # Feature components
    bracket/ standings/ home/
  lib/
    types.ts              # Domain model (single source of truth)
    data/                 # Typed dataset + selectors (teams, players, matches, groups, content)
    utils.ts nav.ts
```

### Design system (`globals.css`)
Tokens are declared once via Tailwind v4 `@theme`: canvas/surface ladder, hairline strokes (`rgba(255,255,255,.07)`), the `#00E676` accent used sparingly, semantic live/draw/win colors, a tight radius scale, and two easing curves. Utilities: `.panel`, `.glass`, `.hairline`, `.tabular`, skeleton shimmer, live pulse, marquee ticker, scroll-reveal. All motion respects `prefers-reduced-motion`.

**Palette** — canvas `#0B1020`, surface `#111827`, accent `#00E676`, danger `#FF4D4D`, draw `#FFC107`, ink `#F4F6FB`, ink-2 `#9CA3AF`.

---

## Data model → database design

The TypeScript domain model in `src/lib/types.ts` mirrors a normalized PostgreSQL schema. In production (Supabase + Prisma) it maps to:

```
users(id, handle, name, avatar, favourite_team_id, created_at)
teams(id, name, code, confederation, group, fifa_rank, coach, formation,
      market_value, avg_age, titles, color)
players(id, team_id→teams, number, position, club, market_value, age, height, foot)
player_stats(player_id→players, tournament_id, goals, assists, minutes, rating,
             pass_accuracy, shots_pg, key_passes, dribbles, tackles, duels_won)
matches(id, stage, group, home_id→teams, away_id→teams, home_score, away_score,
        status, minute, kickoff, venue, city, referee, attendance, weather)
match_events(id, match_id→matches, minute, type, team_id, player_id, assist_id, detail)
match_stats(match_id→matches, possession[2], shots[2], xg[2], corners[2], …)
predictions(match_id→matches, home_win, draw, away_win, xg[2], confidence, narrative[])
standings(group, team_id→teams, played, win, draw, loss, gf, ga, points)
groups_social(id, name, owner_id→users, visibility, icon)     -- prediction leagues
group_members(group_id→groups_social, user_id→users, points, rank)
user_predictions(id, user_id→users, match_id→matches, pick, exact_score, points)
badges(id, name, rarity) · user_badges(user_id, badge_id, earned_at)
news(id, title, excerpt, category, source, published_at)
notifications(id, user_id→users, type, payload, read, created_at)
comments(id, user_id, entity_type, entity_id, body, likes, parent_id)
```

Indexes on `matches(status, kickoff)`, `match_events(match_id, minute)`, `standings(group, points desc)`, `user_predictions(user_id, match_id)`. Live tables (`matches`, `match_events`) are exposed through **Supabase Realtime** channels.

---

## API design

Clean, resource-oriented — trivially expressible as REST or a tRPC router.

```
GET  /api/matches?status=live|scheduled|finished&stage=
GET  /api/matches/:id                      # match + events + stats + prediction
GET  /api/teams · /api/teams/:id           # profile + squad + path
GET  /api/players?position=&sort=  · /api/players/:id
GET  /api/standings                        # grouped tables
GET  /api/bracket
GET  /api/predictions/:matchId
POST /api/predictions                       # submit a user pick        (auth)
GET  /api/leaderboard?scope=global|group:id
POST /api/groups · POST /api/groups/:id/join                            (auth)
GET  /api/search?q=                         # unified entity search
WS   realtime:matches / realtime:match:{id} # live score & event push
```

Payloads are validated with **Zod**; mutations use **optimistic updates** via TanStack Query, reconciled against Realtime events.

---

## Authentication & state

- **NextAuth** (OAuth + email) issues a session; protected routes/actions gate on it. RSC read the session server-side; client islands receive it via context.
- **Server state**: TanStack Query (caching, background refetch, optimistic writes for predictions, polls and group joins).
- **Realtime**: Supabase channels stream goals/cards/VAR → cache invalidation + toast notifications.
- **Local UI state**: component-scoped hooks (tabs, filters, palette). No global store needed given the RSC-first architecture.

---

## Performance & accessibility
- Static prerendering + code-split client islands; `optimizePackageImports` for `lucide-react` and `framer-motion`.
- Lazy flag/avatar images, `preconnect` to font & flag CDNs, tabular-nums for stable numerics.
- Keyboard-first command palette, focus-visible rings, ARIA labels on controls, semantic tables for standings, and full `prefers-reduced-motion` support.

---

## Roadmap (designed, not yet wired)
Fantasy mode (budget XI, captain, transfers), full social threads, admin/moderation panel, daily quizzes, penalty simulator, bracket simulator, player/team compare, interactive host-city map (Leaflet), calendar export and match reminders. The data model and API above already account for these.

> Demo project. Not affiliated with FIFA. Player and team data is illustrative.
