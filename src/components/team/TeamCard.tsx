import Link from "next/link";
import type { Team } from "@/lib/types";
import { Flag } from "@/components/ui/Flag";
import { FormDots } from "@/components/ui/FormDots";
import { Pill } from "@/components/ui/Pill";
import { formatValue } from "@/lib/utils";

export function TeamCard({ t }: { t: Team }) {
  return (
    <Link href={`/team/${t.id}`} className="panel panel-hover group block p-4">
      <div className="flex items-start justify-between">
        <Flag code={t.code} size={44} rounded="rounded-lg" className="shadow-md" />
        <Pill variant="outline">Group {t.group}</Pill>
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[15px] font-semibold transition-colors group-hover:text-accent">
            {t.name}
          </h3>
        </div>
        <p className="text-[11.5px] text-ink-3">{t.nickname}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <FormDots form={t.form} />
        <span className="text-[11px] text-ink-3">FIFA #{t.fifaRank}</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line/60 pt-3 text-[11px]">
        <div>
          <div className="text-ink-3">Squad value</div>
          <div className="text-[13px] font-semibold text-ink">{formatValue(t.marketValue)}</div>
        </div>
        <div className="text-right">
          <div className="text-ink-3">Title odds</div>
          <div className="text-[13px] font-semibold text-accent">{t.winProbability.toFixed(1)}%</div>
        </div>
      </div>
    </Link>
  );
}
