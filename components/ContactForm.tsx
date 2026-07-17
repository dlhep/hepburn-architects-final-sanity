"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("https://formspree.io/f/xeeyeqyg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: "New website contact enquiry" }),
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
      <label>Name<input name="name" required /></label>
      <label>Email<input name="email" type="email" required /></label>
      <label>Project location<input name="location" /></label>
      <label>Tell us about the project<textarea name="message" rows={6} required /></label>
      <button className="btn primary" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"}</button>
      {status === "sent" && <p className="success">Thank you. Your enquiry has been received.</p>}
      {status === "error" && <p className="error">The message could not be sent. Please try again.</p>}
    </form>
  );
}
