import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  CircleCheck,
  ClipboardList,
  DraftingCompass,
  ExternalLink,
  FileCheck2,
  HeartHandshake,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { getProjects, projectImageAlt, projectImageUrl } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./page.module.css";
import { StructuredData } from "@/components/StructuredData";
import { buildGraph } from "@/lib/structured-data";

const title = "Children's Home Planning Applications";
const description =
  "Architectural and planning support for C2 children's homes, including feasibility, change of use, drawings, statements and officer liaison.";
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
        url: "/images/selected-work-2.webp",
        width: 1450,
        height: 1088,
        alt: "Welcoming residential home with a garden",
      },
    ],
  },
};

const principles = [
  {
    title: "A home first",
    text: "Domestic, welcoming and grounded in everyday life.",
    icon: Home,
  },
  {
    title: "Safe and secure",
    text: "Safeguarding supported without an institutional feel.",
    icon: ShieldCheck,
  },
  {
    title: "Support and stability",
    text: "Space for routines, relationships and belonging.",
    icon: HeartHandshake,
  },
  {
    title: "Connected",
    text: "Part of a neighbourhood and close to essential services.",
    icon: Users,
  },
  {
    title: "Clear and considered",
    text: "Accurate planning information, prepared with care.",
    icon: BookOpenCheck,
  },
] as const;

const process = [
  {
    shortTitle: "Understand",
    icon: HeartHandshake,
    title: "Understand the children and the care model",
    text: "We begin with the intended purpose of the home, the children it is expected to support and the day-to-day care arrangements. This helps ensure that the property and proposed layout respond to real needs rather than simply fitting a planning label.",
  },
  {
    shortTitle: "Review",
    icon: Search,
    title: "Review the property before commitment",
    text: "We assess the location, planning history, existing lawful use, internal layout, outdoor space, parking and likely technical constraints. This can be completed before purchase or lease where access and information are available.",
  },
  {
    shortTitle: "Design",
    icon: DraftingCompass,
    title: "Develop a sensitive residential design",
    text: "The layout is developed as a home: comfortable bedrooms, welcoming shared rooms, calm circulation, appropriate staff areas and safe access to outdoor space, while avoiding an unnecessarily institutional character.",
  },
  {
    shortTitle: "Prepare",
    icon: ClipboardList,
    title: "Prepare a clear and honest planning case",
    text: "We coordinate the drawings and supporting information so the local authority can understand the actual scale, operation and impacts of the proposal. The submission should address planning matters without disclosing unnecessary personal information about children.",
  },
  {
    shortTitle: "Support",
    icon: MessageCircle,
    title: "Support the application through determination",
    text: "We submit and monitor the application, respond to reasonable officer questions and help the provider present accurate information where clarification is needed.",
  },
] as const;

const assessmentPoints = [
  "Existing lawful use",
  "Number and needs of the children who may live there",
  "Staffing arrangements, shift patterns and overnight staff",
  "Visitors, deliveries, parking and vehicle movements",
  "Noise, privacy and residential amenity",
  "Use of gardens and outdoor areas",
  "Physical alterations to the property",
  "Refuse and cycle storage",
  "Local planning policy, planning history and relevant conditions",
  "Whether the proposal would amount to a material change of use",
] as const;

const suitabilityPoints = [
  {
    title: "Domestic character",
    text: "A safe, calm building that reads and functions as a cared-for home.",
    icon: Home,
  },
  {
    title: "Bedroom privacy and dignity",
    text: "Comfortable personal space that supports rest, choice and a sense of ownership.",
    icon: Sparkles,
  },
  {
    title: "Welcoming shared spaces",
    text: "Rooms for meals, conversation, play, study and familiar daily routines.",
    icon: HeartHandshake,
  },
  {
    title: "Safe outdoor space",
    text: "A secure, usable garden or outdoor area for fresh air and recreation.",
    icon: MapPin,
  },
  {
    title: "Suitable staff support areas",
    text: "Practical support and supervision arranged discreetly within a domestic setting.",
    icon: ShieldCheck,
  },
  {
    title: "Access to essential services",
    text: "Reasonable connections to education, healthcare, recreation and local life.",
    icon: Users,
  },
] as const;

const supportingDocuments = [
  {
    title: "Planning drawings",
    text: "Accurate existing and proposed plans, elevations and site information.",
    icon: DraftingCompass,
  },
  {
    title: "Design and Access Statement",
    text: "A proportionate design narrative where local requirements make one necessary.",
    icon: BookOpenCheck,
  },
  {
    title: "Operational information",
    text: "Clear, safeguarding-conscious information about how the home would function.",
    icon: ClipboardList,
  },
  {
    title: "Amenity assessment",
    text: "Consideration of privacy, noise, gardens and relationships with nearby homes.",
    icon: Home,
  },
  {
    title: "Policy and precedent",
    text: "Planning history, development-plan policy and relevant case-specific context.",
    icon: Search,
  },
  {
    title: "Consultation support",
    text: "Accurate responses to proportionate questions from consultees and neighbours.",
    icon: Users,
  },
  {
    title: "Planning negotiation",
    text: "Constructive liaison with the planning officer as the application progresses.",
    icon: MessageCircle,
  },
  {
    title: "Post-decision support",
    text: "Advice on conditions, revisions or next steps following the authority’s decision.",
    icon: FileCheck2,
  },
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
    provider: { "@type": "Organization", name: site.name, url: site.url },
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

export default async function ChildrensHomesPlanningPage() {
  const allProjects = await getProjects();
  const preferredSlugs = [
    "contemporary-bungalow-upton",
    "passive-house-solihull",
    "sutton-coldfield-extension",
  ];
  const experienceProjects = preferredSlugs
    .map((slug) => allProjects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <>
      <StructuredData data={buildGraph(...schemas)} />

      <section className={styles.hero}>
        <div className="shell">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Children’s-home planning</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <small className="eyebrow">Specialist planning and architectural support</small>
              <h1>
                Planning applications for <span>children’s homes</span>
              </h1>
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
                  Book a consultation <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="btn secondary" href={site.phoneHref}>
                  <Phone size={17} aria-hidden="true" /> Call {site.phone}
                </a>
              </div>
              <ul className={styles.trustPoints} aria-label="Service principles">
                <li><Check aria-hidden="true" /> Specialist C2 planning experience</li>
                <li><Check aria-hidden="true" /> Child-centred design at the heart</li>
                <li><Check aria-hidden="true" /> Clear advice from first review to decision</li>
              </ul>
            </div>

            <div className={styles.heroVisual}>
              <Image
                src="/images/childrens-home-planning-hero.png"
                alt="Architectural illustration of a welcoming residential children’s home"
                width={1717}
                height={916}
                priority
                sizes="(max-width: 850px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className={styles.principlesSection} aria-labelledby="principles-heading">
          <div className="shell">
            <h2 id="principles-heading" className={styles.visuallyHidden}>
              Principles guiding our work
            </h2>
            <div className={styles.principles}>
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article key={principle.title}>
                    <span className={styles.iconCircle}><Icon aria-hidden="true" /></span>
                    <div>
                      <h3>{principle.title}</h3>
                      <p>{principle.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`section ${styles.featureSection}`}>
          <div className={`shell ${styles.featureGrid}`}>
            <div className={styles.featureCopy}>
              <small className="eyebrow">Child-centred design</small>
              <h2>A home that supports better outcomes</h2>
              <p className="lead">
                Every child deserves a home where they can feel safe, valued and supported.
                The environment should make room for wellbeing, dignity and the familiar
                rhythms of everyday life.
              </p>
              <p>
                Comfortable bedrooms can support privacy and rest, while welcoming kitchens,
                shared rooms and gardens create opportunities for meals, conversation, play and
                positive relationships. Safeguarding and supervision remain essential, but the
                building should provide safety without feeling clinical or controlled.
              </p>
              <Link className={styles.textLink} href="/contact">
                Discuss the needs of a potential home <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.featureImage}>
              <Image
                src="/images/selected-work-2.webp"
                alt="Warm residential living space opening onto a landscaped garden"
                fill
                sizes="(max-width: 850px) 100vw, 38vw"
              />
            </div>
            <aside className={styles.planningNote}>
              <small className="eyebrow">Planning classification</small>
              <h3>C2 use class explained</h3>
              <p>
                Children’s homes are commonly associated with Use Class C2, but classification
                depends on the actual character and operation of the use. The authority may
                consider the existing lawful use, care arrangements, staffing, movements and
                whether a material change of use would occur.
              </p>
              <p>
                Not every proposal automatically requires C2 permission. Written confirmation or
                a lawful-development application may provide greater certainty where permission
                may not be required.
              </p>
            </aside>
          </div>
        </section>

        <section className={`section sand-section ${styles.processSection}`}>
          <div className={`shell ${styles.processLayout}`}>
            <div className={styles.processIntro}>
              <small className="eyebrow">Our process</small>
              <h2>A careful route from first review to planning decision.</h2>
              <p>
                Each stage connects the needs of the home with the planning evidence required
                to explain it clearly.
              </p>
            </div>
            <ol className={styles.timeline}>
              {process.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.shortTitle}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <Icon className={styles.stepIcon} aria-hidden="true" />
                    <span className={styles.stepName}>{step.shortTitle}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className={`section ${styles.assessmentSection}`}>
          <div className={`shell ${styles.editorialColumns}`}>
            <div className={styles.stickyIntro}>
              <small className="eyebrow">Planning assessment</small>
              <h2>What the local authority may consider</h2>
              <p className="lead">
                A strong submission explains the real operation of the home clearly and
                proportionately, while protecting the privacy of the children who may live there.
              </p>
              <p>
                This information helps an officer understand the proposal on its own facts. It
                should be accurate, relevant and safeguarding-conscious.
              </p>
            </div>
            <ul className={styles.assessmentList}>
              {assessmentPoints.map((point, index) => (
                <li key={point}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`section ${styles.sageSection}`}>
          <div className="shell">
            <div className={styles.sectionHeading}>
              <div>
                <small className="eyebrow">Property suitability</small>
                <h2>Assessing a property before you commit</h2>
              </div>
              <div>
                <p className="lead">
                  Suitability depends on the children’s needs, the proposed care model, the
                  location and the building itself. An early review can identify planning,
                  layout and technical concerns before purchase or lease.
                </p>
                <Link className="btn secondary" href="/contact">
                  Request an initial property review
                </Link>
              </div>
            </div>
            <div className={styles.suitabilityList}>
              {suitabilityPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <article key={point.title}>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`section ${styles.experienceSection}`}>
          <div className="shell">
            <div className={styles.experiencePanel}>
              <div>
                <small className="eyebrow">Specialist planning knowledge</small>
                <h2>Practical knowledge. Better decisions.</h2>
              </div>
              <p className="lead">
                We apply planning, residential design and change-of-use experience to each
                property individually, considering planning history, local policy, surrounding
                context, layout and operational information.
              </p>
            </div>
            {experienceProjects.length > 0 && (
              <div className={styles.projectGrid}>
                {experienceProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <div className={styles.projectImage}>
                      <Image
                        src={projectImageUrl(project.featuredImage, 900)}
                        alt={projectImageAlt(project)}
                        fill
                        sizes="(max-width: 720px) 100vw, 33vw"
                      />
                    </div>
                    <div className={styles.projectMeta}>
                      <small>{project.projectType || project.category}</small>
                      <h3>{project.title}</h3>
                      <span>{project.location}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className={`section sand-section ${styles.documentsSection}`}>
          <div className="shell">
            <div className={styles.sectionHeading}>
              <div>
                <small className="eyebrow">Supporting documents</small>
                <h2>Clear information for a well-understood proposal</h2>
              </div>
              <p className="lead">
                The submission should give the authority enough information to assess the
                property and its proposed operation without disclosing unnecessary personal
                information about children.
              </p>
            </div>
            <div className={styles.documentGrid}>
              {supportingDocuments.map((document) => {
                const Icon = document.icon;
                return (
                  <div key={document.title}>
                    <Icon aria-hidden="true" />
                    <strong>{document.title}</strong>
                    <span>{document.text}</span>
                  </div>
                );
              })}
            </div>
            <p className={styles.scopeNote}>
              The precise submission requirements vary between local authorities and depend on
              the property, planning history, proposed operation and validation checklist.
            </p>
          </div>
        </section>

        <section className={`section dark-section ${styles.communitySection}`}>
          <div className={`shell ${styles.communityGrid}`}>
            <div>
              <small className="eyebrow">Neighbours and community</small>
              <h2>Clear information and respectful engagement</h2>
            </div>
            <div>
              <p className="lead">
                Questions or concerns should be addressed calmly, accurately and without
                presenting either children or neighbouring residents as a problem.
              </p>
              <p>
                Good planning information can explain the actual scale and operation of the
                home, distinguish legitimate planning considerations from unsupported
                assumptions and show how relevant amenity matters have been considered.
                Information about privacy and safeguarding should remain proportionate.
              </p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.distinctionsSection}`}>
          <div className="shell">
            <div className={styles.sectionHeading}>
              <div>
                <small className="eyebrow">Important distinctions</small>
                <h2>Related processes, considered clearly</h2>
              </div>
              <p>
                Planning is one part of establishing a suitable children’s home. Other
                regulatory and technical responsibilities remain separate.
              </p>
            </div>
            <div className={styles.informationPanels}>
              <article>
                <span className={styles.panelIcon}><FileCheck2 aria-hidden="true" /></span>
                <small className="eyebrow">Important distinctions</small>
                <h3>The facts of the property determine the route.</h3>
                <p>
                  This page provides general guidance, not property-specific legal advice. The
                  lawful use, care model, planning history, local policy and proposed operation
                  must be assessed together. Planning, Building Regulations and registration are
                  separate systems, and planning permission cannot be guaranteed.
                </p>
                <details className={styles.compactDetails}>
                  <summary>Refused, retrospective or uncertain proposals</summary>
                  <p>
                    We can review applications, enforcement concerns, refusals and disputed use
                    classes. The appropriate route may be a revised submission,
                    lawful-development application, appeal or clearer operational evidence.
                  </p>
                </details>
              </article>
              <article>
                <span className={styles.panelIcon}><CircleCheck aria-hidden="true" /></span>
                <small className="eyebrow">Ofsted and planning</small>
                <h3>Separate processes that should be coordinated.</h3>
                <p>
                  Planning approval does not provide Ofsted registration, and Ofsted registration
                  does not replace planning permission. Current Ofsted guidance requires applicants
                  to address the planning status of the property and recommends securing any
                  required permission before applying.
                </p>
                <a
                  className={styles.textLink}
                  href="https://www.gov.uk/government/publications/register-a-childrens-home/apply-to-register-a-childrens-home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the current Ofsted application guidance
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </article>
              <article className={styles.consultationPanel}>
                <span className={styles.panelIcon}><Phone aria-hidden="true" /></span>
                <small className="eyebrow">Discuss a potential children’s home</small>
                <h3>Start with a careful property review.</h3>
                <p>
                  We can assess the planning history, existing layout, location and likely
                  approval route before you commit to an application, purchase or lease.
                </p>
                <a
                  className="btn primary"
                  href={site.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a consultation
                </a>
                <a className={styles.phoneLink} href={site.phoneHref}>
                  <Phone size={16} aria-hidden="true" /> {site.phone}
                </a>
              </article>
            </div>
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

        <section className={styles.contactStrip}>
          <div className={`shell ${styles.contactStripInner}`}>
            <span className={styles.contactIcon}><Phone aria-hidden="true" /></span>
            <div>
              <h2>Need to talk through your project?</h2>
              <p>Speak directly with Hepburn Architects about the property and proposed care model.</p>
            </div>
            <a className="btn secondary" href={site.phoneHref}>
              Call {site.phone}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
