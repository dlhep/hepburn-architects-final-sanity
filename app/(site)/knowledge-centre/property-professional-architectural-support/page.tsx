import type { Metadata } from "next";
import Link from "next/link";
import { createSeoMetadata, serializeJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./page.module.css";

const path = "/knowledge-centre/property-professional-architectural-support";
const canonical = `${site.url}${path}`;
const title = "Property Plans, Feasibility & Architectural Support for Property Professionals";
const description =
  "Property plans, measured surveys, feasibility, planning and technical architectural support for solicitors, agents, landlords, developers and builders across Birmingham and the West Midlands.";

export const metadata: Metadata = createSeoMetadata({
  title: "Property Plans & Feasibility for Professionals",
  description,
  path,
  type: "article",
});

const professionalSections = [
  {
    id: "property-transactions",
    number: "01",
    eyebrow: "Property transactions",
    heading: <>Solicitors &<br />conveyancers.</>,
    copy: "Hepburn prepares accurate measured drawings and property plans around the conveyancer’s written brief. We can also review available planning and Building Regulations records where alterations, subdivisions or conversions require further investigation.",
    services: ["Land Registry compliant plans", "Transfer of Part plans", "Lease and title plans", "Measured surveys", "Existing-property drawings", "Plans supporting deeds and property matters", "Planning history review", "Building Regulations review"],
    note: "Hepburn Architects provides architectural and measured-plan information. Legal interpretation of title, boundaries and deeds remains with the appointed legal adviser.",
  },
  {
    id: "property-potential",
    number: "02",
    eyebrow: "Property potential",
    heading: <>Estate agents<br />& purchasers.</>,
    copy: "Architectural advice can help a buyer or seller understand realistic property potential before assumptions become part of a purchase decision. We review the building, planning context and principal constraints at a level proportionate to the question being asked.",
    services: ["Extension feasibility", "Loft potential", "Property reconfiguration", "Planning constraints", "Pre-purchase feasibility", "Development potential"],
  },
  {
    id: "investment-letting",
    number: "03",
    eyebrow: "Investment & letting",
    heading: <>Landlords &<br />letting agents.</>,
    copy: "We assess the existing use, proposed occupancy, spatial arrangement and relevant local planning controls before an HMO, conversion or change of use progresses. Planning, licensing and Building Regulations are separate matters, and no review can guarantee planning permission.",
    services: ["HMO feasibility", "Article 4 checks", "C3 / C4 considerations", "Sui generis HMO considerations", "Change of use", "Measured surveys", "Planning applications", "Building Regulations drawings"],
  },
  {
    id: "development",
    number: "04",
    eyebrow: "Development",
    heading: <>Developers &<br />property investors.</>,
    copy: "Before significant money is committed, Hepburn can assess the architectural and planning potential of a site or building. The scope can range from an initial constraint review to measured feasibility, concept layouts and a developed application strategy.",
    services: ["Pre-acquisition feasibility", "Planning history", "Site constraints", "Development capacity", "Concept layouts", "Conversions", "Change of use", "Planning applications", "Building Regulations packages"],
    highlight: "Understand the architectural and planning position before committing to the opportunity.",
  },
] as const;

const referralSteps = [
  <>Send us the property address<br />and brief requirement.</>,
  <>We review the matter and<br />identify what is required.</>,
  <>Scope, fee and anticipated<br />timescale are confirmed.</>,
  <>We work directly with the<br />client where appropriate.</>,
] as const;

const faqs = [
  { question: "What is a Land Registry compliant plan?", answer: "It identifies the relevant land clearly for an HM Land Registry application, following applicable guidance on scale, orientation and surrounding detail. The conveyancer confirms the legal extent and application requirements." },
  { question: "When is a Transfer of Part plan required?", answer: "It is commonly required when a transaction deals with only part of a registered title and that part is not already identified clearly. We can survey where needed and prepare the plan to the conveyancer’s brief." },
  { question: "Can an architect advise before a property is purchased?", answer: "Yes. A proportionate review can test extension, conversion, HMO or development ideas against the property, planning history and visible constraints before purchase." },
  { question: "Can you advise on HMO or change-of-use planning?", answer: "Yes. We can review the existing and proposed use, occupancy, planning history, Article 4 controls and likely application route. Formal confirmation may still be needed from the planning authority." },
  { question: "Can Hepburn work directly with our client?", answer: "Yes. With an appropriate introduction, we can agree the appointment directly with the owner, buyer or business and keep the referrer informed as authorised." },
  { question: "How do we send you a referral?", answer: "Send the property address, a short description of the requirement, available plans or title information and any relevant deadline through our contact page." },
] as const;

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Knowledge Centre", item: `${site.url}/knowledge-centre` },
    { "@type": "ListItem", position: 3, name: title, item: canonical },
  ],
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", headline: title, description,
  datePublished: "2026-08-12", dateModified: "2026-08-12", mainEntityOfPage: canonical,
  author: { "@type": "Person", name: "David Hepburn", url: `${site.url}/about` },
  publisher: { "@id": `${site.url}/#organization` }, image: `${site.url}/images/social-sharing.jpg`,
};

const serviceSchema = {
  "@context": "https://schema.org", "@type": "ProfessionalService", "@id": `${site.url}/#birmingham-studio`,
  name: `${site.name} Birmingham & West Midlands`, url: site.url, telephone: "+447720813035", email: site.email,
  address: { "@type": "PostalAddress", ...site.offices.birmingham },
  areaServed: ["Birmingham", "Solihull", "Sutton Coldfield", "Wolverhampton", "Warwickshire", "Staffordshire", "West Midlands"].map((name) => ({ "@type": "Place", name })),
  makesOffer: { "@type": "Offer", itemOffered: { "@type": "Service", name: "Property plans, feasibility and architectural support", url: canonical, serviceType: ["Measured surveys", "Property plans", "Architectural feasibility", "Planning advice", "Building Regulations drawings"] } },
};

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

export default function PropertyProfessionalSupportPage() {
  return (
    <main className={styles.page}>
      {[breadcrumbSchema, articleSchema, serviceSchema, faqSchema].map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />)}

      <section className={styles.hero}>
        <div className={`shell ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <small className="eyebrow">Property professionals</small>
            <h1>Architectural clarity for better property decisions<span aria-hidden="true">.</span></h1>
          </div>
          <div className={styles.heroAside}>
            <p>Measured drawings, property plans, feasibility and architectural advice for solicitors, agents, landlords, developers and builders across Birmingham and the West Midlands.</p>
            <Link className="btn primary" href="/contact">Discuss a property requirement</Link>
          </div>
        </div>
      </section>

      <nav className={styles.audienceStrip} aria-label="Property professional services">
        <div className="shell">
          {professionalSections.map((section) => <a href={`#${section.id}`} key={section.id}><span>{section.number}</span>{section.eyebrow}</a>)}
          <a href="#construction"><span>05</span>Construction</a>
        </div>
      </nav>

      <section className={styles.introduction}><div className={`shell ${styles.introGrid}`}><div><small className="eyebrow">Architectural clarity</small><h2>Make the next property decision with better information.</h2></div><div className={styles.introCopy}><p>Property transactions and development decisions often raise questions that legal documents, sales particulars or an initial site visit cannot answer alone.</p><p>Accurate drawings, an understanding of planning history and a proportionate architectural assessment establish what is known, what needs further investigation and which next step is appropriate.</p></div></div></section>

      <div className={styles.editorialSections}>
        {professionalSections.map((section) => <section className={styles.professionalSection} id={section.id} key={section.id}><div className={`shell ${styles.professionalGrid}`}><div className={styles.sectionTitle}><span>{section.number}</span><small>{section.eyebrow}</small><h2>{section.heading}</h2></div><div className={styles.sectionContent}><p className={styles.leadCopy}>{section.copy}</p><ul className={styles.serviceList}>{section.services.map((service) => <li key={service}>{service}</li>)}</ul>{"note" in section ? <p className={styles.professionalNote}>{section.note}</p> : null}{"highlight" in section ? <p className={styles.highlight}>{section.highlight}</p> : null}</div></div></section>)}
        <section className={styles.professionalSection} id="construction"><div className={`shell ${styles.professionalGrid}`}><div className={styles.sectionTitle}><span>05</span><small>Construction</small><h2>Builders &<br />contractors.</h2></div><div className={styles.sectionContent}><p className={styles.leadCopy}>Builders are often approached before the client has suitable drawings, planning approval or Building Regulations information.</p><p>Hepburn can take that part of the project forward directly with the client—establishing the brief, approval route and proportionate design or technical information needed for a more reliable construction conversation.</p><nav className={styles.relatedLinks} aria-label="Related construction services"><Link href="/services/planning-applications">Planning Applications</Link><Link href="/services/building-regulations">Building Regulations</Link><Link href="/services/hmo-conversions">HMO & change of use</Link></nav></div></div></section>
      </div>

      <section className={styles.referralSection}><div className="shell"><header className={styles.referralHeader}><small className="eyebrow">Working together</small><h2>A straightforward referral.</h2></header><ol className={styles.referralSteps}>{referralSteps.map((step, index) => <li key={index}><span>0{index + 1}</span><p>{step}</p></li>)}</ol></div></section>

      <aside className={styles.geography} aria-label="Areas served"><div className="shell"><p>Based at our Birmingham Studio, we support property professionals across Birmingham, Solihull, Sutton Coldfield, Wolverhampton, Warwickshire, Staffordshire and the wider West Midlands.</p></div></aside>

      <section className={styles.faqSection}><div className="shell"><header className={styles.faqHeader}><small className="eyebrow">Frequently asked questions</small><h2>Practical answers for professional referrers.</h2></header><div className={styles.faqList}>{faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section className={styles.finalCta}><div className={`shell ${styles.ctaGrid}`}><div><small className="eyebrow">Property professionals</small><h2>Have a property matter<br />that needs architectural input?</h2></div><div className={styles.ctaCopy}><p>Send us the property address and a brief description of what is required. We can review the matter and confirm the appropriate next step.</p><Link className="btn primary" href="/contact">Discuss a property requirement</Link><Link className={styles.textLink} href="/services">Explore architectural services</Link></div></div></section>
    </main>
  );
}
