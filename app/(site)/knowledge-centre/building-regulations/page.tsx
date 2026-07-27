import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  getProjects,
  projectImageAlt,
  projectImageUrl,
  type Project,
} from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "../planning-permission/page.module.css";

export const metadata: Metadata = {
  title: "Building Regulations Explained | Residential Technical Design Guide",
  description:
    "A practical guide to Building Regulations in England, including approvals, drawings, structure, fire safety, insulation, ventilation, drainage and technical design.",
  alternates: {
    canonical:
      "https://www.hepburnarchitects.net/knowledge-centre/building-regulations",
  },
  openGraph: {
    title:
      "Building Regulations Explained | Residential Technical Design Guide",
    description:
      "A practical guide to Building Regulations approvals, technical drawings and residential construction standards in England.",
    url: "/knowledge-centre/building-regulations",
    type: "article",
    images: [
      {
        url: "/images/architectural-expertise-home.webp",
        alt: "Residential technical design by Hepburn Architects",
      },
    ],
  },
};

const contents = [
  ["what-are-building-regulations", "What are Building Regulations?"],
  ["planning-versus-building-regulations", "Planning and Building Regulations"],
  ["when-they-apply", "When Building Regulations apply"],
  ["approval-routes", "Approval routes"],
  ["full-plans-building-notice", "Full plans or building notice"],
  ["technical-package", "The technical design package"],
  ["approved-documents", "Approved Documents"],
  ["structure", "Structure and foundations"],
  ["fire-safety", "Fire safety"],
  ["energy", "Energy efficiency"],
  ["ventilation", "Ventilation and overheating"],
  ["drainage", "Drainage and services"],
  ["stairs-access", "Stairs, guarding and access"],
  ["glazing-electrics", "Glazing and electrical safety"],
  ["building-control-process", "The Building Control process"],
  ["inspections", "Site inspections"],
  ["completion", "Completion certificates"],
  ["unauthorised-work", "Existing unauthorised work"],
  ["project-types", "Common project considerations"],
  ["mistakes", "Common mistakes"],
  ["technical-support", "Technical design support"],
  ["faqs", "Building Regulations FAQs"],
] as const;

const planningItems = [
  "Principle of development",
  "Appearance and scale",
  "Neighbour impact",
  "Land use",
  "Local planning policy",
] as const;

const buildingItems = [
  "Structure and fire safety",
  "Energy efficiency and ventilation",
  "Drainage and sanitation",
  "Access, stairs, guarding and glazing",
  "Electrical safety and construction standards",
] as const;

const commonWork = [
  {
    title: "House extensions",
    body: "New floorspace, foundations, structure, thermal performance, ventilation, drainage, glazing and fire safety commonly require coordinated assessment.",
  },
  {
    title: "Loft conversions",
    body: "Structure, stairs, headroom, protected escape routes, alarms, insulation, ventilation and the existing roof and floors are central considerations.",
  },
  {
    title: "Garage conversions",
    body: "The floor, walls, roof, moisture resistance, insulation, ventilation, fire separation and any structural changes may need to be addressed.",
  },
  {
    title: "Structural wall removal and new openings",
    body: "The load path, temporary works and permanent support require competent structural design and coordination with the surrounding construction.",
  },
  {
    title: "New and replacement homes",
    body: "The whole building must be coordinated across structure, fire, energy, ventilation, drainage, access, overheating, services and other applicable requirements.",
  },
  {
    title: "HMOs and flat conversions",
    body: "Changes of use and subdivision can trigger extensive fire, sound, ventilation, access, thermal and drainage requirements alongside other housing and licensing duties.",
  },
  {
    title: "Commercial-to-residential and barn conversions",
    body: "A material change of use can bring existing fabric, fire separation, energy, ventilation, structure, moisture, access and services within scope.",
  },
  {
    title: "Drainage alterations",
    body: "New or changed foul and surface-water systems, connections, build-over situations and work close to foundations may require technical approval and separate agreements.",
  },
  {
    title: "Replacement windows and installations",
    body: "Some replacement windows, electrical work, heating systems and other installations are controlled work, although an authorised competent person scheme may provide the compliance route.",
  },
] as const;

const approvalRoutes = [
  {
    title: "Local authority Building Control",
    body: "For ordinary domestic and small residential work, the local authority can act as the building control body, assess the application and arrange inspections.",
  },
  {
    title: "Registered building control approver",
    body: "For eligible non-higher-risk work, a private registered building control approver can act as the building control body and give an initial notice to the local authority. “Approved inspector” is older terminology and should not be used for new appointments.",
  },
  {
    title: "Full plans",
    body: "Plans, specifications and supporting information are assessed before or alongside the start of work, creating a formal record of the proposed compliance approach.",
  },
  {
    title: "Building notice",
    body: "A building notice is generally intended for smaller, simpler work. It provides less design information for advance assessment and is not available for every project or circumstance.",
  },
  {
    title: "Regularisation",
    body: "A local authority may consider eligible unauthorised work completed after the relevant historic date. Opening-up and remedial work may be required, and a certificate is not automatic.",
  },
  {
    title: "Competent person schemes",
    body: "Registered installers can self-certify specified work, such as certain electrical, glazing or heating installations, and notify the authority through their authorised scheme.",
  },
] as const;

const technicalPackage = [
  "Existing and proposed plans",
  "Sections and elevations where needed",
  "Construction build-ups",
  "Insulation and thermal information",
  "Structural openings, foundations and roof construction",
  "Floor construction",
  "Fire-safety measures",
  "Ventilation strategy",
  "Foul and surface-water drainage",
  "Glazing and safety glazing",
  "Stairs, guarding and accessibility",
  "Electrical safety notes",
  "Coordination with structural calculations",
] as const;

const approvedDocuments = [
  ["Part A", "Structure"],
  ["Part B", "Fire safety"],
  ["Part C", "Site preparation and resistance to contaminants and moisture"],
  ["Part E", "Resistance to sound"],
  ["Part F", "Ventilation"],
  ["Part G", "Sanitation, hot water safety and water efficiency"],
  ["Part H", "Drainage and waste disposal"],
  ["Part J", "Combustion appliances and fuel storage systems"],
  ["Part K", "Protection from falling, collision and impact"],
  ["Part L", "Conservation of fuel and power"],
  ["Part M", "Access to and use of buildings"],
  ["Part O", "Overheating"],
  ["Part P", "Electrical safety"],
  ["Part Q", "Security"],
  ["Part R", "Electronic communications infrastructure"],
  ["Part S", "Infrastructure for charging electric vehicles"],
] as const;

const process = [
  ["Confirm the scope of work", "Identify controlled work, exemptions, the building type and the appropriate approval route."],
  ["Prepare survey information", "Record the existing building accurately enough to coordinate the proposed construction."],
  ["Develop technical drawings", "Set out the design, build-ups and compliance strategy at a proportionate level of detail."],
  ["Coordinate structural information", "Integrate the engineer’s calculations and details with the architectural package."],
  ["Submit the application", "Provide the selected building control body with the required application information."],
  ["Respond to technical comments", "Clarify or revise the design where the reviewer identifies missing information or concerns."],
  ["Give the correct notices", "Before and during construction, submit the commencement and other notifications required for the chosen route."],
  ["Arrange inspections", "Notify Building Control at the project-specific stages they ask to inspect."],
  ["Resolve site queries", "Review proposed changes before work is concealed or departs from the accepted design."],
  ["Obtain completion documentation", "Arrange the final inspection and supply certificates, declarations and other required evidence."],
] as const;

const inspectionStages = [
  "Commencement",
  "Excavations",
  "Foundations",
  "Damp-proof course",
  "Drainage",
  "Structural work",
  "Insulation",
  "Fire-safety measures",
  "Roof construction",
  "Completion",
] as const;

const projectConsiderations = [
  {
    title: "House extensions",
    body: "Foundations, structure, existing openings, insulation, glazing, ventilation, drainage and the relationship with the original house need to work as one technical proposal.",
  },
  {
    title: "Loft conversions",
    body: "Existing roof and floor structure, stair geometry, fire-protected escape, alarms, insulation, ventilation and junction detailing are usually decisive.",
  },
  {
    title: "Garage conversions",
    body: "The existing slab, damp resistance, wall and roof performance, fire separation, ventilation, services and openings should be assessed rather than assumed.",
  },
  {
    title: "New homes",
    body: "A coordinated whole-building strategy is needed for structure, fire, energy, overheating, ventilation, water, drainage, access, security and services.",
  },
  {
    title: "HMOs",
    body: "Building Regulations overlap with—but do not replace—HMO licensing, housing standards and fire-risk duties. Occupancy and layout affect the technical strategy.",
  },
  {
    title: "Flat conversions",
    body: "Compartmentation, sound insulation, escape, smoke detection, ventilation, drainage, access and service penetrations require careful coordination.",
  },
  {
    title: "Barn conversions",
    body: "The existing structure, ground conditions, moisture, thermal upgrading, ventilation, ecology-related constraints and new services can make the technical design unusually interdependent.",
  },
  {
    title: "Commercial-to-residential conversions",
    body: "The material change of use may require the retained building to meet specified requirements for fire, sound, ventilation, energy, access and sanitation.",
  },
] as const;

const mistakes = [
  "Confusing planning approval with Building Regulations approval",
  "Starting controlled work without the correct application or notice",
  "Relying on planning drawings as construction information",
  "Failing to coordinate structural calculations with the architectural design",
  "Changing the design on site without technical review",
  "Covering foundations, structure, insulation or drainage before inspection",
  "Omitting a coordinated ventilation strategy",
  "Underestimating fire-safety requirements",
  "Ignoring drainage routes, levels or third-party agreements",
  "Failing to arrange the final inspection and completion certificate",
  "Assuming builder experience replaces competent technical design",
] as const;

const technicalSupport = [
  "Measured surveys",
  "Technical plans, sections and construction details",
  "Building Regulations applications",
  "Coordination with structural engineers",
  "Fire and ventilation strategy coordination",
  "Drainage layouts",
  "Extension and loft-conversion packages",
  "HMO and residential conversion technical design",
  "Responses to Building Control comments",
] as const;

const relatedResources = [
  {
    title: "The Complete Guide to Loft Conversions",
    description: "Headroom, stairs, fire safety, structure and technical design for habitable loft projects.",
    href: "/knowledge-centre/loft-conversions",
  },
  {
    title: "Planning Permission Explained",
    description: "Understand the planning routes and constraints that precede technical design.",
    href: "/knowledge-centre/planning-permission",
  },
  {
    title: "Planning a House Extension",
    description: "A practical guide to the full extension journey.",
    href: "/house-extension-guide",
  },
  {
    title: "New Build Homes",
    description: "Planning and technical support for individual homes and small developments.",
    href: "/services/new-build-homes",
  },
  {
    title: "HMOs and Conversions",
    description: "Planning, space standards and fire-safety coordination for HMO projects.",
    href: "/services/hmo-conversions",
  },
  {
    title: "Costs and Calculators",
    description: "Get an early indication of likely architectural fees.",
    href: "/estimate",
  },
  {
    title: "Projects",
    description: "Explore residential work developed through planning and technical stages.",
    href: "/projects",
  },
  {
    title: "Journal",
    description: "Read project news, technical insights and practice updates.",
    href: "/blog",
  },
] as const;

const faqs = [
  {
    question: "Do I need Building Regulations approval for an extension?",
    answer:
      "Most house extensions contain controlled building work and require an appropriate Building Control route. The exact requirements depend on the extension, existing building, construction and services. Planning permission, Party Wall procedures and drainage agreements are separate matters.",
  },
  {
    question: "Are planning permission and Building Regulations the same?",
    answer:
      "No. Planning considers whether development is acceptable in land-use and design terms. Building Regulations set legal requirements for design and construction, including structure, fire safety, energy, ventilation, drainage and access. A project may need one, both or neither formal application depending on the work.",
  },
  {
    question: "Do I need Building Regulations for a loft conversion?",
    answer:
      "A habitable loft conversion normally involves controlled work. Structure, stairs, protected escape, alarms, insulation, ventilation and other requirements need project-specific coordination. A simple boarding-out exercise is different from creating a room.",
  },
  {
    question: "Do I need approval to remove a loadbearing wall?",
    answer:
      "Removing or altering a loadbearing wall is controlled structural work. A competent structural design is commonly required for the permanent support, bearings and load path, and Building Control will normally need to be notified through the appropriate route.",
  },
  {
    question: "Can I use planning drawings for Building Regulations?",
    answer:
      "Planning drawings rarely contain enough technical information. They focus on appearance and planning impacts, whereas a Building Regulations package needs construction build-ups and coordinated information about structure, fire, energy, ventilation, drainage and other applicable requirements.",
  },
  {
    question: "What is a full plans application?",
    answer:
      "A full plans application provides drawings and supporting information for assessment by the building control body. It creates a formal review record before or during the early construction stage, but approval does not remove the need to build compliantly and arrange inspections.",
  },
  {
    question: "What is a building notice?",
    answer:
      "A building notice is a less detailed submission route generally intended for smaller work. There is no equivalent advance approval of detailed plans, so more issues may need resolution during construction. It is not available for every project or situation.",
  },
  {
    question: "Who checks Building Regulations work?",
    answer:
      "For ordinary non-higher-risk work in England, the building control body is usually the local authority or a registered building control approver. Registered building inspectors advise building control bodies by assessing plans and inspecting work. The Building Safety Regulator is the building control authority for higher-risk building work.",
  },
  {
    question: "Do I need a structural engineer?",
    answer:
      "Many extensions, loft conversions, wall removals and conversions need structural calculations and details. Whether an engineer is required depends on the proposed work, existing construction, ground conditions and structural complexity.",
  },
  {
    question: "What happens if Building Control finds a problem?",
    answer:
      "The design or construction may need clarification, additional evidence, opening-up or remedial work. The client, designers and contractors should coordinate an acceptable solution before affected work is concealed or progressed.",
  },
  {
    question: "Can I sell a house without a completion certificate?",
    answer:
      "A sale may still be possible, but missing completion documentation can prompt solicitor, lender and buyer questions. The appropriate response depends on the work, records and legal circumstances; retrospective Building Control or legal advice may be needed.",
  },
  {
    question: "Can unauthorised work be regularised?",
    answer:
      "Eligible historic work may be considered by a local authority through regularisation. Opening-up and remedial work may be required to demonstrate compliance, and approval is not guaranteed. Planning enforcement and other consents remain separate.",
  },
  {
    question: "Does a Building Control inspection guarantee workmanship?",
    answer:
      "No. Building Control uses proportionate plan assessment and risk-based inspections; it does not act as a clerk of works or inspect every detail. Inspections and certificates do not replace the legal responsibilities of clients, designers and contractors or a suitable quality-control process.",
  },
  {
    question: "Who is responsible for compliance?",
    answer:
      "Responsibility is shared through statutory dutyholder roles. Clients must make suitable arrangements and appoint competent people; designers must take reasonable steps to produce compliant designs; contractors must carry out compliant work. Building Control independently assesses and inspects but does not take over those duties.",
  },
] as const;

const officialSources = [
  {
    label: "GOV.UK: Building Regulations approval and application routes",
    href: "https://www.gov.uk/building-regulations-approval/how-to-apply",
  },
  {
    label: "GOV.UK: Approved Documents collection",
    href: "https://www.gov.uk/government/collections/approved-documents",
  },
  {
    label: "GOV.UK: Building Regulations dutyholder guidance",
    href: "https://www.gov.uk/guidance/design-and-building-work-meeting-building-requirements",
  },
  {
    label: "GOV.UK: Competent person schemes",
    href: "https://www.gov.uk/building-regulations-approval/use-a-competent-person-scheme",
  },
] as const;

const projectGroups = [
  ["extension"],
  ["loft", "roof"],
  ["new build", "new-build", "passive", "passivhaus"],
  ["hmo", "flat", "conversion", "remodelling"],
  ["replacement"],
  ["barn", "rural"],
] as const;

function projectSearchText(project: Project) {
  return [
    project.title,
    project.category,
    project.projectType,
    project.description,
    ...(project.services || []),
  ]
    .join(" ")
    .toLowerCase();
}

function selectTechnicalProjects(projects: Project[]) {
  const selected: Project[] = [];

  projectGroups.forEach((terms) => {
    const match = projects.find(
      (project) =>
        !selected.some((item) => item.slug === project.slug) &&
        terms.some((term) => projectSearchText(project).includes(term)),
    );
    if (match) selected.push(match);
  });

  for (const project of projects) {
    if (selected.length >= 6) break;
    if (!selected.some((item) => item.slug === project.slug)) selected.push(project);
  }

  return selected.slice(0, 6);
}

export default async function BuildingRegulationsPage() {
  const projects = selectTechnicalProjects(await getProjects());

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Knowledge Centre",
        item: `${site.url}/knowledge-centre`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Building Regulations Explained",
        item: `${site.url}/knowledge-centre/building-regulations`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      {[breadcrumbSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <header className={styles.hero}>
        <div className="shell">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/knowledge-centre">Knowledge Centre</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Building Regulations Explained</span>
          </nav>
          <small className="eyebrow">Knowledge Centre · Technical design</small>
          <h1>Building Regulations Explained</h1>
          <div className={styles.heroIntro}>
            <p>
              Building Regulations set minimum standards for the design and
              construction of buildings. They are separate from planning permission
              and cover matters such as structure, fire safety, insulation,
              ventilation, drainage, glazing and electrical safety.
            </p>
            <div className={styles.reviewed}>
              <span>General guidance for England</span>
              <span>Last reviewed 27 July 2026</span>
            </div>
          </div>
          <div className={`actions ${styles.heroActions}`}>
            <a
              className="btn primary"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarDays size={18} /> Discuss Your Project
            </a>
            <Link className="btn secondary" href="/services/building-regulations">
              Building Regulations Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </header>

      <div className={`shell ${styles.pageLayout}`}>
        <aside className={styles.toc}>
          <small>On this page</small>
          <nav aria-label="Page contents">
            {contents.map(([id, label], index) => (
              <a href={`#${id}`} key={id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <main className={styles.article}>
          <section id="what-are-building-regulations">
            <small className="eyebrow">Technical standards</small>
            <h2>What are Building Regulations?</h2>
            <p className={styles.lead}>
              Building Regulations are legal requirements for building work in
              England. They establish minimum standards for health, safety, welfare,
              accessibility, energy and other aspects of design and construction.
            </p>
            <p>
              They apply to many extensions, conversions, structural alterations,
              material changes of use and new buildings. Compliance depends on the
              specific work and property. Building Control approval does not remove
              the need for planning permission, listed building consent, Party Wall
              procedures, drainage agreements, licences or private consents.
            </p>
          </section>

          <section id="planning-versus-building-regulations">
            <small className="eyebrow">Important distinction</small>
            <h2>Planning permission and Building Regulations are different</h2>
            <div className={styles.projectTypeList}>
              <article>
                <h3>Planning permission</h3>
                <ul>
                  {planningItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article>
                <h3>Building Regulations</h3>
                <ul>
                  {buildingItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
            <p>
              A planning approval does not confirm that the construction complies
              with Building Regulations, and Building Control approval does not
              establish that planning permission exists.
            </p>
            <Link
              className={styles.textLink}
              href="/knowledge-centre/planning-permission"
            >
              Read Planning Permission Explained <ArrowRight size={17} />
            </Link>
          </section>

          <section id="when-they-apply">
            <small className="eyebrow">Common controlled work</small>
            <h2>When do Building Regulations apply?</h2>
            <p className={styles.lead}>
              The answer depends on the work, existing building, use and any
              applicable exemptions or self-certification route. These examples
              identify common issues rather than giving a project-specific decision.
            </p>
            <div className={styles.projectTypeList}>
              {commonWork.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <Link className={styles.textLink} href="/knowledge-centre/house-extensions">
              Read The Complete Guide to House Extensions <ArrowRight size={17} />
            </Link>
          </section>

          <section id="approval-routes">
            <small className="eyebrow">Current England process</small>
            <h2>How Building Regulations approval works</h2>
            <p>
              The correct building control body and application route depend on the
              building and work. Higher-risk building work follows a separate
              Building Safety Regulator process; the routes below describe the
              ordinary domestic and small residential context.
            </p>
            <div className={styles.routeIndex}>
              {approvalRoutes.map((route, index) => (
                <article key={route.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{route.title}</h3>
                    <p>{route.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="full-plans-building-notice">
            <small className="eyebrow">Application choice</small>
            <h2>Full plans application or building notice?</h2>
            <div className={styles.projectTypeList}>
              <article>
                <h3>Full plans</h3>
                <p>
                  Technical drawings and supporting information are submitted for
                  assessment. This route is suited to more complex work, creates a
                  formal review record and may reduce uncertainty before key
                  construction decisions are made.
                </p>
              </article>
              <article>
                <h3>Building notice</h3>
                <p>
                  Less information is provided at submission, which may suit simpler
                  eligible work but leaves greater risk of technical issues being
                  resolved during construction. It is not available for every
                  project type.
                </p>
              </article>
            </div>
            <div className={styles.distinction}>
              <strong>Neither route guarantees compliance.</strong>
              <p>
                The design must be suitable and the work must be constructed
                correctly. Inspections and approvals do not transfer the
                dutyholders’ responsibilities to Building Control.
              </p>
            </div>
          </section>

          <section id="technical-package">
            <small className="eyebrow">Coordinated information</small>
            <h2>What is included in a Building Regulations drawing package?</h2>
            <p>
              The package should explain how the design is intended to satisfy the
              requirements relevant to the project. Typical architectural and
              coordinated information may include:
            </p>
            <ul className={styles.checklist}>
              {technicalPackage.map((item) => (
                <li key={item}><Check aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <p>
              Structural calculations, energy assessments, fire engineering,
              acoustic testing, overheating analysis or other consultant information
              may also be needed. Their scope is project-specific.
            </p>
          </section>

          <section id="approved-documents">
            <small className="eyebrow">Compliance guidance</small>
            <h2>What are the Approved Documents?</h2>
            <p>
              Approved Documents give statutory guidance on ways to meet the
              functional requirements of the Building Regulations. They provide
              common approaches, not a substitute for competent design or the only
              possible route to compliance.
            </p>
            <div className={styles.definitionList}>
              {approvedDocuments.map(([part, title]) => (
                <div key={part}>
                  <h3>{part}</h3>
                  <p>{title}</p>
                </div>
              ))}
            </div>
            <a
              className={styles.officialLink}
              href="https://www.gov.uk/government/collections/approved-documents"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the official GOV.UK Approved Documents collection
              <ExternalLink size={16} aria-hidden="true" />
              <span className={styles.srOnly}>(opens in a new tab)</span>
            </a>
          </section>

          <section id="structure">
            <small className="eyebrow">Approved Document A</small>
            <h2>Structure and foundations</h2>
            <p>
              Foundations must suit the ground, building loads and influences such
              as nearby trees, drains and adjacent structures. Existing foundations
              and walls may need assessment where new work relies on them.
            </p>
            <p>
              Structural openings can require beams, posts or frames designed around
              a clear load path, stability, bearings and movement. Calculations are
              commonly prepared by a structural engineer and coordinated with the
              architectural design. Party Wall matters can arise separately and are
              not decided through Building Control.
            </p>
          </section>

          <section id="fire-safety">
            <small className="eyebrow">Approved Document B</small>
            <h2>Fire safety</h2>
            <p>
              Residential technical design can involve means of escape,
              fire-resisting construction, protected routes, alarms, fire doors,
              compartmentation, cavity barriers, separation between uses and—where
              relevant—access and facilities for the fire service.
            </p>
            <p>
              HMOs and flat conversions can require additional coordination because
              Building Regulations sit alongside HMO licensing, housing legislation,
              the Fire Safety Order where applicable and fire-risk duties. Approval
              under one regime does not satisfy the others.
            </p>
          </section>

          <section id="energy">
            <small className="eyebrow">Approved Document L</small>
            <h2>Energy efficiency and thermal performance</h2>
            <p>
              Walls, roofs, floors, windows and doors must achieve suitable thermal
              performance. Junctions, thermal bridging and air leakage can be as
              important as the headline insulation specification.
            </p>
            <p>
              Extensions can affect the existing dwelling, especially where large
              areas of glazing are proposed. Additional assessment or compensating
              measures may be needed, and heating systems and controls may require
              upgrading. Part L requirements change over time, so current guidance
              must be used.
            </p>
          </section>

          <section id="ventilation">
            <small className="eyebrow">Approved Documents F and O</small>
            <h2>Ventilation and overheating</h2>
            <p>
              A ventilation strategy can combine background ventilation, local
              extract and whole-dwelling provision. Greater airtightness makes the
              coordination of indoor air quality and moisture control particularly
              important.
            </p>
            <p>
              Large glazing areas and solar gain can increase overheating risk.
              Orientation, shading, openable areas and natural or mechanical
              ventilation should be considered together. Mechanical ventilation
              with heat recovery may be appropriate for some projects, but it
              requires careful design, installation and commissioning.
            </p>
          </section>

          <section id="drainage">
            <small className="eyebrow">Approved Document H</small>
            <h2>Drainage and below-ground services</h2>
            <p>
              Technical information may need to identify foul and surface-water
              routes, connection points, gradients, inspection chambers, soakaways
              and the relationship between drainage and foundations.
            </p>
            <p>
              Building over or close to a public sewer can require a separate
              agreement with the water authority. Surface-water disposal, highway
              connections and other drainage approvals may also sit outside the
              Building Control application.
            </p>
          </section>

          <section id="stairs-access">
            <small className="eyebrow">Approved Documents K and M</small>
            <h2>Stairs, guarding and accessibility</h2>
            <p>
              Stair geometry, headroom, landings, handrails and guarding must be
              developed as part of the spatial and structural design. Access to new
              rooms and the wider accessibility of the building may also be relevant.
            </p>
            <p>
              Loft conversions are particularly constrained because the stair must
              fit within the existing house while coordinating headroom, structure,
              circulation and the fire-safety strategy.
            </p>
          </section>

          <section id="glazing-electrics">
            <small className="eyebrow">Safety and services</small>
            <h2>Glazing and electrical safety</h2>
            <p>
              Glazing design can involve safety glass, guarding, thermal performance,
              ventilation openings and the risk of collision or falling. Large or
              low-level panes may need more than a standard window specification.
            </p>
            <p>
              Part P applies to electrical safety in dwellings. Certain work can be
              self-certified by an installer registered with an authorised competent
              person scheme; other work follows the appropriate Building Control
              route. Electrical layouts should coordinate with structure, fire,
              ventilation and the architectural design.
            </p>
          </section>

          <section id="building-control-process">
            <small className="eyebrow">From survey to completion</small>
            <h2>What happens during Building Control approval?</h2>
            <ol className={styles.process}>
              {process.map(([title, body], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
            <div className={styles.distinction}>
              <strong>Inspection is not site supervision.</strong>
              <p>
                Building Control inspections are proportionate checks at selected
                stages. They do not replace the contractor’s responsibility for
                compliant construction or the project’s own quality-control and
                contract-administration arrangements.
              </p>
            </div>
          </section>

          <section id="inspections">
            <small className="eyebrow">Construction stages</small>
            <h2>What does Building Control inspect?</h2>
            <p>
              The required inspection plan depends on the work and risks. Common
              notification or inspection stages can include:
            </p>
            <ul className={styles.checklist}>
              {inspectionStages.map((item) => (
                <li key={item}><Check aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <p>
              The building control body should confirm the stages for the particular
              project. Work should not be concealed before a required inspection.
            </p>
          </section>

          <section id="completion">
            <small className="eyebrow">Project records</small>
            <h2>Why the completion certificate matters</h2>
            <p>
              A completion certificate records that the building control body has
              completed its process and, having taken reasonable steps, is satisfied
              about compliance. Solicitors, buyers and lenders may request it during
              a sale or refinancing.
            </p>
            <p>
              The certificate does not guarantee every aspect of workmanship or
              confirm that every concealed detail was inspected. Missing final
              inspections, declarations, test certificates or other information can
              delay its issue and create future difficulties.
            </p>
          </section>

          <section id="unauthorised-work">
            <small className="eyebrow">Retrospective position</small>
            <h2>What if work was completed without approval?</h2>
            <p>
              A local-authority regularisation application may be possible for
              eligible historic work. The authority may require evidence, opening-up
              and remedial construction before it can determine whether a
              regularisation certificate should be issued.
            </p>
            <p>
              Approval is not automatic. Planning enforcement, lease or covenant
              issues and other consents are separate. Legal or specialist advice may
              be appropriate where records are incomplete or liabilities are unclear.
            </p>
          </section>

          <section id="project-types">
            <small className="eyebrow">Residential applications</small>
            <h2>Common residential project considerations</h2>
            <div className={styles.projectTypeList}>
              {projectConsiderations.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="mistakes">
            <small className="eyebrow">Technical risk checklist</small>
            <h2>Common Building Regulations mistakes to avoid</h2>
            <ul className={styles.checklist}>
              {mistakes.map((item) => (
                <li key={item}><Check aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </section>

          <section id="technical-support">
            <small className="eyebrow">Professional support</small>
            <h2>Technical design support from Hepburn Architects</h2>
            <p>
              Hepburn Architects can develop approved concepts into coordinated
              technical information for residential Building Regulations
              applications. The practice can assist with:
            </p>
            <ul className={styles.serviceList}>
              {technicalSupport.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>
              Site project management and continuous site supervision are not
              included unless a separate construction-stage service is expressly
              agreed.
            </p>
            <Link className="btn primary" href="/services/building-regulations">
              View Building Regulations Services <ArrowRight size={18} />
            </Link>
          </section>
        </main>
      </div>

      {projects.length > 0 && (
        <section className={styles.projects}>
          <div className="shell">
            <div className={styles.sectionHeading}>
              <small className="eyebrow">Selected work</small>
              <h2>Projects requiring coordinated technical design</h2>
              <p>
                Residential projects selected dynamically across extensions, new
                homes and conversions.
              </p>
            </div>
            <div className={styles.projectGrid}>
              {projects.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <div className={styles.projectImage}>
                    <Image
                      src={projectImageUrl(project.featuredImage, 1100)}
                      alt={projectImageAlt(project)}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    />
                  </div>
                  <small>{project.location} · {project.projectType}</small>
                  <h3>{project.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.related}>
        <div className="shell">
          <div className={styles.sectionHeading}>
            <small className="eyebrow">Related Knowledge Centre resources</small>
            <h2>Continue your research</h2>
          </div>
          <div className={styles.relatedList}>
            {relatedResources.map((resource, index) => (
              <Link href={resource.href} key={resource.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{resource.title}</h3><p>{resource.description}</p></div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className={styles.faqs}>
        <div className={`shell ${styles.faqLayout}`}>
          <div>
            <small className="eyebrow">Questions and answers</small>
            <h2>Building Regulations FAQs</h2>
            <p>
              General answers for residential work in England. A specific project
              still requires an appropriate technical and approval review.
            </p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sources}>
        <div className={`shell ${styles.sourcesInner}`}>
          <div>
            <small className="eyebrow">Primary references</small>
            <h2>Official Building Regulations guidance</h2>
            <p>
              These official sources were reviewed when preparing this guide.
              Regulations and guidance change, so use the current source for any
              project-specific decision.
            </p>
          </div>
          <ul>
            {officialSources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.label}
                  <ExternalLink size={15} aria-hidden="true" />
                  <span className={styles.srOnly}>(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className={styles.disclaimer}>
        <div className="shell">
          <strong>Important note</strong>
          <p>
            This page provides general Building Regulations guidance for England and
            is not a substitute for advice based on a specific property, proposal,
            construction method or approval route. Regulations and official guidance
            can change.
          </p>
        </div>
      </aside>

      <section className={styles.finalCta}>
        <div className={`shell ${styles.finalCtaInner}`}>
          <small className="eyebrow">Discuss the technical stage</small>
          <h2>Need help with the technical stage?</h2>
          <p>
            Book a free 30-minute consultation to discuss your project, Building
            Regulations requirements and the most sensible next steps.
          </p>
          <a
            className="btn primary"
            href={site.calendly}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarDays size={18} /> Book a Free Consultation
          </a>
        </div>
      </section>
    </>
  );
}
