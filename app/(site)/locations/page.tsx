import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { locations } from "@/lib/content-extended";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildGraph, buildItemListSchema, breadcrumbId } from "@/lib/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Architects Across the West Midlands",
  description:
    "Explore Hepburn Architects location pages for Birmingham, Solihull, Bournville, Kings Heath, Wolverhampton, Walsall, Aldridge and Leamington Spa.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  const published = new Map(locations.map((location) => [location.slug, location]));
  const regions = [
    ["Birmingham and Sutton Coldfield area", ["birmingham-architects", "harborne-architects", "edgbaston-architects", "moseley-architects", "kings-heath-architects", "bournville-architects", "sutton-coldfield-architects", "four-oaks-architects", "selly-oak-architects", "hall-green-architects"]],
    ["Staffordshire border and adjoining areas", ["little-aston-architects", "aldridge-architects"]],
    ["Solihull and Warwickshire", ["solihull-architects", "leamington-spa-architects", "warwick-architects", "kenilworth-architects"]],
    ["Black Country and wider West Midlands", ["wolverhampton-architects", "walsall-architects"]],
  ].map(([name, slugs]) => ({ name: name as string, locations: (slugs as string[]).map((slug) => published.get(slug)).filter((item): item is (typeof locations)[number] => Boolean(item)) }));
  const url = `${site.url}/locations`;
  const items = regions.flatMap((region) => region.locations).map((location) => ({ name: location.title, url: `${url}/${location.slug}` }));
  return (<>
    <StructuredData data={buildGraph(buildCollectionPageSchema({ url, name: "Locations", description: metadata.description as string, breadcrumb: breadcrumbId(url) }), buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Locations", url }]), buildItemListSchema(url, "Published location pages", items))} />
    <section className="section">
      <div className="shell page-intro">
        <small className="eyebrow"><MapPin size={14} />Areas we serve</small>
        <h1>Residential architects across Birmingham and the West Midlands.</h1>
        <p>Explore local architectural services for house extensions, loft conversions, new homes, HMOs, planning applications and Building Regulations.</p>
      </div>
      {regions.map((region) => region.locations.length ? <section className="section" style={{ paddingTop: 24 }} key={region.name}>
        <div className="shell"><div className="page-intro"><small className="eyebrow">Regional cluster</small><h2>{region.name}</h2></div><div className="guides-index">
          {region.locations.map((location, index) => <Link href={`/locations/${location.slug}`} className="guide-index-card" key={location.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{location.title}</h2><p>{location.description}</p></div><ArrowRight /></Link>)}
        </div></div>
      </section> : null)}
    </section></>
  );
}
