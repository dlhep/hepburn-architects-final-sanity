import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, Phone, Quote } from "lucide-react";
import { getServiceDetail, serviceDetails } from "@/lib/service-details";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import { RelatedServices } from "@/components/internal-links/RelatedServices";
import { Breadcrumbs } from "@/components/internal-links/Breadcrumbs";
import { createSeoMetadata } from "@/lib/seo";

const reviews = [
  {
    quote:
      "Great service! David was on time with the plans, and his advice has been invaluable throughout the process.",
    attribution: "Avtar, Birmingham",
    source: "MyBuilder",
    href: "https://www.mybuilder.com/profile/hepburn_architects/reviews",
  },
  {
    quote:
      "David was a pleasure to deal with throughout. He was easy to talk to and nothing was too much.",
    attribution: "Verified homeowner",
    source: "Checkatrade",
    href: "https://www.checkatrade.com/trades/hepburndaoudiarchitects",
  },
];

function selectProjects(projects: Project[], terms: string[]) {
  return projects
    .filter((project) => {
      const haystack = [
        project.title,
        project.location,
        project.category,
        project.projectType,
        project.description,
        ...(project.services || []),
      ]
        .join(" ")
        .toLowerCase();
      return terms.some((term) => haystack.includes(term.toLowerCase()));
    })
    .slice(0, 3);
}

export function generateStaticParams() {
  // The flagship house-extension service has its own static route so it can
  // own the commercial URL and metadata without competing with this template.
  return serviceDetails.filter((service) => service.slug !== "house-extensions").map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return {};
  return createSeoMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${slug}`,
    image: service.hero,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  const projects = selectProjects(await getProjects(), service.projectTerms);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.metaDescription,
      serviceType: service.title,
      url: `${site.url}/services/${slug}`,
      areaServed: ["Birmingham", "Solihull", "West Midlands"],
      provider: { "@id": `${site.url}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
        { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/services/${slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="service-detail-hero">
        <div className="shell service-detail-grid">
          <div className="service-detail-copy">
            <small className="eyebrow">Residential architecture service</small>
            <h1>{service.title}</h1>
            <p className="lead">{service.intro}</p>
          </div>
          <div
            className="service-detail-image"
            style={{ "--mobile-object-position": service.mobileObjectPosition } as CSSProperties}
          >
            <Image
              src={service.hero}
              alt={`${service.title} example by Hepburn Architects`}
              fill
              priority
              sizes="(max-width: 650px) calc(100vw - 28px), (max-width: 950px) calc(100vw - 40px), 48vw"
            />
          </div>
          <div className="actions service-detail-actions">
            <Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={17} /></Link>
            <a className="btn secondary" href={site.phoneHref}><Phone size={17} /> Call {site.phone}</a>
          </div>
        </div>
      </section>

      <div className="shell" style={{ paddingTop: "1.25rem" }}><Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} /></div>

      <section className="section">
        <div className="shell service-detail-columns">
          <div>
            <small className="eyebrow">Suitable for</small>
            <h2>Projects we can support.</h2>
          </div>
          <ul className="large-check-list">
            {service.idealFor.map((item) => <li key={item}><CheckCircle2 /> {item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Our process</small>
            <h2>A structured route through the project.</h2>
          </div>
          <div className="process-card-grid">
            {service.process.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section selected-work-section">
          <div className="shell">
            <div className="selected-work-heading">
              <small className="eyebrow">Relevant project experience</small>
              <h2>Architecture demonstrated through real work.</h2>
              <p>{service.projectIntro}</p>
            </div>
            <div className="selected-work-grid">
              {projects.map((project, index) => (
                <Link
                  href={`/projects/${project.slug}`}
                  className={index === 0 ? "selected-work-main" : "selected-work-small"}
                  key={project.slug}
                >
                  <Image
                    src={projectImageUrl(project.featuredImage, index === 0 ? 1400 : 900)}
                    alt={projectImageAlt(project)}
                    width={1400}
                    height={900}
                    sizes={index === 0 ? "(max-width: 950px) 100vw, 66vw" : "(max-width: 950px) 100vw, 33vw"}
                  />
                  <div className="selected-work-overlay">
                    <span>{project.location} · {project.projectType}</span>
                    <strong>{project.title}</strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="shell service-deliverables">
          <div>
            <small className="eyebrow">Typical deliverables</small>
            <h2>What the appointment may include.</h2>
            <p>The final scope is confirmed in a written fee proposal tailored to the property and approval route.</p>
          </div>
          <div className="deliverables-grid">
            {service.deliverables.map((item) => <div key={item}><CheckCircle2 /> {item}</div>)}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell service-detail-columns">
          <div>
            <small className="eyebrow">RIBA-aligned scope</small>
            <h2>Clear stages and responsibilities.</h2>
            <p className="lead">The appointment is aligned to the RIBA Plan of Work stages that are proportionate to a residential project.</p>
          </div>
          <div className="faq-list">
            {service.ribaStages.map((stage) => <div key={stage}><CheckCircle2 /> {stage}</div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell content-grid">
          <article>
            <small className="eyebrow">Typical programme</small>
            <h2>Indicative timescales.</h2>
            <ul>{service.typicalProgramme.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <small className="eyebrow">Fees</small>
            <h2>Proportionate fixed scopes.</h2>
            <p>{service.feeContext}</p>
            <Link href="/estimate">Use the fee calculator <ArrowRight size={16} /></Link>
          </article>
          <article>
            <small className="eyebrow">Usually excluded</small>
            <h2>Separate appointments and costs.</h2>
            <ul>{service.exclusions.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="section sand-section related-guides">
        <div className="shell">
          <small className="eyebrow">Supporting guidance</small>
          <h2>Read before you commit.</h2>
          {slug === "house-extensions" ? (
            <p className="lead">
              For an in-depth overview of extension types, design decisions,
              approvals, costs and technical coordination, explore{" "}
              <Link href="/services/house-extensions">
                our house extension architectural services
              </Link>
              . Birmingham homeowners can also read our detailed guide to{" "}
              <Link href="/journal/house-extension-planning-permission-birmingham-2026-guide">
                house-extension planning permission in Birmingham
              </Link>
              .
            </p>
          ) : null}
          {slug === "loft-conversions" ? (
            <p className="lead">
              Assess headroom, stair design, planning, structure and fire safety
              before committing to a roof form in{" "}
              <Link href="/knowledge-centre/loft-conversions">
                The Complete Guide to Loft Conversions
              </Link>
              . Birmingham homeowners can also review our detailed guide to{" "}
              <Link href="/journal/loft-conversion-planning-rules-birmingham">
                loft-conversion planning rules in Birmingham
              </Link>
              .
            </p>
          ) : null}
          {slug === "planning-applications" ? (
            <p className="lead">
              For a detailed overview of consent routes, permitted development,
              application requirements and common constraints, read our{" "}
              <Link href="/knowledge-centre/planning-permission">
                Planning Permission Explained guide
              </Link>
              .
            </p>
          ) : null}
          {slug === "building-regulations" ? (
            <p className="lead">
              For a detailed overview of approval routes, technical drawings,
              Approved Documents, inspections and completion, read our{" "}
              <Link href="/knowledge-centre/building-regulations">
                Building Regulations Explained guide
              </Link>
              .
            </p>
          ) : null}
          <div className="related-guide-grid">
            {service.relatedGuides.map((guide) => (
              <Link href={`/guides/${guide.slug}`} key={guide.slug}>
                <h3>{guide.title}</h3>
                <span>Read guide <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices serviceSlug={slug} />

      <section className="section">
        <div className="shell">
          <div className="page-intro">
            <small className="eyebrow">Independent client feedback</small>
            <h2>Clear advice and dependable communication.</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.source}>
                <Quote aria-hidden="true" />
                <blockquote>{review.quote}</blockquote>
                <strong>{review.attribution}</strong>
                <a href={review.href} target="_blank" rel="noopener noreferrer">
                  View on {review.source} <ExternalLink size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell faq-layout">
          <div>
            <small className="eyebrow">Frequently asked questions</small>
            <h2>Common questions about this service.</h2>
          </div>
          <div className="faq-list">
            {service.faqs.map((faq) => (
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
          <small className="eyebrow">Discuss your project</small>
          <h2>Speak directly with a residential architect.</h2>
          <p>Call now or book a free 30-minute consultation to discuss the property, approval route and likely next steps.</p>
          <div className="actions centered-actions">
            <a className="btn primary" href={site.phoneHref}><Phone size={18} /> {site.phone}</a>
            <a className="btn secondary" href={site.calendly} target="_blank" rel="noopener noreferrer">Book consultation</a>
          </div>
        </div>
      </section>
    </>
  );
}
