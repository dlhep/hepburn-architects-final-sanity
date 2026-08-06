import { NextResponse } from "next/server";

const formspreeEndpoint = "https://formspree.io/f/xeeyeqyg";
const mailerLiteEndpoint = "https://connect.mailerlite.com/api/subscribers";
const projectRegions = new Set([
  "West Midlands",
  "North East England",
  "Elsewhere in England",
  "Wales",
  "Outside England and Wales",
  "Not sure yet",
]);

function requestHostname(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host") || new URL(request.url).host;
  return host.toLowerCase().replace(/:\d+$/, "");
}

function websiteRegionFor(hostname: string) {
  return hostname === "hepburnarchitects.com" || hostname === "www.hepburnarchitects.com"
    ? "North East England"
    : "West Midlands";
}

function enquiryPage(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) return "/estimate";
  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`;
  } catch {
    return "/estimate";
  }
}

function subjectRegion(projectRegion: string, websiteRegion: string) {
  const effectiveRegion = projectRegion === "Not sure yet" ? websiteRegion : projectRegion;
  const labels: Record<string, string> = {
    "West Midlands": "WEST MIDLANDS PROJECT",
    "North East England": "NORTH EAST PROJECT",
    "Elsewhere in England": "OTHER ENGLAND PROJECT",
    Wales: "WALES PROJECT",
    "Outside England and Wales": "OUTSIDE ENGLAND AND WALES PROJECT",
  };
  return labels[effectiveRegion] || labels[websiteRegion] || "NEW PROJECT";
}

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
    const body = await response.text();
    console.error("MailerLite error:", response.status, body);
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
    const projectRegion = String(payload?.projectRegion ?? "").trim();
    const projectPostcode = String(payload?.projectPostcode ?? "").trim();

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email.includes("@") || !source || !projectRegions.has(projectRegion)) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const hostname = requestHostname(request);
    const websiteRegion = websiteRegionFor(hostname);
    const calculator = source === "build-cost" ? "Build Cost Calculator" : "Architect Fee Calculator";
    const summary = payload.projectSummary && typeof payload.projectSummary === "object" ? payload.projectSummary : {};
    const services = Array.isArray(summary.selectedServices) ? summary.selectedServices.join(", ") : String(summary.selectedServices ?? "Not provided");

    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        "Website source": hostname,
        "Website region": websiteRegion,
        "Project region": projectRegion,
        "Project postcode": projectPostcode || "Not provided",
        "Enquiry page": enquiryPage(request),
        Name: name,
        Email: email,
        Calculator: calculator,
        "Project type": String(summary.projectType ?? "Not provided"),
        "Project scale": String(summary.projectScale ?? "Not provided"),
        "Planning complexity": String(summary.planningComplexity ?? "Not provided"),
        "Services selected": services,
        "Indicative fee range": String(summary.indicativeFee ?? "Not provided"),
        _subject: `[${subjectRegion(projectRegion, websiteRegion)}] New calculator enquiry from ${name}`,
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
