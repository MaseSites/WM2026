import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export function Section({
  title,
  kicker,
  action,
  actionHref,
  icon,
  children,
  className,
}: {
  title: string;
  kicker?: string;
  action?: string;
  actionHref?: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span className="grid h-7 w-7 place-items-center rounded-md bg-white/[0.05] ring-1 ring-white/10">
              <Icon name={icon} className="h-4 w-4 text-ink-2" />
            </span>
          )}
          <div>
            {kicker && (
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent/80">
                {kicker}
              </div>
            )}
            <h2 className="text-[17px] font-semibold tracking-tight">{title}</h2>
          </div>
        </div>
        {action && actionHref && (
          <Link
            href={actionHref}
            className="group inline-flex items-center gap-1 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            {action}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
