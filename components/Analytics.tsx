"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Analytics.module.css";

const STORAGE_KEY = "hepburn-analytics-consent-v1";
type Consent = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function track(name: string, parameters: Record<string, unknown> = {}) {
  window.gtag?.("event", name, parameters);
}

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsReady, setAnalyticsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
    setReady(true);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;

    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const text = link.textContent?.trim().slice(0, 120) || "";
      const page = window.location.pathname;

      if (href.startsWith("tel:")) {
        track("phone_click", { link_text: text, page_path: page });
      } else if (href.includes("calendly.com")) {
        track("book_consultation_click", { link_text: text, page_path: page });
      } else if (href.includes("share.google") || href.includes("google.com/maps")) {
        track("google_business_click", { link_text: text, page_path: page });
      } else if (href.includes("mybuilder.com") || href.includes("checkatrade.com")) {
        track("review_platform_click", { link_text: text, page_path: page });
      } else if (href === "/estimate" || href.startsWith("/estimate?")) {
        track("fee_calculator_click", { link_text: text, page_path: page });
      }
    };

    const leadHandler = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      track("generate_lead", {
        page_path: window.location.pathname,
        ...detail,
      });
    };

    document.addEventListener("click", clickHandler);
    window.addEventListener("hepburn:lead", leadHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
      window.removeEventListener("hepburn:lead", leadHandler);
    };
  }, [consent]);

  useEffect(() => {
    if (consent === "accepted" && analyticsReady) {
      track("page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [analyticsReady, consent, pathname]);

  function clearAnalyticsCookies() {
    document.cookie
      .split(";")
      .map((cookie) => cookie.split("=")[0].trim())
      .filter((name) => name.startsWith("_ga"))
      .forEach((name) => {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      });
  }

  function choose(value: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    if (value === "rejected") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
    } else {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    setConsent(value);
    setSettingsOpen(false);
  }

  if (!measurementId) return null;

  const showPanel = ready && (consent === null || settingsOpen);

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
            onLoad={() => setAnalyticsReady(true)}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${measurementId}', {
                anonymize_ip: true,
                send_page_view: false
              });
            `}
          </Script>
        </>
      )}

      {showPanel && (
        <div className={styles.backdrop} role="presentation">
          <section
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            aria-describedby="cookie-description"
          >
            <small>Privacy choices</small>
            <h2 id="cookie-title">Optional website analytics</h2>
            <p id="cookie-description">
              We use optional Google Analytics to understand which pages help visitors.
              Analytics stays off unless you accept it. Necessary website functions do not
              require this consent.
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.accept} onClick={() => choose("accepted")}>
                Accept analytics
              </button>
              <button type="button" className={styles.reject} onClick={() => choose("rejected")}>
                Reject optional cookies
              </button>
            </div>
            <Link href="/privacy">Read the privacy and cookie notice</Link>
          </section>
        </div>
      )}

      {ready && consent !== null && !settingsOpen && (
        <button
          type="button"
          className={styles.settings}
          onClick={() => setSettingsOpen(true)}
          aria-label="Open cookie settings"
        >
          Cookie settings
        </button>
      )}
    </>
  );
}
