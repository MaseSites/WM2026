import { team } from "@/lib/data/teams";
import { cn, initials, seeded } from "@/lib/utils";

/**
 * A handcrafted monogram avatar. We don't ship licensed headshots, so instead
 * we render a calm, team-tinted tile with the player's initials — consistent,
 * crisp at any size, and unmistakably not stock art.
 */
export function Avatar({
  name,
  teamId,
  seed = 1,
  size = 40,
  className,
}: {
  name: string;
  teamId?: string;
  seed?: number;
  size?: number;
  className?: string;
}) {
  const base = (teamId && team(teamId)?.color) || "#3b4763";
  const angle = Math.round(seeded(seed) * 120 + 120);
  return (
    <span
      className={cn(
        "relative inline-grid place-items-center overflow-hidden rounded-full ring-1 ring-white/10",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(120% 120% at 30% 20%, ${base}dd, ${base}55 55%, #0d1322 100%)`,
      }}
    >
      <span
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(${angle}deg, transparent, rgba(255,255,255,.14))`,
        }}
      />
      <span
        className="relative font-semibold tracking-tight text-white/95"
        style={{ fontSize: size * 0.36 }}
      >
        {initials(name)}
      </span>
    </span>
  );
}
