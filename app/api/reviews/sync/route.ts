import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { synchroniseGoogleBusinessReviews } from "@/lib/google-business/sync";

export const runtime = "nodejs";
export const maxDuration = 60;

function authorised(request: Request) {
  const expected = process.env.CRON_SECRET;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!expected || !supplied) return false;
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

async function sync(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  try {
    const summary = await synchroniseGoogleBusinessReviews();
    revalidateTag("sanity-reviews", "max");
    revalidatePath("/reviews");
    revalidatePath("/");
    revalidatePath("/services", "layout");
    revalidatePath("/locations", "layout");
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    console.error("Google Business review sync failed.", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ message: "Google Business review sync failed." }, { status: 500 });
  }
}

export async function POST(request: Request) { return sync(request); }
export async function GET(request: Request) { return sync(request); }

