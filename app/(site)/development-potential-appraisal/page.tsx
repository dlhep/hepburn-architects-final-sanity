import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Backland & Infill Feasibility | West Midlands",
  description:
    "£750 development appraisal for backland, infill and conversion opportunities in Birmingham and the West Midlands. Assess planning risk and site capacity.",
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

const feasibilityChecks = [
  ["Access and servicing", "How could people, vehicles, refuse collection and emergency services reach the proposed homes? We identify issues that may need highways advice and separate legal checks on access rights."],
  ["Neighbouring homes and local character", "We consider building position, scale, overlooking, daylight and usable outdoor space alongside the surrounding pattern of development."],
  ["Site constraints", "We review available information on trees, ecology, flood risk, drainage and heritage, and identify where specialist surveys are needed before a conclusion can be relied on."],
  ["Capacity and next steps", "We test an indicative layout where appropriate, explain the main planning risks and recommend whether to investigate further, revise the brief or reconsider the opportunity."],
];

const faqs = [
  { question: "Do you assess backland and infill sites in the West Midlands?", answer: "Yes. Hepburn Architects assesses garden plots, gaps between existing buildings and small residential development opportunities across Birmingham, Solihull and the wider West Midlands. We confirm whether the £750 Development Potential Appraisal suits the site or whether a bespoke feasibility scope is needed." },
  { question: "What is the difference between backland and infill development?", answer: "Backland development generally describes building behind existing properties, often within gardens or land reached by a shared access. Infill generally describes development in a gap within an existing built-up area. The description alone does not establish whether a site is suitable; its context and constraints need to be assessed." },
  { question: "Can you assess a garden plot before I buy or sell it?", answer: "Yes. Send the address, a plan showing the proposed plot boundary, any listing and your intended use. We can assess architectural capacity and planning risk before you commission a full design. Legal title, covenants, access rights and valuation require separate professional advice." },
  { question: "Will the appraisal confirm how many homes I can build?", answer: "It can test indicative capacity using the information available, with a concept or capacity sketch where appropriate. It does not confirm an approved dwelling number. Survey information, specialist findings, detailed design and the planning authority's assessment may change what is achievable." },
  { question: "What does the £750 appraisal include?", answer: "It includes a review of site context, relevant planning history and policy, key constraints, architectural capacity, planning risk and recommended next steps, provided in a written PDF. An indicative sketch is included where appropriate. Detailed drawings, specialist reports and formal planning submissions are outside this scope." },
  { question: "Can feasibility lead to a full design and planning appointment?", answer: "Yes. If the site warrants further work, we can propose a separate scope for concept design, planning drawings and supporting information. The existing offer credits £350 against a subsequent Hepburn design/planning appointment instructed within 60 days." },
];

export default function DevelopmentPotentialAppraisalPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Development Potential Appraisal",
    description: "Architect-led feasibility for backland, infill and conversion opportunities across Birmingham, Solihull and the West Midlands.",
    offers: { "@type": "Offer", price: "750", priceCurrency: "GBP" },
    provider: { "@type": "Organization", name: "Hepburn Architects", url: "https://hepburnarchitects.co.uk" },
    areaServed: "West Midlands, England",
  };

  return (
    <main style={{ background: "#f5f3ee", color: "#202321" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} />
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 24px 64px" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: ".14em", fontSize: 13, marginBottom: 18 }}>Development · feasibility · pre-acquisition</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "end" }}>
          <div>
            <h1 style={{ fontSize: "clamp(34px,4.5vw,56px)", lineHeight: 1.08, fontWeight: 500, letterSpacing: "-.035em", margin: 0 }}>Backland and infill feasibility in the West Midlands.</h1>
            <p style={{ fontSize: 20, lineHeight: 1.55, maxWidth: 720, margin: "28px 0 0" }}>Hepburn Architects assesses the development potential of garden plots, infill sites, small housing sites and conversion opportunities across Birmingham, Solihull and the wider West Midlands. Our Development Potential Appraisal combines planning research with architectural capacity testing before you commit to a purchase or full design.</p>
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

      <section className="section">
        <div className="shell">
          <small className="eyebrow">Backland and infill site appraisal</small>
          <h2>What could limit the potential of your plot?</h2>
          <p className="lead">A useful feasibility study tests how a proposal could work on the actual site. These are the questions we consider before recommending further design or specialist investigation.</p>
          <div className="process-card-grid">
            {feasibilityChecks.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <p style={{ marginTop: 28, lineHeight: 1.7 }}>For the design stages that can follow an appraisal, explore our <Link href="/services/new-build-homes">new-build homes and small residential development service</Link>. Read about the practice on our <Link href="/about">Birmingham studio page</Link>.</p>
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

      <section className="section">
        <div className="shell faq-layout">
          <div><small className="eyebrow">Before you commission an appraisal</small><h2>Backland and infill questions.</h2></div>
          <div className="faq-list">{faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
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
