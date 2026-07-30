import { NextResponse } from "next/server";

const FORM_ID_PATTERN = /^[a-zA-Z0-9]+$/;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const formId = process.env.FORMSPREE_FORM_ID?.trim();

    if (!formId || !FORM_ID_PATTERN.test(formId)) {
      console.error("Ask Hepburn submission failed: Formspree form ID is not configured.");
      return NextResponse.json(
        { error: "Enquiry delivery is not configured." },
        { status: 503 },
      );
    }

    const payload = await request.json();
    const name = text(payload?.name, 200);
    const email = text(payload?.email, 320);
    const postcode = text(payload?.postcode, 30);
    const projectType = text(payload?.projectType, 200);
    const projectDescription = text(payload?.projectDescription, 1_000);
    const preferredNextStep = text(payload?.preferredNextStep, 200);
    const currentPageUrl = text(payload?.currentPageUrl, 2_000);
    const consentConfirmed = payload?.consentConfirmed === true;
    const includeConversationSummary = payload?.includeConversationSummary === true;
    const conversationSummary = text(payload?.conversationSummary, 1_000);

    if (
      !name ||
      !email ||
      !email.includes("@") ||
      !postcode ||
      !projectType ||
      !projectDescription ||
      !preferredNextStep ||
      !currentPageUrl ||
      !consentConfirmed
    ) {
      return NextResponse.json({ error: "Invalid enquiry details." }, { status: 400 });
    }

    const formspreeResponse = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Visitor name": name,
        "Visitor email": email,
        "Project postcode": postcode,
        "Project type": projectType,
        "Short project description": projectDescription,
        "Preferred next step": preferredNextStep,
        "Current page URL": currentPageUrl,
        "Submission source": "Ask Hepburn chatbot",
        "Date and time": new Date().toISOString(),
        "Consent confirmed": "Yes",
        ...(includeConversationSummary && conversationSummary
          ? { "Conversation summary": conversationSummary }
          : {}),
        email,
        _replyto: email,
        _subject: `Ask Hepburn enquiry – ${projectType} – ${postcode}`,
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!formspreeResponse.ok) {
      console.error(
        "Ask Hepburn submission rejected by Formspree.",
        { status: formspreeResponse.status },
      );
      return NextResponse.json(
        { error: "Formspree rejected the enquiry." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const reason =
      error instanceof SyntaxError
        ? "invalid JSON"
        : error instanceof Error && error.name === "TimeoutError"
          ? "Formspree timeout"
          : "request failure";
    console.error("Ask Hepburn submission failed.", { reason });
    return NextResponse.json({ error: "Unable to send enquiry." }, { status: 500 });
  }
}
