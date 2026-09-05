import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Development Potential Appraisal | Hepburn Architects",
  description:
    "A £750 architect-led pre-purchase development appraisal for sites and property across Birmingham and the West Midlands. Test planning risk, constraints and realistic capacity before committing.",
  alternates: { canonical: "/development-potential-appraisal" },
};

const included = [
  "Site and surrounding-context review",
  "Relevant planning-history review",
  "Current planning-policy and designation review",
  "Key constraints: access, amenity, heritage, flood, ecology, trees and drainage where relevant",
  "Architectural development-capacity assessment",
  "Indicative concept or capacity sketch where appropriate",
  "Planning-risk rating with the principal issues explained",
  "Recommended consent strategy and next steps",
  "Likely specialist consultant requirements",
  "Written Development Potential Appraisal PDF",
];

const excluded = [
  "Measured or topographical survey unless separately agreed",
  "Detailed architectural or planning-application drawings",
  "Formal pre-application or planning submission",
  "Specialist consultant reports",
  "Structural investigation or engineering design",
  "Legal title, covenant or rights-of-way advice",
  "Formal valuation, GDV, residual land-value or funding advice",
  "Any guarantee of planning permission, unit numbers or development value",
];

const steps = [
  ["01", "Send the opportunity", "Send the property address plus the agent, Rightmove or Zoopla link, any plans and what you are hoping to achieve."],
  ["02", "We investigate", "We review planning history, policy, constraints, context and the physical capacity of the site or building."],
  ["03", "We test the potential", "Where appropriate, an indicative architectural concept tests realistic capacity rather than relying on a headline unit number."],
  ["04", "You get a clear recommendation", "The appraisal identifies the opportunity, planning risk, likely next steps and whether further investment is justified."],
];

export default function DevelopmentPotentialAppraisalPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Development Potential Appraisal",
    description: "Architect-led pre-purchase planning and development-capacity appraisal for sites and property.",
    offers: { "@type": "Offer", price: "750", priceCurrency: "GBP" },
    provider: { "@type": "Organization", name: "Hepburn Architects", url: "https://hepburnarchitects.co.uk" },
    areaServed: "West Midlands, England",
  };

  return (
    <main style={{ background: "#f5f3ee", color: "#202321" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 24px 64px" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: ".14em", fontSize: 13, marginBottom: 18 }}>Development · feasibility · pre-acquisition</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "end" }}>
          <div>
            <h1 style={{ fontSize: "clamp(42px,7vw,82px)", lineHeight: .98, fontWeight: 500, letterSpacing: "-.045em", margin: 0 }}>Before you buy a site, find out what it could realistically become.</h1>
            <p style={{ fontSize: 20, lineHeight: 1.55, maxWidth: 720, margin: "28px 0 0" }}>Hepburn Architects combines planning research with architectural capacity testing to identify opportunity, constraints and a realistic route forward before significant money is committed.</p>
          </div>
          <aside style={{ background: "#202321", color: "white", padding: 32 }}>
            <p style={{ margin: 0, opacity: .72 }}>Fixed-fee appraisal</p>
            <p style={{ fontSize: 58, margin: "8px 0", letterSpacing: "-.04em" }}>£750</p>
            <p style={{ lineHeight: 1.55, margin: "0 0 24px" }}>£350 credited against a subsequent Hepburn design/planning appointment instructed within 60 days.</p>
            <Link href="/contact?service=development-potential-appraisal" style={{ display: "inline-block", background: "white", color: "#202321", padding: "14px 20px", textDecoration: "none", fontWeight: 600 }}>Assess my site →</Link>
          </aside>
        </div>
      </section>

      <section style={{ background: "white", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56 }}>
          <div><p style={{ textTransform: "uppercase", letterSpacing: ".12em", fontSize: 13 }}>Why start here?</p><h2 style={{ fontSize: "clamp(34px,5vw,58px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-.035em" }}>Do not discover the problems after you have bought it.</h2></div>
          <div style={{ fontSize: 18, lineHeight: 1.7 }}><p>A large garden, vacant building or apparently generous plot can look straightforward on an estate-agent plan. In practice, access, local character, neighbouring amenity, policy, heritage, ecology, drainage and site geometry can materially change what is achievable.</p><p>The appraisal is designed to answer the commercial question first: <strong>is there enough credible potential here to justify the next stage?</strong></p></div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "76px 24px" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: ".12em", fontSize: 13 }}>How it works</p><h2 style={{ fontSize: 46, fontWeight: 500, letterSpacing: "-.035em", marginTop: 12 }}>One clear decision-making process.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18, marginTop: 36 }}>{steps.map(([number, title, text]) => <article key={number} style={{ borderTop: "1px solid #999", paddingTop: 20 }}><span style={{ fontSize: 13, opacity: .6 }}>{number}</span><h3 style={{ fontSize: 24, fontWeight: 500 }}>{title}</h3><p style={{ lineHeight: 1.65 }}>{text}</p></article>)}</div>
      </section>

      <section style={{ background: "#dedbd2", padding: "76px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 64 }}>
          <div><h2 style={{ fontSize: 42, fontWeight: 500, letterSpacing: "-.03em" }}>Included in the £750 appraisal</h2><ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>{included.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h2 style={{ fontSize: 42, fontWeight: 500, letterSpacing: "-.03em" }}>Clearly outside the scope</h2><ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>{excluded.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "88px 24px", textAlign: "center" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: ".12em", fontSize: 13 }}>Start with the address</p><h2 style={{ fontSize: "clamp(38px,6vw,66px)", lineHeight: 1.03, fontWeight: 500, letterSpacing: "-.04em" }}>Seen a property or site with potential?</h2>
        <p style={{ fontSize: 19, lineHeight: 1.65 }}>Send us the address and property listing. We will confirm whether the £750 Development Potential Appraisal is the right first step or whether the site needs a more detailed bespoke feasibility scope.</p>
        <Link href="/contact?service=development-potential-appraisal" style={{ display: "inline-block", marginTop: 18, background: "#202321", color: "white", padding: "16px 24px", textDecoration: "none", fontWeight: 600 }}>Send us a site →</Link>
        <p style={{ fontSize: 13, lineHeight: 1.6, opacity: .68, marginTop: 30 }}>The appraisal is an architect-led feasibility opinion based on the information available at the date of review. It is not planning permission, legal advice, a valuation or a guarantee of development capacity.</p>
      </section>
    </main>
  );
}
