import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ExternalLink } from "lucide-react";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Extension Planning Permission",
  description: "Learn when a house extension needs planning permission, when permitted development may apply, and when to obtain a Lawful Development Certificate.",
  alternates: { canonical: "https://www.hepburnarchitects.net/knowledge-centre/extension-planning-permission" },
  openGraph: {
    title: "Do I Need Planning Permission for a House Extension?",
    description: "A practical guide to planning permission, permitted development and Lawful Development Certificates for extensions in England.",
    url: "/knowledge-centre/extension-planning-permission",
    type: "article",
    images: ["/images/architectural-expertise-home.webp"],
  },
};

const reviewedDate = "27 July 2026";
const schemaDate = "2026-07-27";

const quickReasons = [
  "The extension exceeds one or more permitted-development limits.",
  "The property is a flat or maisonette rather than a qualifying house.",
  "An Article 4 Direction or planning condition has removed the relevant right.",
  "The house is listed, or the site is on designated land with additional restrictions.",
  "The work projects forward of the principal elevation or a side elevation fronting a highway.",
  "Earlier extensions have already used part of the permitted allowance.",
] as const;

const comparison = [
  {
    title: "Planning permission",
    label: "A discretionary decision",
    copy: "The local planning authority assesses the proposal against the development plan, national policy and material planning considerations such as design, character and neighbour amenity.",
  },
  {
    title: "Permitted development",
    label: "A national grant of permission",
    copy: "The proposal is lawful only when every limitation and condition in the relevant class is satisfied. There is no design-balancing exercise to excuse a failed measurement or condition.",
  },
] as const;

const propertyChecks = [
  ["The original house", "Broadly, the house as first built or as it stood on 1 July 1948 if built earlier. A later extension does not become part of the original house merely through age."],
  ["Planning history", "Decisions, approved drawings and enforcement records can establish previous enlargements and the lawful form of the dwelling."],
  ["Conditions and directions", "The precise wording of a planning condition or Article 4 Direction determines which rights, if any, have been withdrawn."],
  ["Lawful use", "Part 1 rights depend on the building being a dwellinghouse. Flats, maisonettes and some homes created by change of use do not benefit in the same way."],
] as const;

const scenarios = [
  {
    title: "A modest rear extension to a semi-detached house",
    route: "Potentially Class A permitted development, often supported by a proposed Lawful Development Certificate.",
    checks: "Original rear wall, 3-metre ordinary projection limit, 4-metre overall height, boundary-related eaves height, site coverage, materials and retained rights.",
    documents: "Measured survey, existing and proposed plans and elevations, site plan and exact dimensions.",
    risks: "An earlier addition, restrictive condition or incorrect original-wall datum could change the route.",
  },
  {
    title: "A larger rear extension using prior approval",
    route: "The larger-home-extension neighbour-consultation procedure, not a full planning application.",
    checks: "Qualifying house and location, projection above 3 metres and no more than 6 metres for this attached house, plus every other Class A condition.",
    documents: "Written description, site plan, dimensions, addresses of adjoining owners or occupiers and the required contact details.",
    risks: "Neighbour amenity objection, ineligible land, another Class A failure or starting before the procedure permits it.",
  },
  {
    title: "A two-storey side extension",
    route: "Commonly a householder planning application because Class A side extensions are limited to one storey.",
    checks: "Street character, spacing, terracing effect, neighbour amenity, parking, trees, roof form and local design guidance.",
    documents: "Survey drawings, design proposals, site and location plans and any locally required supporting statement.",
    risks: "Overbearing impact, loss of light, poor relationship to the original house or conflict with local side-spacing policy.",
  },
  {
    title: "A wraparound extension in a conservation area",
    route: "Often a householder planning application; designated-land limits and the combined side-and-rear form require careful assessment.",
    checks: "Conservation-area character, original walls, combined width and projection, previous extensions, roof form and local Article 4 Directions.",
    documents: "Accurate survey and proposal drawings, photographs and potentially a heritage or design statement.",
    risks: "Treating the parts separately, harm to character, neighbour impact or assuming conservation-area status removes or preserves every right.",
  },
] as const;

const faqs = [
  ["How big can an extension be without planning permission?", "There is no single permitted size. Projection, height, eaves, width, boundaries, site coverage, previous additions, location and the type of house must all comply with the relevant class."],
  ["Can I build a 6-metre rear extension without planning permission?", "Potentially, on an attached house, through the larger-home-extension prior-approval route. It must be single-storey, exceed 3 metres but not 6 metres in rear projection, qualify in every other respect and complete the procedure before work starts."],
  ["Can my neighbour object to a permitted-development extension?", "For an ordinary Class A extension there is no planning consultation. Under the larger-home-extension procedure, adjoining neighbours are consulted; an objection leads the authority to assess impact on their amenity."],
  ["Do I need planning permission for a side extension?", "A single-storey side extension may qualify where it meets all Class A limits, including width, height, eaves and location restrictions. Two-storey side extensions commonly need planning permission."],
  ["Do I need planning permission for a two-storey extension?", "Limited rights can apply to qualifying two-storey rear extensions, but the controls are substantially tighter and prior approval is required. Many two-storey proposals need a householder application."],
  ["Does a conservation area remove permitted development rights?", "Not automatically. National rules restrict some rights on designated land and a local Article 4 Direction may remove specified rights. The property and relevant direction must be checked."],
  ["What is a Lawful Development Certificate?", "It is a formal decision that described existing or proposed development is lawful for planning purposes. It is not planning permission and does not replace other approvals."],
  ["Can I start before prior approval is decided?", "No. For the larger-home-extension process, work must wait until the authority says prior approval is unnecessary, grants it, or the 42-day determination period expires without notification of a decision."],
  ["Do previous extensions count?", "Yes. Several Class A measurements refer to enlargements made since the original house, including extensions built under planning permission. Joined additions may be assessed cumulatively."],
  ["Does permitted development mean I do not need Building Regulations?", "No. Planning and Building Regulations are separate systems. Building-control approval may still be required even when the work is permitted development."],
  ["Can a planning condition remove permitted development rights?", "Yes. A condition on an earlier permission can remove specified rights. Its exact wording, the permission it attaches to and the planning history need to be read carefully."],
  ["Is the 45-degree rule law?", "It is usually a local planning guideline for daylight, outlook and neighbour impact, not a universal statutory permitted-development rule or an automatic pass-or-fail test."],
] as const;

const sources = [
  ["GOV.UK — Permitted development rights for householders: technical guidance", "https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance/permitted-development-rights-for-householders-technical-guidance"],
  ["GOV.UK — When is permission required?", "https://www.gov.uk/guidance/when-is-permission-required"],
  ["GOV.UK — Lawful development certificates", "https://www.gov.uk/guidance/lawful-development-certificates"],
  ["Planning Portal — Extensions guidance", "https://www.planningportal.co.uk/permission/common-projects/extensions/planning-permission"],
  ["Legislation.gov.uk — GPDO 2015, Schedule 2, Part 1", "https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/1"],
] as const;

function projectText(project: Project) {
  return [project.title, project.category, project.projectType, project.description, ...(project.services || [])].join(" ").toLowerCase();
}

function selectExtensionProjects(projects: Project[]) {
  return projects.filter((project) => ["extension", "remodelling", "renovation"].some((term) => projectText(project).includes(term))).slice(0, 6);
}

export default async function ExtensionPlanningPermissionPage() {
  const projects = selectExtensionProjects(await getProjects());
  const heroProject = projects[0];
  const canonical = `${site.url}/knowledge-centre/extension-planning-permission`;
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Knowledge Centre", item: `${site.url}/knowledge-centre` },
      { "@type": "ListItem", position: 3, name: "Extension Planning Permission", item: canonical },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Do I Need Planning Permission for a House Extension?",
    description: metadata.description, datePublished: schemaDate, dateModified: schemaDate,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: canonical,
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };

  return (
    <>
      {[breadcrumbSchema, articleSchema, faqSchema].map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      <header className={styles.hero}><div className="shell">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/knowledge-centre">Knowledge Centre</Link><span>/</span><span aria-current="page">Extension Planning Permission</span></nav>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}><small className="eyebrow">Extension Planning Permission</small><h1>Do I Need Planning Permission for an Extension?</h1><p className={styles.standfirst}>Some domestic extensions can be built under permitted development rights; others require a householder planning application. The correct route depends on the property, previous alterations, dimensions, location and planning history.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} />Discuss Your Extension</a><Link className="btn secondary" href="/knowledge-centre/planning-permission">Read the Planning Permission Guide</Link></div></div>
          <div className={styles.heroImage}><Image src={heroProject ? projectImageUrl(heroProject.featuredImage, 1500) : "/images/architectural-expertise-home.webp"} alt={heroProject ? projectImageAlt(heroProject) : "Contemporary house extension designed by Hepburn Architects"} fill priority sizes="(max-width: 900px) 100vw, 45vw" />{heroProject && <Link href={`/projects/${heroProject.slug}`}>{heroProject.title}<ArrowUpRight size={15} /></Link>}</div>
        </div>
      </div></header>

      <main>
        <section className={styles.quick}><div className="shell"><div><small className="eyebrow">Quick answer</small><h2>It depends on the house and the complete proposal.</h2><p>You may not need a full planning application where every applicable permitted-development limitation and condition is met. Planning permission is more likely where:</p></div><ul>{quickReasons.map((reason) => <li key={reason}><Check size={17} />{reason}</li>)}</ul><p className={styles.warning}>Every property must be assessed individually. This guide covers planning law in England; rules differ in Wales, Scotland and Northern Ireland.</p></div></section>

        <section className={styles.section}><div className="shell">
          <div className={styles.intro}><div><small className="eyebrow">Two planning routes</small><h2>Planning Permission or Permitted Development?</h2></div><p>Both routes can authorise development, but they answer different questions. Planning permission weighs planning merits; permitted development is a legal test against a defined national class.</p></div>
          <div className={styles.comparison}>{comparison.map((item) => <article key={item.title}><span>{item.label}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
          <div className={styles.note}><strong>Permitted development does not override other obligations.</strong><p>Building Regulations, listed-building consent, the Party Wall etc. Act, restrictive covenants, rights of way, sewer build-over agreements and other legal requirements remain separate. Read our <Link href="/knowledge-centre/building-regulations">Building Regulations guide</Link>.</p></div>
        </div></section>

        <section className={`${styles.section} ${styles.cream}`}><div className="shell">
          <div className={styles.intro}><div><small className="eyebrow">Eligibility before dimensions</small><h2>Which Properties Can Use Householder Permitted Development Rights?</h2></div><p>Normal Part 1 householder rights generally attach to houses. They do not apply in the same way to flats, maisonettes, some converted buildings, listed buildings or homes where a condition or Article 4 Direction has removed rights.</p></div>
          <div className={styles.checkGrid}>{propertyChecks.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <p className={styles.longCopy}>Some new-build permissions remove particular rights, and homes created under specified change-of-use classes can be excluded from Class A. Establish whether the building is lawfully in use as a single dwellinghouse before relying on the householder rules.</p>
        </div></section>

        <section className={styles.section}><div className={`shell ${styles.split}`}>
          <div><small className="eyebrow">Single-storey enlargement</small><h2>Can a Rear Extension Be Permitted Development?</h2></div>
          <div><p className={styles.lead}>Yes, provided the complete Class A test is met. Ordinary single-storey rear projection is generally limited to 4 metres for a detached house and 3 metres for any other house, measured beyond the relevant original rear wall.</p><p>The extension must also be single-storey, no more than 4 metres high, comply with eaves controls and the 3-metre boundary rule for eaves above 3 metres, remain within the 50% curtilage coverage limit, use materials of similar appearance and respect restrictions applying on designated land. Previous extensions count.</p><p>Outside article 2(3) land and Sites of Special Scientific Interest, a larger qualifying rear extension may project more than 4 metres and up to 8 metres for a detached house, or more than 3 metres and up to 6 metres for another house. That route is not automatic: prior approval must be completed before work starts.</p></div>
        </div></section>

        <section className={`${styles.section} ${styles.dark}`}><div className={`shell ${styles.split}`}>
          <div><small className="eyebrow">Neighbour consultation</small><h2>What Is the Larger Home Extension Prior-Approval Process?</h2></div>
          <div><p className={styles.lead}>This is a specific prior-approval procedure for qualifying single-storey rear extensions, not a full planning application.</p><ol className={styles.steps}><li>The homeowner notifies the local planning authority with the prescribed information.</li><li>The authority consults adjoining owners or occupiers, who normally have 21 days to respond.</li><li>If an adjoining neighbour objects, the authority assesses the effect on their amenity.</li><li>The authority has 42 days from receiving the notification to issue its decision.</li><li>Work must wait until the authority confirms prior approval is not required, grants it, or the 42-day period passes without a notified decision.</li></ol><p>Every other Class A limitation and condition still applies. A prior-approval outcome cannot cure an otherwise non-compliant extension.</p></div>
        </div></section>

        <section className={styles.section}><div className="shell"><div className={styles.topicGrid}>
          <article><small className="eyebrow">Side enlargement</small><h2>Can a Side Extension Be Permitted Development?</h2><p>A Class A side extension is generally limited to one storey, a maximum height of 4 metres and a width no greater than half the width of the original house. Eaves and highway-facing elevation controls also apply. On article 2(3) land, an extension beyond a side wall is not Class A permitted development.</p><p>Corner plots need careful identification of the principal elevation and any side elevation fronting a highway. Joined or cumulative additions are assessed together. A two-storey side extension will commonly require planning permission.</p></article>
          <article><small className="eyebrow">More restrictive rights</small><h2>Can a Two-Storey Extension Be Permitted Development?</h2><p>Limited rights may exist for a qualifying extension of more than one storey beyond the rear wall, normally with a maximum 3-metre projection and at least 7 metres between the extension and the rear boundary. It cannot rely on Class A on article 2(3) land.</p><p>Matching materials, roof pitch, obscure-glazed non-opening side windows below 1.7 metres and prior approval relating to neighbour amenity, external appearance and light to neighbouring premises may apply. These controls mean most two-storey proposals should be reviewed individually rather than assumed lawful.</p></article>
          <article><small className="eyebrow">Combined forms</small><h2>Do Wraparound Extensions Need Planning Permission?</h2><p>A joined side-and-rear enlargement is considered as a whole. Both side and rear restrictions can apply, including cumulative width, projection, roof form, principal-elevation controls and previous joined additions.</p><p>Apparently compliant pieces do not necessarily create a compliant wraparound extension when combined. Many require a householder planning application, especially on designated land.</p></article>
          <article><small className="eyebrow">Separate permitted class</small><h2>What About Front Extensions and Porches?</h2><p>An extension forward of the principal elevation, or a side elevation fronting a highway, will commonly require planning permission. Determining those elevations can be complex on corner plots.</p><p>A porch is assessed under its own Class D rules, not Class A: among other limits, the external ground area must not exceed 3 square metres, height must not exceed 3 metres, and no part may be within 2 metres of a highway boundary.</p></article>
        </div></div></section>

        <section className={`${styles.section} ${styles.cream}`}><div className="shell"><div className={styles.intro}><div><small className="eyebrow">Location and heritage</small><h2>Restrictions That Can Change the Route</h2></div><p>National designation, heritage status, local directions and the property’s own planning history must be checked alongside the dimensions.</p></div>
          <div className={styles.restrictions}>
            <article><h3>Do the Rules Change in Conservation Areas?</h3><p>On article 2(3) land—conservation areas, National Landscapes (formerly Areas of Outstanding Natural Beauty), National Parks, the Broads and World Heritage Sites—some Class A rights are narrower. Not every alteration automatically needs permission, and there is no separate general “conservation-area consent” for extensions.</p></article>
            <article><h3>Can I Extend a Listed Building Under Permitted Development?</h3><p>Planning permission and listed-building consent are separate regimes. Consent may be required for works affecting special architectural or historic interest even where planning permission is granted nationally. Unauthorised listed-building work can be a criminal offence, so specialist advice should be sought early.</p></article>
            <article><h3>How Can an Article 4 Direction Affect an Extension?</h3><p>A direction can withdraw specified rights in a defined area or category. It does not necessarily prohibit the work; it makes an application necessary where one otherwise would not be. Directions vary and many concern works other than extensions, so check the council’s actual record.</p></article>
            <article><h3>Can a Planning Condition Remove Permitted Development Rights?</h3><p>Yes. New-housing permissions sometimes remove defined Part 1 rights. Conditions must be read precisely, earlier approvals may change the lawful baseline, and previous extensions can use the available allowance. Demolition and rebuilding are not necessarily treated as a simple extension.</p></article>
          </div>
        </div></section>

        <section className={styles.section}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Formal planning certainty</small><h2>Should I Apply for a Lawful Development Certificate?</h2></div><div><p className={styles.lead}>A proposed Lawful Development Certificate under section 192 can formally confirm that accurately described works would be lawful for planning purposes.</p><p>It is not planning permission: the authority decides legal facts, not design merit. Anyone may apply, and the certificate should be granted when the relevant legal tests are satisfied. Precise plans, dimensions and evidence are essential.</p><p>A certificate offers greater certainty before construction and can be useful during a sale or remortgage. It does not remove Building Regulations, listed-building consent or other requirements. See the wider <Link href="/knowledge-centre/planning-permission">Planning Permission guide</Link>.</p></div></div></section>

        <section className={`${styles.section} ${styles.orange}`}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Design beyond the envelope</small><h2>When Should You Apply for Planning Permission?</h2></div><div><p className={styles.lead}>A planning application can be the better route when the permitted envelope produces a compromised design.</p><p>Apply where limits are exceeded or rights are unavailable, and consider applying for two-storey side, wraparound or front extensions, unusual roof forms, sensitive designated sites and neighbour-sensitive proposals. A well-reasoned application may achieve a more coherent architectural result than designing solely around permitted-development geometry.</p></div></div></section>

        <section className={styles.section}><div className={`shell ${styles.split}`}><div><small className="eyebrow">A common misconception</small><h2>Does the 45-Degree Rule Decide Whether an Extension Is Allowed?</h2></div><div><p className={styles.lead}>No. It is commonly a local planning-assessment guideline for daylight, outlook and neighbour impact—not a universal statutory Class A rule.</p><p>Local methods vary, and a line on a plan is not an automatic approval or refusal. Orientation, separation distance, levels, window type, room use, massing and the local guidance all affect the assessment.</p></div></div></section>

        <section className={`${styles.section} ${styles.dark}`}><div className="shell"><div className={styles.intro}><div><small className="eyebrow">Avoidable errors</small><h2>Why Might an Extension Not Qualify as Permitted Development?</h2></div><p>Most failures come from treating one headline dimension as the complete test.</p></div><div className={styles.failGrid}>{[
          ["Wrong baseline", "Measuring from a later wall instead of the original house can understate the projection."],
          ["Previous development", "Earlier permitted or approved extensions and outbuildings can affect projection, joined enlargements and site coverage."],
          ["Height and boundaries", "Overall height may comply while the eaves fail, particularly within 2 metres of a boundary."],
          ["Appearance and position", "Dissimilar materials, a forward projection or a highway-facing side elevation can take work outside Class A."],
          ["Ineligible rights", "Flats, removed rights, excluded change-of-use dwellings and designated land cannot be treated as ordinary houses."],
          ["Procedure and evidence", "Premature work, inaccurate drawings or a missed prior-approval condition can undermine the intended route."],
        ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className={styles.section}><div className="shell"><div className={styles.intro}><div><small className="eyebrow">Householder application</small><h2>What Happens If Planning Permission Is Required?</h2></div><p>The normal sequence moves from evidence to design, a valid submission and an assessed decision. Statutory targets are not guarantees and do not include every preparation or validation delay.</p></div><ol className={styles.process}>{["Measured survey","Planning-history review","Design development","Drawings and supporting information","Submission and validation","Consultation","Officer assessment","Decision","Conditions, where applicable"].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol><Link className={styles.textLink} href="/knowledge-centre/planning-permission">Read the complete planning process <ArrowRight size={16} /></Link></div></section>

        <section className={`${styles.section} ${styles.cream}`}><div className="shell"><div className={styles.intro}><div><small className="eyebrow">Illustrative, not guaranteed</small><h2>Four Worked Scenarios</h2></div><p>Each example is an initial route hypothesis. The property record and final drawings must still be reviewed.</p></div><div className={styles.scenarios}>{scenarios.map((scenario, index) => <article key={scenario.title}><span>Scenario {index + 1}</span><h3>{scenario.title}</h3><dl><div><dt>Likely route</dt><dd>{scenario.route}</dd></div><div><dt>Key checks</dt><dd>{scenario.checks}</dd></div><div><dt>Likely documents</dt><dd>{scenario.documents}</dd></div><div><dt>Main risks</dt><dd>{scenario.risks}</dd></div></dl></article>)}</div></div></section>

        <section className={styles.section}><div className="shell"><div className={styles.intro}><div><small className="eyebrow">Initial screening only</small><h2>A Practical Decision Guide</h2></div><p>This sequence cannot confirm lawfulness, but it identifies when a detailed review is especially important.</p></div><div className={styles.decision}><article><h3>You are more likely to need a planning application where:</h3><ul>{["The property is not a house","Work extends forward of the principal elevation","The proposal is two storeys at the side","Any dimension exceeds a permitted limit","The house is listed","Rights have been removed","The site has additional restrictions","Previous extensions affect the allowance"].map((item) => <li key={item}>{item}</li>)}</ul></article><article><h3>You may potentially use permitted development where:</h3><ul>{["The building is a qualifying dwellinghouse","Every Class A limitation and condition is met","The relevant rights remain intact","Prior approval is completed where required","The proposal is precisely and accurately documented"].map((item) => <li key={item}>{item}</li>)}</ul></article></div><p className={styles.warning}>Do not start work on this screening alone. Confirm the property-specific planning position and all separate consents first.</p></div></section>

        {projects.length > 0 && <section className={`${styles.section} ${styles.projects}`}><div className="shell"><div className={styles.intro}><div><small className="eyebrow">Built work</small><h2>Extension Projects in Practice</h2></div><Link className={styles.textLink} href="/projects">View all projects <ArrowRight size={16} /></Link></div><div className={styles.projectGrid}>{projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><div><Image src={projectImageUrl(project.featuredImage, 900)} alt={projectImageAlt(project)} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><small>{project.projectType || project.category}</small><h3>{project.title}</h3><p>{project.location}</p></Link>)}</div></div></section>}

        <section className={`${styles.section} ${styles.download}`}><div className={`shell ${styles.downloadGrid}`}><div className={styles.guideCover}><Image src="/images/house-extension-guide-cover.png" alt="Hepburn Architects House Extension Guide cover" width={1055} height={1491} sizes="(max-width: 700px) 64vw, 320px" /></div><div><small className="eyebrow">Free homeowner guide</small><h2>Plan the Whole Extension, Not Only the Application</h2><p>Download our House Extension Guide for practical advice on design, planning, costs, technical approvals and the route to construction.</p><Link className="btn primary" href="/house-extension-guide">Get the House Extension Guide <ArrowRight size={17} /></Link></div></div></section>

        <nav className={styles.related} aria-label="Related extension guides"><div className="shell"><strong>Continue planning your extension</strong><Link href="/knowledge-centre/house-extensions">Complete House Extensions Guide</Link><Link href="/knowledge-centre/house-extension-costs">House Extension Costs</Link><Link href="/knowledge-centre/house-extension-timeline">House Extension Timeline</Link><Link href="/knowledge-centre/house-extension-ideas">House Extension Design Ideas</Link></div></nav>

        <section className={styles.section}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Common questions</small><h2>Extension Planning Permission FAQs</h2></div><div className={styles.faqs}>{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div></div></section>

        <section className={styles.sources}><div className="shell"><small className="eyebrow">Authoritative references</small><h2>Official Sources</h2><ul>{sources.map(([title, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{title}<ExternalLink size={16} /></a></li>)}</ul><p>Last reviewed: {reviewedDate}. This article is general guidance on the planning system in England, not property-specific legal advice. Planning rules differ in Wales, Scotland and Northern Ireland, and legislation and local controls can change.</p></div></section>

        <section className={`${styles.section} ${styles.finalCta}`}><div className={`shell ${styles.split}`}><div><small className="eyebrow">Property-specific advice</small><h2>Unsure Which Planning Route Applies?</h2></div><div><p>An early review of the property, planning history and proposed dimensions can establish whether permitted development may apply or whether a planning application would offer a safer or better route.</p><div className="actions"><a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer">Discuss Your Extension</a><Link className="btn secondary" href="/estimate">Estimate Professional Fees</Link></div><p className={styles.serviceLinks}>Explore our <Link href="/services/house-extensions">house-extension service</Link> or <Link href="/services/planning-applications">planning-application service</Link>.</p></div></div></section>
      </main>
    </>
  );
}
