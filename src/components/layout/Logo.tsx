import { cn } from "@/lib/utils";

export function Logo({ className, size = 30 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect width="32" height="32" rx="9" fill="#0e1424" />
        <rect width="32" height="32" rx="9" stroke="rgba(255,255,255,0.08)" />
        {/* stylised pitch arc + ball */}
        <path
          d="M6 22c3.5-2.6 5.4-6 5.4-10.4"
          stroke="url(#g)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="20" cy="12" r="6" stroke="#00E676" strokeWidth="1.8" />
        <path
          d="M20 8.4l1.9 1.4-.7 2.2h-2.4l-.7-2.2L20 8.4z"
          fill="#00E676"
        />
        <path d="M20 12l0 4M17 10l-2.3.4M23 10l2.3.4" stroke="#00E676" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <defs>
          <linearGradient id="g" x1="6" y1="22" x2="12" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E676" stopOpacity="0" />
            <stop offset="1" stopColor="#00E676" />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-ink">
          World<span className="text-accent">Map</span>
        </span>
        <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.28em] text-ink-3">
          WC 26
        </span>
      </span>
    </span>
  );
}
