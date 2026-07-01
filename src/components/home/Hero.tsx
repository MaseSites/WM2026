import Link from "next/link";
import { LIVE_MATCHES, UPCOMING, NEXT_MATCH, TOURNAMENT, team } from "@/lib/data";
import { Flag } from "@/components/ui/Flag";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/ui/Icon";
import { Countdown } from "./Countdown";
import { kickoffLabel } from "@/lib/utils";
import type { Match } from "@/lib/types";

function HeroLive({ m }: { m: Match }) {
  const h = team(m.homeId);
  const a = team(m.awayId);
  return (
    <Link
      href={`/match/${m.id}`}
      className="group flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-3 transition-all hover:border-line-strong hover:bg-white/[0.04]"
    >
      <span className="flex shrink-0 items-center gap-1 rounded-md bg-live/12 px-1.5 py-1 text-[10px] font-bold text-live">
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
        {m.minute}′
      </span>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 truncate">
            <Flag code={h.code} size={18} /><span className="truncate text-[13px] font-medium">{h.short}</span>
          </span>
          <span className="tabular text-[15px] font-semibold">{m.homeScore}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 truncate">
            <Flag code={a.code} size={18} /><span className="truncate text-[13px] font-medium">{a.short}</span>
          </span>
          <span className="tabular text-[15px] font-semibold">{m.awayScore}</span>
        </div>
      </div>
    </Link>
  );
}

function UpcomingRow({ m }: { m: Match }) {
  const h = team(m.homeId);
  const a = team(m.awayId);
  const { day, time } = kickoffLabel(m.kickoff);
  return (
    <Link href={`/match/${m.id}`} className="group flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]">
      <span className="w-16 shrink-0 text-[10.5px] leading-tight text-ink-3">{day}<br />{time}</span>
      <Flag code={h.code} size={18} />
      <span className="truncate text-[12.5px] font-medium">{h.short}</span>
      <span className="text-[10px] text-ink-3">v</span>
      <span className="truncate text-[12.5px] font-medium">{a.short}</span>
      <Flag code={a.code} size={18} />
      <Icon name="ChevronRight" className="ml-auto h-3.5 w-3.5 text-ink-3 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Hero() {
  const live = LIVE_MATCHES.length;
  const next = NEXT_MATCH;
  const nh = team(next.homeId);
  const na = team(next.awayId);
  const { day, time } = kickoffLabel(next.kickoff);
  const upNext = UPCOMING.slice(0, 3);

  return (
    <section className="rise relative overflow-hidden rounded-2xl border border-line panel">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 320px at 88% -20%, rgba(0,230,118,0.12), transparent 60%), radial-gradient(500px 260px at 0% 120%, rgba(77,157,255,0.08), transparent 60%)",
        }}
      />
      <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Left — narrative */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            {live > 0 ? (
              <Pill variant="live" dot>LIVE · {live} matches</Pill>
            ) : (
              <Pill variant="accent" dot>{TOURNAMENT.stage}</Pill>
            )}
            <Pill variant="outline">Knockouts</Pill>
            <span className="flex items-center gap-1">
              <Flag code="us" size={18} /><Flag code="ca" size={18} /><Flag code="mx" size={18} />
            </span>
          </div>

          <h1 className="mt-4 max-w-xl text-balance text-[30px] font-bold leading-[1.05] tracking-tight md:text-[40px]">
            The <span className="text-accent">Round of 32</span> is under way.
          </h1>
          <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-2">
            The group stage is done and single-elimination has begun across the USA,
            Canada and Mexico. Real fixtures, real results, live model odds.
          </p>

          <div className="mt-6 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {[
              { v: "25", l: "Teams left" },
              { v: TOURNAMENT.goals, l: "Goals" },
              { v: TOURNAMENT.avgGoals, l: "Goals / match" },
              { v: "5.13M", l: "Attendance" },
            ].map((s) => (
              <div key={s.l}>
                <div className="tabular text-2xl font-semibold tracking-tight">{s.v}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-3">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link href="/live" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13.5px] font-semibold text-accent-ink transition-transform active:scale-[0.98]">
              <Icon name="Radio" className="h-4 w-4" /> Live Center
            </Link>
            <Link href="/bracket" className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white/[0.03] px-4 py-2.5 text-[13.5px] font-semibold transition-colors hover:bg-white/[0.06]">
              <Icon name="Trophy" className="h-4 w-4 text-ink-2" /> View Bracket
            </Link>
          </div>
        </div>

        {/* Right — live / next */}
        <div className="flex flex-col gap-3">
          {live > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">Live now</span>
                <Link href="/live" className="text-[12px] font-medium text-accent">Open →</Link>
              </div>
              {LIVE_MATCHES.map((m) => <HeroLive key={m.id} m={m} />)}
            </>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.05] ring-1 ring-white/10">
                <Icon name="Radio" className="h-4 w-4 text-ink-3" />
              </span>
              <div>
                <div className="text-[13.5px] font-semibold">No matches live right now</div>
                <div className="text-[11.5px] text-ink-3">Next kick-off {day} at {time}</div>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-line bg-white/[0.02] p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">Next up</span>
              <span className="text-[11px] text-ink-3">{day} · {time}</span>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag code={nh.code} size={22} /><span className="text-[13.5px] font-semibold">{nh.short}</span>
              </div>
              <span className="text-[11px] font-medium text-ink-3">vs</span>
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] font-semibold">{na.short}</span><Flag code={na.code} size={22} />
              </div>
            </div>
            <div className="mt-3"><Countdown iso={next.kickoff} compact /></div>
          </div>

          <div className="rounded-xl border border-line bg-white/[0.02] p-1.5">
            {upNext.map((m) => <UpcomingRow key={m.id} m={m} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
