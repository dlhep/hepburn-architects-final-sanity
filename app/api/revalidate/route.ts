import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-sanity-secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("sanity-projects", "max");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
