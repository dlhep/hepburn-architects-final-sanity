import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, MapPin, Phone, Quote } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { locations, services } from "@/lib/content-extended";
import { getBirminghamProjects, getProjects, projectImageAlt, projectImageUrl, type Project } from "@/lib/projects";
import { site } from "@/lib/site";
import { RelatedGuides } from "@/components/internal-links/RelatedGuides";
import { Breadcrumbs } from "@/components/internal-links/Breadcrumbs";
import { createSeoMetadata, SOCIAL_IMAGE } from "@/lib/seo";
import { getReviewForLocation } from "@/lib/reviews";
import { ReviewQuote } from "@/components/reviews/RelevantReview";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildFaqSchema, buildGraph, buildServiceSchema, buildWebPageSchema, breadcrumbId, serviceId } from "@/lib/structured-data";
import { regionForLocationSlug, NORTH_EAST_REGION } from "@/lib/google-business/model";

const birminghamFaqs = [
  { question: "What type of projects does Hepburn Architects undertake in Birmingham?", answer: "Hepburn Architects supports house extensions, loft conversions, new-build homes, HMOs, flat conversions, planning applications, Building Regulations packages and small residential developments. The suitability and scope of each appointment are reviewed before work begins." },
  { question: "Do I need an architect for a Birmingham planning application?", answer: "An architect is not legally required for most planning applications, but architectural input can improve the design, accuracy and presentation of the proposal. More constrained properties may also require planning, heritage, transport, ecology, drainage or tree advice." },
  { question: "Can you handle both planning and Building Regulations?", answer: "Yes. Hepburn Architects can provide a coordinated appointment covering feasibility, planning drawings and Building Regulations information. Structural engineering and other specialist services are identified separately where required." },
  { question: "Do you work throughout Birmingham?", answer: "Yes. The Birmingham studio supports projects throughout Birmingham and the wider West Midlands, including Harborne, Edgbaston, Moseley, Kings Heath, Bournville, Sutton Coldfield and surrounding areas." },
  { question: "How much does an architect cost in Birmingham?", answer: "Architectural fees depend on the property, project type, floor area, planning risk and services required. Hepburn Architects provides written stage-based fee proposals, and the website fee calculator can provide an early indicative figure." },
  { question: "Can you guarantee planning permission?", answer: "No architect or planning consultant can guarantee planning permission. The role of the architect is to identify constraints, develop the strongest reasonable proposal and prepare a clear and properly coordinated submission." },
];

const birminghamIntro = "Hepburn Architects is an ARB-registered and RIBA Chartered architectural practice providing director-led residential design, planning and Building Regulations services across Birmingham and the West Midlands. We help homeowners, developers and property investors with house extensions, loft conversions, new homes, HMOs, residential conversions and small development sites.";

const birminghamAreas = [
  ["Harborne", "/locations/harborne-architects"],
  ["Edgbaston", "/locations/edgbaston-architects"],
  ["Moseley", "/locations/moseley-architects"],
  ["Kings Heath", "/locations/kings-heath-architects"],
  ["Bournville", "/locations/bournville-architects"],
] as const;

const birminghamProcess = [
  ["01", "Property and brief review", "We review the address, planning history, existing property, proposed work and likely approval route."],
  ["02", "Survey and feasibility", "The existing building is recorded and the strongest design options are tested before a full application is prepared."],
  ["03", "Planning and approvals", "Coordinated drawings and supporting information are prepared for planning permission, permitted development or a lawful development certificate as appropriate."],
  ["04", "Building Regulations", "The approved design is developed into technical drawings, with structural and specialist information coordinated where required."],
] as const;

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) return {};
  if (slug === "birmingham-architects") {
    const description = "RIBA Chartered residential architects in Birmingham providing house extension design, planning applications, new homes, HMO conversions and Building Regulations drawings. Speak directly with architect David Hepburn.";
    const socialTitle = "Residential Architects in Birmingham | Hepburn Architects";
    const socialDescription = "Director-led architectural design, planning and Building Regulations services for homeowners, developers and property investors across Birmingham.";
    const url = `${site.url}/locations/birmingham-architects`;
    return {
      title: "Residential Architects Birmingham | Planning & Extensions",
      description,
      alternates: { canonical: url },
      openGraph: { title: socialTitle, description: socialDescription, url, siteName: site.name, type: "website", images: [{ url: SOCIAL_IMAGE }] },
      twitter: { card: "summary_large_image", title: socialTitle, description: socialDescription, images: [SOCIAL_IMAGE] },
    };
  }
  return createSeoMetadata({
    title: `Architects in ${page.shortTitle}`,
    description: page.description,
    path: `/locations/${slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = locations.find((item) => item.slug === slug);
  if (!page) notFound();

  const isBirmingham = slug === "birmingham-architects";
  const isSolihull = slug === "solihull-architects";
  const isEnhanced = isBirmingham || isSolihull || Boolean(page.authorityPage);
  const relatedServices = services.filter((service) => page.serviceSlugs.includes(service.slug));
  const nearbyAreaNames = slug === "sutton-coldfield-architects"
    ? ["Four Oaks", "Little Aston", ...page.nearbyAreas]
    : page.nearbyAreas;
  const relatedLocations = locations.filter((location) => nearbyAreaNames.includes(location.shortTitle)).slice(0, 6);
  const projectTerms = isBirmingham ? birminghamProjectTerms : isSolihull ? ["solihull", "knowle", "dorridge", "shirley", "olton", "balsall common", "warwickshire"] : page.projectTerms ?? [];
  const [allProjects, birminghamProjects, locationReview] = await Promise.all([
    isEnhanced && !isBirmingham ? getProjects() : Promise.resolve([]),
    isBirmingham ? getBirminghamProjects() : Promise.resolve([]),
    getReviewForLocation(slug),
  ]);
  const regionalProjects = isBirmingham ? birminghamProjects : isEnhanced ? selectProjects(allProjects, projectTerms) : [];
  const faqs = isBirmingham ? birminghamFaqs : isSolihull ? solihullFaqs : page.faqs ?? [];
  const planningTopics = isBirmingham ? birminghamPlanningTopics : isSolihull ? solihullPlanningTopics : page.planningTopics ?? [];
  const planningIntro = isBirmingham
    ? "Every proposal is tested against the property, its planning history, Birmingham City Council guidance and likely effects on neighbours and the wider street."
    : isSolihull
      ? "Solihull projects often need to respond to mature suburban character, conservation areas, Green Belt edges, trees and made neighbourhood plans as well as the national planning framework."
      : page.planningIntro;

  const url = `${site.url}/locations/${slug}`;
  const studio = regionForLocationSlug(slug) === NORTH_EAST_REGION ? "nunthorpe" : "birmingham";
  const schemas = buildGraph(buildWebPageSchema({ url, name: page.title, description: page.description, breadcrumb: breadcrumbId(url), mainEntity: serviceId(url) }), buildServiceSchema({ url, name: `Residential architectural services in ${page.shortTitle}`, description: page.description, areas: [page.shortTitle, ...page.nearbyAreas].map((name) => ({ name })), studio }), buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Locations", url: `${site.url}/locations` }, { name: page.shortTitle, url }]), buildFaqSchema(url, faqs));

  return (
    <>
      <StructuredData data={schemas} />

      <section className="section location-hero">
        <div className="shell content-page">
          <small className="eyebrow"><MapPin size={14} /> Local residential architecture</small>
          <h1>{page.title}</h1>
          <p className="lead">{isBirmingham ? birminghamIntro : page.intro}</p>
          <div className="actions">
            <a className="btn primary" href={site.phoneHref}><Phone size={17} /> Call {site.phone}</a>
            <a className="btn secondary" href="#project-enquiry">Discuss your project <ArrowRight size={17} /></a>
          </div>
          {isBirmingham && <div className="hero-trust location-hero-trust" aria-label="Practice credentials"><span><CheckCircle2 /> ARB-registered architect</span><span><CheckCircle2 /> RIBA Chartered Practice</span><span><CheckCircle2 /> Birmingham studio</span><span><CheckCircle2 /> Director-led service</span></div>}
        </div>
      </section>

      <div className="shell" style={{ paddingTop: "1.25rem" }}><Breadcrumbs items={[{ label: "Locations", href: "/locations" }, { label: page.shortTitle }]} /></div>

      <section className="section">
        <div className="shell service-detail-columns">
          <div><small className="eyebrow">Local knowledge</small><h2>Residential architecture shaped by {page.shortTitle}.</h2></div>
          <div>{isBirmingham ? <><p className="lead">Birmingham contains a broad mix of Victorian and Edwardian terraces, inter-war suburbs, post-war housing, conservation areas and contemporary residential development. A successful proposal must respond to the individual property as well as neighbouring daylight, privacy, parking, trees, drainage, street character and Birmingham City Council planning policy.</p><p>Hepburn Architects combines architectural design with planning strategy and technical coordination. We can support a project from measured survey and feasibility through <Link className="text-link" href="/services/planning-applications">planning permission</Link> and <Link className="text-link" href="/services/building-regulations">Building Regulations drawings</Link>, with structural engineers, planning consultants and other specialists coordinated where required.</p><p className="location-area-copy">Areas regularly served include Harborne, Edgbaston, Moseley, Kings Heath, Bournville, Selly Oak, Sutton Coldfield, Handsworth Wood, Hall Green, Yardley, Erdington and surrounding West Midlands districts.</p></> : <><p className="lead">{page.localContext}</p><p>Hepburn Architects can support the project from early feasibility and planning strategy through to Building Regulations drawings and consultant coordination. The appointment is tailored to the property, approval route and information already available.</p></>}</div>
        </div>
      </section>

      {isBirmingham && (
        <section className="section selected-work-section birmingham-projects-section">
          <div className="shell">
            <div className="selected-work-heading"><small className="eyebrow">Birmingham project experience</small><h2>Residential projects across Birmingham and the surrounding area.</h2><p>Our Birmingham work includes house extensions, internal remodelling, residential conversions, HMOs, new homes and small development opportunities. Each project is reviewed against its property type, planning history, local character and technical constraints.</p></div>
            {regionalProjects.length > 0 ? <div className="birmingham-project-grid">{regionalProjects.map((project) => <article className="birmingham-project-card" key={project.slug}><Link href={`/projects/${project.slug}`}><Image src={projectImageUrl(project.featuredImage, 900)} alt={projectImageAlt(project)} width={900} height={600} sizes="(max-width: 850px) 100vw, 33vw" /></Link><div><small>{project.location.toLowerCase().includes("birmingham") ? project.location : `${project.location}, Birmingham`}</small><span>{project.projectType}</span><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p><Link className="project-case-study-link" href={`/projects/${project.slug}`}>View full case study <ArrowRight size={16} /></Link></div></article>)}</div> : <p className="project-empty-state">Birmingham project case studies are being prepared for publication. Explore the full project archive in the meantime.</p>}
            <div className="selected-work-action"><Link className="btn secondary" href="/projects">View all Birmingham-area projects <ArrowRight size={17} /></Link></div>
          </div>
        </section>
      )}

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

      {isBirmingham && (
        <section className="section sand-section birmingham-process-section">
          <div className="shell editorial-grid">
            <div><small className="eyebrow">Appointment process</small><h2>A clear route from initial idea to technical design.</h2><p>Explore practical guidance in the <Link className="text-link" href="/knowledge-centre">knowledge centre</Link>, use the <Link className="text-link" href="/estimate">fee calculator</Link> for an early indication, or <Link className="text-link" href="/contact">contact the studio</Link> to discuss your property.</p></div>
            <div className="birmingham-process-list">{birminghamProcess.map(([number, title, body]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
          </div>
          <div className="shell process-qualification"><p>Project scope is confirmed through a written fee proposal. Planning permission cannot be guaranteed.</p></div>
        </section>
      )}

      {isEnhanced && planningTopics.length > 0 && (
        <section className="section dark-section birmingham-planning-section">
          <div className="shell">
            <div className="page-intro"><small className="eyebrow">Planning in {page.shortTitle}</small><h2>Local planning knowledge built into the design.</h2><p className="lead">{planningIntro}</p></div>
            {isBirmingham ? <p className="lead">For a detailed explanation of householder applications, permitted development, prior approval and Lawful Development Certificates, read our <Link href="/journal/house-extension-planning-permission-birmingham-2026-guide">2026 Birmingham extension planning guide</Link>.</p> : null}
            <div className="authority-grid">
              {planningTopics.map((topic, index) => <article key={topic.title}><span>0{index + 1}</span><h3>{topic.title}</h3><p>{topic.body}</p><a href={topic.href} target="_blank" rel="noopener noreferrer">{topic.linkLabel} <ExternalLink size={15} /></a></article>)}
            </div>
          </div>
        </section>
      )}

      {!isBirmingham && regionalProjects.length > 0 && (
        <section className="section selected-work-section">
          <div className="shell">
            <div className="selected-work-heading"><small className="eyebrow">{page.shortTitle} and regional projects</small><h2>Relevant residential work.</h2><p>{isSolihull ? "Extensions, new homes and residential projects from Solihull and the surrounding West Midlands." : page.projectIntro || "A selection of extensions, new homes and residential transformations from the wider region."}</p></div>
            <div className="selected-work-grid">
              {regionalProjects.map((project, index) => <Link href={`/projects/${project.slug}`} className={index === 0 ? "selected-work-main" : "selected-work-small"} key={project.slug}><Image src={projectImageUrl(project.featuredImage, index === 0 ? 1400 : 900)} alt={projectImageAlt(project)} width={index === 0 ? 1400 : 900} height={index === 0 ? 900 : 600} sizes={index === 0 ? "(max-width: 950px) 100vw, 66vw" : "(max-width: 950px) 100vw, 33vw"} /><div className="selected-work-overlay"><span>{project.location} · {project.projectType}</span><strong>{project.title}</strong></div></Link>)}
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
          <div className="shell service-detail-columns"><div><small className="eyebrow">{isBirmingham ? "Birmingham FAQs" : "Common questions"}</small><h2>{isBirmingham ? "Questions about appointing an architect in Birmingham." : `Planning and architectural services in ${page.shortTitle}.`}</h2></div><div className="faq-list">{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div>
        </section>
      )}

      {locationReview ? <ReviewQuote review={locationReview} /> : null}

      <RelatedGuides serviceSlug={page.serviceSlugs[0]} heading={`Helpful guides for ${page.shortTitle}`} />

      <section className="section dark-section birmingham-enquiry-section" id="project-enquiry">
        <div className="shell contact-grid">
          <div><small className="eyebrow">Discuss your {page.shortTitle} project</small><h2>Start with the property, the brief and the likely approval route.</h2><p className="lead">Tell us where the property is and what you are considering. David will review the enquiry and advise on a proportionate next step.</p><ul className="enquiry-trust-list"><li><CheckCircle2 size={18} /> Direct involvement from David</li><li><CheckCircle2 size={18} /> RIBA Chartered and ARB registered</li><li><CheckCircle2 size={18} /> Planning and technical services</li></ul><div className="actions"><a className="btn primary" href={site.phoneHref}><Phone size={17} /> Call {site.phone}</a><a className="btn light-btn" href={site.calendly} target="_blank" rel="noopener noreferrer">Book a consultation</a></div></div>
          <ContactForm source={`${page.shortTitle} architect landing page`} />
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell studio-process"><div><small className="eyebrow">Areas nearby</small><h2>Residential architect serving {page.shortTitle} and surrounding areas.</h2></div><div>{isBirmingham ? <><p>Residential architectural services are available across Birmingham and the wider West Midlands. These links describe local planning and property context; they do not imply a completed project in every district.</p><div className="nearby-links">{birminghamAreas.map(([name, href]) => <Link href={href} key={href}>{name}</Link>)}</div></> : <><p>We also support projects across {page.nearbyAreas.join(", ")}.</p><div className="nearby-links">{slug === "sutton-coldfield-architects" ? <><Link href="/locations/four-oaks-architects">Four Oaks</Link><Link href="/locations/little-aston-architects">Little Aston</Link></> : null}{relatedLocations.filter((location) => slug !== "sutton-coldfield-architects" || !["Four Oaks", "Little Aston"].includes(location.shortTitle)).map((location) => <Link href={`/locations/${location.slug}`} key={location.slug}>{location.shortTitle}</Link>)}</div></>}</div></div>
      </section>

      <section className="section sand-section">
        <div className="shell local-office-panel"><div><small className="eyebrow">Nearest Hepburn Architects studio</small><h2>{site.offices.birmingham.name}</h2><address>{site.offices.birmingham.streetAddress}<br />{site.offices.birmingham.addressLocality}<br />{site.offices.birmingham.postalCode}</address></div><div><p>Contact the practice to discuss the property, likely approval route and the most proportionate architectural service.</p><div className="actions"><a className="btn primary" href={site.phoneHref}>Call {site.phone}</a><a className="btn secondary" href={site.offices.birmingham.mapUrl} target="_blank" rel="noopener noreferrer">View studio map</a></div></div></div>
      </section>
    </>
  );
}
