import { cn } from "@/lib/utils";

const MAP = {
  W: { bg: "bg-win/90", label: "Win" },
  D: { bg: "bg-draw/90", label: "Draw" },
  L: { bg: "bg-live/90", label: "Loss" },
} as const;

export function FormDots({
  form,
  className,
  size = "sm",
}: {
  form: ("W" | "D" | "L")[];
  className?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "md" ? "h-5 w-5 text-[10px]" : "h-3.5 w-3.5 text-[8px]";
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {form.map((r, i) => (
        <span
          key={i}
          title={MAP[r].label}
          className={cn(
            "grid place-items-center rounded font-bold text-canvas/90",
            dim,
            MAP[r].bg,
          )}
        >
          {size === "md" ? r : ""}
        </span>
      ))}
    </div>
  );
}
