import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { type NextRequest, NextResponse } from "next/server";
import { geocodeProjectById } from "@/lib/project-geocoding.server";

export const runtime = "nodejs";
type WebhookPayload = { _id?: string; _type?: string };

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.SANITY_MAP_GEOCODING_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ message: "Project-map geocoding is not configured." }, { status: 503 });
  }
  const { body, isValidSignature } = await parseBody<WebhookPayload>(request, webhookSecret, true);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid webhook signature." }, { status: 401 });
  if (!body?._id || !["project", "mapProject"].includes(body._type || "")) {
    return NextResponse.json({ message: "Invalid project webhook payload." }, { status: 400 });
  }

  try {
    const result = await geocodeProjectById(body._id);
    if (result.geocoded) {
      revalidateTag("sanity-projects", "max");
      revalidatePath("/projects");
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Project geocoding failed.", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ message: "Project geocoding failed." }, { status: 422 });
  }
}
