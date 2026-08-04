export type AnalyticsValue = string | number | boolean;
export type AnalyticsParameters = Record<string, AnalyticsValue | null | undefined>;

export type TrackingLocation =
  | "header"
  | "hero"
  | "body"
  | "sidebar"
  | "footer"
  | "floating_chat"
  | "calculator"
  | "contact_form"
  | "guide_form"
  | "unknown";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __hepburnAnalyticsReady?: boolean;
    hepburnTrack?: (eventName: string, parameters?: AnalyticsParameters) => void;
  }
}

export const CONSENT_STORAGE_KEY = "hepburn-analytics-consent-v2";

function cleanParameters(parameters: AnalyticsParameters = {}) {
  return Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  ) as Record<string, AnalyticsValue>;
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  try { return window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted"; } catch { return false; }
}

export function currentPagePath() {
  return typeof window === "undefined" ? undefined : window.location.pathname;
}

export function trackEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent() || typeof window.gtag !== "function") return;
  try {
    const payload = cleanParameters({ page_path: currentPagePath(), ...parameters });
    window.gtag("event", eventName, payload);
  } catch {
    // Tracking must never interrupt navigation or a form submission.
  }
}

export function trackLead(parameters: AnalyticsParameters) {
  trackEvent("generate_lead", parameters);
}

export function trackSuccessfulFormSubmission(form: HTMLFormElement, parameters: AnalyticsParameters = {}) {
  trackEvent("form_submit", {
    form_id: form.id || form.getAttribute("name") || "unknown",
    form_name: form.getAttribute("name") || form.id || "unknown",
    form_action: form.getAttribute("action") || "client_submission",
    form_location: parameters.form_location || getConversionLocation(form),
    ...parameters,
  });
}

export function getConversionLocation(element?: Element | null): TrackingLocation {
  if (!element) return "unknown";
  const explicit = element.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation;
  if (explicit) return explicit as TrackingLocation;
  if (element.closest("header")) return "header";
  if (element.closest("footer")) return "footer";
  if (element.closest("aside")) return "sidebar";
  if (element.closest("[class*=chat], [id*=chat]")) return "floating_chat";
  if (element.closest("form")) {
    if (element.closest("[class*=guide]")) return "guide_form";
    if (element.closest("[class*=calculator], [class*=fee-tool], [class*=lead-gate]")) return "calculator";
    return "contact_form";
  }
  if (element.closest("section:first-of-type, [class*=hero]")) return "hero";
  return "body";
}

export function postcodeDistrict(value: unknown) {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toUpperCase().replace(/[^A-Z0-9 ]/g, " ");
  const match = normalized.match(/\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s*\d[A-Z]{2}\b/);
  return match?.[1];
}

export function feeBand(value: unknown) {
  const amount = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(amount) || amount < 1000) return "under_1000";
  if (amount < 2500) return "1000_2499";
  if (amount < 5000) return "2500_4999";
  if (amount < 10000) return "5000_9999";
  return "10000_plus";
}

export function installBrowserTracker() {
  if (typeof window !== "undefined") window.hepburnTrack = trackEvent;
}
