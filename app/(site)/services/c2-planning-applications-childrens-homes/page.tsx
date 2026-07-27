import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  HeartHandshake,
  Home,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { site } from "@/lib/site";
import styles from "./page.module.css";

const title = "C2 Planning Applications for Children's Homes | Hepburn Architects";
const description =
  "Child-centred architectural and planning support for C2 children's homes, including property feasibility, change of use, planning drawings, statements and officer liaison.";
const canonical = `${site.url}/services/c2-planning-applications-childrens-homes`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/c2-planning-applications-childrens-homes" },
  openGraph: {
    title,
    description,
    url: "/services/c2-planning-applications-childrens-homes",
    type: "website",
    images: [
      {
        url: "/images/selected-work-2.png",
        width: 1450,
        height: 1088,
        alt: "Welcoming residential home with a garden",
      },
    ],
  },
};

const childCentredPrinciples = [
  {
    title: "Belonging and stability",
    text: "Spaces should support ordinary routines, shared meals, conversation, rest and positive relationships.",
    icon: HeartHandshake,
  },
  {
    title: "Safety with dignity",
    text: "The layout should support safeguarding and appropriate supervision without making children feel controlled by the building.",
    icon: ShieldCheck,
  },
  {
    title: "A genuinely domestic character",
    text: "Bedrooms, shared rooms, kitchens and gardens should feel like parts of a cared-for home rather than operational units.",
    icon: Home,
  },
  {
    title: "Connection to community",
    text: "A suitable location can support access to education, healthcare, recreation, transport and positive community life.",
    icon: Users,
  },
] as const;

const suitabilityPoints = [
  "A safe, calm and genuinely domestic environment",
  "Comfortable bedrooms that support privacy and dignity",
  "Welcoming shared spaces for meals, play, study and everyday routines",
  "A secure and usable garden or outdoor area",
  "Appropriate staff support without creating an institutional atmosphere",
  "Reasonable access to education, healthcare, recreation and local services",
] as const;

const assessmentPoints = [
  "The existing lawful use of the property",
  "The number and needs of the children who may live there",
  "Staffing levels, shift patterns and overnight arrangements",
  "Vehicle movements, parking, visitors and deliveries",
  "Noise, privacy and the relationship with neighbouring homes",
  "External alterations, refuse storage and use of outdoor space",
  "Local planning policy, planning history and relevant conditions",
  "Whether the proposed use would amount to a material change of use",
] as const;

const process = [
  {
    title: "Understand the children and the care model",
    text: "We begin with the intended purpose of the home, the children it is expected to support and the day-to-day care arrangements. This helps ensure that the property and proposed layout respond to real needs rather than simply fitting a planning label.",
  },
  {
    title: "Review the property before commitment",
    text: "We assess the location, planning history, existing lawful use, internal layout, outdoor space, parking and likely technical constraints. This can be completed before purchase or lease where access and information are available.",
  },
  {
    title: "Develop a sensitive residential design",
    text: "The layout is developed as a home: comfortable bedrooms, welcoming shared rooms, calm circulation, appropriate staff areas and safe access to outdoor space, while avoiding an unnecessarily institutional character.",
  },
  {
    title: "Prepare a clear and honest planning case",
    text: "We coordinate the drawings and supporting information so the local authority can understand the actual scale, operation and impacts of the proposal. The submission should address planning matters without disclosing unnecessary personal information about children.",
  },
  {
    title: "Support the application through determination",
    text: "We submit and monitor the application, respond to reasonable officer questions and help the provider present accurate information where clarification is needed.",
  },
] as const;

const appointmentItems = [
  "Initial property and planning-history review",
  "C2 and C3 use-class assessment",
  "Measured survey and existing drawings",
  "Proposed plans, elevations and site information",
  "Planning Statement or Design and Access Statement",
  "Operational and management information coordinated with the provider",
  "Parking, refuse and cycle-storage strategy",
  "Submission, validation and planning-officer liaison",
  "Responses to proportionate consultation comments",
  "Building Regulations drawings where separately appointed",
] as const;

const faqs = [
  {
    question: "Does every children’s home require C2 planning permission?",
    answer:
      "No. The planning position depends on the property’s existing lawful use and the particular nature and intensity of the proposed operation. The number of children is relevant, but it is not the only consideration. A property-specific assessment should be completed before relying on either C2 or C3 use.",
  },
  {
    question: "Can a children’s home operate within Use Class C3?",
    answer:
      "In some circumstances a small home may retain a C3 character, but this is highly dependent on how the household functions, the care arrangements and the planning facts of the case. Written confirmation from the local planning authority or a lawful-development application may be appropriate.",
  },
  {
    question: "Should we assess a property before buying or leasing it?",
    answer:
      "Yes. An early review can identify planning risk, unsuitable layouts, parking constraints, nearby sensitivities and technical issues before a significant commitment is made. It cannot guarantee permission, but it can help avoid preventable problems.",
  },
  {
    question: "What will the council normally want to understand?",
    answer:
      "The authority may need clear information about the number of children, staffing, shift changes, overnight arrangements, visitors, parking, deliveries, management, use of the garden and any physical alterations. The level of information should be proportionate and safeguarding-conscious.",
  },
  {
    question: "Is planning permission the same as Ofsted registration?",
    answer:
      "No. Planning and Ofsted registration are separate processes. Current Ofsted guidance requires applicants to address the planning status of the property and recommends securing any required planning permission before applying for registration.",
  },
  {
    question: "Can neighbours prevent a children’s home?",
    answer:
      "Neighbours may comment on a planning application, but the decision must be based on relevant planning considerations and the evidence relating to the specific proposal. A clear, respectful and accurate submission can help address misunderstandings while recognising legitimate amenity concerns.",
  },
  {
    question: "Can Hepburn Architects help with a refused or retrospective application?",
    answer:
      "Yes. Hepburn Architects can review the decision notice, officer report, planning history and existing evidence, then advise whether clarification, redesign, resubmission, a lawful-development route or an appeal should be considered.",
  },
  {
    question: "Do you also prepare Building Regulations drawings?",
    answer:
      "Yes, where separately appointed. Planning approval does not replace Building Regulations, fire-safety duties, accessibility requirements or the provider’s wider regulatory responsibilities.",
  },
] as const;

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Planning Applications for Children’s Homes",
    description,
    serviceType: "Children’s-home planning and architectural support",
    url: canonical,
    areaServed: ["Birmingham", "Solihull", "West Midlands", "England"],
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Planning Applications for Children’s Homes",
        item: canonical,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

export default function ChildrensHomesPlanningPage() {
  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="service-detail-hero">
        <div className="shell">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Children’s-home planning</span>
          </nav>
          <div className="service-detail-grid">
            <div>
              <small className="eyebrow">Specialist planning and architectural support</small>
              <h1>Planning applications for children’s homes</h1>
              <p className="lead">
                Helping responsible providers create safe, welcoming and well-integrated homes
                where children and young people can feel secure, supported and part of a community.
              </p>
              <div className="actions">
                <a
                  className="btn primary"
                  href={site.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuss a potential children’s home <ArrowRight size={17} />
                </a>
                <a className="btn secondary" href={site.phoneHref}>
                  <Phone size={17} /> Call {site.phone}
                </a>
              </div>
            </div>
            <Image
              src="/images/selected-work-2.png"
              alt="Welcoming residential home with a generous garden"
              width={1450}
              height={1088}
              priority
              sizes="(max-width: 950px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <main>
        <section className="section">
          <div className="shell service-detail-columns">
            <div>
              <small className="eyebrow">A home first</small>
              <h2>Every child deserves a place where they can feel safe and valued.</h2>
            </div>
            <div className={styles.readable}>
              <p className="lead">
                A children’s home is not simply a property with a different planning
                classification. It is a place where children may build routines, relationships
                and a sense of belonging during an important period of their lives.
              </p>
              <p>
                Our work begins with that responsibility. We consider how the building will
                feel and function for the children who may live there, while preparing the
                clear planning and architectural information needed by the local authority.
              </p>
            </div>
          </div>
        </section>

        <section className="section sand-section">
          <div className="shell">
            <div className="page-intro">
              <small className="eyebrow">Child-centred design</small>
              <h2>Designing around wellbeing, dignity and everyday life.</h2>
              <p className="lead">
                Safeguarding and supervision are essential, but the environment should still
                feel domestic, comfortable and welcoming rather than clinical or institutional.
              </p>
            </div>
            <div className={styles.principleGrid}>
              {childCentredPrinciples.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article key={principle.title}>
                    <Icon aria-hidden="true" />
                    <h3>{principle.title}</h3>
                    <p>{principle.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell service-detail-columns">
            <div>
              <small className="eyebrow">Property suitability</small>
              <h2>What makes a property suitable for a children’s home?</h2>
              <p>
                Suitability depends on the children’s needs, the proposed care model, the
                location and the building itself. It should be assessed before purchase or
                lease wherever possible.
              </p>
            </div>
            <ul className="large-check-list">
              {suitabilityPoints.map((point) => (
                <li key={point}>
                  <CheckCircle2 aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section dark-section">
          <div className="shell service-detail-columns">
            <div>
              <small className="eyebrow">C2 and C3 planning use</small>
              <h2>The planning position must be assessed on the actual proposal.</h2>
            </div>
            <div className={styles.readable}>
              <p className="lead">
                Children’s homes are often associated with Use Class C2, but not every proposal
                can be classified by a simple headcount or label.
              </p>
              <p>
                The local planning authority may consider the existing lawful use, how the
                household will operate, the nature of the care, staffing and shift patterns,
                vehicle movements and whether the character of the use would materially change.
                Each property and operating model should therefore be assessed on its own facts.
              </p>
              <p>
                Where permission may not be required, formal written confirmation or a
                lawful-development application can provide greater certainty than relying on
                an informal assumption.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell service-detail-columns">
            <div>
              <small className="eyebrow">Planning assessment</small>
              <h2>What the local authority may consider.</h2>
              <p className="lead">
                A strong submission explains the real operation of the home clearly and
                proportionately, while protecting the privacy of the children who may live there.
              </p>
            </div>
            <ul className={styles.ruleList}>
              {assessmentPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section sand-section">
          <div className="shell">
            <div className="page-intro">
              <small className="eyebrow">Our process</small>
              <h2>A careful route from initial property review to planning decision.</h2>
            </div>
            <ol className={styles.processGrid}>
              {process.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="shell service-deliverables">
            <div>
              <small className="eyebrow">Typical appointment</small>
              <h2>Planning and architectural support tailored to the home.</h2>
              <p>
                The exact scope depends on the property, planning history, care model and local
                validation requirements. It is confirmed in writing before work begins.
              </p>
            </div>
            <div className="deliverables-grid">
              {appointmentItems.map((item) => (
                <div key={item}>
                  <CheckCircle2 aria-hidden="true" /> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section dark-section">
          <div className="shell service-detail-columns">
            <div>
              <small className="eyebrow">Neighbours and community</small>
              <h2>Clear information, respectful engagement and evidence-led planning.</h2>
            </div>
            <div className={styles.readable}>
              <p className="lead">
                Proposals for children’s homes can sometimes prompt questions or concern. These
                should be addressed calmly, accurately and without presenting either the children
                or the surrounding community as a problem.
              </p>
              <p>
                Our submissions explain the actual scale of the proposal, how the home will be
                responsibly managed and how relevant amenity matters will be addressed. We
                distinguish legitimate planning considerations from unsupported assumptions,
                while recognising the importance of a positive relationship with neighbours.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className={`shell ${styles.informationGrid}`}>
            <article>
              <small className="eyebrow">Ofsted and planning</small>
              <h2>Separate processes that should be coordinated.</h2>
              <p>
                Planning approval does not provide Ofsted registration, and Ofsted registration
                does not replace planning permission. Current Ofsted guidance requires applicants
                to address the planning status of the property and recommends securing any
                required permission before applying.
              </p>
              <a
                href="https://www.gov.uk/government/publications/register-a-childrens-home/apply-to-register-a-childrens-home"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the current Ofsted application guidance
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </article>
            <article>
              <small className="eyebrow">Complex applications</small>
              <h2>Refused, retrospective or uncertain proposals.</h2>
              <p>
                We can review existing applications, enforcement concerns, refusals and cases
                where the correct use class is disputed. The appropriate route may be a revised
                submission, lawful-development application, appeal or clearer operational evidence.
              </p>
            </article>
            <article>
              <small className="eyebrow">Important distinction</small>
              <h2>Planning advice is property-specific.</h2>
              <p>
                The information on this page is general guidance. It is not a substitute for
                reviewing the particular property, lawful use, care model, local policy and
                planning history.
              </p>
            </article>
          </div>
        </section>

        <section className="section dark-section">
          <div className="shell faq-layout">
            <div>
              <small className="eyebrow">Frequently asked questions</small>
              <h2>Children’s-home planning questions.</h2>
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
            <small className="eyebrow">Discuss a potential children’s home</small>
            <h2>Start with a careful review of the property and proposed care model.</h2>
            <p>
              We can assess the planning history, existing layout, location and likely approval
              route before you commit to an application, purchase or lease.
            </p>
            <div className="actions centered-actions">
              <a
                className="btn primary"
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a consultation
              </a>
              <Link className="btn secondary" href="/contact">
                Send property details
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
