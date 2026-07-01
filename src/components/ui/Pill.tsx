import { cn } from "@/lib/utils";

type Variant = "neutral" | "accent" | "live" | "draw" | "info" | "outline";

const VARIANTS: Record<Variant, string> = {
  neutral: "bg-white/[0.06] text-ink-2 ring-1 ring-white/10",
  accent: "bg-accent/12 text-accent ring-1 ring-accent/25",
  live: "bg-live/12 text-live ring-1 ring-live/25",
  draw: "bg-draw/12 text-draw ring-1 ring-draw/25",
  info: "bg-info/12 text-info ring-1 ring-info/25",
  outline: "text-ink-2 ring-1 ring-white/12",
};

export function Pill({
  children,
  variant = "neutral",
  className,
  dot,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide",
        VARIANTS[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "live" && "live-dot bg-live",
            variant === "accent" && "bg-accent",
            variant === "draw" && "bg-draw",
            variant === "info" && "bg-info",
            variant === "neutral" && "bg-ink-3",
          )}
        />
      )}
      {children}
    </span>
  );
}
