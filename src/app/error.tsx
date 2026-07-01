"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-live/10 ring-1 ring-live/25">
        <Icon name="ShieldAlert" className="h-8 w-8 text-live" />
      </span>
      <h1 className="text-[22px] font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-ink-2">
        We hit an unexpected error rendering this view. Our team has been notified — try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-ink transition-transform active:scale-[0.98]"
      >
        <Icon name="Repeat" className="h-4 w-4" /> Try again
      </button>
    </div>
  );
}
