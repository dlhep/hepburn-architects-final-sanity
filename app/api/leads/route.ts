import { NextResponse } from "next/server";

const formspreeEndpoint = "https://formspree.io/f/xeeyeqyg";
const mailerLiteEndpoint = "https://connect.mailerlite.com/api/subscribers";

async function addToMailerLite(name: string, email: string) {
  const token = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!token || !groupId) {
    throw new Error("MailerLite environment variables are not configured.");
  }

  const response = await fetch(mailerLiteEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      fields: { name },
      groups: [groupId],
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`MailerLite request failed with status ${response.status}.`);
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const source = String(payload?.source ?? "").trim();
    const website = String(payload?.website ?? "").trim();

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email.includes("@") || !source) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        calculator: source,
        ...(payload.projectSummary || {}),
        _subject: `New website calculator enquiry from ${name}`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Unable to submit." }, { status: 502 });
    }

    try {
      await addToMailerLite(name, email);
    } catch (error) {
      console.error(
        "Formspree accepted a guide lead, but MailerLite sync failed:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to submit." }, { status: 500 });
  }
}
