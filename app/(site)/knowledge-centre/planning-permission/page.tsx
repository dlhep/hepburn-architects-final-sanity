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
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Planning Permission Explained",
  description:
    "A practical guide to planning permission, permitted development, lawful development certificates, planning applications and common residential planning constraints in England.",
  alternates: {
    canonical:
      "https://hepburnarchitects.co.uk/knowledge-centre/planning-permission",
  },
  openGraph: {
    title: "Planning Permission Explained | Residential Planning Guide",
    description:
      "A practical guide to planning permission, permitted development, lawful development certificates and residential planning constraints in England.",
    url: "/knowledge-centre/planning-permission",
    type: "article",
    images: [
      {
        url: "/images/selected-work-3.webp",
        alt: "Residential planning and design by Hepburn Architects",
      },
    ],
  },
};

const contents = [
  ["planning-position", "Understanding the planning position"],
  ["planning-routes", "The main planning routes"],
  ["need-permission", "Do I need planning permission?"],
  ["permitted-development", "Permitted development"],
  ["article-4", "Article 4 directions"],
  ["heritage", "Conservation areas and listed buildings"],
  ["assessment", "How applications are assessed"],
  ["application-process", "The application process"],
  ["supporting-information", "Supporting documents"],
  ["timescales", "Planning timescales"],
  ["conditions", "Planning conditions"],
  ["changes-refusals", "Changes and refusals"],
  ["planning-building-regulations", "Planning and Building Regulations"],
  ["mistakes", "Common planning mistakes"],
  ["planning-support", "Planning support"],
  ["faqs", "Planning permission FAQs"],
] as const;

const planningRoutes = [
  {
    title: "Full planning permission",
    body: "A full application may be required for new dwellings, substantial residential development, material changes of use and proposals that do not fall within another consent route. It normally asks the authority to assess the principle and the detailed design together.",
  },
  {
    title: "Householder planning applications",
    body: "This application type is generally used for development associated with an existing house, including many extensions, dormers, garages and other domestic alterations. It is not the normal route for creating a separate dwelling or changing the use of a property.",
  },
  {
    title: "Permitted development",
    body: "Permitted development rights are a national grant of planning permission for specified forms of development. Every relevant limitation and condition must be satisfied. Other approvals may still be required.",
  },
  {
    title: "Prior approval",
    body: "Some permitted development rights require the local planning authority to assess specified matters before work begins. The matters considered depend on the particular right and can include transport, flooding, design, contamination, noise or neighbour impacts.",
  },
  {
    title: "Lawful Development Certificates",
    body: "A proposed certificate confirms whether future operations or a proposed use would be lawful. An existing certificate deals with an existing use, operation or breach of condition. A certificate can provide formal evidence for a sale, refinancing or a future review of the planning position, but it only covers the matter precisely described.",
  },
  {
    title: "Outline planning permission",
    body: "Outline permission can establish whether the principle of development is acceptable before reserved details are submitted. It is more relevant to development sites than ordinary household extensions, and access information may still be required at outline stage.",
  },
  {
    title: "Permission in Principle",
    body: "Permission in Principle is a separate route for certain housing-led development. It establishes specified in-principle matters before a technical details consent application and should not be confused with householder planning permission.",
  },
  {
    title: "Pre-application advice",
    body: "Local authority pre-application advice may help where policy, design or the principle of development is uncertain. The response can inform a strategy, but it is not a planning approval, does not bind the final decision and cannot guarantee permission.",
  },
] as const;

const projectTypes = [
  {
    title: "Rear and side extensions",
    body: "The route depends on the original house, earlier additions, siting, height, depth, boundaries, materials and local restrictions. A proposal outside permitted development may still be acceptable through a householder application.",
  },
  {
    title: "Loft conversions and dormers",
    body: "Roof volume, the position and form of additions, the original roof, previous works, designated land and Article 4 controls can affect whether permitted development is available.",
  },
  {
    title: "Garage conversions",
    body: "Internal conversion may not always amount to development, but external changes, planning conditions restricting the garage, listed status or a separate use can change the position.",
  },
  {
    title: "Outbuildings",
    body: "Use, siting, height, total site coverage, the relationship to the house and designated land all matter. A building used as a separate dwelling is not an ordinary domestic outbuilding.",
  },
  {
    title: "New-build homes",
    body: "New dwellings normally require a planning application supported by a site-specific case addressing principle, design, access, amenity, ecology, drainage and other constraints.",
  },
  {
    title: "Replacement dwellings",
    body: "The lawful existing building, local policy, scale, siting, landscape, heritage, access and—in some locations—Green Belt or countryside policy influence the planning strategy.",
  },
  {
    title: "HMOs",
    body: "The existing and proposed use, occupancy, local Article 4 directions and planning conditions must be checked. Planning, HMO licensing and fire-safety duties are separate regimes.",
  },
  {
    title: "Flat conversions",
    body: "Creating separate flats generally involves a material change of use and requires assessment of space standards, amenity, parking, refuse, cycle storage, noise and fire-related design matters.",
  },
  {
    title: "Commercial-to-residential changes",
    body: "Some changes may use a specific permitted development and prior approval route; others need full planning permission. Existing use, exclusions, floorspace, impacts and every condition of the relevant right must be reviewed.",
  },
  {
    title: "Backland and infill development",
    body: "The principle of housing, access, character, garden loss, neighbouring amenity, trees, ecology, drainage and servicing usually require a coordinated planning and design assessment.",
  },
  {
    title: "Barn and rural conversions",
    body: "The building’s lawful use, structural condition, landscape setting, ecology, access and rural policy are central. A permitted development route may exist in some cases but should never be assumed.",
  },
] as const;

const applicationSteps = [
  ["Establish the planning route", "Identify the appropriate consent route before fixing the scope or programme."],
  ["Review planning history and constraints", "Check earlier decisions, conditions, designations, policy and site-specific constraints."],
  ["Prepare survey information", "Record an accurate base of the property, site and relevant context."],
  ["Develop the design", "Test the brief against planning policy, character, amenity and technical realities."],
  ["Prepare drawings and supporting documents", "Coordinate the application information and specialist reports required by the proposal."],
  ["Submit and validate the application", "The authority checks whether the national and local information requirements have been met."],
  ["Consultation and assessment", "Neighbours and relevant consultees may comment while the planning officer assesses the proposal."],
  ["Respond to planning queries", "Where appropriate, clarify information or consider proportionate amendments without assuming they will be accepted."],
  ["Decision", "The authority may approve, approve with conditions or refuse the application."],
  ["Conditions, amendments or next steps", "Review the decision before technical design, procurement or construction proceeds."],
] as const;

const supportingDocuments = [
  "Application forms and ownership certificates",
  "Location plan and block or site plan",
  "Existing and proposed plans, elevations and sections",
  "Design and Access Statement where required",
  "Planning statement",
  "Heritage statement",
  "Transport or parking information",
  "Drainage information",
  "Tree survey and arboricultural information",
  "Ecology reports",
  "Noise or acoustic reports",
  "Daylight and sunlight material",
  "Contamination information",
  "Fire statement where applicable",
  "Community Infrastructure Levy forms where applicable",
] as const;

const planningMistakes = [
  "Assuming a neighbour’s extension establishes permission for your property",
  "Relying on informal verbal advice as if it were a formal decision",
  "Ignoring previous extensions or alterations to the original house",
  "Measuring permitted development limits from the wrong building or reference point",
  "Failing to check planning conditions and Article 4 directions",
  "Confusing planning permission with Building Regulations approval",
  "Preparing a fixed design before reviewing policy and site constraints",
  "Submitting incomplete, inaccurate or inconsistent drawings",
  "Underestimating privacy, daylight, outlook and other neighbour amenity issues",
  "Assuming validation means the proposal will be approved",
  "Starting work before pre-commencement conditions have been satisfied",
] as const;

const planningSupport = [
  "Feasibility reviews",
  "Planning history and constraint research",
  "Measured surveys",
  "Concept design",
  "Planning drawings",
  "Householder and full planning applications",
  "Permitted development reviews",
  "Proposed and existing Lawful Development Certificates",
  "Design and Access Statements and planning statements",
  "Amendments and resubmissions",
  "Discharge of conditions",
  "Coordination with specialist consultants",
] as const;

const relatedResources = [
  {
    title: "Planning a House Extension",
    description: "A practical homeowner’s guide to the full extension journey.",
    href: "/house-extension-guide",
  },
  {
    title: "Building Regulations",
    description: "Technical design and Building Control support for residential projects.",
    href: "/services/building-regulations",
  },
  {
    title: "New Build Homes",
    description: "Site appraisal, planning design and technical packages for new homes.",
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
    description: "Explore residential work shaped by design and planning strategy.",
    href: "/projects",
  },
  {
    title: "Journal",
    description: "Read planning updates, project news and practice insights.",
    href: "/blog",
  },
] as const;

const faqs = [
  {
    question: "Do I need planning permission for an extension?",
    answer:
      "Not every extension requires a planning application, but the answer depends on the property and the proposal. Permitted development may be available where every limitation and condition is satisfied. The original house, previous additions, siting, scale, materials, designated land, planning conditions and Article 4 directions should be checked before relying on that route.",
  },
  {
    question:
      "What is the difference between planning permission and permitted development?",
    answer:
      "A planning application asks the local planning authority to assess a proposal. Permitted development is planning permission already granted nationally for specified development, subject to detailed limitations and conditions. Some permitted development also requires prior approval.",
  },
  {
    question: "How can I confirm that work is permitted development?",
    answer:
      "Review the current legislation and official guidance against accurate drawings, the planning history and any local restrictions. Where formal certainty is important, a proposed Lawful Development Certificate can ask the local planning authority to confirm whether the described work would be lawful.",
  },
  {
    question: "Can permitted development rights be removed?",
    answer:
      "Yes. Specified rights may be withdrawn by an Article 4 direction or by a condition attached to an earlier planning permission. Some rights are also restricted by the type of building, use or location.",
  },
  {
    question: "What is an Article 4 direction?",
    answer:
      "It is a direction that withdraws specified permitted development rights in a defined area. It does not necessarily prohibit the development; it means a planning application may be required so that the authority can assess it.",
  },
  {
    question: "Do flats have permitted development rights?",
    answer:
      "Flats do not generally benefit from the ordinary householder permitted development rights in Part 1 of the General Permitted Development Order. Other rights may exist for particular development, but the building, lease, planning history and proposed work need specific review.",
  },
  {
    question: "Can I apply for planning permission before buying a property?",
    answer:
      "An applicant does not have to own the land, provided the correct ownership notice and certificate procedures are followed. Purchase contracts, access for surveys and the commercial value of an unimplemented permission require separate advice.",
  },
  {
    question:
      "Does planning permission increase the value of land or a property?",
    answer:
      "Permission can affect development potential, but value depends on viability, conditions, abnormal costs, market demand, title matters and whether the consent can be implemented. A planning approval is not itself a valuation or guarantee of a profitable project.",
  },
  {
    question: "Can neighbours stop a planning application?",
    answer:
      "Neighbours may comment, and material planning concerns can influence the assessment. The number of objections alone does not determine the result. The authority must make its decision on the planning merits, including the development plan and other material considerations.",
  },
  {
    question: "Can I change a design after permission is granted?",
    answer:
      "Possibly, but the correct route depends on the nature and scale of the change and the wording of the permission. Options may include a non-material amendment, an application relating to conditions, or a new application. Approval should be obtained where required before building the changed design.",
  },
  {
    question: "How long does planning permission last?",
    answer:
      "A permission normally includes a condition setting the period within which development must begin. Three years is a common default for full permission in England, but the decision notice may specify a different period and outline permissions operate differently. Always check the actual permission and conditions.",
  },
  {
    question:
      "Can I start work as soon as planning permission is granted?",
    answer:
      "Not necessarily. Pre-commencement conditions may require approval first, and Building Regulations, listed building consent, Party Wall procedures, drainage, highways, licences or private consents may also be relevant. Review the complete decision and project requirements before starting.",
  },
  {
    question:
      "What happens if work has already been carried out without permission?",
    answer:
      "The position depends on whether permission was required, whether the work is acceptable, the evidence available and current enforcement rules. Possible routes can include an existing Lawful Development Certificate or a retrospective application, but neither should be assumed to succeed. Property-specific planning advice is important.",
  },
  {
    question: "Do I need an architect to submit a planning application?",
    answer:
      "An architect is not legally required for most applications. Architectural input can nevertheless help establish a realistic planning strategy, develop the design, coordinate accurate drawings and supporting information, and respond to the context and likely planning issues.",
  },
] as const;

const officialSources = [
  {
    label: "GOV.UK: Permitted development rights for householders",
    href: "https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance",
  },
  {
    label: "GOV.UK: When planning permission is required",
    href: "https://www.gov.uk/guidance/when-is-permission-required",
  },
  {
    label: "GOV.UK: Lawful Development Certificates",
    href: "https://www.gov.uk/guidance/lawful-development-certificates",
  },
  {
    label: "GOV.UK: Determining a planning application",
    href: "https://www.gov.uk/guidance/determining-a-planning-application",
  },
] as const;

const projectGroups = [
  ["extension"],
  ["new build", "new-build", "passive", "passivhaus"],
  ["replacement"],
  ["hmo", "flat", "conversion", "remodelling"],
  ["development", "housing", "masterplan", "infill", "backland"],
  ["barn", "rural", "countryside"],
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

function selectPlanningProjects(projects: Project[]) {
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

export default async function PlanningPermissionPage() {
  const projects = selectPlanningProjects(await getProjects());

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
        name: "Planning Permission Explained",
        item: `${site.url}/knowledge-centre/planning-permission`,
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
            <span aria-current="page">Planning Permission Explained</span>
          </nav>
          <small className="eyebrow">Knowledge Centre · Planning</small>
          <h1>Planning Permission Explained</h1>
          <div className={styles.heroIntro}>
            <p>
              Planning permission can determine what is possible before design work
              progresses too far. This guide explains the main routes through the
              residential planning system, when an application may be required and
              the issues that commonly influence a decision.
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
            <Link className="btn secondary" href="/services/planning-applications">
              Planning Application Services <ArrowRight size={18} />
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
          <section id="planning-position">
            <small className="eyebrow">Start with the evidence</small>
            <h2>Understanding the planning position before you begin</h2>
            <p className={styles.lead}>
              The correct route is specific to the land, building and proposed work.
              Two apparently similar properties can have different planning
              positions because their legal and planning histories are not the same.
            </p>
            <div className={styles.splitList}>
              <p>The initial review should consider:</p>
              <ul>
                <li>The type of property and proposed work</li>
                <li>The planning history and site location</li>
                <li>Local and national planning policy</li>
                <li>Whether permitted development rights remain available</li>
                <li>Listed building or conservation area status</li>
                <li>Article 4 directions</li>
                <li>Conditions attached to earlier permissions</li>
              </ul>
            </div>
          </section>

          <section id="planning-routes">
            <small className="eyebrow">Consent types</small>
            <h2>The main routes through the planning system</h2>
            <p>
              “Planning permission” is often used as a general expression, but
              England’s planning system contains several distinct application and
              consent routes. Choosing the right one affects the evidence, drawings,
              assessment and legal certainty required.
            </p>
            <div className={styles.routeIndex}>
              {planningRoutes.map((route, index) => (
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

          <section id="need-permission">
            <small className="eyebrow">Common project types</small>
            <h2>Do I need planning permission?</h2>
            <p className={styles.lead}>
              A reliable answer needs property-specific information. The summaries
              below identify the questions that usually determine the route; they are
              not yes-or-no conclusions for an individual site.
            </p>
            <div className={styles.projectTypeList}>
              {projectTypes.map((type) => (
                <article key={type.title}>
                  <h3>{type.title}</h3>
                  <p>{type.body}</p>
                </article>
              ))}
            </div>
            <Link className={styles.textLink} href="/services/house-extensions">
              Explore House Extension Architectural Services <ArrowRight size={17} />
            </Link>
            <p>
              For the detailed Class A tests, larger-home-extension procedure and
              certificate options, read our guide to{" "}
              <Link href="/knowledge-centre/extension-planning-permission">
                planning permission for house extensions
              </Link>.
            </p>
            <p>
              Planning a roof alteration? Our{" "}
              <Link href="/knowledge-centre/loft-conversions">
                complete loft-conversion guide
              </Link>{" "}
              explains Class B volume, dormer design and the relationship with
              Building Regulations.
            </p>
          </section>

          <section id="permitted-development">
            <small className="eyebrow">A national permission</small>
            <h2>What is permitted development?</h2>
            <p>
              Permitted development rights grant planning permission nationally for
              defined forms of development. They are not a general exemption from
              planning control: the proposal must comply with every relevant
              limitation and condition, and some rights require prior approval.
            </p>
            <div className={styles.distinction}>
              <strong>Permitted development does not mean approval-free.</strong>
              <p>
                Building Regulations and other consents can still apply. Planning
                permission will normally be required if the proposal falls outside
                the relevant right.
              </p>
            </div>
            <p>
              A review may need to establish the original house, previous
              extensions, height, depth, boundary relationships, roof form,
              materials, designated land, planning conditions and Article 4
              directions. Rights differ by development type and may have been
              removed. Flats do not generally benefit from ordinary householder
              permitted development rights.
            </p>
            <a
              className={styles.officialLink}
              href="https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the official GOV.UK householder permitted development guidance
              <ExternalLink size={16} aria-hidden="true" />
              <span className={styles.srOnly}>(opens in a new tab)</span>
            </a>
          </section>

          <section id="article-4">
            <small className="eyebrow">Local restrictions</small>
            <h2>What is an Article 4 direction?</h2>
            <p>
              An Article 4 direction enables specified permitted development rights
              to be withdrawn across a defined area. It may be particularly relevant
              to HMOs, conservation areas, changes to elevations, windows and doors,
              roof alterations or changes of use.
            </p>
            <div className={styles.distinction}>
              <strong>An Article 4 direction does not itself prohibit development.</strong>
              <p>
                It can mean that a planning application is required so the local
                planning authority can assess work that would otherwise have been
                permitted development. The direction’s exact area, wording and
                effective date must be checked.
              </p>
            </div>
          </section>

          <section id="heritage">
            <small className="eyebrow">Heritage context</small>
            <h2>Conservation areas and listed buildings</h2>
            <p>
              Conservation area status introduces additional considerations about
              character and appearance. Some permitted development rights are more
              restricted on designated land, although not every proposal in a
              conservation area automatically requires planning permission.
            </p>
            <p>
              Listed building consent is separate from planning permission and may
              be required for internal as well as external work that affects a
              listed building’s special character. Development affecting the setting
              of a listed building can also be material to a planning decision.
            </p>
          </section>

          <section id="assessment">
            <small className="eyebrow">Decision-making</small>
            <h2>How planning applications are assessed</h2>
            <p>
              Applications are normally assessed against the development plan unless
              material considerations indicate otherwise. National planning policy,
              supplementary planning documents, design guidance, planning history
              and site constraints can all influence the assessment.
            </p>
            <div className={styles.columns}>
              <ul>
                <li>Design quality, character and appearance</li>
                <li>Neighbour privacy, overlooking and outlook</li>
                <li>Loss of light and overdevelopment</li>
                <li>Parking, highways and access</li>
                <li>Refuse and cycle storage</li>
                <li>Trees, ecology and drainage</li>
              </ul>
              <ul>
                <li>Heritage and the setting of heritage assets</li>
                <li>Housing and space standards</li>
                <li>Noise and other environmental effects</li>
                <li>Fire and access considerations where relevant</li>
                <li>Planning obligations or conditions</li>
                <li>Other proposal-specific material considerations</li>
              </ul>
            </div>
            <p>
              Neighbour objections do not determine an application by number alone.
              Comments are relevant where they raise valid material planning
              considerations.
            </p>
          </section>

          <section id="application-process">
            <small className="eyebrow">From research to decision</small>
            <h2>What happens during a planning application?</h2>
            <ol className={styles.process}>
              {applicationSteps.map(([title, body], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className={styles.distinction}>
              <strong>Validation is not approval.</strong>
              <p>
                Validation confirms that the authority has the information needed
                to register and assess the application. An invalid application is
                not normally assessed until the missing or corrected information has
                been supplied.
              </p>
            </div>
          </section>

          <section id="supporting-information">
            <small className="eyebrow">Application information</small>
            <h2>What information might a planning application require?</h2>
            <p>
              Requirements depend on the proposal, national requirements and the
              local authority’s current validation list. A proportionate application
              may need some—but not necessarily all—of the following:
            </p>
            <ul className={styles.checklist}>
              {supportingDocuments.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="timescales">
            <small className="eyebrow">Programme</small>
            <h2>How long does planning permission take?</h2>
            <p>
              Timescales vary by application type and authority. The formal
              determination period normally begins after validation. Current
              statutory targets should be checked for the chosen route, but they are
              not guarantees of a decision date.
            </p>
            <p>
              Missing information, amendments, specialist consultees, committee
              referral or legal agreements can extend the process. Technical design,
              tendering or construction should not be programmed solely around an
              assumed planning decision date.
            </p>
          </section>

          <section id="conditions">
            <small className="eyebrow">After approval</small>
            <h2>Understanding planning conditions</h2>
            <p>
              Planning permissions may include conditions governing materials,
              landscaping, drainage, access, ecology, hours of work or other matters.
              Some require formal approval before development starts. Failure to
              comply can create enforcement, funding and sale difficulties.
            </p>
            <div className={styles.definitionList}>
              <div>
                <h3>Discharging a condition</h3>
                <p>Submitting the details required by an existing condition for approval.</p>
              </div>
              <div>
                <h3>Varying or removing a condition</h3>
                <p>Seeking a change to the permission’s conditions through the appropriate statutory route.</p>
              </div>
              <div>
                <h3>Non-material amendment</h3>
                <p>Requesting a change the authority considers non-material in the context of the permission.</p>
              </div>
              <div>
                <h3>New planning application</h3>
                <p>Required where the proposed change cannot properly be dealt with through a narrower amendment route.</p>
              </div>
            </div>
          </section>

          <section id="changes-refusals">
            <small className="eyebrow">Revisions and decisions</small>
            <h2>What happens if a proposal needs to change?</h2>
            <p>
              Changes during determination may sometimes be accepted, but the
              authority is not obliged to negotiate or accept amendments. After a
              decision, the possible routes include a non-material amendment, a
              Section 73 application where appropriate, a revised application or a
              new application. The substance of the change determines the route.
            </p>
            <h2>What happens if planning permission is refused?</h2>
            <p>
              Start by understanding every reason for refusal and the officer’s
              assessment. The proposal may be capable of amendment and resubmission,
              or an appeal may be justified where the planning case is sound.
              Appeals are not automatically the best route, and the current deadline
              depends on the application and appeal type.
            </p>
          </section>

          <section id="planning-building-regulations">
            <small className="eyebrow">Separate approval systems</small>
            <h2>Planning permission and Building Regulations are separate</h2>
            <p>
              Planning permission does not remove the need to comply with Building
              Regulations. Planning focuses principally on the acceptability of
              development and land use; Building Regulations address technical
              standards such as structure, fire safety, energy, ventilation,
              drainage and accessibility.
            </p>
            <p>
              Other requirements can include listed building consent, procedures
              under the Party Wall etc. Act, build-over agreements, drainage
              approvals, highways consent, licences, freeholder consent and
              restrictive covenants. These are separate legal, technical or private
              matters.
            </p>
            <Link className={styles.textLink} href="/services/building-regulations">
              Explore Building Regulations services <ArrowRight size={17} />
            </Link>
          </section>

          <section id="mistakes">
            <small className="eyebrow">Risk checklist</small>
            <h2>Common planning mistakes to avoid</h2>
            <ul className={styles.checklist}>
              {planningMistakes.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="planning-support">
            <small className="eyebrow">Professional support</small>
            <h2>Planning support from Hepburn Architects</h2>
            <p>
              Hepburn Architects can develop the planning strategy alongside the
              architecture, with a scope proportionate to the property, proposal and
              level of risk. Services already offered by the practice include:
            </p>
            <ul className={styles.serviceList}>
              {planningSupport.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link className="btn primary" href="/services/planning-applications">
              View Planning Application Services <ArrowRight size={18} />
            </Link>
          </section>
        </main>
      </div>

      {projects.length > 0 && (
        <section className={styles.projects}>
          <div className="shell">
            <div className={styles.sectionHeading}>
              <small className="eyebrow">Selected work</small>
              <h2>Projects shaped by planning strategy</h2>
              <p>
                Residential projects across extensions, new homes, conversions and
                development, selected dynamically from the practice portfolio.
              </p>
            </div>
            <div className={styles.projectGrid}>
              {projects.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <div className={styles.projectImage}>
                    <Image
                      src={projectImageUrl(project.featuredImage, 900)}
                      alt={projectImageAlt(project)}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    />
                  </div>
                  <small>
                    {project.location} · {project.projectType}
                  </small>
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
                <div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                </div>
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
            <h2>Planning permission FAQs</h2>
            <p>
              General answers for residential projects in England. The planning
              position for an individual property still requires specific review.
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
            <h2>Official planning guidance</h2>
            <p>
              These sources were reviewed when preparing this guide. Planning law
              and guidance can change, so the current source should be checked when
              making a project-specific decision.
            </p>
          </div>
          <ul>
            {officialSources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            This page provides general planning guidance for England and is not a
            substitute for advice based on a specific property, proposal, planning
            history or local authority area. Planning legislation, policy and fees
            can change.
          </p>
        </div>
      </aside>

      <section className={styles.finalCta}>
        <div className={`shell ${styles.finalCtaInner}`}>
          <small className="eyebrow">Discuss the planning position</small>
          <h2>Unsure which planning route applies?</h2>
          <p>
            Book a free 30-minute consultation to discuss your property, proposal
            and the most sensible next steps.
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
