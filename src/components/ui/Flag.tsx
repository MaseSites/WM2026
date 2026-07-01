import { cn, flagUrl } from "@/lib/utils";

export function Flag({
  code,
  size = 20,
  className,
  rounded = "rounded-[3px]",
  ring = true,
}: {
  code: string;
  size?: number;
  className?: string;
  rounded?: string;
  ring?: boolean;
}) {
  const h = Math.round(size * 0.72);
  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden bg-white/5",
        rounded,
        ring && "ring-1 ring-white/10",
        className,
      )}
      style={{ width: size, height: h }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={flagUrl(code, 80)}
        alt=""
        width={size}
        height={h}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </span>
  );
}
