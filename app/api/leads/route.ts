import { NextResponse } from "next/server";

const endpoint = "https://formspree.io/f/xeeyeqyg";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const source = String(payload?.source ?? "").trim();

    if (!name || !email.includes("@") || !source) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const response = await fetch(endpoint, {
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

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to submit." }, { status: 500 });
  }
}
