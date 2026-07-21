import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { services } from "@/lib/content";
import {
  getProjects,
  projectImageAlt,
  projectImageUrl,
  type Project,
} from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Architect Solihull | Extensions & New Homes",
  description:
    "RIBA Chartered residential architect in Solihull for house extensions, loft conversions, new homes, planning applications and Building Regulations.",
  alternates: { canonical: "/locations/solihull-architects" },
  openGraph: {
    title: "Residential Architect Solihull | Extensions & New Homes",
    description:
      "Director-led residential architecture in Solihull for extensions, remodelling, new homes, planning and Building Regulations.",
    url: "/locations/solihull-architects",
    type: "website",
  },
};

const solihullFaqs = [
  {
    question: "Do I need planning permission for a house extension in Solihull?",
    answer:
      "Some extensions can be carried out under permitted development, but this depends on the size and position of the proposal, the planning history of the property and whether local restrictions apply. Where permitted development is relied upon, a Lawful Development Certificate can provide formal confirmation.",
  },
  {
    question: "Does Solihull Council provide pre-application advice for house extensions?",
    answer:
      "Solihull Council does not currently provide its pre-application service for householder works or minor commercial proposals. It directs homeowners to its adopted House Extension Guidelines, so the design should be tested carefully against those principles before submission.",
  },
  {
    question: "Can you help with Green Belt or conservation-area properties?",
    answer:
      "Yes. We assess the planning history, policy context, heritage or landscape constraints, neighbouring amenity and the scale of the existing property before recommending a design and approval route.",
  },
  {
    question: "Can Hepburn Architects prepare Building Regulations drawings?",
    answer:
      "Yes. We prepare coordinated Building Regulations drawings and technical information for house extensions, loft conversions, remodelling and new homes, with structural and specialist information coordinated where required.",
  },
  {
    question: "Which areas around Solihull do you cover?",
    answer:
      "We support projects across Solihull, Knowle, Dorridge, Shirley, Olton, Dickens Heath, Balsall Common and surrounding parts of the West Midlands and Warwickshire.",
  },
];

const solihullProjectTerms = [
  "solihull",
  "knowle",
  "dorridge",
  "shirley",
  "olton",
  "balsall common",
  "warwickshire",
  "west midlands",
];

function selectSolihullProjects(projects: Project[]): Project[] {
  const regional = projects.filter((project) => {
    const location = project.location.toLowerCase();
    return solihullProjectTerms.some((term) => location.includes(term));
  });

  return [
    ...regional,
    ...projects.filter(
      (project) =>
        !regional.some((regionalProject) => regionalProject.slug === project.slug),
    ),
  ].slice(0, 3);
}

export default async function SolihullArchitectPage() {
  const relatedServices = services.filter((service) =>
    [
      "house-extensions",
      "loft-conversions",
      "new-build-homes",
      "planning-applications",
      "building-regulations",
    ].includes(service.slug),
  );

  const regionalProjects = selectSolihullProjects(await getProjects());
  const office = site.offices.birmingham;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locations",
          item: `${site.url}/locations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Solihull",
          item: `${site.url}/locations/solihull-architects`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": ["Architect", "LocalBusiness"],
      name: "Hepburn Architects Solihull",
      url: `${site.url}/locations/solihull-architects`,
      telephone: "+44 7720 813035",
      email: site.email,
      areaServed: [
        "Solihull",
        "Knowle",
        "Dorridge",
        "Shirley",
        "Olton",
        "Dickens Heath",
        "Balsall Common",
      ],
      parentOrganization: { "@id": `${site.url}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: solihullFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="section location-hero">
        <div className="shell content-page">
          <small className="eyebrow">
            <MapPin size={14} /> Solihull and the West Midlands
          </small>
          <h1>Residential Architects in Solihull</h1>
          <p className="lead">
            Hepburn Architects provides director-led residential design, planning
            and technical services for homeowners, developers and property owners
            across Solihull and surrounding West Midlands communities.
          </p>
          <div className="actions">
            <a className="btn primary" href={site.phoneHref}>
              <Phone size={17} /> Call {site.phone}
            </a>
            <a className="btn secondary" href="#project-enquiry">
              Discuss your project <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell service-detail-columns">
          <div>
            <small className="eyebrow">Local residential expertise</small>
            <h2>Architecture shaped around Solihull homes and sites.</h2>
          </div>
          <div>
            <p className="lead">
              Solihull includes established suburban streets, larger detached
              properties, period homes, mature landscapes and development sites
              close to conservation areas and the Green Belt.
            </p>
            <p>
              Good residential design must do more than add floor area. We consider
              the original house, neighbouring outlook, garden depth, trees,
              parking, access, drainage and the likely planning route before the
              proposal is developed in detail.
            </p>
          </div>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell content-grid">
          {[
            "House extensions and remodelling",
            "Loft conversions and roof alterations",
            "Replacement and new-build homes",
            "Planning and Building Regulations",
          ].map((point) => (
            <article key={point}>
              <CheckCircle2 />
              <h2>{point}</h2>
              <p>
                Design, planning and technical support tailored to the property,
                local context and approval route.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Architectural services</small>
            <h2>Residential architectural services in Solihull.</h2>
            <p>
              Appointments can cover a defined planning stage or continue through
              technical design and Building Regulations approval.
            </p>
          </div>
          <div className="service-grid">
            {relatedServices.map((service) => (
              <Link
                className="service-card"
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                <span>
                  View service <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section birmingham-planning-section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Planning in Solihull</small>
            <h2>Local planning considerations built into the design.</h2>
            <p className="lead">
              The planning strategy is developed alongside the architecture, with
              early attention given to neighbour amenity, character, landscape,
              permitted development and any site-specific constraints.
            </p>
          </div>

          <div className="authority-grid">
            <article>
              <span>01</span>
              <h3>House extensions and neighbour amenity</h3>
              <p>
                Solihull Council directs householders to its adopted House Extension
                Guidelines. Scale, separation, outlook, privacy, roof form and the
                relationship with the original house should be resolved from the
                outset.
              </p>
              <a
                href="https://www.solihull.gov.uk/planning-and-building-control/applying-planning-permission"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solihull planning application guidance <ExternalLink size={15} />
              </a>
            </article>

            <article>
              <span>02</span>
              <h3>Permitted development and lawful development</h3>
              <p>
                Some rear extensions, loft alterations and outbuildings may be
                permitted development. The property history, dimensions, use and
                local restrictions must still be checked before relying on those
                rights.
              </p>
              <a
                href="https://www.solihull.gov.uk/planning-and-building-control/permitted-development-rights-homeowners-solihull"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solihull permitted development guidance <ExternalLink size={15} />
              </a>
            </article>

            <article>
              <span>03</span>
              <h3>Character, Green Belt and new homes</h3>
              <p>
                Conservation areas, mature trees, Green Belt policy, access,
                parking and established settlement character can influence both
                the design and the evidence needed to support an application.
              </p>
              <a
                href="https://www.solihull.gov.uk/planning-and-building-control/solihull-local-plan"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solihull Local Plan <ExternalLink size={15} />
              </a>
            </article>
          </div>
        </div>
      </section>

      {regionalProjects.length > 0 && (
        <section className="section selected-work-section">
          <div className="shell">
            <div className="selected-work-heading">
              <small className="eyebrow">Solihull and West Midlands projects</small>
              <h2>Relevant residential work.</h2>
              <p>
                A selection of house extensions, remodelling projects, new homes and
                residential design work from Solihull and the wider region.
              </p>
            </div>

            <div className="selected-work-grid">
              {regionalProjects.map((project, index) => (
                <Link
                  href={`/projects/${project.slug}`}
                  className={
                    index === 0 ? "selected-work-main" : "selected-work-small"
                  }
                  key={project.slug}
                >
                  <img
                    src={projectImageUrl(project.featuredImage, 1400)}
                    alt={projectImageAlt(project)}
                    loading="lazy"
                  />
                  <div className="selected-work-overlay">
                    <span>
                      {project.location} · {project.projectType}
                    </span>
                    <strong>{project.title}</strong>
                  </div>
                </Link>
              ))}
            </div>

            <div className="selected-work-action">
              <Link className="btn secondary" href="/projects">
                View all projects <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section sand-section">
        <div className="shell service-detail-columns">
          <div>
            <small className="eyebrow">Useful guidance</small>
            <h2>Planning information for Solihull homeowners.</h2>
          </div>
          <div className="related-guide-grid">
            <Link href="/guides/planning-permission-house-extension">
              <h3>Planning permission for house extensions</h3>
              <p>Understand when planning permission or permitted development may apply.</p>
              <span>Read guide <ArrowRight size={15} /></span>
            </Link>
            <Link href="/guides/single-storey-extension-rules">
              <h3>Single-storey extension rules</h3>
              <p>Review common limits, design issues and approval routes.</p>
              <span>Read guide <ArrowRight size={15} /></span>
            </Link>
            <Link href="/guides/building-regulations-drawings">
              <h3>Building Regulations drawings</h3>
              <p>See what a coordinated residential technical package should address.</p>
              <span>Read guide <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell service-detail-columns">
          <div>
            <small className="eyebrow">Common questions</small>
            <h2>Planning and architectural services in Solihull.</h2>
          </div>
          <div className="faq-list">
            {solihullFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section dark-section birmingham-enquiry-section"
        id="project-enquiry"
      >
        <div className="shell contact-grid">
          <div>
            <small className="eyebrow">Discuss your Solihull project</small>
            <h2>Start with the property, brief and likely approval route.</h2>
            <p className="lead">
              Tell us where the property is and what you are considering. David will
              review the enquiry and advise on a proportionate next step.
            </p>
            <ul className="enquiry-trust-list">
              <li>
                <CheckCircle2 size={18} /> Direct involvement from David
              </li>
              <li>
                <CheckCircle2 size={18} /> RIBA Chartered and ARB registered
              </li>
              <li>
                <CheckCircle2 size={18} /> Planning and technical services
              </li>
            </ul>
            <div className="actions">
              <a className="btn primary" href={site.phoneHref}>
                <Phone size={17} /> Call {site.phone}
              </a>
              <a
                className="btn light-btn"
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a consultation
              </a>
            </div>
          </div>
          <ContactForm source="Solihull architect landing page" />
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell studio-process">
          <div>
            <small className="eyebrow">Areas nearby</small>
            <h2>Residential architect serving Solihull and surrounding areas.</h2>
          </div>
          <div>
            <p>
              We support projects across Knowle, Dorridge, Shirley, Olton, Dickens
              Heath, Balsall Common and neighbouring parts of Birmingham,
              Warwickshire and the West Midlands.
            </p>
            <div className="nearby-links">
              <Link href="/locations/birmingham-architects">Birmingham</Link>
              <Link href="/locations/edgbaston">Edgbaston</Link>
              <Link href="/locations/harborne">Harborne</Link>
              <Link href="/locations/moseley">Moseley</Link>
              <Link href="/locations/sutton-coldfield">Sutton Coldfield</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell local-office-panel">
          <div>
            <small className="eyebrow">Nearest Hepburn Architects office</small>
            <h2>{office.name}</h2>
            <address>
              {office.streetAddress}
              <br />
              {office.addressLocality}
              <br />
              {office.postalCode}
            </address>
          </div>
          <div>
            <p>
              Contact the Birmingham office to discuss your Solihull property,
              planning strategy and the most proportionate architectural service.
            </p>
            <div className="actions">
              <a className="btn primary" href={site.phoneHref}>
                Call {site.phone}
              </a>
              <a
                className="btn secondary"
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View office map
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
