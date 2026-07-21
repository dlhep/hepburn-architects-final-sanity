import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  Flame,
  Home,
  Phone,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "HMO Architect | Planning, Licensing & Building Regulations",
  description:
    "Specialist HMO architectural advice, feasibility, planning applications, Article 4 reviews, fire-safety coordination and Building Regulations drawings.",
  alternates: {
    canonical: "/services/hmo-conversions",
  },
  openGraph: {
    title: "HMO Architect | Hepburn Architects",
    description:
      "Planning-led architectural design and technical support for C4 and sui generis HMO conversions.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1800&q=88",
        alt: "Residential property suitable for an HMO conversion",
      },
    ],
  },
};

const hmoTypes = [
  {
    icon: Users,
    title: "Small HMOs: 3–6 occupiers",
    text:
      "Small shared houses occupied by three to six unrelated people will generally fall within Use Class C4. A change from C3 may be permitted development unless an Article 4 Direction or another restriction applies.",
  },
  {
    icon: Building2,
    title: "Larger HMOs: 7+ occupiers",
    text:
      "An HMO occupied by more than six people will generally be treated as sui generis. Planning permission is normally required and the application may need to address concentration, amenity, parking, refuse, noise and local housing policy.",
  },
  {
    icon: FileCheck2,
    title: "Existing and retrospective HMOs",
    text:
      "Where a property is already operating as an HMO, we can review the planning history, evidence of use, existing layout and possible routes including planning permission or a lawful development application.",
  },
];

const approvalRoutes = [
  {
    title: "Planning",
    text:
      "We review the existing lawful use, proposed occupancy, Article 4 status, local HMO policies, planning history and the likely application route.",
  },
  {
    title: "HMO licensing",
    text:
      "Licensing is separate from planning. We can review the layout against published local standards and prepare architectural information, while the council remains responsible for the licensing decision.",
  },
  {
    title: "Building Regulations",
    text:
      "Material changes of use and associated building work can trigger requirements relating to fire safety, structure, sound insulation, ventilation, drainage, thermal performance and accessibility.",
  },
  {
    title: "Fire strategy",
    text:
      "Escape routes, fire doors, compartmentation, alarms, emergency lighting and higher-risk layouts should be considered before the room arrangement is fixed.",
  },
];

const process = [
  {
    title: "Property and planning review",
    text:
      "We review the address, existing use, planning history, Article 4 controls, local standards and your intended occupancy.",
  },
  {
    title: "Feasibility layout",
    text:
      "The property is tested for compliant bedrooms, communal areas, kitchens, bathrooms, circulation, refuse, cycles and fire escape.",
  },
  {
    title: "Planning strategy",
    text:
      "We identify whether the proposal is C4, sui generis, permitted development, a full planning application or potentially a lawful existing use.",
  },
  {
    title: "Planning submission",
    text:
      "Where required, we prepare the drawings, schedules and supporting planning case and coordinate proportionate specialist information.",
  },
  {
    title: "Technical design",
    text:
      "Following the agreed planning route, the design can be developed into a coordinated Building Regulations package.",
  },
  {
    title: "Building Control support",
    text:
      "We issue the architectural information and respond to reasonable Building Control queries within the agreed appointment.",
  },
];

const deliverables = [
  "Pre-purchase HMO feasibility review",
  "Planning and Article 4 assessment",
  "Existing and proposed floor plans",
  "Bedroom and amenity-space schedule",
  "C3 to C4 planning applications",
  "Sui generis HMO planning applications",
  "Planning Statements and Design and Access Statements",
  "Lawful development application drawings",
  "Refuse, cycle and parking layouts",
  "Fire-safety layout coordination",
  "Building Regulations drawings",
  "Structural and specialist consultant coordination",
];

const risks = [
  {
    icon: Search,
    title: "Buying before checking the planning route",
    text:
      "A property may appear capable of accommodating the intended rooms but still face Article 4 restrictions, local concentration policies, parking constraints or previous planning conditions.",
  },
  {
    icon: Home,
    title: "Designing only around bedroom count",
    text:
      "Overcrowded layouts can weaken planning applications, reduce tenant amenity and create problems with circulation, shared space, ventilation and management.",
  },
  {
    icon: Flame,
    title: "Leaving fire safety until technical design",
    text:
      "The escape route, stair arrangement, inner rooms, cooking facilities and storey heights can materially affect whether the proposed layout is workable.",
  },
  {
    icon: ShieldCheck,
    title: "Treating one approval as covering everything",
    text:
      "Planning permission, HMO licensing, Building Regulations and landlord safety duties are separate. Securing one does not automatically satisfy the others.",
  },
];

const faqs = [
  {
    question: "Does a six-person HMO need planning permission?",
    answer:
      "A property occupied by three to six unrelated individuals sharing facilities will generally fall within Use Class C4. A change from a C3 dwelling to C4 may be permitted development, but an Article 4 Direction, planning condition, previous use or local circumstances can mean that planning permission is required.",
  },
  {
    question: "When does an HMO become sui generis?",
    answer:
      "An HMO occupied by more than six residents will generally fall outside Class C4 and be treated as sui generis. A material change of use to a larger HMO normally requires planning permission.",
  },
  {
    question: "Is HMO licensing the same as planning permission?",
    answer:
      "No. Planning controls the use and development of the property, while licensing regulates how the HMO is operated and whether it meets the relevant housing standards. Both may be required.",
  },
  {
    question: "Do all five-person HMOs need a licence?",
    answer:
      "Mandatory licensing generally applies where at least five people from more than one household occupy the HMO and share facilities. Councils may also operate additional licensing schemes that cover smaller HMOs.",
  },
  {
    question: "Can Hepburn Architects assess a property before purchase?",
    answer:
      "Yes. A pre-purchase feasibility review can identify the likely planning route, Article 4 position, indicative occupancy, layout constraints and specialist information likely to be required.",
  },
  {
    question: "Can every HMO bedroom have an ensuite?",
    answer:
      "Not necessarily. Ensuites can improve privacy, but they must not compromise bedroom sizes, shared amenity, ventilation, drainage, circulation or fire safety.",
  },
  {
    question: "Can you help with an existing unauthorised HMO?",
    answer:
      "Yes. We can review the planning history, available evidence, existing layout and length of use before advising on possible planning or lawful development routes. Each case depends on its evidence and circumstances.",
  },
  {
    question: "Do you provide Building Regulations drawings for HMOs?",
    answer:
      "Yes. We can prepare coordinated architectural drawings addressing the relevant technical requirements and integrate structural and specialist information where required.",
  },
];

export default function HmoConversionsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "HMO Architectural, Planning and Building Regulations Services",
    provider: {
      "@type": "Organization",
      name: "Hepburn Architects Ltd",
      url: site.url,
    },
    areaServed: [
      "Birmingham",
      "West Midlands",
      "Middlesbrough",
      "Teesside",
      "England",
    ],
    serviceType:
      "HMO feasibility, planning applications and Building Regulations drawings",
    url: `${site.url}/services/hmo-conversions`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="service-detail-hero">
        <div className="shell service-detail-grid">
          <div>
            <small className="eyebrow">
              HMO architecture · planning · technical design
            </small>

            <h1>Specialist HMO architects for property owners and investors.</h1>

            <p className="lead">
              Planning-led HMO feasibility, conversion design and Building
              Regulations support for C4, sui generis and existing HMO
              properties.
            </p>

            <p>
              We assess the planning route, occupancy potential, space
              standards, amenity and fire-safety implications before the layout
              is fixed or substantial costs are committed.
            </p>

            <div className="actions">
              <Link className="btn primary" href="/estimate">
                Get an indicative fee <ArrowRight size={17} />
              </Link>

              <a className="btn secondary" href={site.phoneHref}>
                <Phone size={17} /> Call {site.phone}
              </a>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1800&q=88"
            alt="Residential property being assessed for an HMO conversion"
          />
        </div>
      </section>

      <section className="section">
        <div className="shell service-detail-columns">
          <div>
            <small className="eyebrow">Before you purchase or convert</small>
            <h2>Understand the approval route before committing capital.</h2>

            <p>
              A workable HMO is not simply a house with additional bedrooms.
              The planning position, licensing regime, local room standards,
              shared amenity, escape strategy and physical constraints should
              be considered together.
            </p>
          </div>

          <ul className="large-check-list">
            <li>
              <CheckCircle2 /> Article 4 and permitted development checks
            </li>
            <li>
              <CheckCircle2 /> C4 or sui generis use assessment
            </li>
            <li>
              <CheckCircle2 /> Indicative occupancy and layout testing
            </li>
            <li>
              <CheckCircle2 /> Local HMO policy and concentration review
            </li>
            <li>
              <CheckCircle2 /> Fire-safety and escape-route appraisal
            </li>
            <li>
              <CheckCircle2 /> Refuse, cycle and parking requirements
            </li>
          </ul>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">HMO project types</small>
            <h2>Support for small, large and existing HMOs.</h2>
          </div>

          <div className="process-card-grid">
            {hmoTypes.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title}>
                  <Icon />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Separate approval regimes</small>
            <h2>Planning, licensing and Building Regulations are not the same.</h2>

            <p>
              A successful HMO strategy should identify every relevant approval
              and avoid assuming that one consent automatically resolves the
              others.
            </p>
          </div>

          <div className="process-card-grid">
            {approvalRoutes.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <p style={{ marginTop: "2rem", opacity: 0.75 }}>
            National reference material is available from{" "}
            <a
              href="https://www.planningportal.co.uk/permission/common-projects/change-of-use/use-classes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Planning Portal
            </a>{" "}
            and{" "}
            <a
              href="https://www.gov.uk/private-renting/houses-in-multiple-occupation"
              target="_blank"
              rel="noopener noreferrer"
            >
              GOV.UK
            </a>
            . Local council requirements must also be checked.
          </p>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Common project risks</small>
            <h2>Issues worth resolving before the design is finalised.</h2>
          </div>

          <div className="process-card-grid">
            {risks.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  style={{ color: "var(--ink)" }}
                >
                  <Icon style={{ color: "var(--orange)" }} />
                  <h3>{item.title}</h3>
                  <p style={{ color: "var(--muted)" }}>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Our HMO process</small>
            <h2>A structured route from feasibility to technical design.</h2>
          </div>

          <div className="process-card-grid">
            {process.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell service-deliverables">
          <div>
            <small className="eyebrow">Typical HMO deliverables</small>
            <h2>Architectural information tailored to the property and route.</h2>

            <p>
              The exact scope is confirmed in a written fee proposal. Planning,
              technical design and specialist consultant requirements can be
              appointed in defined stages.
            </p>
          </div>

          <div className="deliverables-grid">
            {deliverables.map((item) => (
              <div key={item}>
                <CheckCircle2 /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell faq-layout">
          <div>
            <small className="eyebrow">HMO questions</small>
            <h2>Frequently asked questions about HMO conversions.</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell final-cta">
          <small className="eyebrow">Assess the property</small>
          <h2>Considering an HMO purchase or conversion?</h2>

          <p>
            Discuss the proposed occupancy, planning route and property
            constraints directly with Hepburn Architects before committing to
            the scheme.
          </p>

          <div className="actions centered-actions">
            <a className="btn primary" href={site.phoneHref}>
              <Phone size={18} /> {site.phone}
            </a>

            <a
              className="btn secondary"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a free consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
