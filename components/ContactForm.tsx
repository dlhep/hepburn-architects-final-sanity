"use client";

import { FormEvent, useState } from "react";

export function ContactForm({
  source = "Website contact page",
}: {
  source?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

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
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input type="hidden" name="source" value={source} />

      <label>
        Name
        <input name="name" autoComplete="name" required />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </label>

      <label>
        Telephone
        <input
          name="telephone"
          type="tel"
          autoComplete="tel"
        />
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

      <button className="btn primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "sent" && (
        <p className="success">Thank you. Your enquiry has been received.</p>
      )}
      {status === "error" && (
        <p className="error">
          The message could not be sent. Please try again.
        </p>
      )}
    </form>
  );
}
