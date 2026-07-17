import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import { locations, services } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() { return locations.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.description,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: { title: page.seoTitle, description: page.description, url: `/locations/${slug}`, type: "website" },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) notFound();
  const northEast = ["middlesbrough", "teesside", "nunthorpe", "stockton-on-tees", "yarm"].includes(slug);
  const office = northEast ? site.offices.nunthorpe : site.offices.birmingham;
  const relatedServices = services.filter((service) => page.serviceSlugs.includes(service.slug));
  const relatedLocations = locations.filter((location) => page.nearbyAreas.includes(location.shortTitle)).slice(0, 5);
  const schemas = [
    { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[
      {"@type":"ListItem",position:1,name:"Home",item:site.url},
      {"@type":"ListItem",position:2,name:"Locations",item:`${site.url}/locations`},
      {"@type":"ListItem",position:3,name:page.shortTitle,item:`${site.url}/locations/${slug}`}
    ]},
    { "@context":"https://schema.org", "@type":["Architect","LocalBusiness"], name:`Hepburn Architects ${page.shortTitle}`, url:`${site.url}/locations/${slug}`, telephone:"+44 7720 813035", email:site.email, areaServed:[page.shortTitle,...page.nearbyAreas], parentOrganization:{"@id":`${site.url}/#organization`} }
  ];
  return <>
    {schemas.map((schema,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />)}
    <section className="section location-hero"><div className="shell content-page">
      <small className="eyebrow"><MapPin size={14}/> Local residential architecture</small><h1>{page.title}</h1><p className="lead">{page.intro}</p>
      <div className="actions"><a className="btn primary" href={site.phoneHref}><Phone size={17}/> Call {site.phone}</a><Link className="btn secondary" href="/estimate">Get an indicative fee <ArrowRight size={17}/></Link></div>
    </div></section>
    <section className="section"><div className="shell service-detail-columns"><div><small className="eyebrow">Local knowledge</small><h2>Residential architecture shaped by {page.shortTitle}.</h2></div><div><p className="lead">{page.localContext}</p><p>Hepburn Architects can support the project from early feasibility and planning strategy through to Building Regulations drawings and consultant coordination. The appointment is tailored to the property, approval route and information already available.</p></div></div></section>
    <section className="section sand-section"><div className="shell content-grid">{page.points.map((point)=><article key={point}><CheckCircle2/><h2>{point}</h2><p>Design, planning and technical support proportionate to the property, project type and local context.</p></article>)}</div></section>
    <section className="section"><div className="shell"><div className="page-intro"><small className="eyebrow">Architectural services</small><h2>Services available in {page.shortTitle}.</h2></div><div className="service-grid">{relatedServices.map((service)=><Link className="service-card" href={`/services/${service.slug}`} key={service.slug}><h3>{service.shortTitle}</h3><p>{service.description}</p><span>View service <ArrowRight size={16}/></span></Link>)}</div></div></section>
    <section className="section dark-section"><div className="shell studio-process"><div><small className="eyebrow">Areas nearby</small><h2>Residential architect serving {page.shortTitle} and surrounding areas.</h2></div><div><p>We also support projects across {page.nearbyAreas.join(", ")}.</p><div className="nearby-links">{relatedLocations.map((location)=><Link key={location.slug} href={`/locations/${location.slug}`}>{location.shortTitle}</Link>)}</div></div></div></section>
    <section className="section sand-section"><div className="shell local-office-panel"><div><small className="eyebrow">Nearest Hepburn Architects office</small><h2>{office.name}</h2><address>{office.streetAddress}<br/>{office.addressLocality}{northEast ? `, ${site.offices.nunthorpe.postalTown}` : ""}<br/>{office.postalCode}</address></div><div><p>Contact the practice to discuss the property, likely approval route and the most proportionate architectural service.</p><div className="actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a><a className="btn secondary" href={office.mapUrl} target="_blank" rel="noopener noreferrer">View office map</a></div></div></div></section>
  </>;
}
