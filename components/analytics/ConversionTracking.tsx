"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_STORAGE_KEY,
  getConversionLocation,
  installBrowserTracker,
  postcodeDistrict,
  trackEvent,
  type AnalyticsParameters,
} from "@/lib/analytics";
import styles from "./ConversionTracking.module.css";

type Consent = "accepted" | "rejected" | null;
const CTA_WORDING = /discuss your project|start your project|contact us|make an enquiry|get in touch|enquire|request a consultation|book a consultation|review your project/i;
const SOCIALS: Record<string, string> = { facebook: "facebook", instagram: "instagram", linkedin: "linkedin", "google.com/maps": "google_business_profile", "g.page": "google_business_profile" };

function textOf(element: Element) { return (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120); }
function formDetails(form: HTMLFormElement): AnalyticsParameters {
  const data = new FormData(form);
  const project = data.get("projectType") || data.get("project_type");
  return {
    form_id: form.id || form.getAttribute("name") || "unknown",
    form_name: form.getAttribute("name") || form.id || "unknown",
    form_action: form.getAttribute("action") || "client_submission",
    form_location: getConversionLocation(form),
    project_type: typeof project === "string" ? project.slice(0, 100) : undefined,
    postcode_district: postcodeDistrict(data.get("postcode") || data.get("location")),
  };
}

export function ConversionTracking() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const formStarts = useRef(new WeakSet<HTMLFormElement>());

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
    } catch { setConsent(null); }
    setReady(true);
    installBrowserTracker();
  }, []);

  useEffect(() => {
    if (!consent || !scriptLoaded) return;
    trackEvent("page_view", { page_location: window.location.href, page_title: document.title });
    const path = window.location.pathname;
    const match = path.match(/^\/(projects|services|locations)\/([^/]+)/);
    if (match) trackEvent(match[1] === "projects" ? "project_view" : match[1] === "services" ? "service_view" : "location_page_view", { content_slug: match[2], content_type: match[1].slice(0, -1) });
    if (path === "/reviews" && document.querySelector("[data-review-page-view]")) trackEvent("review_page_view", { conversion_location: "body" });
    const review = document.querySelector<HTMLElement>("[data-review-impression][data-track-service-slug]");
    if (review) trackEvent("service_review_view", { review_id: review.dataset.trackReviewId, service_slug: review.dataset.trackServiceSlug, project_type: review.dataset.trackProjectType, broad_location: review.dataset.trackBroadLocation, source: review.dataset.trackReviewSource, conversion_location: "body" });
  }, [consent, pathname, scriptLoaded]);

  useEffect(() => {
    if (consent === "accepted" && scriptLoaded) {
      window.gtag?.("consent", "update", { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
    }
  }, [consent, scriptLoaded]);

  useEffect(() => {
    if (consent !== "accepted") return;
    const onFocus = (event: FocusEvent) => {
      const form = (event.target as Element | null)?.closest<HTMLFormElement>("form");
      if (!form || formStarts.current.has(form)) return;
      formStarts.current.add(form);
      trackEvent("form_start", formDetails(form));
      if (form.closest("[class*=guide]")) trackEvent("guide_form_start", { form_id: form.id || "guide-form", form_location: "guide_form" });
    };
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form || form.dataset.trackManualSubmit === "true" || !form.checkValidity()) return;
      trackEvent("form_submit", formDetails(form));
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a");
      const button = target?.closest<HTMLButtonElement>("button");
      const element = link || button;
      if (!element) return;
      const href = link?.href || element.getAttribute("data-track-url") || "";
      const rawHref = link?.getAttribute("href") || href;
      const label = textOf(element);
      const location = getConversionLocation(element);
      const base = { page_path: window.location.pathname, conversion_location: location };
      const internalGroup = element.closest<HTMLElement>("[data-track-internal]")?.dataset.trackGroup;
      const projectContext = {
        project_slug: element.dataset.trackProjectSlug,
        project_category: element.dataset.trackProjectCategory,
        project_location: element.dataset.trackProjectLocation,
        section_name: element.dataset.trackSection || element.closest<HTMLElement>("[data-track-section]")?.dataset.trackSection,
      };
      const reviewContext = {
        review_id: element.dataset.trackReviewId,
        service_slug: element.dataset.trackServiceSlug,
        project_type: element.dataset.trackProjectType,
        broad_location: element.dataset.trackBroadLocation,
        source: element.dataset.trackReviewSource,
      };
      if (element.dataset.trackEvent) trackEvent(element.dataset.trackEvent, { ...base, ...projectContext, ...reviewContext, link_url: href, link_text: label });
      if (internalGroup && rawHref.startsWith("/")) {
        trackEvent("internal_link_click", { ...base, link_url: rawHref, link_text: label, source_page: window.location.pathname, destination_type: rawHref.split("/")[1] || "home", link_group: internalGroup });
        const relatedEvent = internalGroup === "project-services" ? "project_related_service_click" : internalGroup === "project-locations" ? "project_related_location_click" : internalGroup === "project-guides" ? "project_related_guide_click" : internalGroup === "related-projects" ? "project_related_project_click" : undefined;
        if (relatedEvent) trackEvent(relatedEvent, { ...base, ...projectContext, link_url: rawHref, link_text: label, section_name: internalGroup });
      }
      if (rawHref.startsWith("tel:")) {
        trackEvent("phone_click", { ...base, link_url: rawHref, phone_number: rawHref.replace(/^tel:/, ""), link_text: label });
        return;
      }
      if (rawHref.startsWith("mailto:")) {
        trackEvent("email_click", { ...base, link_url: rawHref, email_address: rawHref.replace(/^mailto:/, "").split("?")[0], link_text: label });
        return;
      }
      const lowerHref = href.toLowerCase();
      if (lowerHref.includes("calendly.com") || /\b(book|consultation|appointment)\b/i.test(label)) {
        trackEvent("booking_click", { ...base, booking_provider: lowerHref.includes("calendly.com") ? "calendly" : "website", link_url: href, link_text: label });
      }
      if (CTA_WORDING.test(label) || /^\/(contact|estimate)(?:[?#/]|$)/i.test(rawHref)) trackEvent("enquiry_cta_click", { ...base, cta_text: label || rawHref, cta_url: href });
      const extension = rawHref.split("?")[0].split("#")[0].match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
      if (extension === "pdf") {
        const guide = /guide|extension/i.test(`${label} ${rawHref}`);
        trackEvent(guide ? "guide_download" : "file_download", { ...base, file_name: rawHref.split("/").pop(), file_extension: extension, link_url: href, guide_name: guide ? "house_extension_guide" : undefined });
      }
      const social = Object.entries(SOCIALS).find(([domain]) => lowerHref.includes(domain));
      if (social) trackEvent("social_click", { ...base, social_platform: social[1], link_url: href });
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin && !/hepburnarchitects\.com$/i.test(url.hostname)) trackEvent("outbound_click", { ...base, link_domain: url.hostname, link_url: url.href, link_text: label });
      } catch { /* non-URL controls */ }
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("focusin", onFocus); document.removeEventListener("submit", onSubmit, true); document.removeEventListener("click", onClick); };
  }, [consent]);

  function choose(value: Exclude<Consent, null>) {
    try { window.localStorage.setItem(CONSENT_STORAGE_KEY, value); } catch { /* private browsing */ }
    window.gtag?.("consent", "update", { analytics_storage: value === "accepted" ? "granted" : "denied", ad_storage: value === "accepted" ? "granted" : "denied", ad_user_data: value === "accepted" ? "granted" : "denied", ad_personalization: value === "accepted" ? "granted" : "denied" });
    setConsent(value); setSettingsOpen(false);
  }

  const showBanner = ready && (consent === null || settingsOpen);
  return <>
    {measurementId ? <Script id="hepburn-consent-defaults" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`}</Script> : null}
    {measurementId && consent === "accepted" ? <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" onLoad={() => setScriptLoaded(true)} />
      <Script id="hepburn-google-consent-config" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${measurementId}',{anonymize_ip:true,send_page_view:false});${adsId ? `window.gtag('config','${adsId}',{send_page_view:false});` : ""}`}</Script>
    </> : null}
    {showBanner ? <div className={styles.backdrop} role="presentation"><section className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <small>Privacy choices</small><h2 id="cookie-title">Optional website analytics</h2><p id="cookie-description">We use optional Google Analytics to understand which pages help visitors. Analytics stays off unless you accept it.</p>
      <div className={styles.actions}><button type="button" className={styles.accept} onClick={() => choose("accepted")}>Accept analytics</button><button type="button" className={styles.reject} onClick={() => choose("rejected")}>Reject optional cookies</button></div>
      <Link href="/privacy-policy">Read the privacy and cookie notice</Link>
    </section></div> : null}
    {ready && consent !== null && !settingsOpen ? <button type="button" className={styles.settings} onClick={() => setSettingsOpen(true)} aria-label="Change cookie consent">Cookie settings</button> : null}
  </>;
}
