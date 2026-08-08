"use client";

export function CookiePreferencesButton() {
  return <button type="button" className="footer-cookie-preferences" aria-label="Open privacy and cookie preferences" onClick={() => window.dispatchEvent(new Event("hepburn:open-cookie-preferences"))}>Privacy &amp; cookies</button>;
}
