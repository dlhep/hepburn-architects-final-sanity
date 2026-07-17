import type { Metadata } from "next";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Hepburn Architects | Birmingham & Nunthorpe",
  description:
    "Contact Hepburn Architects in Birmingham or Nunthorpe about extensions, loft conversions, new homes, HMOs, planning and Building Regulations.",
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
