import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
  Quote,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { locations, services } from "@/lib/content";
import {
  getProjects,
  projectImageAlt,
  projectImageUrl,
  type Project,
} from "@/lib/projects";
import { site } from "@/lib/site";

const birminghamFaqs = [
  {
    question: "Do I need planning permission for a house extension in Birmingham?",
    answer:
      "Some extensions may be permitted development, but the position depends on the property's history, dimensions, location and any local restrictions. A Lawful Development Certificate can provide formal confirmation where permitted development applies.",
  },
  {
    question: "Does Birmingham's Article 4 Direction affect HMO conversions?",
    answer:
      "Yes. Birmingham's city-wide Article 4 Direction means planning permission is required to change a family dwelling into a small HMO occupied by three to six unrelated people.",
  },
  {
    question: "Can Hepburn Architects prepare Building Regulations drawings?",
    answer:
      "Yes. We prepare coordinated Building Regulations drawings and technical information for extensions, loft conversions, new homes, HMOs and residential conversions.",
  },
  {
    question: "Which parts of Birmingham do you cover?",
    answer:
      "We support projects across Birmingham, including Harborne, Edgbaston, Moseley, Sutton Coldfield, Handsworth Wood and nearby Solihull and the wider West Midlands.",
  },
];

const birminghamReviews = [
  {
    quote:
      "Great service! David was on time with the plans, and his advice has been invaluable throughout the process. I would definitely recommend him.",
    attribution: "Avtar, Birmingham",
    detail: "Construction drawings · MyBuilder review, September 2025",
    sourceUrl: "https://www.mybuilder.com/profile/hepburn_architects/reviews",
    sourceName: "MyBuilder",
  },
  {
    quote:
      "David was a pleasure to deal with throughout. He was easy to talk to and nothing was too much.",
    attribution: "Verified homeowner",
    detail: "Extension designs · Checkatrade review, February 2024",
    sourceUrl: "https://www.checkatrade.com/trades/hepburndaoudiarchitects",
    sourceName: "Checkatrade",
  },
];

const birminghamProjectTerms = [
  "birmingham",
  "sutton coldfield",
  "solihull",
  "west midlands",
  "staffordshire",
  "shropshire",
  "worcestershire",
  "warwickshire",
];

function selectBirminghamProjects(projects: Project[]): Project[] {
  const regional = projects.filter((project) => {
    const location = project.location.toLowerCase();
    return birminghamProjectTerms.some((term) => location.includes(term));
  });

  return [
    ...regional,
    ...projects.filter(
      (project) => !regional.some((regionalProject) => regionalProject.slug === project.slug),
    ),
  ].slice(0, 3);
}


function selectLocationProjects(
  projects: Project[],
  projectTerms: string[],
): Project[] {
  const local = projects.filter((project) => {
    const location = project.location.toLowerCase();
    return projectTerms.some((term) => location.includes(term));
  });

  const regional = projects.filter((project) => {
    const location = project.location.toLowerCase();
    return birminghamProjectTerms.some((term) => location.includes(term));
  });

  return [
    ...local,
    ...regional.filter(
      (project) =>
        !local.some((localProject) => localProject.slug === project.slug),
    ),
    ...projects.filter(
      (project) =>
        !local.some((localProject) => localProject.slug === project.slug) &&
        !regional.some(
          (regionalProject) => regionalProject.slug === project.slug,
        ),
    ),
  ].slice(0, 3);
}

export function generateStaticParams() {
  return locations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) return {};

  return {
    title: page.seoTitle,
    description: page.description,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      url: `/locations/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.description,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) notFound();

  const northEast = [
    "middlesbrough",
    "teesside",
    "nunthorpe",
    "stockton-on-tees",
    "yarm",
  ].includes(slug);
  const isBirmingham = slug === "birmingham-architects";
  const isEnhancedWestMidlands = isBirmingham || Boolean(page.authorityPage);
  const office = northEast ? site.offices.nunthorpe : site.offices.birmingham;
  const relatedServices = services.filter((service) =>
    page.serviceSlugs.includes(service.slug),
  );
  const relatedLocations = locations
    .filter((location) => page.nearbyAreas.includes(location.shortTitle))
    .slice(0, 5);
  const allProjects = isEnhancedWestMidlands ? await getProjects() : [];
  const regionalProjects = isBirmingham
    ? selectBirminghamProjects(allProjects)
    : page.authorityPage
      ? selectLocationProjects(allProjects, page.projectTerms ?? [])
      : [];
  const locationFaqs = isBirmingham ? birminghamFaqs : page.faqs ?? [];

  const schemas: Array<Record<string, unknown>> = [
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
          name: page.shortTitle,
          item: `${site.url}/locations/${slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": ["Architect", "LocalBusiness"],
      name: `Hepburn Architects ${page.shortTitle}`,
      url: `${site.url}/locations/${slug}`,
      telephone: "+44 7720 813035",
      email: site.email,
      areaServed: [page.shortTitle, ...page.nearbyAreas],
      parentOrganization: { "@id": `${site.url}/#organization` },
    },
  ];

  if (locationFaqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: locationFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

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
            <MapPin size={14} /> Local residential architecture
          </small>
          <h1>{page.title}</h1>
          <p className="lead">{page.intro}</p>
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
            <small className="eyebrow">Local knowledge</small>
            <h2>Residential architecture shaped by {page.shortTitle}.</h2>
          </div>
          <div>
            <p className="lead">{page.localContext}</p>
            <p>
              Hepburn Architects can support the project from early feasibility
              and planning strategy through to Building Regulations drawings and
              consultant coordination. The appointment is tailored to the
              property, approval route and information already available.
            </p>
          </div>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell content-grid">
          {page.points.map((point) => (
            <article key={point}>
              <CheckCircle2 />
              <h2>{point}</h2>
              <p>
                Design, planning and technical support proportionate to the
                property, project type and local context.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Architectural services</small>
            <h2>Services available in {page.shortTitle}.</h2>
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

      {isBirmingham && (
        <>
          <section className="section dark-section birmingham-planning-section">
            <div className="shell">
              <div className="page-intro">
                <small className="eyebrow">Planning in Birmingham</small>
                <h2>Local planning knowledge built into the design.</h2>
                <p className="lead">
                  Every proposal is tested against the property, its planning
                  history, Birmingham City Council guidance and the likely impact
                  on neighbours and the wider street.
                </p>
              </div>

              <div className="authority-grid">
                <article>
                  <span>01</span>
                  <h3>Extensions and neighbour amenity</h3>
                  <p>
                    Birmingham assesses householder proposals against its Design
                    Guide, including guidance on light, privacy, scale, roof form
                    and the relationship with neighbouring homes.
                  </p>
                  <a
                    href="https://www.birmingham.gov.uk/info/20160/planning_applications/3004/how_we_assess_planning_applications"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Birmingham householder guidance <ExternalLink size={15} />
                  </a>
                </article>

                <article>
                  <span>02</span>
                  <h3>HMOs and Article 4</h3>
                  <p>
                    Birmingham&apos;s city-wide Article 4 Direction means that
                    changing a family dwelling into a small HMO requires a
                    planning application as well as separate licensing checks.
                  </p>
                  <a
                    href="https://www.birmingham.gov.uk/info/20054/local_plan_documents/1933/city-wide_article_4_direction_relating_to_houses_in_multiple_occupation_hmos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Birmingham HMO Article 4 guidance <ExternalLink size={15} />
                  </a>
                </article>

                <article>
                  <span>03</span>
                  <h3>Character, conservation and trees</h3>
                  <p>
                    Conservation areas, local Article 4 Directions, protected
                    trees, parking and established street character can all
                    affect the design and approval route.
                  </p>
                  <a
                    href="https://www.birmingham.gov.uk/info/20054/local_plan_documents/1367/birmingham_design_guide"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Birmingham Design Guide <ExternalLink size={15} />
                  </a>
                </article>
              </div>
            </div>
          </section>

          {regionalProjects.length > 0 && (
            <section className="section selected-work-section">
              <div className="shell">
                <div className="selected-work-heading">
                  <small className="eyebrow">
                    Birmingham and West Midlands projects
                  </small>
                  <h2>Relevant residential work.</h2>
                  <p>
                    A selection of extensions, new homes and residential
                    transformations from Birmingham and the wider region.
                  </p>
                </div>

                <div className="selected-work-grid">
                  {regionalProjects.map((project, index) => (
                    <Link
                      href={`/projects/${project.slug}`}
                      className={
                        index === 0
                          ? "selected-work-main"
                          : "selected-work-small"
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
            <div className="shell">
              <div className="page-intro">
                <small className="eyebrow">Independent client feedback</small>
                <h2>Clear advice and dependable communication.</h2>
                <p>
                  Feedback published on independent review platforms under the
                  practice&apos;s former profile name, Hepburn Daoudi Architects
                  Ltd.
                </p>
              </div>

              <div className="review-grid">
                {birminghamReviews.map((review) => (
                  <article className="review-card" key={review.sourceName}>
                    <Quote aria-hidden="true" />
                    <blockquote>{review.quote}</blockquote>
                    <strong>{review.attribution}</strong>
                    <small>{review.detail}</small>
                    <a
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on {review.sourceName} <ExternalLink size={14} />
                    </a>
                  </article>
                ))}
              </div>

              <div className="review-actions">
                <a
                  className="btn primary"
                  href={site.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Google Business Profile <ExternalLink size={16} />
                </a>
                <a
                  className="btn secondary"
                  href="https://www.mybuilder.com/profile/hepburn_architects/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read independent reviews <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="shell service-detail-columns">
              <div>
                <small className="eyebrow">Common questions</small>
                <h2>Planning and architectural services in Birmingham.</h2>
              </div>
              <div className="faq-list">
                {birminghamFaqs.map((item) => (
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
                <small className="eyebrow">Discuss your Birmingham project</small>
                <h2>Start with the property, the brief and the likely approval route.</h2>
                <p className="lead">
                  Tell us where the property is and what you are considering.
                  David will review the enquiry and advise on a proportionate next
                  step.
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
              <ContactForm source="Birmingham architect landing page" />
            </div>
          </section>
        </>
      )}


      {!isBirmingham && page.authorityPage && (
        <>
          <section className="section dark-section birmingham-planning-section">
            <div className="shell">
              <div className="page-intro">
                <small className="eyebrow">
                  Planning in {page.shortTitle}
                </small>
                <h2>Local planning considerations built into the design.</h2>
                <p className="lead">{page.planningIntro}</p>
              </div>

              <div className="authority-grid">
                {(page.planningTopics ?? []).map((topic, index) => (
                  <article key={topic.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{topic.title}</h3>
                    <p>{topic.body}</p>
                    <a
                      href={topic.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {topic.linkLabel} <ExternalLink size={15} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {regionalProjects.length > 0 && (
            <section className="section selected-work-section">
              <div className="shell">
                <div className="selected-work-heading">
                  <small className="eyebrow">
                    {page.shortTitle} and Birmingham projects
                  </small>
                  <h2>Relevant residential work.</h2>
                  <p>
                    {page.projectIntro ??
                      `A selection of residential projects from ${page.shortTitle} and the wider West Midlands.`}
                  </p>
                </div>

                <div className="selected-work-grid">
                  {regionalProjects.map((project, index) => (
                    <Link
                      href={`/projects/${project.slug}`}
                      className={
                        index === 0
                          ? "selected-work-main"
                          : "selected-work-small"
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
                <h2>
                  Planning information for {page.shortTitle} homeowners.
                </h2>
              </div>
              <div className="related-guide-grid">
                <Link href="/guides/planning-permission-house-extension">
                  <h3>Planning permission for house extensions</h3>
                  <p>
                    Understand when planning permission or permitted development
                    may apply.
                  </p>
                  <span>
                    Read guide <ArrowRight size={15} />
                  </span>
                </Link>
                <Link href="/guides/single-storey-extension-rules">
                  <h3>Single-storey extension rules</h3>
                  <p>
                    Review common limits, design issues and approval routes.
                  </p>
                  <span>
                    Read guide <ArrowRight size={15} />
                  </span>
                </Link>
                <Link href="/guides/loft-conversion-planning-permission">
                  <h3>Loft conversion planning</h3>
                  <p>
                    Check dormers, roof-volume limits and local planning controls.
                  </p>
                  <span>
                    Read guide <ArrowRight size={15} />
                  </span>
                </Link>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="shell service-detail-columns">
              <div>
                <small className="eyebrow">Common questions</small>
                <h2>
                  Planning and architectural services in {page.shortTitle}.
                </h2>
              </div>
              <div className="faq-list">
                {locationFaqs.map((item) => (
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
                <small className="eyebrow">
                  Discuss your {page.shortTitle} project
                </small>
                <h2>
                  Start with the property, brief and likely approval route.
                </h2>
                <p className="lead">
                  Tell us where the property is and what you are considering.
                  David will review the enquiry and advise on a proportionate
                  next step.
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
              <ContactForm
                source={`${page.shortTitle} architects landing page`}
              />
            </div>
          </section>
        </>
      )}

      <section className="section dark-section">
        <div className="shell studio-process">
          <div>
            <small className="eyebrow">Areas nearby</small>
            <h2>
              Residential architect serving {page.shortTitle} and surrounding
              areas.
            </h2>
          </div>
          <div>
            <p>We also support projects across {page.nearbyAreas.join(", ")}.</p>
            <div className="nearby-links">
              {relatedLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                >
                  {location.shortTitle}
                </Link>
              ))}
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
              {northEast ? `, ${site.offices.nunthorpe.postalTown}` : ""}
              <br />
              {office.postalCode}
            </address>
          </div>
          <div>
            <p>
              Contact the practice to discuss the property, likely approval route
              and the most proportionate architectural service.
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
