import type { Metadata } from "next";
import { ArchitectFeeCalculator } from "@/components/ArchitectFeeCalculator";

export const metadata: Metadata = {
  title: "Architect Fee Calculator",
  description: "Get an indicative fee for residential design, planning and Building Regulations services.",
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
    </section>
  );
}
