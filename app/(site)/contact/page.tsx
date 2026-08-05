import type { Metadata } from "next";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildBusinessLocationSchema, buildGraph, buildOrganisationSchema, buildWebPageSchema, breadcrumbId } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact Our Architecture Studio",
  description:
    "Contact Hepburn Architects about house extensions, loft conversions, new homes, HMOs, planning applications and Building Regulations.",
  alternates: { canonical: "/contact" },
};

function OfficeCard({
  title,
  address,
  mapUrl,
}: {
  title: string;
  address: string[];
  mapUrl: string;
}) {
  return (
    <article className="office-card">
      <div className="office-card-icon"><MapPin /></div>
      <div>
        <small>Hepburn Architects</small>
        <h2>{title}</h2>
        <address>
          {address.map((line) => <span key={line}>{line}<br /></span>)}
        </address>
        <div className="office-actions">
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          <a href={site.phoneHref}><Phone size={16} /> {site.phone}</a>
          <a href={`mailto:${site.email}`}><Mail size={16} /> {site.email}</a>
        </div>
      </div>
    </article>
  );
}

export default function ContactPage() {
  return (
    <>
      <StructuredData data={buildGraph(buildWebPageSchema({ url: `${site.url}/contact`, name: "Contact Hepburn Architects", description: metadata.description as string, type: "ContactPage", breadcrumb: breadcrumbId(`${site.url}/contact`) }), buildBreadcrumbSchema(`${site.url}/contact`, [{ name: "Home", url: `${site.url}/` }, { name: "Contact", url: `${site.url}/contact` }]), buildOrganisationSchema(), buildBusinessLocationSchema("birmingham"), buildBusinessLocationSchema("nunthorpe"))} />
      <section className="section contact-hero">
        <div className="shell contact-grid">
          <div>
            <small className="eyebrow">Start a project</small>
            <h1>Speak with Hepburn Architects.</h1>
            <p className="lead">
              Contact our Birmingham or Nunthorpe office to discuss your property,
              likely approval route and the architectural service you need.
            </p>
            <a className="contact-phone-card" href={site.phoneHref}>
              <Phone />
              <div>
                <small>Call David directly</small>
                <strong>{site.phone}</strong>
                <span>Tap to call</span>
              </div>
            </a>
            <a
              className="btn primary"
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarDays size={17} /> Book a free 30-minute consultation
            </a>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section">
        <div className="shell page-intro">
          <h2>Start a conversation about your project</h2>
          <p>Tell us the property address, the type of work you are considering and any timescale or planning concerns. We review each enquiry directly and explain the likely approval route, the information needed and the most suitable next step.</p>
          <p>Hepburn Architects supports house extensions, loft conversions, new homes, HMOs, changes of use, planning applications and Building Regulations packages. We work from Birmingham and Nunthorpe and advise on projects across the West Midlands, Teesside and wider England.</p>
          <p>An initial conversation is intended to clarify scope and suitability. Formal advice, drawings and submissions are provided only under an agreed written appointment.</p>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell offices-grid">
          <OfficeCard
            title="Birmingham Office"
            address={["Izabella House", "24-26 Regent Place", "Birmingham", "B1 3NJ"]}
            mapUrl={site.offices.birmingham.mapUrl}
          />
          <OfficeCard
            title="Nunthorpe Office"
            address={["1 Church Lane", "Nunthorpe", "Middlesbrough", "TS7 0PD"]}
            mapUrl={site.offices.nunthorpe.mapUrl}
          />
        </div>
      </section>
    </>
  );
}
