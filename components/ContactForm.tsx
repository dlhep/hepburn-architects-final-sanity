"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export function ContactForm({
  source = "Website contact page",
}: {
  source?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("https://formspree.io/f/xeeyeqyg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          source,
          _subject: `New ${source} enquiry`,
        }),
      });
      if (!response.ok) throw new Error();
      form.reset();
      setStatus("sent");
      window.dispatchEvent(
        new CustomEvent("hepburn:lead", {
          detail: { lead_source: source, lead_type: "contact_form" },
        }),
      );
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
      <input type="hidden" name="source" value={source} />

      <label>
        Name
        <input name="name" autoComplete="name" required />
      </label>

      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>

      <label>
        Telephone
        <input name="telephone" type="tel" autoComplete="tel" />
      </label>

      <label>
        Project postcode or location
        <input name="location" autoComplete="postal-code" required />
      </label>

      <label>
        Project type
        <select name="projectType" defaultValue="" required>
          <option value="" disabled>
            Select a project type
          </option>
          <option>Single-storey extension</option>
          <option>Two-storey extension</option>
          <option>Loft conversion</option>
          <option>New-build home</option>
          <option>Small residential development</option>
          <option>HMO or flat conversion</option>
          <option>Commercial-to-residential conversion</option>
          <option>Planning or feasibility advice</option>
          <option>Building Regulations drawings</option>
          <option>Other residential project</option>
        </select>
      </label>

      <label>
        Tell us about the project
        <textarea name="message" rows={6} required />
      </label>

      <button type="submit" className="btn primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="muted small-copy">
        We use your details to respond to this enquiry. Read our{" "}
        <Link href="/privacy">privacy and cookie notice</Link>.
      </p>

      <div aria-live="polite" aria-atomic="true">
        {status === "sent" && (
          <p className="success" role="status">
            Thank you. Your enquiry has been received.
          </p>
        )}
        {status === "error" && (
          <p className="error" role="alert">
            The message could not be sent. Please try again or call the studio.
          </p>
        )}
      </div>
    </form>
  );
}
