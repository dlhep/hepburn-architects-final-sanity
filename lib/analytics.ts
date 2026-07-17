export function trackEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", eventName, parameters);
}
