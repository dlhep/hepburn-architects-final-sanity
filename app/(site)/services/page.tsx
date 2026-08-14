import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, DraftingCompass, FileCheck2, HeartHandshake, Home, Layers3, Ruler } from "lucide-react";
import { serviceDetails } from "@/lib/service-details";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildGraph, buildItemListSchema, breadcrumbId } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Residential Architectural Services",
  description:
    "Residential architectural services for house extensions, loft conversions, new homes, HMOs, planning applications and Building Regulations drawings.",
  alternates: { canonical: "/services" },
};

const icons = [Home, Layers3, Building2, Ruler, FileCheck2, DraftingCompass];

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={buildGraph(buildCollectionPageSchema({ url: `${site.url}/services`, name: "Residential Architectural Services", description: metadata.description as string, breadcrumb: breadcrumbId(`${site.url}/services`) }), buildBreadcrumbSchema(`${site.url}/services`, [{ name: "Home", url: `${site.url}/` }, { name: "Services", url: `${site.url}/services` }]), buildItemListSchema(`${site.url}/services`, "Architectural services", serviceDetails.map((service) => ({ name: service.title, url: `${site.url}/services/${service.slug}` }))))} />
      <section className="services-hero services-hero-full">
        <Image
          className="services-hero-background"
          src="/images/services-hero-photoreal.png"
          alt="Modern residential extension with large glazing and landscaped garden"
          fill
          sizes="100vw"
          priority
        />
        <div className="services-hero-shade" aria-hidden="true" />
        <div className="shell services-hero-content primary-index-hero-copy">
          <div className="services-hero-copy">
            <small className="eyebrow">Residential architectural services</small>
            <h1>Residential Architectural Services</h1>
            <p className="lead">
              Appoint Hepburn Architects for the full residential design process or
              select only the stages your project needs.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={17} /></Link>
              <a className="btn secondary" href={site.phoneHref}>Call {site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell services-overview-grid">
          {serviceDetails.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Link href={`/services/${service.slug}`} className="service-overview-card" key={service.slug}>
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
          <Link
            href="/services/c2-planning-applications-childrens-homes"
            className="service-overview-card"
          >
            <div className="service-overview-copy">
              <span>07</span>
              <HeartHandshake />
              <h2>Planning Applications for Children’s Homes</h2>
              <p>
                Child-centred planning and architectural support for providers
                creating safe, welcoming and well-integrated residential homes.
              </p>
              <strong>
                Explore this service <ArrowRight size={16} />
              </strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="section dark-section services-appointments-section">
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
