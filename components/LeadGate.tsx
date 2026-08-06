"use client";

import { FormEvent, ReactNode, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { feeBand, trackEvent, trackLead, trackSuccessfulFormSubmission } from "@/lib/analytics";

 type LeadGateProps = {
  source: "architect-fee" | "build-cost";
  projectSummary: Record<string, string | number | string[]>;
  children: ReactNode;
  onSuccess?: () => void;
};

export function LeadGate({ source, projectSummary, children, onSuccess }: LeadGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectRegion, setProjectRegion] = useState("");
  const [projectPostcode, setProjectPostcode] = useState("");
  const [consent, setConsent] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !projectRegion || !consent) {
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
          projectRegion,
          projectPostcode: projectPostcode.trim(),
          website: String(new FormData(event.currentTarget).get("website") || ""),
          source,
          projectSummary,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setRevealed(true);
      setStatus("idle");
      trackSuccessfulFormSubmission(event.currentTarget, { form_location: "calculator", project_type: String(projectSummary.projectType || "") });
      trackEvent("fee_calculator_enquiry", { project_type: String(projectSummary.projectType || ""), selected_services: Array.isArray(projectSummary.selectedServices) ? projectSummary.selectedServices.join(",") : undefined, estimated_fee_band: feeBand(projectSummary.indicativeFee), step_number: 1, page_path: window.location.pathname });
      trackLead({ lead_type: "fee_calculator", form_id: "fee-calculator-lead", project_type: String(projectSummary.projectType || ""), estimated_fee_band: feeBand(projectSummary.indicativeFee), conversion_location: "calculator" });
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (revealed) {
    const firstName = name.trim().split(/\s+/)[0] || "there";
    return (
      <div className="lead-revealed">
        <div className="lead-confirmation" role="status">
          <CheckCircle2 />
          <div>
            <span>Your estimate is ready</span>
            <strong>Thanks, {firstName}.</strong>
            <p>
              Your details have been received. Review the estimate below and book a free
              30-minute consultation to discuss the next steps.
            </p>
          </div>
        </div>
        {children}
        <div className="lead-next-step">
          <div>
            <small>Recommended next step</small>
            <div className="lead-next-step-title">Book a free 30-minute consultation</div>
            <p>Discuss the property, planning route, likely approvals and suitable appointment.</p>
          </div>
          <a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer">
            <CalendarDays size={18} /> Book consultation <ArrowRight size={17} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form id="fee-calculator-lead" name="fee-calculator-lead" data-track-location="calculator" data-track-manual-submit="true" className="lead-gate" onSubmit={submit} aria-busy={status === "sending"}>
      <div className="lead-gate-heading">
        <div className="lead-lock"><LockKeyhole size={22} /></div>
        <div>
          <small className="eyebrow">Your estimate is ready</small>
          <div className="lead-gate-title">Enter your details to reveal it</div>
          <p>Your project details will be sent securely to Hepburn Architects and the estimate will appear immediately.</p>
        </div>
      </div>
      <div className="lead-fields">
        <label>Name<input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your full name" autoComplete="name" required /></label>
        <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required /></label>
        <label>Where is the project located?
          <select value={projectRegion} onChange={(e) => setProjectRegion(e.target.value)} required>
            <option value="">Select an area</option>
            <option value="West Midlands">West Midlands</option>
            <option value="North East England">North East England</option>
            <option value="Elsewhere in England">Elsewhere in England</option>
            <option value="Wales">Wales</option>
            <option value="Outside England and Wales">Outside England and Wales</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label>Project postcode<input value={projectPostcode} onChange={(e) => setProjectPostcode(e.target.value)} type="text" placeholder="For example, B13 8AA or TS7 0LG" autoComplete="postal-code" /></label>
      </div>
      <label className="lead-honeypot" aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      <label className="lead-consent">
        <input checked={consent} onChange={(e) => setConsent(e.target.checked)} type="checkbox" required />
        <span>I agree that Hepburn Architects may contact me about this enquiry. <a href="/privacy" target="_blank" rel="noopener noreferrer">Read the privacy notice.</a></span>
      </label>
      <button type="submit" className="btn primary lead-submit" disabled={status === "sending"}>
        {status === "sending" ? "Preparing your estimate…" : "Show my estimate"} {status !== "sending" && <ArrowRight size={17} />}
      </button>
      <div className="lead-trust"><ShieldCheck size={17} /> No obligation. Your details are used only to respond to this enquiry.</div>
      <div aria-live="polite">
        {status === "error" && <p className="lead-error" role="alert">Please complete your name, email, project area and consent, then try again.</p>}
      </div>
    </form>
  );
}
