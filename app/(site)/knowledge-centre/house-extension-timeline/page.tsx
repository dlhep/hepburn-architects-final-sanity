import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ExternalLink } from "lucide-react";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "House Extension Timeline",
  description: "Understand how long a house extension takes, from surveys and design through planning, Building Regulations, tendering and construction.",
  alternates: { canonical: "https://www.hepburnarchitects.net/knowledge-centre/house-extension-timeline" },
  openGraph: {
    title: "How Long Does a House Extension Take? A Complete UK Timeline",
    description: "A practical guide to surveys, design, approvals, contractor selection and house-extension construction.",
    url: "/knowledge-centre/house-extension-timeline",
    type: "article",
    images: ["/images/architectural-expertise-home.webp"],
  },
};

const publishedDate = "2026-07-27";

const timeline = [
  ["Initial consultation and project brief", "1–2 weeks", "Define the problems, priorities, broad budget and known constraints.", "Availability, incomplete property information or an unresolved brief.", "Agree essential outcomes and the overall investment limit."],
  ["Measured survey", "1–2 weeks", "Record the existing house, site, levels and visible conditions.", "Restricted access, complex geometry or missing drainage information.", "Provide access and available deeds, surveys or historic drawings."],
  ["Feasibility and concept design", "3–6 weeks", "Test layouts, light, garden connection, roof form, structure and budget.", "Repeated revisions, conflicting priorities or an unrealistic budget.", "Select a preferred direction and give consolidated feedback."],
  ["Planning or permitted-development assessment", "1–2 weeks", "Review planning history, designations, rights and the likely route.", "Unclear original-house records, Article 4 controls or heritage constraints.", "Decide the appropriate level of planning assurance."],
  ["Planning application where required", "Preparation plus 8 weeks from validation", "Prepare, submit and monitor a householder application.", "Validation requests, specialist reports, amendments or authority delay.", "Approve the submission and respond promptly to material queries."],
  ["Building Regulations and technical design", "4–8 weeks", "Develop coordinated construction drawings and compliance information.", "Complex details, unresolved specification or late design changes.", "Confirm products, finishes and performance priorities."],
  ["Structural engineering and specialist information", "Often 2–6 weeks, overlapping", "Coordinate calculations, drainage, energy and other specialist inputs.", "Site investigation, consultant lead times or revised structural scope.", "Appoint specialists early and approve investigations."],
  ["Contractor pricing or tender", "4–6 weeks", "Issue comparable information, answer queries and review returns.", "Busy contractors, incomplete documents or unclear exclusions.", "Agree tender list, selection criteria and value decisions."],
  ["Pre-construction preparation", "2–6+ weeks", "Appoint the contractor, close conditions and plan logistics.", "Party Wall matters, long-lead products or insurance requirements.", "Approve the contract, programme, access and living arrangements."],
  ["Construction", "Commonly 12–32+ weeks", "Build, coordinate trades, inspect controlled work and manage information.", "Weather, discoveries, supply chains, variations or late decisions.", "Make decisions to the agreed information programme."],
  ["Completion and final approvals", "1–4+ weeks", "Test systems, address defects and collect certificates and records.", "Incomplete commissioning, outstanding work or delayed certificates.", "Review handover information and close remaining items."],
] as const;

const detailedStages = [
  {
    id: "brief",
    heading: "Stage 1: Establishing the Brief",
    duration: "Approximately 1 to 2 weeks",
    paragraphs: [
      "The first stage identifies what is not working in the existing home and what an extension genuinely needs to solve. Priorities might include a better kitchen, more daylight, storage, garden access, an additional bedroom or a more coherent ground-floor plan.",
      "The discussion should establish the overall budget, known planning constraints and the difference between essential work and optional upgrades. Existing deeds, planning decisions, surveys and property information help the architect understand the starting point.",
    ],
  },
  {
    id: "survey",
    heading: "Stage 2: Surveying the Existing Property",
    duration: "Usually around 1 to 2 weeks",
    paragraphs: [
      "A measured survey and photographic record provide the basis for reliable existing drawings. The survey records visible geometry and conditions, with site levels, roof information and external context added where relevant.",
      "Drainage information may be recorded where visible or available, but concealed drains and structural conditions can require separate investigation. This is an indicative practice workflow from appointment to completed drawings, not a guaranteed turnaround.",
    ],
  },
  {
    id: "design",
    heading: "Stage 3: Developing the Design",
    duration: "Approximately 3 to 6 weeks for a straightforward extension",
    paragraphs: [
      "Concept design tests layout options, daylight, orientation, garden connection, roof form, likely structure and planning considerations. Options should also be tested against the realistic overall budget, not only the desired floor area.",
      "Client feedback and revisions are a normal part of the stage. Repeated changes, slow decisions or unresolved budget expectations can extend it materially and affect every stage that follows.",
    ],
  },
] as const;

const constructionRanges = [
  ["Small straightforward single-storey extension", "Approximately 12–18 weeks", "Simple form, good access and limited internal alteration."],
  ["Larger kitchen-led rear extension", "Approximately 16–24 weeks", "Kitchen fit-out, wider openings and more extensive services."],
  ["Two-storey extension", "Approximately 20–32+ weeks", "Two floors, roof integration and additional rooms or bathrooms."],
  ["Complex wraparound extension", "Approximately 22–32+ weeks", "Multiple roof junctions, structure, drainage and tight boundaries."],
  ["Extension with extensive internal remodelling", "Approximately 20–32+ weeks", "Programme driven by work throughout the existing house as well as the new area."],
] as const;

const constructionSequence = [
  "Site setup and protection", "Demolition and enabling work", "Groundworks and foundations",
  "Drainage", "Walls and structural steelwork", "Roof construction",
  "Windows and external doors", "First-fix services", "Insulation and plastering",
  "Second-fix joinery and services", "Kitchen and bathroom installation",
  "Decoration and flooring", "External works", "Testing, inspections and completion",
] as const;

const delayGroups = [
  ["Brief and design", "Slow decisions, repeated changes and an unrealistic budget can keep the design moving without reaching a stable proposal. A clear hierarchy of essential and optional work helps choices become final."],
  ["Surveys and technical unknowns", "Incomplete surveys, hidden defects, drains, poor ground or unexpected structure can change information and sequencing. Proportionate investigation reduces uncertainty but cannot remove every existing-building risk."],
  ["Planning and neighbours", "Validation issues, specialist reports, conservation or listed-building considerations, planning amendments and Party Wall procedures can all extend the pre-construction programme."],
  ["Contractors and products", "Contractor availability, long-lead glazing, kitchens, steelwork or specialist finishes may determine the realistic start date even when approvals are in place."],
  ["Construction conditions", "Weather, material shortages, utility interruptions, delayed payments or approvals and variations during construction can affect the critical path."],
] as const;

const movingMeasures = [
  "Agree the priorities and essential scope early",
  "Establish a realistic total budget, including contingency",
  "Respond promptly with consolidated design decisions",
  "Coordinate the planning and technical strategy",
  "Avoid tendering incomplete information",
  "Choose products with realistic lead times",
  "Resolve Party Wall requirements early",
  "Avoid major changes after construction begins",
  "Maintain a clear decision and information programme",
  "Appoint appropriate professionals and specialists",
] as const;

const scenarios = [
  {
    title: "Straightforward single-storey rear extension under permitted development",
    rows: [["Design and survey", "4–7 weeks"], ["Planning route", "2–10 weeks, depending on whether a certificate is sought"], ["Technical design", "4–6 weeks"], ["Contractor selection", "4–6 weeks"], ["Pre-construction", "2–4 weeks"], ["Construction", "12–18 weeks"]],
    total: "Illustrative total: around 6–9 months",
  },
  {
    title: "Kitchen-led rear extension requiring planning permission",
    rows: [["Design and survey", "5–8 weeks"], ["Planning route", "10–14+ weeks including preparation and validation"], ["Technical design", "6–8 weeks"], ["Contractor selection", "4–6 weeks"], ["Pre-construction", "3–6 weeks"], ["Construction", "18–26 weeks"]],
    total: "Illustrative total: around 9–12 months",
  },
  {
    title: "Two-storey side and rear extension with extensive remodelling",
    rows: [["Design and survey", "6–10 weeks"], ["Planning route", "12–18+ weeks"], ["Technical design", "8–12 weeks"], ["Contractor selection", "5–8 weeks"], ["Pre-construction", "4–8+ weeks"], ["Construction", "24–36+ weeks"]],
    total: "Illustrative total: around 12–18+ months",
  },
] as const;

const faqs = [
  ["How long does planning permission take for an extension?", "In England, the statutory determination period for a valid non-major planning application is normally eight weeks unless a longer period is agreed. Preparation and validation happen before or around that period, and actual authority performance varies."],
  ["How long do extension drawings take?", "A measured survey and concept design may take roughly four to eight weeks for a straightforward project. Planning drawings and technical drawings are separate stages, and revisions or complex coordination increase the programme."],
  ["How long does Building Regulations approval take?", "Technical design commonly takes four to eight weeks before or alongside submission. GOV.UK says a Full Plans decision is normally expected within five weeks, or two months with consent, but queries and project complexity can affect progress."],
  ["How long does a single-storey extension take to build?", "A straightforward single-storey extension may take around 12–20 weeks on site. Larger openings, kitchens, difficult access, drainage or internal remodelling can move it beyond that range."],
  ["How long does a two-storey extension take?", "Many two-storey extensions require roughly 20–32 weeks or longer for construction. Roof integration, bathrooms, structural work and disruption to the existing house materially affect the sequence."],
  ["Can planning and Building Regulations be prepared at the same time?", "They can overlap, particularly where planning risk is low and time is important. Developing technical information before planning approval creates a risk that later planning changes require technical redesign."],
  ["When should I contact builders?", "Early conversations can test availability and buildability. Comparable prices should normally be sought once coordinated drawings, structural information and specification are sufficiently developed."],
  ["Can I live in my house during the extension?", "Often, but loss of a kitchen or bathroom, dust, noise, security, utility interruptions, children, pets and home working should be considered against the cost and programme impact of temporary accommodation."],
  ["What is the most common cause of delay?", "There is no universal single cause. Late decisions and changes are especially disruptive because they affect design, approvals, procurement and construction rather than one isolated stage."],
  ["How far in advance should I appoint an architect?", "For many projects, beginning six to twelve months before the desired construction start is sensible. Complex planning, Party Wall procedures, consultant lead times or busy contractors may require longer."],
] as const;

const officialSources = [
  ["GOV.UK: Determining a planning application", "https://www.gov.uk/guidance/determining-a-planning-application"],
  ["GOV.UK: Building Regulations approval — how to apply", "https://www.gov.uk/building-regulations-approval/how-to-apply"],
  ["GOV.UK: Party walls and building work", "https://www.gov.uk/party-walls-building-works/when-how-tell-them"],
] as const;

function projectText(project: Project) {
  return [project.title, project.category, project.projectType, project.description, ...(project.services || [])].join(" ").toLowerCase();
}

function selectExtensionProjects(projects: Project[]) {
  return projects.filter((project) => ["extension", "remodelling", "renovation"].some((term) => projectText(project).includes(term))).slice(0, 6);
}

export default async function HouseExtensionTimelinePage() {
  const projects = selectExtensionProjects(await getProjects());
  const heroProject = projects[0];
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Knowledge Centre", item: `${site.url}/knowledge-centre` },
      { "@type": "ListItem", position: 3, name: "House Extension Timeline", item: `${site.url}/knowledge-centre/house-extension-timeline` },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "How Long Does a House Extension Take? A Complete UK Timeline",
    description: metadata.description, datePublished: publishedDate, dateModified: publishedDate,
    author: { "@type": "Organization", name: "Hepburn Architects", url: site.url },
    publisher: { "@type": "Organization", name: "Hepburn Architects", url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/hepburn-logo.svg` } },
    mainEntityOfPage: `${site.url}/knowledge-centre/house-extension-timeline`,
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };

  return (
    <>
      {[breadcrumbSchema, articleSchema, faqSchema].map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}

      <header className={styles.hero}><div className="shell">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/knowledge-centre">Knowledge Centre</Link><span aria-hidden="true">/</span><span aria-current="page">House Extension Timeline</span></nav>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}><small className="eyebrow">House Extension Timeline</small><h1>How Long Does a House Extension Take?</h1><p className={styles.standfirst}>Construction may represent only one part of the overall programme. Surveys, design decisions, planning, technical coordination and contractor selection all need to be considered before work starts on site.</p><p>The sequence varies with the property, local authority, design complexity, consultant input and procurement route. No responsible programme can guarantee approval or completion by a fixed date.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} />Discuss Your Extension</a><Link className="btn secondary" href="/knowledge-centre/house-extensions">Read the Complete Extension Guide</Link></div></div>
          <div className={styles.heroImage}><Image src={heroProject ? projectImageUrl(heroProject.featuredImage, 1500) : "/images/architectural-expertise-home.webp"} alt={heroProject ? projectImageAlt(heroProject) : "Contemporary house extension by Hepburn Architects"} fill priority sizes="(max-width: 900px) 100vw, 45vw" />{heroProject ? <Link href={`/projects/${heroProject.slug}`}>{heroProject.title}<ArrowUpRight size={15} /></Link> : null}</div>
        </div>
      </div></header>

      <main>
        <section className={styles.quickAnswer}><div className="shell"><small className="eyebrow">Typical overall timeline</small><div><strong>Around 6 to 12 months</strong><p>from the first design discussion to completion for many straightforward domestic extensions.</p></div><p className={styles.qualifier}>This is not a guarantee. Simpler permitted-development projects may move faster; planning applications, complex structure, conservation or listed-building considerations, specialist reports and contractor availability can take longer. Major client changes can delay both design and construction.</p></div></section>

        <section className={styles.overview}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Eleven connected stages</small><h2>The Complete Extension Timeline</h2></div><p>Durations overlap on some projects. Each stage should still produce the decisions and information needed by the next.</p></div>
          <ol className={styles.timeline}>{timeline.map(([title, duration, happens, delay, decision], index) => <li key={title}><div className={styles.timelineNumber}>{String(index + 1).padStart(2, "0")}</div><div className={styles.timelineTitle}><h3>{title}</h3><strong>{duration}</strong></div><dl><div><dt>What happens</dt><dd>{happens}</dd></div><div><dt>Common delay</dt><dd>{delay}</dd></div><div><dt>Homeowner decision</dt><dd>{decision}</dd></div></dl></li>)}</ol>
        </div></section>

        <section className={styles.stageSection}><div className="shell">
          {detailedStages.map((stage) => <article id={stage.id} key={stage.id}><div><small className="eyebrow">{stage.duration}</small><h2>{stage.heading}</h2></div><div>{stage.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}
        </div></section>

        <section className={styles.planningSection}><div className={`shell ${styles.split}`}>
          <div><small className="eyebrow">Approval strategy</small><h2>Stage 4: Planning Permission or Permitted Development</h2></div>
          <div><p className={styles.lead}>The planning route affects both the programme and the level of certainty available before construction.</p><p>Some work may be permitted development; a Lawful Development Certificate can still provide formal evidence. Other schemes require a householder planning application or a prior approval process. Conservation areas, listed buildings, Article 4 directions and earlier conditions can change the route.</p><p>For a valid non-major planning application in England, the statutory determination period is normally eight weeks unless a longer period is agreed. Application preparation and validation sit outside or before that benchmark, and local-authority performance varies.</p><Link className={styles.textLink} href="/knowledge-centre/extension-planning-permission">Check the Extension Planning Route<ArrowRight size={16} /></Link></div>
        </div></section>

        <section className={styles.technicalSection}><div className={`shell ${styles.split}`}>
          <div><small className="eyebrow">Approximately 4 to 8 weeks</small><h2>Stage 5: Preparing the Technical Information</h2></div>
          <div><p className={styles.lead}>Technical design translates the approved spatial proposal into coordinated information for compliance, pricing and construction.</p><p>It can include detailed construction drawings, structural calculations, insulation and energy performance, drainage, ventilation, fire safety, electrical and heating coordination, specifications and specialist consultant information.</p><p>Planning and technical work can overlap in some procurement routes. Proceeding before planning approval may save time where risk is low, but planning changes can cause technical redesign.</p><Link className={styles.textLink} href="/knowledge-centre/building-regulations">Read Building Regulations Explained<ArrowRight size={16} /></Link></div>
        </div></section>

        <section className={styles.pricingSection}><div className={`shell ${styles.split}`}>
          <div><small className="eyebrow">Approximately 4 to 6 weeks</small><h2>Stage 6: Obtaining Construction Prices</h2></div>
          <div><p className={styles.lead}>Comparable information helps contractors price the same scope rather than different interpretations of an incomplete design.</p><p>The tender period includes inviting suitable contractors, answering queries, reviewing exclusions, checking VAT, comparing programmes, checking references and availability, and resolving proportionate value-engineering decisions.</p><p>Prices obtained from incomplete drawings often contain uncertainty and provisional allowances that become cost changes later.</p><Link className={styles.textLink} href="/knowledge-centre/house-extension-costs">Read the 2026 Extension Cost Guide<ArrowRight size={16} /></Link></div>
        </div></section>

        <section className={styles.prepSection}><div className={`shell ${styles.split}`}>
          <div><small className="eyebrow">Approximately 2 to 6+ weeks</small><h2>Stage 7: Preparing to Start on Site</h2></div>
          <div><p>Before work starts, the contractor appointment and programme should be agreed, Building Control arrangements confirmed and applicable planning conditions discharged. Structural information, product lead times, access, insurance, site logistics and health and safety responsibilities also need coordination.</p><p>Party Wall procedures should be addressed early. Depending on the work, statutory notice periods may be one or two months, and an award can take longer if consent is not straightforward. Temporary kitchen, storage or accommodation arrangements should align with the contractor’s sequence.</p></div>
        </div></section>

        <section className={styles.constructionSection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Broad construction allowances</small><h2>Stage 8: Building the Extension</h2></div><p>Weather, access, structural discoveries, supply chains and client changes can alter every range below. These are programme-testing allowances, not promises.</p></div>
          <div className={styles.rangeTable}>
            <table>
              <caption>Indicative construction durations for house extensions in England</caption>
              <thead><tr><th scope="col">Extension type</th><th scope="col">Indicative duration</th><th scope="col">Typical basis</th></tr></thead>
              <tbody>{constructionRanges.map(([type, duration, basis]) => <tr key={type}><th scope="row">{type}</th><td>{duration}</td><td>{basis}</td></tr>)}</tbody>
            </table>
          </div>
          <p className={styles.constructionNote}>A straightforward single-storey extension may commonly take around 12 to 20 weeks. Larger or more complex work may take 20 to 32 weeks or longer.</p>
        </div></section>

        <section className={styles.sequenceSection}><div className={`shell ${styles.split}`}>
          <div><small className="eyebrow">On-site sequence</small><h2>A Typical Construction Sequence</h2><p>Stages can overlap, and the precise order varies with structure, weathering and the contractor’s programme.</p></div>
          <ol>{constructionSequence.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
        </div></section>

        <section className={styles.delaySection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Programme risk</small><h2>What Can Delay a House Extension?</h2></div><p>Most delays come from dependencies: one missing decision or piece of information holds up several later activities.</p></div>
          <div className={styles.delayGrid}>{delayGroups.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div></section>

        <section className={styles.movingSection}><div className={`shell ${styles.split}`}>
          <div><small className="eyebrow">Useful discipline</small><h2>How to Reduce Avoidable Delays</h2><p>Keeping momentum does not mean bypassing approvals, technical checks or safe construction planning.</p><Link className={styles.textLink} href="/services/house-extensions">Explore our house extension service<ArrowRight size={16} /></Link></div>
          <ul>{movingMeasures.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
        </div></section>

        <section className={styles.scenariosSection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Illustrative programmes</small><h2>Worked Extension Timelines</h2></div><p>These scenarios show how stages can combine. They are feasibility examples for England, not guaranteed programmes.</p></div>
          <div className={styles.scenarioGrid}>{scenarios.map((scenario, index) => <article key={scenario.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{scenario.title}</h3><dl>{scenario.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><strong>{scenario.total}</strong></article>)}</div>
        </div></section>

        <section className={styles.questionsSection}><div className="shell">
          <article><small className="eyebrow">Overlapping stages</small><h2>Can Work Begin Before Planning Approval?</h2><p>Design and technical coordination can sometimes overlap where planning risk is understood. Ordering major works or commencing prematurely creates risk: planning and Building Regulations are separate approvals, and a planning change can invalidate completed technical work. Early structural coordination may save time, but the proportionate approach depends on the project.</p></article>
          <article><small className="eyebrow">Living arrangements</small><h2>Should Homeowners Move Out?</h2><p>Many owners remain during smaller extensions, but loss of a kitchen or bathroom, dust, noise, security, children, pets, home working and utility interruptions can make occupation difficult. Temporary protection helps but can slow the contractor. Compare accommodation cost with the effect occupation may have on programme efficiency.</p></article>
        </div></section>

        {projects.length ? <section className={styles.projectsSection}><div className="shell"><div className={styles.sectionIntro}><div><small className="eyebrow">Real projects, real sequences</small><h2>Extension Projects in Practice</h2></div><Link className={styles.textLink} href="/projects">View House Extension Projects<ArrowRight size={16} /></Link></div><div className={styles.projectGrid}>{projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><div><Image src={projectImageUrl(project.featuredImage, 1000)} alt={projectImageAlt(project)} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><small>{project.projectType || project.category}</small><h3>{project.title}</h3><p>{project.location}</p></Link>)}</div></div></section> : null}

        <section className={styles.downloadSection}><div className={`shell ${styles.downloadGrid}`}><div className={styles.guideCover}><Image src="/images/house-extension-guide-cover.png" alt="Planning a House Extension practical homeowner guide cover" width={1055} height={1491} sizes="(max-width: 700px) 60vw, 320px" /></div><div><small className="eyebrow">Free homeowner resource</small><h2>Understand the Process Before You Begin</h2><p>Download the House Extension Guide for practical guidance on planning permission, budgeting, design decisions, the project sequence and common mistakes.</p><Link className="btn primary" href="/house-extension-guide">Get the House Extension Guide<ArrowRight size={17} /></Link><Link className={styles.textLink} href="/knowledge-centre/house-extension-ideas">Explore house extension design ideas<ArrowRight size={16} /></Link></div></div></section>

        <section id="faqs" className={styles.faqSection}><div className={`shell ${styles.split}`}><div className={styles.faqHeading}><small className="eyebrow">Homeowner questions</small><h2>House Extension Timeline FAQs</h2></div><div className={styles.faqList}>{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div></div></section>

        <section className={styles.sourcesSection}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Official references</small><h2>Planning and Pre-construction Guidance</h2></div><ul>{officialSources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}<ExternalLink size={15} /></a></li>)}</ul></div></section>

        <aside className={styles.editorialNote}><div className="shell"><strong>Editorial note</strong><p>All durations are indicative. Every property, authority, consultant team, contractor market and procurement route is different. This guide focuses principally on England and is general guidance, not a guaranteed approval or completion programme.</p></div></aside>

        <section className={styles.finalCta}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Project-specific sequencing</small><h2>Planning an Extension?</h2></div><div><p>An early design and feasibility discussion can help establish the likely approval route, realistic project sequence and the information needed before construction begins.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} />Discuss Your Extension</a><Link className="btn light-btn" href="/estimate">Estimate Professional Fees</Link></div></div></div></section>
      </main>
    </>
  );
}
