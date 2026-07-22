import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, MapPin, Phone, Quote } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { locations, services } from "@/lib/content";
import { getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";

const birminghamFaqs = [
  { question: "Do I need planning permission for a house extension in Birmingham?", answer: "Some extensions may be permitted development, but the property history, dimensions, location and local restrictions must be checked. A Lawful Development Certificate can provide formal confirmation where permitted development applies." },
  { question: "Does Birmingham's Article 4 Direction affect HMO conversions?", answer: "Yes. Birmingham's city-wide Article 4 Direction means planning permission is required to change a family dwelling into a small HMO occupied by three to six unrelated people." },
  { question: "Can Hepburn Architects prepare Building Regulations drawings?", answer: "Yes. We prepare coordinated Building Regulations drawings and technical information for extensions, loft conversions, new homes, HMOs and residential conversions." },
  { question: "Which parts of Birmingham do you cover?", answer: "We support projects across Birmingham, including Harborne, Edgbaston, Moseley, Sutton Coldfield, Handsworth Wood and nearby Solihull and the wider West Midlands." },
];

const solihullFaqs = [
  { question: "Do I need planning permission for an extension in Solihull?", answer: "Some house extensions may use permitted development rights, but the proposal dimensions, earlier additions, conservation status, Article 4 controls and planning history must be checked before relying on that route." },
  { question: "Which Solihull areas have conservation constraints?", answer: "The borough has 20 conservation areas, including Knowle, Olton, Solihull and Station Approach Dorridge. Conservation status can affect design, trees, demolition and permitted development rights." },
  { question: "Can you assess a replacement home or development plot?", answer: "Yes. We can review planning history, Green Belt or settlement policy, access, trees, character, neighbouring amenity and likely development capacity before a full design appointment." },
  { question: "Can Hepburn Architects prepare planning and Building Regulations packages?", answer: "Yes. The appointment can include feasibility, measured survey, design, planning submission and coordinated technical drawings." },
];

const birminghamReviews = [
  { quote: "Great service! David was on time with the plans, and his advice has been invaluable throughout the process. I would definitely recommend him.", attribution: "Avtar, Birmingham", detail: "Construction drawings · MyBuilder review, September 2025", sourceUrl: "https://www.mybuilder.com/profile/hepburn_architects/reviews", sourceName: "MyBuilder" },
  { quote: "David was a pleasure to deal with throughout. He was easy to talk to and nothing was too much.", attribution: "Verified homeowner", detail: "Extension designs · Checkatrade review, February 2024", sourceUrl: "https://www.checkatrade.com/trades/hepburndaoudiarchitects", sourceName: "Checkatrade" },
];

const birminghamProjectTerms = ["birmingham", "sutton coldfield", "solihull", "west midlands", "staffordshire", "shropshire", "worcestershire", "warwickshire"];

const birminghamPlanningTopics = [
  { title: "Extensions and neighbour amenity", body: "Birmingham assesses householder proposals against guidance on light, privacy, scale, roof form and the relationship with neighbouring homes.", href: "https://www.birmingham.gov.uk/info/20160/planning_applications/3004/how_we_assess_planning_applications", linkLabel: "Birmingham planning assessment guidance" },
  { title: "HMOs and Article 4", body: "Birmingham's city-wide Article 4 Direction means changing a family dwelling into a small HMO requires a planning application as well as separate licensing checks.", href: "https://www.birmingham.gov.uk/info/20054/local_plan_documents/1933/city-wide_article_4_direction_relating_to_houses_in_multiple_occupation_hmos", linkLabel: "Birmingham HMO Article 4 guidance" },
  { title: "Character, conservation and trees", body: "Conservation areas, local Article 4 Directions, protected trees, parking and established street character can affect the design and approval route.", href: "https://www.birmingham.gov.uk/info/20054/local_plan_documents/1367/birmingham_design_guide", linkLabel: "Birmingham Design Guide" },
];

const solihullPlanningTopics = [
  { title: "Permitted development and lawful development", body: "Solihull advises homeowners to check the detailed permitted development position and use a Lawful Development Certificate where formal confirmation is required.", href: "https://www.solihull.gov.uk/planning-and-building-control/permitted-development-rights-homeowners-solihull", linkLabel: "Solihull permitted development guidance" },
  { title: "Conservation areas and established character", body: "The borough has 20 conservation areas. Detailed design, trees, demolition and reduced permitted development rights may need to be addressed from the outset.", href: "https://www.solihull.gov.uk/planning-and-building-control/conservation-areas", linkLabel: "Solihull conservation areas" },
  { title: "Validation and neighbourhood policy", body: "Applications must meet national and local validation requirements. Knowle, Dorridge and Bentley Heath also have a made neighbourhood plan that forms part of the development plan.", href: "https://www.solihull.gov.uk/planning-and-building-control/local-validation-checklist", linkLabel: "Solihull validation checklist" },
];

function pointDescription(point: string) {
  const value = point.toLowerCase();
  if (value.includes("extension") || value.includes("remodelling")) return "Layouts, massing and materials developed around daylight, neighbour amenity, garden connection and the character of the existing home.";
  if (value.includes("loft") || value.includes("roof")) return "Roof form, dormer position, stair design, headroom, fire safety and planning controls considered together.";
  if (value.includes("hmo") || value.includes("flat") || value.includes("change")) return "Use class, occupancy, space standards, refuse, cycle storage, licensing and fire-safety implications reviewed from the start.";
  if (value.includes("new") || value.includes("replacement")) return "Site capacity, access, landscape, context, amenity and planning policy tested before the design is fixed.";
  if (value.includes("conservation") || value.includes("period")) return "Original character, significance, materials, trees and the wider street are treated as design inputs rather than late constraints.";
  return "A coordinated architectural service covering the design, approval route, technical information and consultant inputs appropriate to the project.";
}

function selectProjects(projects: Project[], terms: string[]) {
  const local = projects.filter((project) => terms.some((term) => project.location.toLowerCase().includes(term)));
  const regional = projects.filter((project) => birminghamProjectTerms.some((term) => project.location.toLowerCase().includes(term)));
  return [...local, ...regional.filter((project) => !local.some((item) => item.slug === project.slug))].slice(0, 3);
}

export function generateStaticParams() {
  return locations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.description,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: { title: page.seoTitle, description: page.description, url: `/locations/${slug}`, type: "website" as const, images: ["/images/homepage-hero.png"] },
    twitter: { card: "summary_large_image" as const, title: page.seoTitle, description: page.description, images: ["/images/homepage-hero.png"] },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) notFound();

  const isBirmingham = slug === "birmingham-architects";
  const isSolihull = slug === "solihull-architects";
  const isEnhanced = isBirmingham || isSolihull || Boolean(page.authorityPage);
  const relatedServices = services.filter((service) => page.serviceSlugs.includes(service.slug));
  const relatedLocations = locations.filter((location) => page.nearbyAreas.includes(location.shortTitle)).slice(0, 5);
  const projectTerms = isBirmingham ? birminghamProjectTerms : isSolihull ? ["solihull", "knowle", "dorridge", "shirley", "olton", "balsall common", "warwickshire"] : page.projectTerms ?? [];
  const allProjects = isEnhanced ? await getProjects() : [];
  const regionalProjects = isEnhanced ? selectProjects(allProjects, projectTerms) : [];
  const faqs = isBirmingham ? birminghamFaqs : isSolihull ? solihullFaqs : page.faqs ?? [];
  const planningTopics = isBirmingham ? birminghamPlanningTopics : isSolihull ? solihullPlanningTopics : page.planningTopics ?? [];
  const planningIntro = isBirmingham
    ? "Every proposal is tested against the property, its planning history, Birmingham City Council guidance and likely effects on neighbours and the wider street."
    : isSolihull
      ? "Solihull projects often need to respond to mature suburban character, conservation areas, Green Belt edges, trees and made neighbourhood plans as well as the national planning framework."
      : page.planningIntro;

  const schemas: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Locations", item: `${site.url}/locations` },
        { "@type": "ListItem", position: 3, name: page.shortTitle, item: `${site.url}/locations/${slug}` },
      ],
    },
    isBirmingham
      ? {
          "@context": "https://schema.org",
          "@type": ["Architect", "LocalBusiness"],
          "@id": `${site.url}/#birmingham-studio`,
          name: "Hepburn Architects Birmingham",
          url: `${site.url}/locations/birmingham-architects`,
          telephone: "+44 7720 813035",
          email: site.email,
          address: { "@type": "PostalAddress", streetAddress: site.offices.birmingham.streetAddress, addressLocality: site.offices.birmingham.addressLocality, postalCode: site.offices.birmingham.postalCode, addressCountry: site.offices.birmingham.addressCountry },
          areaServed: ["Birmingham", "West Midlands"],
          parentOrganization: { "@id": `${site.url}/#organization` },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Residential architectural services in ${page.shortTitle}`,
          serviceType: "Residential architectural services",
          url: `${site.url}/locations/${slug}`,
          areaServed: [page.shortTitle, ...page.nearbyAreas],
          provider: { "@id": `${site.url}/#organization` },
        },
  ];

  if (faqs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
    });
  }

  return (
    <>
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}

      <section className="section location-hero">
        <div className="shell content-page">
          <small className="eyebrow"><MapPin size={14} /> Local residential architecture</small>
          <h1>{page.title}</h1>
          <p className="lead">{page.intro}</p>
          <div className="actions">
            <a className="btn primary" href={site.phoneHref}><Phone size={17} /> Call {site.phone}</a>
            <a className="btn secondary" href="#project-enquiry">Discuss your project <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell service-detail-columns">
          <div><small className="eyebrow">Local knowledge</small><h2>Residential architecture shaped by {page.shortTitle}.</h2></div>
          <div><p className="lead">{page.localContext}</p><p>Hepburn Architects can support the project from early feasibility and planning strategy through to Building Regulations drawings and consultant coordination. The appointment is tailored to the property, approval route and information already available.</p></div>
        </div>
      </section>

      <section className="section sand-section">
        <div className="shell content-grid">
          {page.points.map((point) => <article key={point}><CheckCircle2 /><h2>{point}</h2><p>{pointDescription(point)}</p></article>)}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="page-intro"><small className="eyebrow">Architectural services</small><h2>Services available in {page.shortTitle}.</h2></div>
          <div className="service-grid">
            {relatedServices.map((service) => <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}><h3>{service.shortTitle}</h3><p>{service.description}</p><span>View service <ArrowRight size={16} /></span></Link>)}
          </div>
        </div>
      </section>

      {isEnhanced && planningTopics.length > 0 && (
        <section className="section dark-section birmingham-planning-section">
          <div className="shell">
            <div className="page-intro"><small className="eyebrow">Planning in {page.shortTitle}</small><h2>Local planning knowledge built into the design.</h2><p className="lead">{planningIntro}</p></div>
            <div className="authority-grid">
              {planningTopics.map((topic, index) => <article key={topic.title}><span>0{index + 1}</span><h3>{topic.title}</h3><p>{topic.body}</p><a href={topic.href} target="_blank" rel="noopener noreferrer">{topic.linkLabel} <ExternalLink size={15} /></a></article>)}
            </div>
          </div>
        </section>
      )}

      {regionalProjects.length > 0 && (
        <section className="section selected-work-section">
          <div className="shell">
            <div className="selected-work-heading"><small className="eyebrow">{page.shortTitle} and regional projects</small><h2>Relevant residential work.</h2><p>{isSolihull ? "Extensions, new homes and residential projects from Solihull and the surrounding West Midlands." : page.projectIntro || "A selection of extensions, new homes and residential transformations from the wider region."}</p></div>
            <div className="selected-work-grid">
              {regionalProjects.map((project, index) => <Link href={`/projects/${project.slug}`} className={index === 0 ? "selected-work-main" : "selected-work-small"} key={project.slug}><Image src={projectImageUrl(project.featuredImage, 1400)} alt={projectImageAlt(project)} width={1400} height={900} sizes={index === 0 ? "(max-width: 950px) 100vw, 66vw" : "(max-width: 950px) 100vw, 33vw"} /><div className="selected-work-overlay"><span>{project.location} · {project.projectType}</span><strong>{project.title}</strong></div></Link>)}
            </div>
            <div className="selected-work-action"><Link className="btn secondary" href="/projects">View all projects <ArrowRight size={17} /></Link></div>
          </div>
        </section>
      )}

      {isBirmingham && (
        <section className="section sand-section">
          <div className="shell">
            <div className="page-intro"><small className="eyebrow">Independent client feedback</small><h2>Clear advice and dependable communication.</h2><p>Feedback published on independent review platforms under the practice&apos;s former profile name, Hepburn Daoudi Architects Ltd.</p></div>
            <div className="review-grid">
              {birminghamReviews.map((review) => <article className="review-card" key={review.sourceName}><Quote aria-hidden="true" /><blockquote>{review.quote}</blockquote><strong>{review.attribution}</strong><small>{review.detail}</small><a href={review.sourceUrl} target="_blank" rel="noopener noreferrer">View on {review.sourceName} <ExternalLink size={14} /></a></article>)}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="section">
          <div className="shell service-detail-columns"><div><small className="eyebrow">Common questions</small><h2>Planning and architectural services in {page.shortTitle}.</h2></div><div className="faq-list">{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div>
        </section>
      )}

      <section className="section dark-section birmingham-enquiry-section" id="project-enquiry">
        <div className="shell contact-grid">
          <div><small className="eyebrow">Discuss your {page.shortTitle} project</small><h2>Start with the property, the brief and the likely approval route.</h2><p className="lead">Tell us where the property is and what you are considering. David will review the enquiry and advise on a proportionate next step.</p><ul className="enquiry-trust-list"><li><CheckCircle2 size={18} /> Direct involvement from David</li><li><CheckCircle2 size={18} /> RIBA Chartered and ARB registered</li><li><CheckCircle2 size={18} /> Planning and technical services</li></ul><div className="actions"><a className="btn primary" href={site.phoneHref}><Phone size={17} /> Call {site.phone}</a><a className="btn light-btn" href={site.calendly} target="_blank" rel="noopener noreferrer">Book a consultation</a></div></div>
          <ContactForm source={`${page.shortTitle} architect landing page`} />
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell studio-process"><div><small className="eyebrow">Areas nearby</small><h2>Residential architect serving {page.shortTitle} and surrounding areas.</h2></div><div><p>We also support projects across {page.nearbyAreas.join(", ")}.</p><div className="nearby-links">{relatedLocations.map((location) => <Link href={`/locations/${location.slug}`} key={location.slug}>{location.shortTitle}</Link>)}</div></div></div>
      </section>

      <section className="section sand-section">
        <div className="shell local-office-panel"><div><small className="eyebrow">Nearest Hepburn Architects studio</small><h2>{site.offices.birmingham.name}</h2><address>{site.offices.birmingham.streetAddress}<br />{site.offices.birmingham.addressLocality}<br />{site.offices.birmingham.postalCode}</address></div><div><p>Contact the practice to discuss the property, likely approval route and the most proportionate architectural service.</p><div className="actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a><a className="btn secondary" href={site.offices.birmingham.mapUrl} target="_blank" rel="noopener noreferrer">View studio map</a></div></div></div>
      </section>
    </>
  );
}
