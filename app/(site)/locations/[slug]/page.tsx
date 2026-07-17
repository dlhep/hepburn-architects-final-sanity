import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import { locations } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/locations/${slug}` },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) notFound();

  const northEast = ["middlesbrough", "teesside", "nunthorpe", "stockton-on-tees", "yarm"].includes(slug);
  const office = northEast ? site.offices.nunthorpe : site.offices.birmingham;

  return (
    <>
      <section className="section location-hero">
        <div className="shell content-page">
          <small className="eyebrow"><MapPin size={14} /> Local residential architecture</small>
          <h1>{page.title}</h1>
          <p className="lead">{page.intro}</p>
          <div className="actions">
            <a className="btn primary" href={site.phoneHref}><Phone size={17} /> Call {site.phone}</a>
            <Link className="btn secondary" href="/estimate">Get an indicative fee <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell content-grid">
          {page.points.map((point) => (
            <article key={point}>
              <CheckCircle2 />
              <h2>{point}</h2>
              <p>
                Design, planning and technical support proportionate to the property,
                project type and local context.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell local-office-panel">
          <div>
            <small className="eyebrow">Nearest Hepburn Architects office</small>
            <h2>{office.name}</h2>
            <address>
              {office.streetAddress}<br />
              {office.addressLocality}
              {northEast ? `, ${site.offices.nunthorpe.postalTown}` : ""}<br />
              {office.postalCode}
            </address>
          </div>
          <div>
            <p>
              Contact the practice to discuss the property, likely approval route and
              the most proportionate architectural service.
            </p>
            <div className="actions">
              <a className="btn primary" href={site.phoneHref}>Call {site.phone}</a>
              <a className="btn secondary" href={office.mapUrl} target="_blank" rel="noopener noreferrer">View office map</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
