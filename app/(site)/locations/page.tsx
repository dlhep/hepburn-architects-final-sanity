import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { locations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Residential Architect Locations | Birmingham & West Midlands",
  description:
    "Explore Hepburn Architects location pages for Birmingham, Solihull, Bournville, Kings Heath, Wolverhampton, Walsall, Aldridge and Leamington Spa.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <section className="section">
      <div className="shell page-intro">
        <small className="eyebrow"><MapPin size={14} />Areas we serve</small>
        <h1>Residential architects across Birmingham and the West Midlands.</h1>
        <p>Explore local architectural services for house extensions, loft conversions, new homes, HMOs, planning applications and Building Regulations.</p>
      </div>
      <div className="shell guides-index">
        {locations.map((location, index) => (
          <Link href={`/locations/${location.slug}`} className="guide-index-card" key={location.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h2>{location.title}</h2><p>{location.description}</p></div>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </section>
  );
}
