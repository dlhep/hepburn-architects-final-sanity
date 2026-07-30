import type { Metadata } from "next";
import { ArchitectFeeCalculator } from "@/components/ArchitectFeeCalculator";

export const metadata: Metadata = {
  title: "Architect Fee Calculator",
  description: "Estimate architectural fees for house extensions, loft conversions, new homes, planning applications and Building Regulations drawings.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <section className="section">
      <div className="shell page-intro">
        <small className="eyebrow">Project estimate</small>
        <h1>Get an indicative architectural fee.</h1>
        <p>Select the project type, approximate size, planning complexity and services required. The result is a guide only and not a formal quotation.</p>
      </div>
      <div className="shell"><ArchitectFeeCalculator /></div>
      <div className="shell page-intro">
        <h2>What the fee estimate includes</h2>
        <p>The calculator provides an early indication of architectural fees based on the project type and services selected. It is not a quotation and does not replace a review of the property, planning history, brief and technical complexity.</p>
        <p>Typical appointments may include measured survey, feasibility, planning drawings and submission, or Building Regulations drawings. Structural engineering, specialist surveys, local authority charges and other consultant fees are excluded unless stated.</p>
        <p>After receiving the estimate, send the property address and a short project brief so the scope can be checked. A formal fee proposal will set out deliverables, exclusions, programme and payment stages before work begins.</p>
      </div>
    </section>
  );
}
