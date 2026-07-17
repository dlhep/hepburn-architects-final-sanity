import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { getServiceDetail, serviceDetails } from "@/lib/service-details";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.hero, alt: `${service.title} residential architecture` }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="service-detail-hero">
        <div className="shell service-detail-grid">
          <div>
            <small className="eyebrow">Residential architecture service</small>
            <h1>{service.title}</h1>
            <p className="lead">{service.intro}</p>
            <div className="actions">
              <Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={17} /></Link>
              <a className="btn secondary" href={site.phoneHref}><Phone size={17} /> Call {site.phone}</a>
            </div>
          </div>
          <img src={service.hero} alt={`${service.title} example by a residential architect`} />
        </div>
      </section>

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
