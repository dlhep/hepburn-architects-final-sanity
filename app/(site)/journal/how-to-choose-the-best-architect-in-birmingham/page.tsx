import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Newspaper } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { buildGraph } from "@/lib/structured-data";
import { site } from "@/lib/site";
import styles from "./page.module.css";

const title = "How to Choose the Best Architect in Birmingham";
const description = "Looking for the best architect in Birmingham for your project? Learn how to compare architects, check credentials, assess local experience and choose the right practice.";
const standfirst = "The best architect for one project may not be the right architect for another. This guide explains how to compare Birmingham architects, verify their credentials and identify the practice best suited to your home or development.";
const articleDescription = "A practical guide to comparing Birmingham architects, verifying professional credentials and choosing the right practice for a residential project.";
const path = "/journal/how-to-choose-the-best-architect-in-birmingham";
const url = `${site.url}${path}`;
const image = `${site.url}/images/birmingham-residential-project.jpg`;
const publicationDate = "2026-08-02";

const faqs = [
  { question: "Who is the best architect in Birmingham?", answer: "There is no single architect who is best for every Birmingham project. The right choice depends on the building type, brief, budget, planning constraints and services required. Compare ARB registration, relevant project experience, local knowledge, communication and the exact scope of the fee proposal." },
  { question: "How do I check whether someone is a genuine architect?", answer: "Search for the individual on the Architects Registration Board’s official Architects Register. In the UK, only a person registered with ARB can use the title architect in business or professional practice." },
  { question: "Should I choose a local Birmingham architect?", answer: "A local architect may bring useful knowledge of Birmingham’s property types, planning policies and common development constraints. However, relevant project experience, design ability and service quality remain more important than distance alone." },
  { question: "How much does an architect cost in Birmingham?", answer: "Fees vary according to the property, project size, complexity, planning risk and stages included. Compare written scopes rather than headline prices because one quotation may include survey, planning and technical design while another may include only basic planning drawings." },
  { question: "Can an architect guarantee planning permission?", answer: "No. Planning decisions are made by the local planning authority. An architect can identify constraints, develop an appropriate proposal and prepare a strong application, but approval cannot legitimately be guaranteed." },
  { question: "Do I need an architect for Building Regulations?", answer: "An architect is not legally required for most Building Regulations applications, but coordinated technical drawings can help explain how the proposed work is intended to comply. Structural engineering and other specialist information may also be required." },
] as const;

const contents = [
  "Check that the person is genuinely an architect",
  "Look for experience relevant to your project",
  "Prioritise genuine Birmingham planning knowledge",
  "Review the quality of the design process",
  "Check whether planning and Building Regulations are both covered",
  "Compare scope and value—not just the headline fee",
  "Examine communication and accessibility",
  "Read reviews critically",
  "Ask the right questions during the initial consultation",
  "When might Hepburn Architects be the right choice?",
] as const;

const slugify = (value: string) => value.toLowerCase().replace(/[’—?]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description: "A practical guide to comparing Birmingham architects, checking credentials, reviewing relevant projects and appointing the right practice.",
    url,
    type: "article",
    publishedTime: publicationDate,
    modifiedTime: publicationDate,
    authors: [`${site.url}/about`],
    images: [{ url: image, width: 1024, height: 485, alt: "Architect-designed residential project in Birmingham by Hepburn Architects" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "A practical guide to comparing Birmingham architects, checking credentials, reviewing relevant projects and appointing the right practice.",
    images: [image],
  },
};

export default function BirminghamArchitectGuidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: title,
        description: articleDescription,
        author: { "@id": `${site.url}/#david-hepburn` },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntityOfPage: url,
        datePublished: publicationDate,
        dateModified: publicationDate,
        image: { "@type": "ImageObject", url: image, width: 1024, height: 485 },
        articleSection: "Advice",
        inLanguage: "en-GB",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description: articleDescription,
        isPartOf: { "@id": `${site.url}/#website` },
        primaryImageOfPage: { "@id": `${url}#primaryimage` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#article` },
        inLanguage: "en-GB",
      },
      {
        "@type": "ImageObject",
        "@id": `${url}#primaryimage`,
        url: image,
        width: 1024,
        height: 485,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      },
    ],
  };

  return (
    <>
      <StructuredData data={buildGraph(schema)} />
      <article className={`section ${styles.article}`}>
        <div className="shell article-page">
          <nav aria-label="Breadcrumb" className="muted small-copy"><Link href="/">Home</Link> · <Link href="/blog">Journal</Link></nav>
          <small className="eyebrow"><Newspaper size={14} /> Advice</small>
          <h1>{title}</h1>
          <p className="lead">{standfirst}</p>
          <p className={styles.byline}>Published 2 August 2026 · 8 minutes read · By <Link href="/about">David Hepburn</Link></p>

          <figure className={styles.hero}>
            <Image src="/images/birmingham-residential-project.jpg" alt="Architect-designed residential project in Birmingham by Hepburn Architects" width={1024} height={485} priority sizes="(max-width: 1100px) 100vw, 1100px" />
            <figcaption>Completed residential extension project in Sutton Coldfield, Birmingham.</figcaption>
          </figure>

          <div className={styles.body}>
            <p>Searching for the “best architect in Birmingham” can produce a long and sometimes confusing list of practices, directories and advertisements.</p>
            <p>The difficulty is that there is no single architect who is objectively best for every project. A practice known for large commercial buildings may not be the best choice for a house extension. A specialist in contemporary new homes may not be suitable for a sensitive HMO conversion or a property within a conservation area.</p>
            <aside className={styles.question}><span>The better question is:</span><strong>Which Birmingham architect has the right experience, professional credentials and working approach for my particular project?</strong></aside>
            <p>This guide explains the factors that homeowners, developers and property investors should consider before making an appointment.</p>

            <nav className={styles.contents} aria-label="Article contents"><small>Contents</small><ol>{contents.map((item, index) => <li key={item}><a href={`#${slugify(item)}`}>{index + 1}. {item}</a></li>)}</ol></nav>

            <section id={slugify(contents[0])}><h2>1. {contents[0]}</h2><p>In the United Kingdom, the title “architect” is legally protected. Only someone registered with the Architects Registration Board can use the title in business or professional practice.</p><p>The <a href="https://arb.org.uk/architects-register/" target="_blank" rel="noopener noreferrer">official ARB Architects Register</a> is therefore the first place to check. It confirms whether the person has the required qualifications and is currently registered to practise as an architect.</p><p>This distinction matters because businesses can offer architectural drawing or design services without employing a registered architect. Those businesses may provide an appropriate service in some circumstances, but they should not present themselves as architects unless the architectural work is controlled and managed by an ARB-registered architect.</p><p>When comparing practices, ask:</p><ul><li>Who will be responsible for my project?</li><li>Is that person registered with ARB?</li><li>Will I deal directly with the architect or mainly with technicians?</li><li>Does the practice hold appropriate professional indemnity insurance?</li><li>Is the practice also connected with a professional body such as RIBA?</li></ul><p>RIBA membership is not legally required to practise as an architect.</p></section>

            <section id={slugify(contents[1])}><h2>2. {contents[1]}</h2><p>Architecture covers an enormous range of building types. A strong portfolio is useful, but relevance is more important than prestige.</p><p>For a residential project, look for direct experience in areas such as:</p><ul><li><Link href="/services/house-extensions">single and two-storey house extensions</Link>;</li><li><Link href="/services/loft-conversions">loft conversions</Link>;</li><li>internal remodelling;</li><li><Link href="/services/new-build-homes">new-build homes</Link>;</li><li><Link href="/services/hmo-conversions">HMO conversions</Link>;</li><li>flat conversions;</li><li>change-of-use applications;</li><li>small residential development sites;</li><li>planning applications;</li><li>Building Regulations drawings.</li></ul><p>Ask to see completed or approved projects comparable with your own property and brief. The practice’s <Link href="/projects">published project case studies</Link> should explain more than what the building looks like: a useful case study identifies the original problem, design response, planning constraints and architectural services provided.</p></section>

            <section id={slugify(contents[2])}><h2>3. {contents[2]}</h2><p>Local experience does not mean that an architect can guarantee approval. Planning decisions remain the responsibility of the local planning authority.</p><p>However, familiarity with Birmingham’s housing, planning policies and development patterns can help an architect identify likely constraints earlier. Birmingham contains a wide variety of property types, including Victorian and Edwardian terraces, inter-war suburban houses, post-war estates, apartment buildings, conservation areas and more recent developments.</p><p>Depending on the property, the design may need to consider:</p><ul><li>the scale and appearance of the existing building;</li><li>effects on neighbouring daylight;</li><li>privacy and overlooking;</li><li>the relationship with adjoining extensions;</li><li>parking and access;</li><li>trees and root protection;</li><li>conservation-area character;</li><li>drainage and flood risk;</li><li>previous planning decisions;</li><li>permitted-development restrictions;</li><li>Article 4 directions;</li><li>local validation requirements.</li></ul><p>Birmingham City Council states that householder extensions are assessed partly on whether their design, size and location are sympathetic to the existing house and protect neighbours’ privacy and light. Read the practice’s <Link href="/locations/birmingham-architects">Birmingham architectural services overview</Link> and explore its <Link href="/projects">project archive and map</Link>, including the published <Link href="/projects/sutton-coldfield-extension">Sutton Coldfield extension case study</Link>.</p></section>

            <section id={slugify(contents[3])}><h2>4. {contents[3]}</h2><p>A good architect should do more than reproduce the first arrangement requested by the client.</p><p>The early design stage should explore:</p><ul><li>what is not working in the existing property;</li><li>how the rooms relate to one another;</li><li>daylight and orientation;</li><li>storage;</li><li>circulation;</li><li>views into the garden;</li><li>flexibility as family circumstances change;</li><li>buildability;</li><li>likely construction cost;</li><li>planning risk.</li></ul><p>For an extension, the largest design is not necessarily the best design. A smaller, better-planned addition can provide more useful space while costing less and reducing its effect on neighbouring properties.</p><p>Ask the architect to explain how options will be assessed and how many design stages or revisions are included in the fee.</p></section>

            <section id={slugify(contents[4])}><h2>5. {contents[4]}</h2><p>Planning permission and Building Regulations approval are separate processes.</p><p>Planning generally considers the principle, use, scale, appearance and effects of development. Building Regulations address technical requirements including structure, fire safety, ventilation, energy efficiency, drainage, electrical safety and accessibility.</p><p>Even where planning permission is not required, Building Regulations approval may still be necessary.</p><p>Before appointing an architect, establish whether the proposed service includes:</p><ul><li>measured survey;</li><li>existing drawings;</li><li>feasibility design;</li><li>permitted-development assessment;</li><li><Link href="/services/planning-applications">planning drawings and submission</Link>;</li><li>design revisions;</li><li><Link href="/services/building-regulations">Building Regulations drawings</Link>;</li><li>coordination with a structural engineer;</li><li>responses to Building Control;</li><li>construction information;</li><li>contractor tendering;</li><li>site inspections.</li></ul><p>Do not assume that a “planning package” includes technical construction information.</p></section>

            <section id={slugify(contents[5])}><h2>6. {contents[5]}</h2><p>Architectural quotations can vary significantly because the underlying services may not be comparable.</p><p>One quotation may include the survey, design options, planning submission and technical drawings. Another may cover only basic planning drawings.</p><p>Check whether the fee proposal identifies:</p><ul><li>each project stage;</li><li>the drawings and documents included;</li><li>the number of design revisions;</li><li>application administration;</li><li>consultant services;</li><li>planning and Building Control fees;</li><li>expenses;</li><li>exclusions;</li><li>payment stages;</li><li>what happens if the brief changes.</li></ul><p>A lower fee can become more expensive if important work is excluded or has to be commissioned later. The architect should provide written terms of engagement defining the scope, fee basis, responsibilities and complaints procedure.</p><aside className={styles.feeCta}><div><small>Early cost guidance</small><h3>Compare likely architectural stages.</h3><p>The calculator provides an indicative figure only. A written, project-specific fee proposal will still be required.</p></div><Link className="btn primary" href="/estimate">Get an indicative architectural fee <ArrowRight size={16} /></Link></aside></section>

            <section id={slugify(contents[6])}><h2>7. {contents[6]}</h2><p>Residential projects are personal and can involve important financial decisions. The relationship between client and architect therefore matters.</p><p>During the first consultation, consider:</p><ul><li>Does the architect listen before proposing solutions?</li><li>Are planning risks explained honestly?</li><li>Is technical information explained clearly?</li><li>Will you have a named contact?</li><li>How quickly are emails normally answered?</li><li>How will design changes be recorded?</li><li>Will meetings be online, in person or both?</li><li>Who will attend planning or consultant discussions?</li></ul><p>A technically capable architect who communicates poorly may not be the right appointment. Equally, avoid anyone who promises an effortless approval without first reviewing the site, planning history and proposal.</p></section>

            <section id={slugify(contents[7])}><h2>8. {contents[7]}</h2><p>Reviews can provide useful evidence, particularly where they identify the project location, type of work, service provided, communication during the project, planning or technical challenges, and whether the client would use the practice again.</p><p>A large number of vague reviews is not necessarily more helpful than a smaller collection of detailed, project-specific feedback.</p><p>Check reviews across more than one source where possible and compare them with the projects shown on the practice’s own website. This guide does not reproduce review quotations because the original wording and source should always remain directly verifiable.</p></section>

            <section id={slugify(contents[8])} className={styles.printChecklist}><h2>9. {contents[8]}</h2><p>Use this checklist when speaking with a prospective architect:</p><ol><li>Have you completed projects similar to mine?</li><li>Who will personally design and manage the project?</li><li>Are you registered with ARB?</li><li>What planning constraints can you identify at this stage?</li><li>What services are included in the quotation?</li><li>What services are excluded?</li><li>How many design revisions are included?</li><li>Will I need a structural engineer or other consultants?</li><li>Can you provide Building Regulations drawings after planning?</li><li>What information do you need from me?</li><li>What is the likely programme?</li><li>How will changes and additional fees be agreed?</li></ol></section>

            <section id={slugify(contents[9])}><h2>10. {contents[9]}</h2><p>Hepburn Architects is an ARB-registered, RIBA Chartered architectural practice supporting homeowners, developers and property investors across Birmingham and the wider West Midlands.</p><p>The practice may be a suitable choice where a client is looking for:</p><ul><li>director-led residential architectural services;</li><li>experience with house extensions and remodelling;</li><li>planning and Building Regulations support through one practice;</li><li>advice on HMOs, conversions and small residential developments;</li><li>clear stage-based architectural fees;</li><li>direct communication with an architect;</li><li>local Birmingham project experience.</li></ul><p>Our role is not to claim that we are automatically the best architect for every commission. It is to understand the property and brief, explain the constraints honestly and establish whether our experience is the right match for the project.</p><div className="actions"><Link className="btn primary" href="/contact">Discuss your Birmingham project <ArrowRight size={16} /></Link><Link className="btn secondary" href="/locations/birmingham-architects">View Birmingham architectural services</Link></div></section>

            <section id="conclusion"><h2>Conclusion</h2><p>The best architect in Birmingham is not necessarily the practice with the largest office, the lowest fee or the most dramatic portfolio.</p><p>It is the architect who:</p><ul><li>is properly registered;</li><li>understands your type of project;</li><li>identifies local planning constraints;</li><li>provides a clear scope and fee;</li><li>communicates honestly;</li><li>produces thoughtful, buildable design;</li><li>can support the project through the approvals you require.</li></ul><p>Compare evidence rather than slogans. Check credentials, examine relevant projects and use the initial consultation to establish whether the architect understands what you are trying to achieve.</p><p>For a residential project in Birmingham, Hepburn Architects offers an initial discussion to review the property, brief and likely next steps. Further practical information is available in the <Link href="/knowledge-centre">Knowledge Centre</Link>.</p></section>

            <section id="independent-resources" className={styles.resources}><h2>Useful independent resources</h2><ul><li><a href="https://arb.org.uk/architects-register/" target="_blank" rel="noopener noreferrer">Search the official ARB Architects Register <ExternalLink size={15} /></a></li><li><a href="https://arb.org.uk/public-information/before-hiring-an-architect/" target="_blank" rel="noopener noreferrer">Read ARB guidance before appointing an architect <ExternalLink size={15} /></a></li><li><a href="https://www.birmingham.gov.uk/info/20160/planning_applications/3004/how_we_assess_planning_applications" target="_blank" rel="noopener noreferrer">Review Birmingham City Council’s planning assessment guidance <ExternalLink size={15} /></a></li><li><a href="https://www.gov.uk/building-regulations-approval/how-to-apply" target="_blank" rel="noopener noreferrer">Read GOV.UK guidance on Building Regulations approval <ExternalLink size={15} /></a></li></ul></section>

            <section id="frequently-asked-questions" className={styles.faq}><h2>Frequently asked questions</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>

            <aside className="content-cta"><small className="eyebrow">Planning a project in Birmingham?</small><h2>Speak directly with Hepburn Architects.</h2><p>Discuss your house extension, new home, conversion or development opportunity.</p><Link className="btn primary" href="/contact">Book an initial consultation <ArrowRight size={17} /></Link></aside>
          </div>
        </div>
      </article>
    </>
  );
}
