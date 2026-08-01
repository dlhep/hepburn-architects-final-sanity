import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { geocodeProjectById, getStaleMappedProjectIds } from "@/lib/project-geocoding.server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authorisation = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authorisation !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  }

  try {
    const ids = await getStaleMappedProjectIds();
    let refreshed = 0;
    for (const id of ids.slice(0, 20)) {
      const result = await geocodeProjectById(id, true);
      if (result.geocoded) refreshed += 1;
    }
    if (refreshed) {
      revalidateTag("sanity-projects", "max");
      revalidatePath("/projects");
    }
    return NextResponse.json({ checked: Math.min(ids.length, 20), refreshed });
  } catch (error) {
    console.error("Scheduled project geocoding refresh failed.", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ message: "Scheduled geocoding refresh failed." }, { status: 500 });
  }
}
