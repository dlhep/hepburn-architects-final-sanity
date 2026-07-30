import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ExternalLink } from "lucide-react";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "House Extension Costs 2026",
  description: "Understand typical house extension costs in 2026, including construction, professional fees, planning, Building Regulations, kitchens, glazing and contingency.",
  alternates: { canonical: "https://www.hepburnarchitects.net/knowledge-centre/house-extension-costs" },
  openGraph: {
    title: "House Extension Costs 2026: A Complete UK Guide",
    description: "A practical homeowner guide to construction costs, fees, VAT, contingency and realistic extension budgeting.",
    url: "/knowledge-centre/house-extension-costs",
    type: "article",
    images: ["/images/architectural-expertise-home.webp"],
  },
};

const publishedDate = "2026-07-27";

const costRanges = [
  ["Straightforward single-storey extension", "£2,200–£2,800/m²", "A relatively simple shell, standard finishes and conventional structure.", "Small footprints, restricted access, drainage changes and large openings."],
  ["Higher-specification single-storey extension", "£2,800–£3,500+/m²", "More ambitious finishes, larger areas of glazing and greater detailing.", "Bespoke glazing, complex junctions, premium finishes and building services."],
  ["Two-storey extension", "£2,000–£3,000+/m²", "Ground- and first-floor construction with a coordinated roof and standard fit-out.", "Difficult roof integration, staircase changes, bathrooms and extensive remodelling."],
  ["Complex extension with substantial structural alterations", "£3,000–£4,000+/m²", "Major openings, temporary support and significant work to the existing house.", "Transfer structures, deep foundations, poor ground and constrained sequencing."],
  ["Kitchen-led extension with significant fit-out", "£2,500–£3,500+/m²", "Finished building work with a realistic allowance for service coordination.", "Cabinetry, appliances, stone worktops, islands, lighting and utility-room work."],
] as const;

const budgetHeadings = [
  ["Main building work", "The extension shell, roof, walls, floors and core construction."],
  ["Demolition and enabling work", "Strip-out, temporary protection, access and preparation."],
  ["Structural alterations", "Beams, posts, frames, bearings and temporary support."],
  ["Foundations and drainage", "Excavation, below-ground construction, diversions and connections."],
  ["Windows, rooflights and doors", "Frames, glazing, opening systems, thresholds and installation."],
  ["Heating, plumbing and electrics", "Altered services, new circuits, emitters, lighting and controls."],
  ["Internal finishes", "Plastering, joinery, decoration, flooring and fitted details."],
  ["Kitchen and utility fit-out", "Cabinetry, worktops, appliances, extraction and associated services."],
  ["Professional fees", "Design, technical information, engineering and specialist advice."],
  ["Statutory fees", "Planning, certificates and Building Control where applicable."],
  ["Surveys and specialist reports", "Measured, drainage, tree, ecology, ground or other investigations."],
  ["Contingency", "A risk allowance proportionate to the information and existing building."],
  ["VAT where applicable", "Tax treatment checked consistently across every quotation."],
  ["Temporary accommodation or storage", "Living arrangements, storage and additional security where relevant."],
  ["Landscaping and external works", "Patios, paths, boundaries, drainage and making good."],
] as const;

const extensionTypes = [
  {
    id: "single-storey",
    title: "Single-storey rear extensions",
    paragraphs: [
      "A rear extension often creates a kitchen, dining and family space with a better connection to the garden. The new footprint is only part of the cost: opening the existing rear wall, reorganising adjacent rooms and bringing services into the new plan can be substantial.",
      "Kitchen specification and large sliding or folding doors can materially change the budget. Drainage runs, foundation conditions and the choice between a simple lean-to, flat roof or more complex roof form also affect build cost and coordination.",
    ],
  },
  {
    id: "two-storey",
    title: "Two-storey extensions",
    paragraphs: [
      "A two-storey addition can sometimes be more efficient per square metre because the same foundations and roof serve two floors. That does not mean the total is lower: the larger area, first-floor integration and internal work create a bigger overall project.",
      "Structure, staircase relationships, roof geometry and planning impact require more resolution. Bedrooms or bathrooms may add plumbing, ventilation and fit-out, while construction commonly causes greater disruption.",
    ],
  },
  {
    id: "side-return",
    title: "Side-return extensions",
    paragraphs: [
      "Side returns are common on Victorian and Edwardian houses where a narrow strip beside the rear projection can unlock a better ground-floor plan. Their modest area can be deceptive because foundations, drainage, structure and roof glazing are concentrated into a small footprint.",
      "Restricted access, shared boundaries and drains along the side passage can increase cost. Party Wall matters, temporary weathering and rooflight junctions need early attention.",
    ],
  },
  {
    id: "wraparound",
    title: "Wraparound extensions",
    paragraphs: [
      "A wraparound extension combines rear and side development. It can transform circulation and room proportions, but often requires wider structural openings, several roof junctions and more extensive work to the existing ground floor.",
      "Complex drainage, valley details, temporary support and multiple existing levels increase risk. A resolved structural and technical design is particularly important before pricing.",
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen extensions",
    paragraphs: [
      "A kitchen extension is both a building project and a fit-out project. A construction rate may cover the room but omit the item that gives it purpose: the kitchen itself.",
      "Cabinetry, worktops, appliances, extraction, plumbing, flooring, feature lighting, island units and utility-room work should be scheduled separately. Check supplier quotes for installation, delivery, templating, connections and VAT.",
    ],
  },
] as const;

const costDrivers = [
  ["Site, access and ground", "Difficult access increases labour and handling. Sloping land, poor or contaminated ground, deep foundations and trees close to the work can change the construction method before the extension rises above ground."],
  ["Drainage, boundaries and neighbours", "Public sewers, private drains, party-wall procedures and tight boundaries influence foundation positions, build-over requirements and sequencing. Constrained urban sites can cost more even when the extension is small."],
  ["Structure and temporary works", "Wide openings, steel frames, transfers and removing several existing walls require more engineering and temporary support. The cost lies in both the steelwork and safe sequencing."],
  ["Heritage and design complexity", "Conservation areas and listed buildings may require specialist reports, carefully matched materials or bespoke details. Unusual roof forms and multiple corners add labour and weathering risk."],
  ["Glazing, services and specification", "Bespoke glazing, moving a kitchen or bathroom, upgraded heating and a high level of finish can outweigh the cost of extra floor area."],
  ["Change, inflation and delay", "Changes after construction begins interrupt procurement and completed work. Inflation, delayed decisions and expiring quotations can move the budget even when the physical design is unchanged."],
] as const;

const professionalCosts = [
  "Measured survey", "Feasibility and concept design", "Planning drawings and submission",
  "Building Regulations drawings", "Structural engineer", "Drainage or CCTV survey",
  "Party-wall surveyor", "Arboricultural advice", "Ecology advice where relevant",
  "Quantity surveyor", "Principal Designer duties where applicable", "Building Control charges",
] as const;

const examples = [
  {
    title: "A modest single-storey rear extension",
    area: "20m²",
    specification: "Straightforward form and standard specification",
    allowance: "£44,000–£56,000",
    extras: "VAT, professional and statutory costs, kitchen, surveys, contingency and external works.",
    reason: "A small footprint still carries fixed costs for setup, foundations, drainage and the opening into the house.",
  },
  {
    title: "A kitchen-led extension with substantial remodelling",
    area: "30m²",
    specification: "Higher specification with major internal alterations",
    allowance: "£84,000–£105,000+",
    extras: "VAT, kitchen and appliances, professional fees, structural design, temporary works and contingency.",
    reason: "Work inside the existing house and kitchen fit-out may be as important as the new floor area.",
  },
  {
    title: "A two-storey side and rear extension",
    area: "60m² across two floors",
    specification: "Standard-to-good specification with coordinated roof integration",
    allowance: "£120,000–£180,000+",
    extras: "VAT, fees, bathrooms, planning requirements, surveys, contingency and landscaping.",
    reason: "Efficiency per square metre can improve, but structure, roof work and total scope remain significant.",
  },
] as const;

const budgetProcess = [
  ["Define the problem", "Be clear about what the extension must solve before adding area."],
  ["Set the overall limit", "Establish the maximum affordable total, not only a build figure."],
  ["Add non-build costs", "Allow for professional, statutory, survey and fit-out headings."],
  ["Test feasibility", "Check likely construction cost before detailed design begins."],
  ["Hold contingency", "Match the risk allowance to the information and existing building."],
  ["Align ambition", "Balance area, structure, glazing and specification with the budget."],
  ["Price coordinated information", "Seek comparable tenders using drawings and specifications."],
  ["Control change", "Avoid major alterations after procurement or construction starts."],
] as const;

const controlMeasures = [
  ["Keep the form clear", "Simpler footprints and roof forms reduce corners, junctions and labour."],
  ["Use a sensible structural grid", "Efficient spans and well-positioned supports can avoid costly transfers."],
  ["Retain what works", "Keeping useful drainage and service positions can prevent avoidable work."],
  ["Decide early", "Resolve layouts, openings, products and finishes before they become urgent."],
  ["Price the same information", "Clear drawings and specifications make tender comparisons meaningful."],
  ["Prioritise deliberately", "Protect the rooms and details that matter; separate essentials from optional upgrades."],
] as const;

const faqs = [
  ["How much does a 20m² extension cost?", "Using the broad construction-only allowances on this page, a straightforward 20m² extension might initially test at about £44,000–£56,000 excluding VAT. Small extensions can cost more per square metre, and fees, kitchen fit-out, statutory charges, external works and contingency may sit outside that figure."],
  ["How much does a 30m² extension cost?", "A simple 30m² extension may fall within the wider benchmark, while a kitchen-led or structurally complex scheme can move materially higher. Area alone cannot reveal access, glazing, remodelling, fit-out or ground risk."],
  ["Is a two-storey extension cheaper per square metre?", "It can be, because foundations and roof construction serve more floor area. The total project is still larger and may need more structure, roof integration, services, planning work and internal alterations."],
  ["Does an extension add more value than it costs?", "Not automatically. Added value depends on local demand, the property's ceiling value, design quality, the space created and the complete project cost. A local valuation professional can advise on a specific property."],
  ["Are architects’ fees included in extension costs?", "The construction ranges on this page exclude professional fees. Architect, engineer, survey and specialist inputs should be allowed separately unless a cost plan expressly says otherwise."],
  ["Is VAT included in builders’ quotes?", "Not always. Some quotations show a net figure and add VAT later. Check the VAT status of each supplier and whether every total is net or gross before comparing prices."],
  ["How much contingency should I allow?", "At feasibility stage, 10–15% is a useful starting framework rather than a universal rule. Older buildings, unresolved surveys, difficult ground or unusual structure may justify more."],
  ["Can I live in the house during the work?", "Sometimes. The answer depends on dust, noise, security, service interruptions and whether a working kitchen or bathroom remains. Discuss the construction sequence with tendering contractors."],
  ["When should I obtain builders’ prices?", "Early market feedback can help, but comparable tender prices should follow coordinated technical drawings, structural information and a clear specification."],
  ["How can I tell whether my budget is realistic?", "Test the whole budget against area, specification and site risks; include VAT, fees, fit-out and contingency; then seek project-specific advice and coordinated contractor pricing."],
] as const;

const officialSources = [
  ["GOV.UK: VAT rates", "https://www.gov.uk/vat-rates"],
  ["GOV.UK: Fees for planning applications", "https://www.gov.uk/guidance/fees-for-planning-applications"],
  ["GOV.UK: Building Regulations approval and charges", "https://www.gov.uk/building-regulations-approval/how-to-apply"],
  ["GOV.UK: Community Infrastructure Levy guidance", "https://www.gov.uk/guidance/community-infrastructure-levy"],
] as const;

function projectText(project: Project) {
  return [project.title, project.category, project.projectType, project.description, ...(project.services || [])].join(" ").toLowerCase();
}

function selectExtensionProjects(projects: Project[]) {
  return projects.filter((project) => ["extension", "remodelling", "renovation"].some((term) => projectText(project).includes(term))).slice(0, 6);
}

export default async function HouseExtensionCostsPage() {
  const projects = selectExtensionProjects(await getProjects());
  const heroProject = projects[0];
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Knowledge Centre", item: `${site.url}/knowledge-centre` },
      { "@type": "ListItem", position: 3, name: "House Extension Costs 2026", item: `${site.url}/knowledge-centre/house-extension-costs` },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "How Much Does a House Extension Cost in 2026?",
    description: "Understand typical house extension costs in 2026, including construction, professional fees, planning, Building Regulations, kitchens, glazing and contingency.",
    datePublished: publishedDate, dateModified: publishedDate,
    author: { "@type": "Organization", name: "Hepburn Architects", url: site.url },
    publisher: { "@type": "Organization", name: "Hepburn Architects", url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/hepburn-logo.svg` } },
    mainEntityOfPage: `${site.url}/knowledge-centre/house-extension-costs`,
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };

  return (
    <>
      {[breadcrumbSchema, articleSchema, faqSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <header className={styles.hero}>
        <div className="shell">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/knowledge-centre">Knowledge Centre</Link><span aria-hidden="true">/</span>
            <span aria-current="page">House Extension Costs</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <small className="eyebrow">House Extension Costs</small>
              <h1>How Much Does a House Extension Cost in 2026?</h1>
              <p className={styles.standfirst}>Extension costs cannot be reduced to one universal price per square metre. Realistic early allowances can, however, help homeowners test whether a project is viable before detailed design begins.</p>
              <p>This guide separates construction cost from the professional fees, statutory charges, fit-out, VAT and contingency frequently omitted from an early budget.</p>
              <div className="actions">
                <Link className="btn primary" href="/estimate">Estimate Your Project <ArrowRight size={17} /></Link>
                <Link className="btn secondary" href="/knowledge-centre/house-extensions">Read the Complete Extension Guide</Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <Image
                src={heroProject ? projectImageUrl(heroProject.featuredImage, 1500) : "/images/architectural-expertise-home.webp"}
                alt={heroProject ? projectImageAlt(heroProject) : "Contemporary house extension by Hepburn Architects"}
                fill priority sizes="(max-width: 900px) 100vw, 45vw"
              />
              {heroProject ? <Link href={`/projects/${heroProject.slug}`}>{heroProject.title} <ArrowUpRight size={15} /></Link> : null}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.overview}>
          <div className="shell">
            <div className={styles.sectionIntro}>
              <div><small className="eyebrow">July 2026 feasibility guide</small><h2>Typical House Extension Cost Ranges</h2></div>
              <p>These are broad construction-only allowances for England outside London, excluding VAT, professional fees, statutory charges and project-specific abnormal costs. London and parts of the South East are commonly higher.</p>
            </div>
            <div className={styles.tableScroll}>
              <table>
                <caption>Indicative house extension construction allowances, July 2026</caption>
                <thead><tr><th scope="col">Project type</th><th scope="col">Indicative construction allowance</th><th scope="col">What may be included</th><th scope="col">What commonly increases the cost</th></tr></thead>
                <tbody>{costRanges.map(([type, allowance, included, increases]) => (
                  <tr key={type}><th scope="row">{type}</th><td><strong>{allowance}</strong></td><td>{included}</td><td>{increases}</td></tr>
                ))}</tbody>
              </table>
            </div>
            <div className={styles.costCaveat}>
              <strong>Use these ranges for feasibility, not tendering.</strong>
              <p>Contractor pricing varies substantially. Constrained urban sites can cost more, and quotations should eventually be based on coordinated drawings, structural information and specifications. A square-metre rate is not a substitute for a detailed tender.</p>
            </div>
          </div>
        </section>

        <section className={styles.articleSection}>
          <div className={`shell ${styles.twoColumn}`}>
            <div className={styles.stickyHeading}><small className="eyebrow">The complete picture</small><h2>What Is Included in a House Extension Budget?</h2><p>An early construction estimate is not automatically the complete amount required to finish and occupy the project.</p></div>
            <div className={styles.budgetList}>{budgetHeadings.map(([title, body], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}</div>
          </div>
        </section>

        <section className={styles.typeSection}>
          <div className="shell">
            <div className={styles.sectionIntro}><div><small className="eyebrow">Compare common approaches</small><h2>Cost by Extension Type</h2></div><p>The same floor area can carry very different costs depending on how it connects to the house and what must change around it.</p></div>
            <div className={styles.typeList}>{extensionTypes.map((type, index) => (
              <article id={type.id} key={type.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{type.title}</h3><div>{type.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>
            ))}</div>
          </div>
        </section>

        <section className={styles.darkSection}>
          <div className="shell">
            <div className={styles.sectionIntro}><div><small className="eyebrow">Cost drivers</small><h2>What Makes a House Extension More Expensive?</h2></div><p>Cost normally rises through an accumulation of site constraints, structural decisions, specification choices and uncertainty rather than one isolated item.</p></div>
            <div className={styles.driverGrid}>{costDrivers.map(([title, body], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>
            ))}</div>
          </div>
        </section>

        <section className={styles.articleSection}>
          <div className={`shell ${styles.twoColumn}`}>
            <div className={styles.stickyHeading}><small className="eyebrow">Project information</small><h2>Professional and Consultant Fees</h2><p>Professional input is separate from the construction ranges above. It can reduce the risk of expensive redesign, omissions and construction changes.</p><Link className={styles.textLink} href="/estimate">Estimate professional fees <ArrowRight size={16} /></Link></div>
            <div><p className={styles.lead}>The right team depends on the property and scope. A realistic budget may need to include:</p><ul className={styles.checkList}>{professionalCosts.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul><p>The Hepburn Architects fee calculator gives an early indication for selected architectural stages. It is not a construction-cost calculator or quotation, and consultant and authority costs are normally separate.</p></div>
          </div>
        </section>

        <section className={styles.statSection}>
          <div className={`shell ${styles.statGrid}`}>
            <div><small className="eyebrow">Separate approval systems</small><h2>Planning Permission and Statutory Costs</h2></div>
            <div>
              <p>Some extensions require full planning permission; others may fall within permitted development. A Lawful Development Certificate can still provide useful formal evidence. Read our guide to <Link href="/knowledge-centre/extension-planning-permission">planning permission for extensions</Link> before fixing an approval allowance.</p>
              <p>Planning application charges are indexed and change over time. Planning Portal service charges may apply, local pre-application fees vary, and Building Control charges depend on the body and project. The <Link href="/knowledge-centre/building-regulations">Building Regulations guide</Link> explains the technical approval route.</p>
              <p>Party Wall costs are separate from planning. Community Infrastructure Levy should also be checked where relevant: residential extensions may benefit from exemption, but the correct procedure and timing remain important.</p>
            </div>
          </div>
        </section>

        <section className={styles.vatSection}>
          <div className={`shell ${styles.vatGrid}`}>
            <div className={styles.vatFigure}><strong>20%</strong><span>Current UK standard VAT rate</span></div>
            <div><small className="eyebrow">Check every quotation</small><h2>Is VAT Included in Extension Costs?</h2><p>Most domestic extension construction work is normally subject to VAT at the standard rate. Professional services may also attract VAT depending on the supplier. Some contractors present net figures, so every quotation should state its tax treatment clearly.</p><p><strong>All construction ranges and worked examples on this page exclude VAT.</strong> The standard rate is 20% at publication, but the correct treatment should be confirmed for each supplier and item.</p></div>
          </div>
        </section>

        <section className={styles.articleSection}>
          <div className={`shell ${styles.twoColumn}`}>
            <div className={styles.stickyHeading}><small className="eyebrow">Risk allowance</small><h2>How Much Contingency Should You Allow?</h2></div>
            <div><p className={styles.lead}>Contingency should reduce as reliable information increases, but it should not disappear simply because a design has reached tender.</p>
              <div className={styles.contingencyBands}>
                <article><h3>Early feasibility</h3><p>Around 10–15% is a useful starting framework where design, surveys and contractor input remain limited. It is not a fixed rule.</p></article>
                <article><h3>Coordinated pre-tender information</h3><p>Better drawings, specifications and investigations may support a lower allowance, while still recognising construction risk.</p></article>
                <article><h3>Older or unusual buildings</h3><p>Hidden defects, unusual structure, difficult access or uncertain ground may justify a higher allowance.</p></article>
              </div>
              <p>Contingency is for unforeseen work. Requested upgrades and design changes are additions to scope and should change the approved budget rather than quietly consume the risk allowance.</p>
            </div>
          </div>
        </section>

        <section className={styles.examplesSection}>
          <div className="shell">
            <div className={styles.sectionIntro}><div><small className="eyebrow">Illustrative feasibility scenarios</small><h2>Worked Extension Cost Examples</h2></div><p>These examples are not quotations. They apply the broad July 2026 construction allowances to assumed projects in England outside London and exclude VAT.</p></div>
            <div className={styles.examplesGrid}>{examples.map((example, index) => (
              <article key={example.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{example.title}</h3><dl><div><dt>Assumed area</dt><dd>{example.area}</dd></div><div><dt>Specification</dt><dd>{example.specification}</dd></div><div><dt>Construction allowance</dt><dd>{example.allowance}</dd></div><div><dt>Additional headings</dt><dd>{example.extras}</dd></div></dl><p>{example.reason}</p></article>
            ))}</div>
          </div>
        </section>

        <section className={styles.processSection}>
          <div className={`shell ${styles.twoColumn}`}>
            <div className={styles.stickyHeading}><small className="eyebrow">From brief to tender</small><h2>How to Set a Realistic Extension Budget</h2><Link className={styles.textLink} href="/services/house-extensions">Explore our house extension service <ArrowRight size={16} /></Link><Link className={styles.textLink} href="/knowledge-centre/house-extension-timeline">Plan the extension timeline <ArrowRight size={16} /></Link><Link className={styles.textLink} href="/knowledge-centre/house-extension-ideas">Explore practical design ideas <ArrowRight size={16} /></Link></div>
            <ol className={styles.processList}>{budgetProcess.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
          </div>
        </section>

        <section className={styles.controlSection}>
          <div className="shell">
            <div className={styles.sectionIntro}><div><small className="eyebrow">Value through clarity</small><h2>How to Control Extension Costs</h2></div><p>Cost control is not about weakening compliance, insulation, structural safety or essential professional input. It is about spending deliberately.</p></div>
            <div className={styles.controlGrid}>{controlMeasures.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
            <blockquote>“The cheapest drawing package is not necessarily the cheapest route to a completed extension. Clear decisions and coordinated information make omissions, tender gaps and construction changes easier to avoid.”</blockquote>
          </div>
        </section>

        {projects.length ? <section className={styles.projectsSection}><div className="shell">
          <div className={styles.sectionIntro}><div><small className="eyebrow">Built ideas and real constraints</small><h2>Extension Projects in Practice</h2></div><Link className={styles.textLink} href="/projects">View House Extension Projects <ArrowRight size={16} /></Link></div>
          <div className={styles.projectGrid}>{projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><div><Image src={projectImageUrl(project.featuredImage, 900)} alt={projectImageAlt(project)} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><small>{project.projectType || project.category}</small><h3>{project.title}</h3><p>{project.location}</p></Link>)}</div>
        </div></section> : null}

        <section className={styles.downloadSection}><div className={`shell ${styles.downloadGrid}`}>
          <div className={styles.guideCover}><Image src="/images/house-extension-guide-cover.png" alt="Planning a House Extension practical homeowner guide cover" width={1055} height={1491} sizes="(max-width: 700px) 60vw, 320px" /></div>
          <div><small className="eyebrow">Free homeowner resource</small><h2>Plan Beyond the Initial Cost</h2><p>Download the House Extension Guide for a practical overview of planning permission, budgeting, design decisions, the extension process and common mistakes.</p><Link className="btn primary" href="/house-extension-guide">Get the House Extension Guide <ArrowRight size={17} /></Link></div>
        </div></section>

        <section id="faqs" className={styles.faqSection}><div className={`shell ${styles.twoColumn}`}>
          <div className={styles.stickyHeading}><small className="eyebrow">Homeowner questions</small><h2>House Extension Cost FAQs</h2></div>
          <div className={styles.faqList}>{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div>
        </div></section>

        <section className={styles.sourcesSection}><div className={`shell ${styles.sourcesGrid}`}>
          <div><small className="eyebrow">Official references</small><h2>Statutory and tax guidance</h2></div>
          <ul>{officialSources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}<ExternalLink size={15} /></a></li>)}</ul>
        </div></section>

        <aside className={styles.editorialNote}><div className="shell"><strong>Editorial note</strong><p>Cost information is indicative and changes over time. Every property, site and contractor market is different. Quotations should be sought using coordinated project information. This article is general guidance for England, not a project-specific cost plan; requirements, processes and fees differ elsewhere in the UK.</p></div></aside>

        <section className={styles.finalCta}><div className={`shell ${styles.finalCtaGrid}`}>
          <div><small className="eyebrow">Project-specific feasibility</small><h2>Planning an Extension?</h2></div>
          <div><p>An early feasibility review can help establish what may be possible, the likely approval route and whether the proposed scope is compatible with the available budget.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} />Discuss Your Extension</a><Link className="btn light-btn" href="/estimate">Estimate Professional Fees</Link></div></div>
        </div></section>
      </main>
    </>
  );
}
