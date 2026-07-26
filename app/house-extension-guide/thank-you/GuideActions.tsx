"use client";

import { useEffect, useRef } from "react";
import { CalendarDays, Download } from "lucide-react";
import { site } from "@/lib/site";
import styles from "../page.module.css";

const guideUrl = "/downloads/Complete-House-Extension-Guide-Hepburn-Architects.pdf";
const guideFilename = "Planning-a-House-Extension-Hepburn-Architects.pdf";

export function GuideActions() {
  const downloadStarted = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (downloadStarted.current) return;
      downloadStarted.current = true;

      const link = document.createElement("a");
      link.href = guideUrl;
      link.download = guideFilename;
      link.setAttribute("aria-hidden", "true");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={styles.guideActions}>
      <p className={styles.downloadMessage} role="status">
        Your download should begin automatically. If it does not, use the button below.
      </p>
      <a className="btn primary" href={guideUrl} download={guideFilename}>
        <Download size={18} aria-hidden="true" /> Download Guide
      </a>
      <a
        className={`btn primary ${styles.consultationButton}`}
        href={site.calendly}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CalendarDays size={18} aria-hidden="true" /> Book a Free 30-Minute Consultation
      </a>
    </div>
  );
}
