"use client";

export function CookiePreferencesButton({ label = "Privacy & cookies" }: { label?: string }) {
  return <button type="button" className="footer-cookie-preferences" aria-label="Open privacy and cookie preferences" onClick={() => window.dispatchEvent(new Event("hepburn:open-cookie-preferences"))}>{label}</button>;
}
