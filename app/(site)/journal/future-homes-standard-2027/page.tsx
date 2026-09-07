import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { buildGraph } from "@/lib/structured-data";
import { site } from "@/lib/site";
import styles from "../house-extension-planning-permission-birmingham-2026-guide/page.module.css";

const title = "Future Homes Standard 2027: What New-Build Homeowners and Developers Need to Design for Now";
const description = "Building a new home? Understand England’s Future Homes Standard 2027 dates, heat pumps, solar panels, ventilation and the design decisions to make now.";
const url = `${site.url}/journal/future-homes-standard-2027`;
const date = "2026-09-07";
const sources = {
  circular: "https://www.gov.uk/government/publications/the-future-homes-and-buildings-standards-building-circular-012026/the-future-homes-and-buildings-standards-building-circular-012026-letter",
  legislation: "https://www.legislation.gov.uk/uksi/2026/335/pdfs/uksi_20260335_en.pdf",
  response: "https://assets.publishing.service.gov.uk/media/69c13592bb0dfe55b83e4b85/Future_Homes_and_Buildings_Standards_Consultation_Response.pdf",
  partL: "https://assets.publishing.service.gov.uk/media/69c122a6cfa346b9d4704a55/ADL1_2026.pdf",
  partF: "https://assets.publishing.service.gov.uk/media/69c12224d588c92c483e4b6a/ADF1_2026.pdf",
  partO: "https://www.gov.uk/government/publications/overheating-approved-document-o",
  statement: "https://questions-statements.parliament.uk/written-statements/detail/2026-03-24/hcws1445",
};
const faqs = [
  { question: "Does planning permission before March 2027 protect my project?", answer: "Planning permission alone does not secure the Future Homes Standard transitional arrangements. The ordinary non-higher-risk route depends on the relevant building control submission before 24 March 2027 and qualifying commencement of the individual building before 24 March 2028. Existing transitional cases need separate checking." },
  { question: "Does every new house need the same heat pump?", answer: "No. The standard is performance based. Low-carbon heating must be designed around the particular home; heat pumps and suitable heat networks are important options. Our advice is to establish the heating strategy before fixing room layouts and external plant positions." },
  { question: "Does the Future Homes Standard apply to an ordinary house extension?", answer: "An extension follows the relevant provisions for work to an existing dwelling, rather than automatically following the complete newly erected dwelling package. Conversions also need their own assessment. Relevant changes to services, ventilation and handover may still affect the work." },
  { question: "Will a compliant home have no energy bills?", answer: "Compliance is not a guarantee of zero bills. Occupancy, tariffs, weather, equipment selection and operation affect actual expenditure. Ask for project-specific running-cost assumptions rather than relying on a generic saving." },
];

export const metadata: Metadata = {
  title: { absolute: "Future Homes Standard 2027: Design Guide | Hepburn Architects" },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article", publishedTime: date, modifiedTime: date, authors: [`${site.url}/about`] },
  twitter: { card: "summary", title, description },
};

export default function FutureHomesStandardArticle() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BlogPosting", "@id": `${url}#article`, headline: title, description, mainEntityOfPage: url, datePublished: date, dateModified: date, author: { "@id": `${site.url}/#david-hepburn` }, publisher: { "@id": `${site.url}/#organization` }, articleSection: "Building Regulations", inLanguage: "en-GB" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` }, { "@type": "ListItem", position: 2, name: "Journal", item: `${site.url}/journal` }, { "@type": "ListItem", position: 3, name: "Future Homes Standard 2027", item: url }] },
      { "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
    ],
  };
  return <>
    <StructuredData data={buildGraph(schema)} />
    <article className={`section ${styles.article}`}>
      <div className="shell article-page">
        <nav aria-label="Breadcrumb" className="muted small-copy"><Link href="/">Home</Link> · <Link href="/journal">Journal</Link></nav>
        <small className="eyebrow"><Newspaper size={14} /> New homes · Building Regulations</small>
        <h1>{title}</h1>
        <p className="lead">A well-designed new home brings its architecture and energy strategy together from the first sketch. With the Future Homes Standard taking effect from March 2027, now is the time to decide how heating, solar generation, ventilation and summer comfort will fit your project.</p>
        <p className={styles.byline}>Published 7 September 2026 · By <Link href="/about">David Hepburn</Link> · Applies to England</p>
        <div className={styles.body}>
          <aside className={styles.question}><strong>The key date: 24 March 2027</strong><span>The government published the final package in March 2026. Most new building work moves to the new requirements from 24 March 2027, subject to transitional provisions. This is a confirmed timetable, rather than the earlier proposal for a 2025 introduction. <a href={sources.circular}>Read the government circular.</a></span></aside>
          <p>For a self-builder, replacement-home client or small developer, our recommendation is to test the energy strategy while the design is still flexible. A plant cupboard, a rooflight or a bedroom window can all become part of that conversation. Waiting until tender to resolve those decisions leaves fewer options.</p>
          <nav className={styles.contents} aria-label="Article contents"><small>In this guide</small><ol>
            <li><a href="#dates">Dates and transitional rules</a></li><li><a href="#standard">What the standard changes</a></li><li><a href="#heating">Heating and internal space</a></li><li><a href="#solar">Solar and roof design</a></li><li><a href="#fabric">Fabric and ventilation</a></li><li><a href="#overheating">Summer comfort</a></li><li><a href="#delivery">Budget, evidence and handover</a></li><li><a href="#checklist">Your design checklist</a></li>
          </ol></nav>

          <section id="dates"><h2>When does the Future Homes Standard apply?</h2>
            <p>For ordinary work outside the higher-risk building regime, the main transitional route requires both a building notice, initial notice or full-plans building control application before <strong>24 March 2027</strong>, and qualifying commencement on that individual building before <strong>24 March 2028</strong>. A planning application or permission is not the specified submission.</p>
            <p>The commencement test refers to Building Regulations regulation 46A(2)–(5). Do not assume site clearance or digging a trench satisfies it. Separate provisions apply to higher-risk building work, with relevant changes taking effect on <strong>24 September 2027</strong>. Some older transitional cases also need individual review. <a href={sources.legislation}>See regulations 1 and 5–9 of the 2026 amending regulations.</a></p>
            <p><strong>Our advice for phased developments:</strong> prepare a building-by-building schedule showing the applicable standard, submission evidence and intended construction milestone. Ask the building control body to confirm the approach before relying on it in the programme or land appraisal.</p>
          </section>

          <section id="standard"><h2>What is changing for new homes?</h2>
            <p>The government describes the standard as combining low-carbon heating, high energy efficiency and on-site renewable electricity in most new homes. It expects average carbon emissions to be at least 75% lower than homes built to the 2013 standards. That comparison concerns operational performance; it is not a promise of a 75% reduction in bills or a whole-life carbon assessment. <a href={sources.statement}>Read the ministerial statement.</a></p>
            <p>There is a new Part L3 requirement for on-site renewable electricity generation, subject to defined limits on application. The package also updates Part L and dwelling ventilation guidance, and introduces regulation 40C on the format of information supplied to new dwelling owners. <a href={sources.circular}>See the official summary of changes.</a></p>
            <p>Our design approach is to treat these elements as one coordinated brief. A house should be attractive, comfortable and straightforward to maintain as well as demonstrating compliance.</p>
          </section>

          <section id="heating"><h2>1. Give the heating strategy a place in the plan</h2>
            <p>The government retains a performance-based approach, with heat pumps and suitable low-carbon heat networks important routes. It also states that conventional boilers are unlikely to feature in new buildings under the revised guidance. <a href={sources.response}>See the consultation response, chapters 5, 8 and 11.</a></p>
            <p>For an individual new home, we recommend discussing the following with the heating designer before the planning layout is fixed:</p>
            <ul><li>The outdoor unit position, where relevant, including airflow, neighbour relationships, acoustic assessment and maintenance access.</li><li>Space for the proposed hot-water cylinder or other storage arrangement, with room to service and eventually replace it.</li><li>Room-by-room heat loss, the intended flow temperature and the choice of emitters.</li><li>Pipe routes, insulation, controls and the electrical supply.</li></ul>
            <p>Ask the specialist to compare the proposed radiator or underfloor-heating arrangement against the actual room loads. Our preference is to resolve those choices before kitchen joinery, utility storage and furniture layouts become fixed.</p>
          </section>

          <section id="solar"><h2>2. Design the roof and solar provision together</h2>
            <p>Approved Document L gives a dwellinghouse benchmark based on output equivalent to panels at 0.22 kWp/m² over 40% of ground-floor area, with specified orientation, pitch and shading assumptions. It also provides an alternative based on reasonably practicable roof area. This is not a blanket instruction to cover 40% of every roof. Buildings containing flats have separate guidance. <a href={sources.partL}>See paragraphs 5.68–5.78.</a></p>
            <p>Our recommendation is to draw a preliminary panel arrangement alongside the roof plan. Coordinate rooflights, dormers, valleys, vents, trees and access for maintenance before choosing the final roof composition.</p>
            <p>Ask the installer or energy assessor to record the expected output and the reasoning behind the proposed arrangement. For a small housing scheme, we would also review how repeated house types work on differently orientated plots.</p>
            <p>Keep battery storage as a separate briefing and cost decision. Discuss its proposed location, safe installation, controls and future replacement with the specialist rather than assuming the solar layout answers those questions.</p>
          </section>

          <section id="fabric"><h2>3. Coordinate fabric performance and ventilation</h2>
            <p>Our advice is to appoint the energy assessor during concept design and agree a fabric strategy before locking in wall thicknesses, window sizes and floor levels. Ask for the intended insulation continuity and airtightness line to be drawn through the awkward junctions: thresholds, eaves, intermediate floors and service penetrations.</p>
            <p>The published response provides for SAP 10.3 and a transition towards the Home Energy Model. It does not require every project to use HEM immediately. Confirm the approved method and software available for your submission with the assessor. <a href={sources.response}>See chapter 12 of the government response.</a></p>
            <p>Ventilation needs to match the airtightness strategy. The 2026 Approved Document F includes natural ventilation guidance for less airtight dwellings, continuous mechanical extract and mechanical ventilation with heat recovery. MVHR is not the only compliance route. <a href={sources.partF}>See Table 1.6 and the system-specific guidance.</a></p>
            <p>We recommend reserving routes for ducts and positions for terminals and equipment before agreeing ceiling heights and structural zones. Ask how filters will be reached, how noise will be controlled and who will commission the system. Put those answers on the coordinated drawings.</p>
          </section>

          <section id="overheating"><h2>4. Test summer comfort before fixing the glazing</h2>
            <p>Overheating is already addressed by Part O for new residential buildings within its scope. Its guidance covers limiting unwanted solar gains and removing excess heat, with attention to practical constraints such as noise and security. <a href={sources.partO}>See Approved Document O.</a></p>
            <p>Our recommendation is to assess large glazed areas and exposed bedrooms early. Compare window proportions, opening arrangements and external shading while there is still room to change the elevations.</p>
            <p>A useful briefing question is: how will this bedroom remain comfortable on a warm night when the occupant wants privacy and security? Ask the design team to test a realistic operating arrangement, including any restrictions on opening windows. Resolve the result with the architectural design before the planning submission.</p>
            <figure className={styles.hero}><Image src="/images/architectural-expertise-home.webp" alt="Illustrative contemporary house with a glazed gable, brick and render elevations" width={1200} height={1499} sizes="(max-width: 760px) 100vw, 820px" style={{ maxHeight: 470, objectPosition: "center 45%" }} /><figcaption>Illustrative residential design: glazing, orientation and shading should be reviewed together. This image does not demonstrate Future Homes Standard compliance.</figcaption></figure>
          </section>

          <section id="delivery"><h2>5. Budget for a coordinated, usable home</h2>
            <p>We would avoid adding an unexplained percentage to the construction budget and calling it a Future Homes Standard allowance. Ask for a project-specific comparison covering the heating and hot-water package, electrical infrastructure, solar installation, ventilation, fabric specification, assessment, testing and commissioning.</p>
            <p>At tender, require contractors to identify exclusions and proposed substitutions. Ask the relevant designer or assessor to review changes before they are ordered. A lower-priced product should be assessed against the agreed design and performance brief.</p>
            <p>For handover, agree who will assemble the test records, commissioning information, operating instructions and maintenance contacts. The updated guidance addresses commissioning, heat-pump installation and the Home User Guide. <a href={sources.circular}>See the circular’s revised-guidance summary.</a></p>
            <p>Our recommendation is to include a practical demonstration for the homeowner: heating controls, hot water, ventilation settings and solar monitoring. Give occupants information they can use in daily life, supported by the detailed records for future servicing.</p>
          </section>

          <section id="checklist" className={styles.printChecklist}><h2>What to agree with your architect now</h2><ul>
            <li><strong>Brief and feasibility:</strong> applicable regulations, programme, specialist appointments and an initial energy strategy.</li>
            <li><strong>Concept design:</strong> plant space, roof and solar arrangement, glazing, shading and ventilation routes.</li>
            <li><strong>Planning coordination:</strong> external equipment, roof appearance and any relevant local requirements or conditions.</li>
            <li><strong>Technical design:</strong> coordinated fabric details, services design, energy assessment and overheating assessment.</li>
            <li><strong>Tender and construction:</strong> a clear specification, responsibilities for inspections and evidence, and a process for reviewing substitutions.</li>
            <li><strong>Handover:</strong> commissioning records, accessible operating information and an explanation of the installed systems.</li>
          </ul><p>These are our recommended project checkpoints. The appointments and specialist input should be agreed for the particular scheme.</p></section>

          <section className={styles.faq}><h2>Frequently asked questions</h2>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}<p>For extension and conversion scope, see <a href={sources.partL}>Approved Document L, section 0 and sections 10–11</a>. For transitional cases, use the legislation linked above.</p></section>

          <section><h2>Planning a new home or small development?</h2><p>Hepburn Architects can help develop the architectural brief, assess the site, prepare the planning design and coordinate the technical package with the appointed specialists. We recommend beginning with the site, your priorities and a realistic delivery programme.</p><p>Explore our <Link href="/services/new-build-homes">new-build home design service</Link>, <Link href="/services/building-regulations">Building Regulations service</Link> or <Link href="/development-potential-appraisal">development potential appraisal</Link>.</p><div className={styles.feeCta}><div><small>Discuss your project</small><h3>Bring your design and energy strategy together.</h3><p>Tell us about your plot, proposed home or development scheme.</p></div><Link href="/contact" className="btn">Contact Hepburn Architects</Link></div></section>

          <section className={styles.resources}><h2>Official sources and scope</h2><p>Checked 7 September 2026. This article concerns England and focuses on newly built homes. It summarises the published position and distinguishes it from our design recommendations; project-specific compliance and transitional eligibility require assessment.</p><ul>
            <li><a href={sources.legislation}>Building Regulations etc. (Amendment) (England) Regulations 2026, SI 335</a></li>
            <li><a href={sources.circular}>MHCLG Building Circular 01/2026</a></li>
            <li><a href={sources.response}>Final Future Homes and Buildings Standards consultation response</a></li>
            <li><a href={sources.partL}>Approved Document L, Volume 1, 2026 edition</a></li>
            <li><a href={sources.partF}>Approved Document F, Volume 1, 2026 edition</a></li>
            <li><a href={sources.partO}>Approved Document O: overheating</a></li>
            <li><a href={sources.statement}>Ministerial statement, 24 March 2026</a></li>
          </ul></section>
        </div>
      </div>
    </article>
  </>;
}
