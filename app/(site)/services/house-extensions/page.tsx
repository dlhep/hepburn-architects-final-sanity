import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
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
import styles from "../../knowledge-centre/planning-permission/page.module.css";
import { RelevantReview } from "@/components/reviews/RelevantReview";
import { StructuredData } from "@/components/StructuredData";
import { buildGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "House Extension Architects Birmingham & West Midlands",
  description:
    "Architect-led house extension design, planning applications and Building Regulations drawings across Birmingham and the West Midlands. Discuss your project with Hepburn Architects.",
  alternates: {
    canonical: "https://hepburnarchitects.co.uk/services/house-extensions",
  },
  openGraph: {
    title: "House Extension Architects Birmingham & West Midlands",
    description:
      "Architect-led house extension design, planning applications and Building Regulations drawings across Birmingham and the West Midlands.",
    url: "/services/house-extensions",
    type: "website",
    images: [
      {
        url: "/images/architectural-expertise-home.webp",
        alt: "House extension design by Hepburn Architects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "House Extension Architects Birmingham & West Midlands | Hepburn Architects",
    description: "Planning-led house extension design and technical support across Birmingham and the West Midlands.",
    images: ["/images/architectural-expertise-home.webp"],
  },
};

const contents = [
  ["planning-an-extension", "Planning an extension"],
  ["why-hepburn", "Why Hepburn Architects"],
  ["extension-types", "Types of house extension"],
  ["planning-permission", "Planning permission"],
  ["permitted-development", "Permitted development"],
  ["larger-home-extension", "Larger home extension prior approval"],
  ["special-constraints", "Special planning constraints"],
  ["design-principles", "Extension design principles"],
  ["natural-light", "Natural light and glazing"],
  ["open-plan", "Open-plan design"],
  ["roof-options", "Roof options"],
  ["materials", "Materials and appearance"],
  ["structure", "Structure and foundations"],
  ["building-regulations", "Building Regulations"],
  ["drainage-services", "Drainage and utilities"],
  ["party-wall", "Party Wall matters"],
  ["costs", "Extension costs"],
  ["timescales", "Extension timescales"],
  ["our-process", "Our process"],
  ["design-process", "The design process"],
  ["choosing-an-architect", "Choosing an architect"],
  ["mistakes", "Common mistakes"],
  ["questions", "Questions before drawings"],
  ["extension-support", "House extension support"],
  ["faqs", "House extension FAQs"],
] as const;

const extensionTypes = [
  {
    title: "Rear extensions",
    body: "Often used for a kitchen, dining or family space with a stronger garden connection. Depth, neighbour impact, roof form, glazing and the effect on daylight to rooms behind the extension all need testing.",
  },
  {
    title: "Side extensions",
    body: "A side addition can enlarge a kitchen, create utility space or reorganise circulation. Boundary relationships, side access, drainage, street views and roof form can constrain the design.",
  },
  {
    title: "Wraparound extensions",
    body: "Combining rear and side development can enable substantial internal reorganisation. The larger footprint and structural openings can bring greater planning, drainage, daylight and cost implications.",
  },
  {
    title: "Double-storey extensions",
    body: "A carefully proportioned addition can create bedrooms or bathrooms above a more generous ground-floor plan. Massing, roof integration, overlooking and neighbouring outlook need particular care.",
  },
  {
    title: "Kitchen extensions",
    body: "A kitchen extension should improve the way the whole home works, not simply add floor area. Daylight, garden connection, storage, servicing and the relationship to dining and family space all matter.",
  },
  {
    title: "Open-plan extensions",
    body: "Open-plan living can bring light and flexibility, but successful layouts still need considered zoning, acoustic separation, structure, ventilation and places for everyday storage.",
  },
  {
    title: "Contemporary extensions",
    body: "A contemporary addition can sit confidently beside an older home through proportion, material quality and a clear architectural relationship rather than novelty for its own sake.",
  },
  {
    title: "Traditional extensions",
    body: "A traditional approach can use established forms, materials and details to make an addition feel settled within its street and the character of the existing house.",
  },
] as const;

const extensionTypeLinks: Record<string, { guide?: { href: string; label: string }; project?: { href: string; label: string } }> = {
  "Rear extensions": { guide: { href: "/knowledge-centre/house-extension-ideas", label: "Extension design ideas" }, project: { href: "/projects", label: "View extension projects" } },
  "Side extensions": { guide: { href: "/knowledge-centre/extension-planning-permission", label: "Extension planning guidance" }, project: { href: "/projects", label: "View residential projects" } },
  "Wraparound extensions": { guide: { href: "/knowledge-centre/house-extension-costs", label: "Extension cost guidance" }, project: { href: "/projects", label: "View extension projects" } },
  "Double-storey extensions": { guide: { href: "/knowledge-centre/extension-planning-permission", label: "Planning permission guidance" }, project: { href: "/projects", label: "View extension projects" } },
  "Kitchen extensions": { guide: { href: "/knowledge-centre/house-extension-ideas", label: "Extension design ideas" }, project: { href: "/projects", label: "View extension projects" } },
  "Open-plan extensions": { guide: { href: "/knowledge-centre/house-extension-ideas", label: "Open-plan design ideas" }, project: { href: "/projects", label: "View extension projects" } },
  "Contemporary extensions": { guide: { href: "/knowledge-centre/house-extension-ideas", label: "Extension design ideas" }, project: { href: "/projects", label: "View extension projects" } },
  "Traditional extensions": { guide: { href: "/knowledge-centre/planning-permission", label: "Planning permission explained" }, project: { href: "/projects", label: "View residential projects" } },
};

const whyHepburn = [
  ["Director-led practice", "Direct involvement from David Hepburn through the early design and approval decisions."],
  ["RIBA Chartered Practice", "Professional standards and a clear, proportionate appointment for residential work."],
  ["ARB registered", "Architectural advice grounded in regulated professional practice."],
  ["Planning expertise", "Design and planning strategy developed together, with local constraints considered early."],
  ["Building Regulations expertise", "Technical information coordinated with structure, fire, thermal, drainage and ventilation requirements."],
  ["Clear communication", "Defined stages, written scopes and straightforward explanations of decisions and exclusions."],
  ["Local knowledge", "Experience of Birmingham, Solihull and the wider West Midlands context."],
  ["Tailored design", "Every extension starts with the existing home, the brief and the way the household lives."],
] as const;

const flagshipProcess = [
  ["Measured survey", "Understand the existing house, levels, openings, services and constraints."],
  ["Concept design", "Test layout, light, massing, materials and garden relationship."],
  ["Planning", "Confirm the appropriate route and prepare a clear, coordinated submission."],
  ["Building Regulations", "Develop the approved design into coordinated technical information."],
  ["Construction information", "Coordinate structure, details, specifications and the information needed to price the work."],
  ["Completed home", "Support the agreed process through construction queries, inspections and completion records."],
] as const;

const designChecklist = [
  "Solve weaknesses in the existing layout before adding floor area",
  "Create a clear route through the house without wasting circulation space",
  "Test furniture, storage and kitchen layouts at an early stage",
  "Bring useful daylight into the centre of the existing home",
  "Protect privacy and consider views towards neighbouring properties",
  "Retain garden space proportionate to the house and household",
  "Coordinate old and new construction, levels, services and materials",
  "Design around real routines rather than an abstract open-plan image",
] as const;

const costFactors = [
  "Location and contractor market",
  "Floor area, form and specification",
  "Foundations and structural openings",
  "Glazing, kitchens and bathrooms",
  "Site access, drainage and ground conditions",
  "Professional and authority fees",
  "VAT where applicable",
  "Risk allowance and contingency",
] as const;

const costChecklist = [
  "Construction budget",
  "Architect and other professional fees",
  "Measured, drainage and specialist surveys",
  "Structural engineering",
  "Planning and Building Control charges",
  "Specialist reports and tests",
  "Kitchen, sanitaryware and appliances",
  "Flooring, decoration and fitted finishes",
  "Landscaping and external works",
  "Furniture and window treatments",
  "Temporary accommodation where needed",
  "A proportionate contingency",
] as const;

const process = [
  ["Define the brief", "Identify the problems to solve, priorities, future needs and realistic budget."],
  ["Review the existing house", "Assess layout, character, levels, structure, daylight, services and garden relationships."],
  ["Check planning history and constraints", "Review the original house, earlier additions, designations, conditions and local policy."],
  ["Measure the property", "Prepare reliable survey information appropriate to the proposed work."],
  ["Test layout options", "Compare different footprints, internal arrangements, roof forms and degrees of intervention."],
  ["Develop the preferred design", "Coordinate space, appearance, materials, light, furniture and buildability."],
  ["Confirm the planning route", "Establish whether permitted development, prior approval, a certificate or an application is appropriate."],
  ["Prepare and submit an application where needed", "Produce consistent drawings and the supporting information required by the route."],
  ["Develop technical drawings", "Translate the approved design into coordinated construction information."],
  ["Coordinate structural design", "Integrate engineer calculations, openings, foundations and stability requirements."],
  ["Obtain Building Control approval", "Use the appropriate application route and respond to technical comments."],
  ["Select a contractor", "Price a defined package and check scope, programme, capability and exclusions."],
  ["Construct and inspect the work", "Arrange Building Control inspections and manage design queries through the agreed appointments."],
  ["Obtain completion documentation", "Close conditions, certificates and other records needed for the property file."],
] as const;

const mistakes = [
  "Designing before checking planning history and constraints",
  "Focusing on floor area rather than how the whole house will work",
  "Creating a dark or landlocked room behind the extension",
  "Removing too much storage or ignoring furniture layouts",
  "Underestimating structural openings and temporary works",
  "Relying on planning drawings as construction information",
  "Failing to coordinate drainage and below-ground services",
  "Assuming permitted development applies without checking",
  "Ignoring neighbour privacy, light and outlook",
  "Changing the design repeatedly during construction",
  "Leaving kitchens, finishes and external works outside the budget",
  "Starting before relevant pre-commencement conditions are discharged",
  "Covering controlled work before inspection",
  "Failing to obtain completion and installation certificates",
] as const;

const briefingQuestions = [
  "What problem are we trying to solve?",
  "How will the home be used in five years?",
  "Which rooms currently work poorly?",
  "How much can realistically be invested?",
  "Is the likely level of planning risk acceptable?",
  "Will temporary accommodation be needed?",
  "How important is retaining garden space?",
  "Which existing features should be retained?",
  "Is a larger extension genuinely necessary?",
  "What level of finish is expected?",
] as const;

const support = [
  "Measured surveys",
  "Feasibility studies",
  "Concept design",
  "Planning applications",
  "Permitted development reviews",
  "Lawful Development Certificates",
  "Building Regulations drawings",
  "Structural engineer coordination",
  "Technical design",
  "Planning statements",
  "Amendments and resubmissions",
] as const;

const relatedResources = [
  {
    title: "House Extension Design Ideas",
    description: "Explore practical architectural ideas for better daylight, storage, circulation and garden connection.",
    href: "/knowledge-centre/house-extension-ideas",
  },
  {
    title: "Planning Permission Explained",
    description: "Understand consent routes, permitted development and common residential planning constraints.",
    href: "/knowledge-centre/planning-permission",
  },
  {
    title: "Building Regulations Explained",
    description: "Review technical approvals, drawings, inspections and completion requirements.",
    href: "/knowledge-centre/building-regulations",
  },
  {
    title: "New Build Homes",
    description: "Explore feasibility, planning and technical design for new and replacement homes.",
    href: "/services/new-build-homes",
  },
  {
    title: "Loft Conversions",
    description: "Read about planning, stairs, structure and fire safety for loft projects.",
    href: "/services/loft-conversions",
  },
  {
    title: "Costs and Calculators",
    description: "Get an early indication of architectural fees for your project.",
    href: "/estimate",
  },
  {
    title: "Projects",
    description: "Browse residential extensions, remodelling, conversions and new homes.",
    href: "/projects",
  },
  {
    title: "Journal",
    description: "Read practice news, project stories and architectural guidance.",
    href: "/blog",
  },
] as const;

const faqs = [
  {
    question: "Do I need planning permission for a house extension?",
    answer: "Some extensions require householder planning permission, while others may benefit from permitted development rights or a prior approval route. The answer depends on the property, original house, planning history, dimensions, design, location and any restrictions affecting the site.",
  },
  {
    question: "Can I build an extension under permitted development?",
    answer: "Potentially, if the property benefits from the relevant rights and the complete proposal meets every applicable limitation and condition. Earlier extensions, designated land, Article 4 directions and planning conditions can alter the position. A Lawful Development Certificate can provide formal confirmation.",
  },
  {
    question: "How large can a house extension be?",
    answer: "There is no single answer. Planning policy, permitted development rules, plot size, neighbouring amenity, design, garden retention, structure and budget all matter. The maximum technically possible footprint may not produce the best home or an acceptable proposal.",
  },
  {
    question: "What is the larger home extension prior approval process?",
    answer: "It is a permitted development procedure for qualifying larger single-storey rear extensions. The local planning authority follows a prescribed notification process and consults adjoining neighbours on specified amenity effects. It is not full planning permission and approval is not automatic.",
  },
  {
    question: "Do I need Building Regulations approval?",
    answer: "Most conventional house extensions contain controlled building work. Structure, fire safety, thermal performance, ventilation, drainage, glazing, electrics and other applicable requirements need to be addressed through the correct Building Control route.",
  },
  {
    question: "Can I build over a drain?",
    answer: "It depends on the drain, ownership, position, depth, condition and the water authority's requirements. A build-over agreement or revised design may be required. Drainage should be investigated before foundations and internal layouts are fixed.",
  },
  {
    question: "Do I need a structural engineer?",
    answer: "Many extensions require structural calculations for foundations, beams, posts, frames, roof members or stability. The need and scope depend on the existing house, proposed openings, ground conditions and construction.",
  },
  {
    question: "Do I need a Party Wall agreement?",
    answer: "The Party Wall etc. Act may apply to work on a shared wall, certain boundary work or excavation near neighbouring foundations. It is separate from planning and Building Regulations. A party wall surveyor or solicitor can advise on a specific legal position.",
  },
  {
    question: "How much does a house extension cost?",
    answer: "Cost depends on location, area, form, structure, glazing, specification, access, ground conditions, services, professional fees, tax and market conditions. A project-specific cost plan is more reliable than a universal rate per square metre.",
  },
  {
    question: "How long does a house extension take?",
    answer: "The overall programme includes briefing, survey, design, planning review, technical coordination, Building Control, pricing and construction. Complexity, authority response times, consultant information, contractor availability and client changes can all affect it.",
  },
  {
    question: "Should an extension match the existing house?",
    answer: "Not necessarily. A carefully matched addition or a clearly contemporary design can both be appropriate. The right response depends on the building's character, materials, junctions, setting and planning context.",
  },
  {
    question: "Will an extension make the existing house darker?",
    answer: "It can if the extension moves the external wall away from rooms behind it without a coordinated daylight strategy. Rooflights, ceiling height, internal glazing, orientation and layout can help, but simply adding more glass is not always the best answer.",
  },
  {
    question: "Can I live in the house during construction?",
    answer: "Sometimes, but disruption depends on the scope, loss of kitchen or bathroom facilities, dust, noise, temporary security and service interruptions. The contractor's sequence and household circumstances should inform the decision.",
  },
  {
    question: "Can I extend a listed building?",
    answer: "An extension may be possible, but listed building consent is separate from planning permission and work affecting special architectural or historic interest requires careful justification and detailing. Internal alterations may also need consent.",
  },
  {
    question: "Do I need an architect for an extension?",
    answer: "An architect is not legally required for every extension. Professional design input can nevertheless improve the brief, layout, planning strategy, technical coordination and quality, particularly where the site or proposal is complex.",
  },
  {
    question: "Can I change an approved extension design?",
    answer: "A change may require agreement during determination, a non-material amendment, another planning application or revised Building Control information. The correct route depends on the consent and scale of change, so it should be checked before work proceeds.",
  },
  {
    question: "Does planning permission increase property value?",
    answer: "Permission may improve a property's development potential, but value depends on demand, design, build cost, conditions, remaining validity and the wider market. Planning approval is not a valuation or a guarantee of financial return.",
  },
  {
    question: "What happens if an extension was built without approval?",
    answer: "The planning and Building Regulations positions must be considered separately. Evidence, a retrospective planning route, regularisation, opening-up or remedial work may be needed, and approval is not guaranteed. Legal and technical advice may be appropriate.",
  },
] as const;

const officialSources = [
  {
    label: "GOV.UK: Permitted development rights for householders — technical guidance",
    href: "https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance/permitted-development-rights-for-householders-technical-guidance",
  },
  {
    label: "GOV.UK: When planning permission is required",
    href: "https://www.gov.uk/guidance/when-is-permission-required",
  },
  {
    label: "Planning Portal: Extensions guidance for England",
    href: "https://www.planningportal.co.uk/permission/common-projects/extensions/mini-guide/",
  },
  {
    label: "GOV.UK: Building Regulations approval",
    href: "https://www.gov.uk/building-regulations-approval",
  },
  {
    label: "GOV.UK: Approved Documents",
    href: "https://www.gov.uk/government/collections/approved-documents",
  },
] as const;

const projectGroups = [
  ["rear extension", "extension"],
  ["side extension", "side return"],
  ["wraparound", "wrap-around"],
  ["two storey", "two-storey"],
  ["loft", "dormer"],
  ["renovation", "remodelling"],
] as const;

function projectSearchText(project: Project) {
  return [
    project.title,
    project.category,
    project.projectType,
    project.description,
    ...(project.services || []),
  ].join(" ").toLowerCase();
}

function selectExtensionProjects(projects: Project[]) {
  const extensionProjects = projects.filter((project) => {
    const text = projectSearchText(project);
    return ["extension", "loft", "dormer", "remodelling", "renovation"].some((term) =>
      text.includes(term),
    );
  });
  const selected: Project[] = [];
  projectGroups.forEach((terms) => {
    const match = extensionProjects.find(
      (project) =>
        !selected.some((item) => item.slug === project.slug) &&
        terms.some((term) => projectSearchText(project).includes(term)),
    );
    if (match) selected.push(match);
  });
  for (const project of extensionProjects) {
    if (selected.length >= 6) break;
    if (!selected.some((item) => item.slug === project.slug)) selected.push(project);
  }
  return selected.slice(0, 6);
}

export default async function HouseExtensionsPage() {
  const projects = selectExtensionProjects(await getProjects());
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${site.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "House Extensions",
        item: `${site.url}/services/house-extensions`,
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
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "House extension architectural services",
    serviceType: "House extension architecture, planning and Building Regulations",
    description: "Planning-led house extension design and technical support for homes across Birmingham and the West Midlands.",
    provider: { "@id": `${site.url}/#organisation` },
    areaServed: ["Birmingham", "Solihull", "Sutton Coldfield", "Wolverhampton", "Walsall", "Leamington Spa", "West Midlands"],
    url: `${site.url}/services/house-extensions`,
  };

  return (
    <>
      <div className="shell" style={{ paddingTop: "1rem" }}>
        <Link className={styles.textLink} href="/locations/birmingham-architects">
          Residential architects in Birmingham <ArrowRight size={15} />
        </Link>
      </div>
      <StructuredData data={buildGraph(breadcrumbSchema, faqSchema, serviceSchema)} />

      <header className={styles.hero}>
        <div className="shell">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">House Extensions</span>
          </nav>
          <small className="eyebrow">House extension architectural services</small>
          <h1>House Extension Architects in Birmingham and the West Midlands</h1>
          <div className={styles.heroIntro}>
            <p>
              A well-designed house extension can transform how a home works, create
              valuable additional space and improve the connection between existing
              rooms and the garden. This guide explains the main extension types,
              approvals, design decisions, costs, timescales and technical
              considerations.
            </p>
            <div className={styles.reviewed}>
              <span>General guidance for England</span>
              <span>Last reviewed 27 July 2026</span>
            </div>
          </div>
          <div className={`actions ${styles.heroActions}`}>
            <Link className="btn primary" href="/contact">Discuss Your Project <ArrowRight size={18} /></Link>
            <Link className="btn secondary" href="/estimate">Get an Indicative Fee <ArrowRight size={18} /></Link>
            <Link className="btn secondary" href="/house-extension-guide">
              Download Extension Guide <ArrowRight size={18} />
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
          <section id="planning-an-extension">
            <small className="eyebrow">Start with the whole home</small>
            <h2>Planning an extension properly from the start</h2>
            <p className={styles.lead}>
              A successful extension depends on more than simply adding floor area.
              It begins with understanding how the existing home works and identifying
              the real problem the project needs to solve.
            </p>
            <p>
              Planning constraints, structure, drainage, budget, natural light,
              circulation and the relationship between old and new should be
              considered together. An oversized addition can leave poor internal
              rooms, reduce the garden and cost more without improving daily life.
              The strongest answer may be smaller, better planned and more carefully
              integrated than the first idea.
            </p>
          </section>

          <section id="why-hepburn">
            <small className="eyebrow">The practice</small>
            <h2>Why work with Hepburn Architects?</h2>
            <p className={styles.lead}>A house extension is both an architectural project and a sequence of practical decisions. Our role is to bring design quality, planning judgement and technical clarity together around the existing home.</p>
            <div className={styles.whyGrid}>{whyHepburn.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
          </section>

          <section id="extension-types">
            <small className="eyebrow">Choosing the form</small>
            <h2>What type of house extension is right for your home?</h2>
            <div className={styles.projectTypeList}>
              {extensionTypes.map((item) => {
                const links = extensionTypeLinks[item.title];
                return <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p><div className={styles.typeLinks}>{links?.guide ? <Link href={links.guide.href}>{links.guide.label} <ArrowRight size={14} /></Link> : null}{links?.project ? <Link href={links.project.href}>{links.project.label} <ArrowRight size={14} /></Link> : null}</div></article>;
              })}
            </div>
            <h3>Single-storey versus two-storey extension</h3>
            <div className={styles.projectTypeList}>
              <article>
                <h3>Single-storey</h3>
                <p>Usually simpler structurally and often less planning-sensitive, but foundations, large openings, roofs and glazing still affect cost and programme. It typically improves ground-floor living space and garden connection.</p>
                <ul><li>Lower mass and neighbour impact</li><li>Roof and daylight design remain critical</li><li>Space gained on one level</li></ul>
              </article>
              <article>
                <h3>Two-storey</h3>
                <p>Can gain more space from a similar footprint, but generally brings greater structural complexity, roof integration and planning sensitivity around massing, overlooking and neighbouring amenity.</p>
                <ul><li>More floor area for the footprint</li><li>Greater structural and programme complexity</li><li>Higher planning and neighbour sensitivity</li></ul>
              </article>
            </div>
          </section>

          <section id="planning-permission">
            <small className="eyebrow">Consent strategy</small>
            <h2>Do I need planning permission for a house extension?</h2>
            <p>
              The main possibilities are permitted development, a householder
              planning application or another application route where the property
              or proposal requires it. The route depends on property type, the
              original house, previous extensions, size, height, boundary distances,
              materials, roof form, location, designated land, planning conditions
              and Article 4 directions.
            </p>
            <p>No property-specific conclusion should be drawn without checking the complete proposal and planning history.</p>
            <Link className={styles.textLink} href="/knowledge-centre/extension-planning-permission">
              Check Whether Your Extension Needs Planning Permission <ArrowRight size={17} />
            </Link>
            <Link className={styles.textLink} href="/services/planning-applications">
              Explore planning application services <ArrowRight size={17} />
            </Link>
          </section>

          <section id="permitted-development">
            <small className="eyebrow">National planning permission</small>
            <h2>Can an extension be built under permitted development?</h2>
            <p>
              Permitted development is a national grant of planning permission
              subject to detailed limitations and conditions. Rights can be removed
              by an Article 4 direction or a planning condition, and flats do not
              generally benefit from ordinary householder permitted development
              rights. Previous additions can affect the remaining allowance.
            </p>
            <div className={styles.distinction}>
              <strong>Permitted development is a legal test, not a design label.</strong>
              <p>
                Every relevant limitation and condition must be satisfied. A proposed
                Lawful Development Certificate can provide formal evidence of the
                planning position, but Building Regulations and other consents remain
                separate.
              </p>
            </div>
            <a
              className={styles.textLink}
              href="https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance/permitted-development-rights-for-householders-technical-guidance"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the official householder permitted development guidance
              <ExternalLink size={16} aria-hidden="true" />
              <span className={styles.srOnly}>(opens in a new tab)</span>
            </a>
          </section>

          <section id="larger-home-extension">
            <small className="eyebrow">Prior approval</small>
            <h2>What is the larger home extension prior approval process?</h2>
            <p>
              This is a specific permitted development procedure for qualifying
              larger single-storey rear extensions. It is not the same as a full
              planning application. The local planning authority notifies adjoining
              neighbours and considers the specified amenity matters through the
              statutory process.
            </p>
            <p>
              It only applies where all qualifying circumstances and permitted
              development conditions are met. Approval is not automatic, procedural
              timing matters and work should not begin until the statutory route
              permits it to do so.
            </p>
          </section>

          <section id="special-constraints">
            <small className="eyebrow">Property and place</small>
            <h2>Special planning constraints</h2>
            <div className={styles.routeIndex}>
              <article><span>01</span><div><h3>Conservation areas</h3><p>Some householder rights are more restricted on designated land, and character, materials and views can carry additional weight. Conservation-area status does not mean every extension automatically needs permission.</p></div></article>
              <article><span>02</span><div><h3>Listed buildings</h3><p>Listed building consent is separate from planning permission and can apply to internal as well as external changes affecting special interest.</p></div></article>
              <article><span>03</span><div><h3>Article 4 directions</h3><p>A direction can remove specified permitted development rights within a defined area, meaning an application may be required.</p></div></article>
              <article><span>04</span><div><h3>Planning conditions</h3><p>A condition on an earlier permission can withdraw rights or control later alterations. The decision history should be reviewed before relying on permitted development.</p></div></article>
            </div>
          </section>

          <section id="design-principles">
            <small className="eyebrow">Spatial quality</small>
            <h2>What makes a good house extension?</h2>
            <ul className={styles.checklist}>
              {designChecklist.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
            </ul>
          </section>

          <section id="natural-light">
            <small className="eyebrow">Daylight strategy</small>
            <h2>How to bring more natural light into an extension</h2>
            <p>
              Rooflights, clerestory glazing, glazed doors, corner windows, internal
              glazing and roof lanterns can all contribute. Their effectiveness
              depends on ceiling height, orientation, overshadowing, room depth and
              what happens to the spaces behind the new addition.
            </p>
            <div className={styles.distinction}>
              <strong>More glazing is not always better.</strong>
              <p>Large areas of glass can introduce glare, overheating, heat loss, privacy issues and cost. Place glazing where it improves useful daylight, views and ventilation.</p>
            </div>
          </section>

          <section id="open-plan">
            <small className="eyebrow">Living patterns</small>
            <h2>Should an extension be open plan?</h2>
            <p>
              Fully open-plan space can improve connection and flexibility, but it
              can also concentrate noise, cooking smells, heating demand and several
              activities in one room. Broken-plan layouts, separate living rooms,
              sliding or glazed partitions and well-positioned utility or pantry
              spaces can offer a better balance.
            </p>
            <p>Family routines, acoustic separation, storage, ventilation, fire strategy and furniture should shape the decision.</p>
          </section>

          <section id="roof-options">
            <small className="eyebrow">Form and weathering</small>
            <h2>Choosing the right roof form</h2>
            <p>
              Flat, pitched, mono-pitch and hipped roofs each affect height,
              appearance, internal volume and junctions with the house. Rooflights
              and lanterns can introduce light, while parapets, eaves, gutters and
              drainage falls must be resolved as construction details rather than
              left as visual ideas.
            </p>
            <p>Flat roofs can be durable when their structure, falls, outlets, edges, membranes and workmanship are properly designed and constructed.</p>
          </section>

          <section id="materials">
            <small className="eyebrow">Old and new</small>
            <h2>Should an extension match the existing house?</h2>
            <p>
              Matching brick, roof tiles, window proportions and details can create
              a quiet continuation. A contrasting contemporary addition can also be
              appropriate where its proportions, junctions and materials respond
              intelligently to the original building and local character.
            </p>
            <p>Neither matching nor contrast is automatically preferable. Brick samples, mortar, frame colours, roof edges and the physical junction between old and new often determine whether the result feels coherent.</p>
          </section>

          <section id="structure">
            <small className="eyebrow">Engineering coordination</small>
            <h2>Structure and foundations</h2>
            <p>
              Foundations depend on ground conditions, the building, nearby trees,
              drains and adjacent construction. Large structural openings may need
              beams, posts or frames; existing walls and foundations may require
              assessment; and movement joints may be appropriate.
            </p>
            <p>Structural engineers commonly prepare calculations and details. Large open-plan arrangements can materially affect structural cost and build sequence. This guide does not provide structural design advice.</p>
          </section>

          <section id="building-regulations">
            <small className="eyebrow">Technical approval</small>
            <h2>Building Regulations for house extensions</h2>
            <p>
              Most extensions require coordinated consideration of structure, fire
              safety, insulation, ventilation, drainage, glazing, electrical safety,
              access and thermal performance, followed by appropriate inspections
              and completion documentation.
            </p>
            <div className={styles.distinction}>
              <strong>Planning drawings are not normally sufficient for construction.</strong>
              <p>A technical package needs construction build-ups and coordinated structural, fire, energy, ventilation, drainage and services information appropriate to the project.</p>
            </div>
            <Link className={styles.textLink} href="/knowledge-centre/building-regulations">
              Read Building Regulations Explained <ArrowRight size={17} />
            </Link>
            <Link className={styles.textLink} href="/services/building-regulations">
              Explore Building Regulations drawings <ArrowRight size={17} />
            </Link>
          </section>

          <section id="drainage-services">
            <small className="eyebrow">Below the surface</small>
            <h2>Drainage, services and hidden constraints</h2>
            <p>
              Foul and surface-water drainage, connection points, inspection
              chambers, drains beneath the footprint and possible build-over
              agreements should be established early. Foundations and drainage
              cannot be designed independently where they are close together.
            </p>
            <p>
              Boiler position and capacity, heating zones, electrical upgrades,
              water pressure, utility meters, broadband and data, external taps and
              lighting should also be coordinated before finishes conceal the work.
            </p>
          </section>

          <section id="party-wall">
            <small className="eyebrow">Separate legal process</small>
            <h2>Does the Party Wall etc. Act apply?</h2>
            <p>
              The Act may be relevant when building near a boundary, working to a
              shared wall or excavating near neighbouring foundations. Notices and
              surveyor appointments may be required depending on the specific work
              and relationships.
            </p>
            <p>Planning permission and Building Regulations approval do not remove Party Wall obligations. This is general information, not legal advice.</p>
          </section>

          <section id="costs">
            <small className="eyebrow">Budget planning</small>
            <h2>How much does a house extension cost?</h2>
            <p>
              A reliable budget must reflect the actual design and site rather than
              a universal cost-per-square-metre figure. Important variables include:
            </p>
            <div className={styles.columns}>
              <ul>{costFactors.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
              <ul>{costFactors.slice(4).map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <h3>Cost planning checklist</h3>
            <ul className={styles.checklist}>
              {costChecklist.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
            </ul>
            <Link className={styles.textLink} href="/estimate">
              Use the architectural fee calculator <ArrowRight size={17} />
            </Link>
            <Link className={styles.textLink} href="/knowledge-centre/house-extension-costs">
              Read the complete 2026 extension cost guide <ArrowRight size={17} />
            </Link>
          </section>

          <section id="timescales">
            <small className="eyebrow">Project programme</small>
            <h2>How long does a house extension take?</h2>
            <ol className={styles.process}>
              {["Initial consultation", "Measured survey", "Feasibility and concept design", "Planning or permitted development review", "Technical design", "Structural coordination", "Building Control", "Contractor pricing", "Construction", "Completion"].map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item}</h3></div></li>
              ))}
            </ol>
            <p>Timescales depend on complexity, approval routes, authority responses, consultant information, contractor availability, procurement and changes during the project. Fixed completion dates should not be assumed without a project-specific programme.</p>
            <Link className={styles.textLink} href="/knowledge-centre/house-extension-timeline">
              Read the complete house extension timeline <ArrowRight size={17} />
            </Link>
          </section>

          <section id="our-process">
            <small className="eyebrow">A clear sequence</small>
            <h2>Our process from first survey to completed home.</h2>
            <div className={styles.flagshipProcess}>{flagshipProcess.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
          </section>

          <section id="design-process">
            <small className="eyebrow">From brief to completion</small>
            <h2>What is the process for designing a house extension?</h2>
            <ol className={styles.process}>
              {process.map(([title, body], index) => (
                <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>
              ))}
            </ol>
            <p>Hepburn Architects does not provide site project management or continuous site supervision unless a separate construction-stage service is expressly agreed.</p>
          </section>

          <section id="choosing-an-architect">
            <small className="eyebrow">Professional input</small>
            <h2>Do I need an architect for an extension?</h2>
            <p>
              An architect is not legally required for every extension. Professional
              input can improve layout, planning strategy, coordination and technical
              quality, and more complex or sensitive projects usually benefit from
              early design involvement.
            </p>
            <p>The appointment should state which stages, drawings, submissions, meetings, consultant coordination and construction-stage services are included.</p>
          </section>

          <section id="mistakes">
            <small className="eyebrow">Avoidable risks</small>
            <h2>Common house extension mistakes to avoid</h2>
            <ul className={styles.checklist}>
              {mistakes.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
            </ul>
          </section>

          <section id="questions">
            <small className="eyebrow">Build the brief</small>
            <h2>Questions to answer before drawings begin</h2>
            <ul className={styles.checklist}>
              {briefingQuestions.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
            </ul>
          </section>

          <section id="extension-support">
            <small className="eyebrow">Professional support</small>
            <h2>House extension design support from Hepburn Architects</h2>
            <p>Hepburn Architects can support extension projects through proportionate design, planning and technical stages, including:</p>
            <ul className={styles.serviceList}>{support.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link className="btn primary" href="/services/house-extensions">
              View House Extension Services <ArrowRight size={18} />
            </Link>
          </section>
        </main>
      </div>

      {projects.length > 0 && (
        <section className={styles.projects}>
          <div className="shell">
            <div className={styles.sectionHeading}>
              <small className="eyebrow">Selected work</small>
              <h2>House extension projects</h2>
              <p>Extension and remodelling projects selected dynamically from the practice portfolio.</p>
            </div>
            <div className={styles.projectGrid}>
              {projects.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <div className={styles.projectImage}>
                    <Image src={projectImageUrl(project.featuredImage, 900)} alt={projectImageAlt(project)} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  </div>
                  <small>{project.location} · {project.projectType}</small>
                  <h3>{project.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.coverage}>
        <div className="shell">
          <div className={styles.sectionHeading}><small className="eyebrow">Areas we cover</small><h2>House extension design across Birmingham and the West Midlands.</h2><p>Explore local planning and architectural context for extension projects in the areas where the practice is already publishing location guidance.</p></div>
          <div className={styles.coverageGrid}>{[
            ["Birmingham", "/locations/birmingham-architects"], ["Harborne", "/locations/harborne-architects"], ["Edgbaston", "/locations/edgbaston-architects"], ["Moseley", "/locations/moseley-architects"], ["Kings Heath", "/locations/kings-heath-architects"], ["Solihull", "/locations/solihull-architects"], ["Sutton Coldfield", "/locations/sutton-coldfield-architects"], ["Wolverhampton", "/locations/wolverhampton-architects"], ["Walsall", "/locations/walsall-architects"], ["Leamington Spa", "/locations/leamington-spa-architects"],
          ].map(([label, href]) => <Link href={href} key={href}>{label}<ArrowRight size={16} /></Link>)}</div>
        </div>
      </section>

      <section className={styles.guidePromo}>
        <div className={`shell ${styles.guidePromoInner}`}>
          <div className={styles.guideVisual}>
            <Image
              src="/images/house-extension-guide-cover.png"
              alt="Complete House Extension Guide cover"
              fill
              sizes="(max-width: 700px) 76vw, 320px"
            />
          </div>
          <div>
            <small className="eyebrow">Free downloadable guide</small>
            <h2>Download the Complete House Extension Guide</h2>
            <p>Take away a practical overview of planning permission, permitted development, budgeting, design decisions, timescales and the main stages of an extension project.</p>
            <Link className="btn primary" href="/house-extension-guide">
              Download the Free Guide <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

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
            <h2>House extension FAQs</h2>
            <p>General answers for extension projects in England. A specific property still requires an appropriate planning and technical review.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className={styles.sources}>
        <div className={`shell ${styles.sourcesInner}`}>
          <div>
            <small className="eyebrow">Primary references</small>
            <h2>Official house extension guidance</h2>
            <p>These sources were reviewed when preparing this guide. Always check current official guidance for a property-specific decision.</p>
          </div>
          <ul>
            {officialSources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.label}<ExternalLink size={15} aria-hidden="true" />
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
          <p>This page provides general guidance for house extension projects in England and is not a substitute for advice based on a specific property, proposal, planning history, construction method or local authority area. Planning rules, Building Regulations and official guidance can change.</p>
        </div>
      </aside>

      <RelevantReview serviceSlug="house-extensions" />

      <section className={styles.finalCta}>
        <div className={`shell ${styles.finalCtaInner}`}>
          <small className="eyebrow">Discuss your home</small>
          <h2>Planning a house extension?</h2>
          <p>Start with the property, the brief and the likely approval route. We can help establish the most sensible next step.</p>
          <div className="actions centered-actions">
            <Link className="btn primary" href="/contact">Discuss Your Project <ArrowRight size={18} /></Link>
            <Link className="btn secondary light-btn" href="/estimate">Get an Indicative Fee <ArrowRight size={18} /></Link>
            <Link className="btn secondary light-btn" href="/house-extension-guide">Download Extension Guide <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
