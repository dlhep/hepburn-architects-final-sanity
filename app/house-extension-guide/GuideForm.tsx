"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const projectTypes = [
  "Rear extension",
  "Side extension",
  "Two-storey extension",
  "Loft conversion",
  "Extension and internal remodelling",
  "Not sure yet",
];

export function GuideForm() {
  const router = useRouter();
  const submissionPending = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionPending.current) return;

    submissionPending.current = true;
    setStatus("sending");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("firstName") || "").trim(),
          email: String(form.get("email") || "").trim(),
          source: "house-extension-guide",
          website: String(form.get("website") || ""),
          projectSummary: {
            postcode: String(form.get("postcode") || "").trim(),
            projectType: String(form.get("projectType") || ""),
          },
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      window.dispatchEvent(
        new CustomEvent("hepburn:lead", {
          detail: {
            lead_source: "house-extension-guide",
            lead_type: "guide",
            project_type: String(form.get("projectType") || ""),
          },
        }),
      );
      router.push("/house-extension-guide/thank-you");
    } catch {
      submissionPending.current = false;
      setStatus("error");
    }
  }

  return (
    <form className={styles.formCard} onSubmit={submit} aria-busy={status === "sending"}>
      <div className={styles.formHeading}>
        <span className={styles.formIcon}><LockKeyhole aria-hidden="true" /></span>
        <div>
          <small className="eyebrow">Free homeowner guide</small>
          <h2>Get your free copy</h2>
        </div>
      </div>

      <label>
        First name
        <input name="firstName" type="text" autoComplete="given-name" required />
      </label>
      <label>
        Email address
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Project postcode
        <input name="postcode" type="text" autoComplete="postal-code" required />
      </label>
      <label>
        Project type
        <select name="projectType" defaultValue="" required>
          <option value="" disabled>Select your project type</option>
          {projectTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>

      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Preparing your guide…" : "Download My Free Guide"}
        {status !== "sending" && <ArrowRight size={17} aria-hidden="true" />}
      </button>

      <p className={styles.consent}>
        By requesting the guide you agree to receive the guide together with occasional
        architectural advice from Hepburn Architects. You can unsubscribe at any time.{" "}
        <a href="/privacy" target="_blank">View our Privacy Policy.</a>
      </p>
      <div aria-live="polite">
        {status === "error" && (
          <p className={styles.error} role="alert">
            We could not send your request. Please check your details and try again.
          </p>
        )}
      </div>
    </form>
  );
}
