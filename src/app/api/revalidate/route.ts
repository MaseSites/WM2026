import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation hook. Point a provider webhook or a cron job here to
 * refresh live match data immediately instead of waiting for the 60s ISR window:
 *
 *   POST /api/revalidate?secret=YOUR_SECRET
 *
 * Set REVALIDATE_SECRET in the environment to protect it.
 */
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (expected && secret !== expected) {
    return NextResponse.json({ revalidated: false, error: "unauthorized" }, { status: 401 });
  }

  revalidateTag("wc-matches");
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
