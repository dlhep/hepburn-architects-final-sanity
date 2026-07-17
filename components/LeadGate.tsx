"use client";

import { FormEvent, ReactNode, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";

type LeadGateProps = {
  source: "architect-fee" | "build-cost";
  projectSummary: Record<string, string | number | string[]>;
  children: ReactNode;
};

export function LeadGate({ source, projectSummary, children }: LeadGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !consent) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source,
          projectSummary,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setRevealed(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  if (revealed) {
    const firstName = name.trim().split(/\s+/)[0] || "there";
    return (
      <div className="lead-revealed">
        <div className="lead-confirmation">
          <CheckCircle2 />
          <div>
            <span>Your estimate is ready</span>
            <strong>Thanks, {firstName}.</strong>
            <p>Your details have been received. Review the estimate below and book a free 30-minute consultation to discuss the next steps.</p>
          </div>
        </div>
        {children}
        <div className="lead-next-step">
          <div>
            <small>Recommended next step</small>
            <h3>Book a free 30-minute consultation</h3>
            <p>Discuss the property, planning route, likely approvals and the most suitable appointment.</p>
          </div>
          <a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer">
            <CalendarDays size={18} /> Book consultation <ArrowRight size={17} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="lead-gate" onSubmit={submit}>
      <div className="lead-gate-heading">
        <div className="lead-lock"><LockKeyhole size={22} /></div>
        <div>
          <small className="eyebrow">Your estimate is ready</small>
          <h3>Enter your details to reveal it</h3>
          <p>Your project details will be sent securely to Hepburn Architects and the estimate will appear immediately.</p>
        </div>
      </div>
      <div className="lead-fields">
        <label>Name<input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your full name" autoComplete="name" required /></label>
        <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required /></label>
      </div>
      <label className="lead-consent">
        <input checked={consent} onChange={(e) => setConsent(e.target.checked)} type="checkbox" required />
        <span>I agree that Hepburn Architects may contact me about this enquiry. <a href="/privacy" target="_blank">Read the privacy notice.</a></span>
      </label>
      <button className="btn primary lead-submit" disabled={status === "sending"}>
        {status === "sending" ? "Preparing your estimate…" : "Show my estimate"} {status !== "sending" && <ArrowRight size={17} />}
      </button>
      <div className="lead-trust"><ShieldCheck size={17} /> No obligation. Your details are used only to respond to this enquiry.</div>
      {status === "error" && <p className="lead-error">Please complete your name, email and consent, then try again.</p>}
    </form>
  );
}
