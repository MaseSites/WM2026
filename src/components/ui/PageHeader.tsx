import { Icon } from "./Icon";

export function PageHeader({
  title,
  subtitle,
  kicker,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
  icon?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        {icon && (
          <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] ring-1 ring-white/10">
            <Icon name={icon} className="h-5 w-5 text-accent" />
          </span>
        )}
        <div>
          {kicker && (
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/80">
              {kicker}
            </div>
          )}
          <h1 className="text-[24px] font-bold tracking-tight sm:text-[28px]">{title}</h1>
          {subtitle && (
            <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-ink-2">{subtitle}</p>
          )}
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
