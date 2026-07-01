import type { Match, MatchEvent } from "@/lib/types";
import { team } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

function line(e: MatchEvent, m: Match): { text: string; big?: boolean } {
  const t = e.teamId ? team(e.teamId).short : "";
  switch (e.type) {
    case "kickoff":
      return { text: "We're underway — the referee gets the tie started." };
    case "halftime":
      return { text: `Half-time. ${e.detail ?? ""}`.trim() };
    case "fulltime":
      return { text: `Full-time. ${e.detail ?? ""}`.trim() };
    case "goal":
    case "penalty_goal":
      return {
        text: `GOAL! ${e.playerName} finds the net for ${t}${e.assistName ? `, teed up by ${e.assistName}` : ""}. What a moment.`,
        big: true,
      };
    case "yellow":
      return { text: `Yellow card for ${e.playerName} (${t})${e.detail ? ` — ${e.detail.toLowerCase()}` : ""}.` };
    case "red":
      return { text: `Red card! ${e.playerName} (${t}) is sent off.`, big: true };
    case "var":
      return { text: `VAR check — ${e.detail ?? "the officials take a look"}.` };
    case "sub":
      return { text: `Change for ${t}: ${e.playerName} on, ${e.assistName} off.` };
    default:
      return { text: `${e.playerName ?? ""}` };
  }
}

export function Commentary({ m }: { m: Match }) {
  if (m.events.length === 0) return null;
  const live = m.status === "live" || m.status === "halftime";
  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon name="MessageSquare" className="h-4 w-4 text-accent" />
        <h3 className="text-[14px] font-semibold">Live commentary</h3>
        {live && (
          <span className="ml-auto flex items-center gap-1 text-[11px] font-bold text-live">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" /> LIVE
          </span>
        )}
      </div>
      <div className="space-y-3">
        {[...m.events].reverse().map((e, i) => {
          const l = line(e, m);
          return (
            <div key={i} className="flex gap-3">
              <span className="tabular w-8 shrink-0 pt-0.5 text-right text-[11px] font-semibold text-ink-3">
                {["kickoff", "halftime", "fulltime"].includes(e.type) ? "" : `${e.minute}′`}
              </span>
              <div className="flex-1 border-l border-line pl-3">
                <p
                  className={cn(
                    "text-[13px] leading-relaxed",
                    l.big ? "font-semibold text-ink" : "text-ink-2",
                  )}
                >
                  {l.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
