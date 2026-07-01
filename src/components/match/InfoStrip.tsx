import type { Match } from "@/lib/types";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { kickoffLabel, formatNumber } from "@/lib/utils";

const WEATHER: Record<string, string> = {
  Clear: "Sun",
  Cloudy: "Cloud",
  Rain: "CloudRain",
  Humid: "Droplets",
};

function Item({
  icon,
  label,
  value,
  children,
}: {
  icon: string;
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 p-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-ink-2 ring-1 ring-white/10">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-wider text-ink-3">{label}</div>
        <div className="truncate text-[13px] font-medium">{children ?? value}</div>
      </div>
    </div>
  );
}

export function InfoStrip({ m }: { m: Match }) {
  const { time, day } = kickoffLabel(m.kickoff);
  return (
    <div className="panel grid grid-cols-2 divide-line/60 sm:grid-cols-3 lg:grid-cols-5 [&>*]:border-line/60 [&>*:not(:last-child)]:border-b sm:[&>*]:border-r">
      <Item icon="MapPin" label="Stadium" value={m.venue} />
      <Item icon="Trophy" label="City" value={m.city} />
      <Item icon="UserRound" label="Referee">
        <span className="flex items-center gap-1.5">
          <Flag code={m.refereeCountry} size={15} />
          {m.referee}
        </span>
      </Item>
      <Item
        icon={m.weather ? WEATHER[m.weather] : "Sun"}
        label="Weather"
        value={m.temperature ? `${m.temperature}° · ${m.weather}` : "—"}
      />
      <Item
        icon="Users"
        label="Attendance"
        value={m.attendance ? formatNumber(m.attendance) : "TBD"}
      />
    </div>
  );
}
