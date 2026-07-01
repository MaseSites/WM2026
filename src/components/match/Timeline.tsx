import type { Match, MatchEvent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const META: Record<
  string,
  { icon: string; tint: string; label?: string }
> = {
  goal: { icon: "Goal", tint: "text-accent" },
  penalty_goal: { icon: "Goal", tint: "text-accent", label: "Penalty" },
  own_goal: { icon: "Goal", tint: "text-live", label: "Own goal" },
  yellow: { icon: "ShieldAlert", tint: "text-draw" },
  red: { icon: "ShieldAlert", tint: "text-live" },
  second_yellow: { icon: "ShieldAlert", tint: "text-live" },
  sub: { icon: "Repeat", tint: "text-ink-3" },
  var: { icon: "ShieldAlert", tint: "text-info", label: "VAR" },
};

function Divider({ e }: { e: MatchEvent }) {
  const label =
    e.type === "kickoff" ? "Kick-off" : e.type === "halftime" ? "Half-time" : "Full-time";
  return (
    <div className="my-1 flex items-center gap-3">
      <div className="h-px flex-1 bg-line" />
      <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
        {label}
        {e.detail && e.type !== "kickoff" && <span className="ml-1.5 text-ink-2">{e.detail}</span>}
      </span>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}

function Row({ e, home }: { e: MatchEvent; home: boolean }) {
  const meta = META[e.type];
  if (!meta) return null;
  const isGoal = e.type === "goal" || e.type === "penalty_goal" || e.type === "own_goal";

  const content = (
    <div className={cn("flex-1", home ? "text-right" : "text-left")}>
      <div className="flex items-center gap-2" style={{ flexDirection: home ? "row-reverse" : "row" }}>
        <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/[0.05]", meta.tint)}>
          <Icon name={meta.icon} className="h-3.5 w-3.5" />
        </span>
        <span className={cn("text-[13.5px] font-medium", isGoal && "text-ink")}>
          {e.playerName}
          {e.type === "sub" && e.assistName && (
            <span className="text-ink-3"> · {e.assistName}</span>
          )}
        </span>
      </div>
      {(e.assistName && e.type !== "sub") && (
        <div className="mt-0.5 text-[11px] text-ink-3">assist {e.assistName}</div>
      )}
      {meta.label && (
        <div className={cn("mt-0.5 text-[10px] font-semibold uppercase tracking-wider", meta.tint)}>
          {meta.label}
        </div>
      )}
      {e.detail && e.type === "var" && (
        <div className="mt-0.5 text-[11px] text-ink-3">{e.detail}</div>
      )}
    </div>
  );

  return (
    <div className="flex items-start gap-3 py-2">
      {home ? content : <div className="flex-1" />}
      <div className="flex shrink-0 flex-col items-center">
        <span className="tabular grid h-7 min-w-7 place-items-center rounded-full border border-line bg-surface px-1.5 text-[11px] font-semibold text-ink-2">
          {e.minute}′
        </span>
      </div>
      {home ? <div className="flex-1" /> : content}
    </div>
  );
}

export function Timeline({ m }: { m: Match }) {
  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2">
        <Icon name="Activity" className="h-4 w-4 text-accent" />
        <h3 className="text-[14px] font-semibold">Match timeline</h3>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
        {[...m.events].reverse().map((e, i) => {
          if (["kickoff", "halftime", "fulltime"].includes(e.type)) {
            return <Divider key={i} e={e} />;
          }
          return <Row key={i} e={e} home={e.teamId === m.homeId} />;
        })}
      </div>
    </div>
  );
}
