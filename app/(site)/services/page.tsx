import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, DraftingCompass, FileCheck2, Home, Layers3, Ruler } from "lucide-react";
import { serviceDetails } from "@/lib/service-details";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Architectural Services",
  description:
    "Explore Hepburn Architects services for extensions, loft conversions, new homes, HMOs, planning applications and Building Regulations.",
  alternates: { canonical: "/services" },
};

const icons = [Home, Layers3, Building2, Ruler, FileCheck2, DraftingCompass];

export default function ServicesPage() {
  return (
    <>
      <section className="section services-hero">
        <div className="shell services-hero-grid">
          <div>
            <small className="eyebrow">Residential architectural services</small>
            <h1>A clear route from first idea to technical approval.</h1>
            <p className="lead">
              Appoint Hepburn Architects for the full residential design process or
              select only the stages your project needs.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={17} /></Link>
              <a className="btn secondary" href={site.phoneHref}>Call {site.phone}</a>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=88"
            alt="Modern residential extension with large glazing and landscaped garden"
          />
        </div>
      </section>

      <section className="section">
        <div className="shell services-overview-grid">
          {serviceDetails.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Link href={`/services/${service.slug}`} className="service-overview-card" key={service.slug}>
                <div className="service-overview-image">
                  <img src={service.hero} alt={`${service.title} example residential project`} loading="lazy" />
                </div>
                <div className="service-overview-copy">
                  <span>0{index + 1}</span>
                  <Icon />
                  <h2>{service.title}</h2>
                  <p>{service.intro}</p>
                  <strong>Explore this service <ArrowRight size={16} /></strong>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell studio-process">
          <div>
            <small className="eyebrow">How appointments work</small>
            <h2>Defined stages, clear outputs and no unnecessary extras.</h2>
          </div>
          <div>
            <p>
              Most residential projects move through survey, design, planning and
              technical stages. The exact appointment depends on the property,
              approval route and information already available.
            </p>
            <p>
              We explain exclusions, consultant needs and likely authority charges
              before work begins so that clients understand what sits inside and
              outside the architectural fee.
            </p>
            <a className="btn primary" href={site.calendly} target="_blank" rel="noopener noreferrer">
              Book a free consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
