import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <div
          className="text-[120px] font-bold leading-none tracking-tighter text-transparent sm:text-[160px]"
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.12)" }}
        >
          404
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 ring-1 ring-accent/25">
            <Icon name="Goal" className="h-8 w-8 text-accent" />
          </span>
        </div>
      </div>
      <h1 className="text-[22px] font-bold tracking-tight">This one went off the pitch</h1>
      <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-ink-2">
        The page you were looking for isn&apos;t here. It may have been moved, or the
        final whistle has already gone.
      </p>
      <div className="mt-6 flex gap-2.5">
        <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-ink transition-transform active:scale-[0.98]">
          <Icon name="Home" className="h-4 w-4" /> Back home
        </Link>
        <Link href="/live" className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white/[0.03] px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-white/[0.06]">
          <Icon name="Radio" className="h-4 w-4 text-ink-2" /> Live Center
        </Link>
      </div>
    </div>
  );
}
