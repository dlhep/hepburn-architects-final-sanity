import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { getProject, getProjectSlugs, projectImageAlt, projectImageUrl } from "@/lib/projects";
import { site } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import { createSeoMetadata, PROJECT_DESCRIPTIONS, PROJECT_TITLES, projectSeoTitle, seoDescription } from "@/lib/seo";
import { getReviewForProject } from "@/lib/reviews";
import { ReviewQuote } from "@/components/reviews/RelevantReview";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildGraph, buildProjectSchema, buildWebPageSchema, breadcrumbId } from "@/lib/structured-data";

type PortableTextBlock = { children?: Array<{ text?: string }> };

function portableTextCharacterCount(blocks?: PortableTextBlock[]) {
  return (blocks ?? []).reduce((total, block) => total + (block.children ?? []).reduce((blockTotal, child) => blockTotal + (child.text?.trim().length ?? 0), 0), 0);
}

const projectDescriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="project-description-paragraph">{children}</p>,
    h2: ({ children }) => <h2 className="project-description-subheading">{children}</h2>,
    h3: ({ children }) => <h3 className="project-description-minor-heading">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="project-description-quote">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="project-description-list">{children}</ul>,
    number: ({ children }) => <ol className="project-description-list">{children}</ol>,
  },
};

const localLocationPages = [
  { terms: ["four oaks"], slug: "four-oaks-architects", name: "Four Oaks" },
  { terms: ["little aston"], slug: "little-aston-architects", name: "Little Aston" },
  { terms: ["moseley", "kings heath", "balsall heath", "hall green"], slug: "moseley-architects", name: "Moseley" },
  { terms: ["harborne", "selly oak", "quinton", "bartley green", "moor pool"], slug: "harborne-architects", name: "Harborne" },
  { terms: ["edgbaston", "calthorpe", "ladywood"], slug: "edgbaston-architects", name: "Edgbaston" },
  { terms: ["sutton coldfield", "boldmere", "wylde green", "streetly", "mere green"], slug: "sutton-coldfield-architects", name: "Sutton Coldfield" },
  { terms: ["solihull", "knowle", "dorridge", "shirley", "olton", "balsall common", "dickens heath"], slug: "solihull-architects", name: "Solihull" },
  { terms: ["birmingham", "west midlands"], slug: "birmingham-architects", name: "Birmingham" },
];

function getProjectLocationPage(location: string) {
  const normalised = location.toLowerCase();
  return localLocationPages.find((page) => page.terms.some((term) => normalised.includes(term)));
}

export async function generateStaticParams() {
  return (await getProjectSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const title = PROJECT_TITLES[slug] || projectSeoTitle(project.seoTitle || project.title, project.location);
  return createSeoMetadata({ title, description: PROJECT_DESCRIPTIONS[slug] || seoDescription(project.seoDescription, project.description), path: `/projects/${slug}`, image: projectImageUrl(project.featuredImage, 1600), type: "article" });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, projectReview] = await Promise.all([getProject(slug), getReviewForProject(slug)]);
  if (!project) notFound();

  const heroImage = projectImageUrl(project.featuredImage, 1920);
  const hasProjectDescription = Boolean(project.projectDescription?.length);
  const useDescriptionColumns = portableTextCharacterCount(project.projectDescription as PortableTextBlock[] | undefined) >= 360;
  const localLocationPage = getProjectLocationPage(project.location);
  const url = `${site.url}/projects/${project.slug}`;
  const schemas = buildGraph(
    buildWebPageSchema({ url, name: project.title, description: project.description, breadcrumb: breadcrumbId(url), mainEntity: `${url}#project`, primaryImage: heroImage }),
    buildProjectSchema({ url, name: project.title, description: project.description, images: [heroImage, ...(project.gallery || []).map((image) => projectImageUrl(image, 1400))], location: project.location, dateModified: project._updatedAt, keywords: [project.projectType, project.category, project.location, ...(project.services || [])].filter((item): item is string => Boolean(item)) }),
    buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Projects", url: `${site.url}/projects` }, { name: project.title, url }]),
  );

  return <>
    <StructuredData data={schemas} />
    <section className="project-detail-hero">
      <Image src={heroImage} alt={projectImageAlt(project)} width={1920} height={1200} priority sizes="100vw" />
      <div className="shell project-detail-overlay"><small>{project.category}</small><h1>{project.title}</h1><p><MapPin size={16} /> {project.location}</p></div>
    </section>
    <section className="section project-content-section"><div className="shell">
      <nav aria-label="Breadcrumb" className="muted small-copy"><Link href="/">Home</Link> · <Link href="/projects">Projects</Link></nav>
      <div className="project-detail-grid"><div><small className="eyebrow">Project overview</small><h2>{project.projectType}</h2><p className="lead">{project.description}</p></div>
        <dl className="project-facts"><div><dt>Location</dt><dd>{project.location}</dd></div>{project.localAuthority && <div><dt>Local authority</dt><dd>{project.localAuthority}</dd></div>}{project.applicationType && <div><dt>Application</dt><dd>{project.applicationType}</dd></div>}{project.contractValue && <div><dt>Indicative value</dt><dd>{project.contractValue}</dd></div>}{project.completion && <div><dt>Completion</dt><dd>{project.completion}</dd></div>}</dl>
      </div>
      {hasProjectDescription && <div className="project-description-panel"><div className="project-description-heading"><small className="eyebrow">Project description</small><h2>The project in detail.</h2></div><div className={`project-description-copy${useDescriptionColumns ? " is-multicolumn" : ""}`}><PortableText value={project.projectDescription!} components={projectDescriptionComponents} /></div></div>}
    </div></section>
    {project.gallery && project.gallery.length > 0 && <section className="section project-gallery-section"><div className={`shell project-gallery${project.gallery.length === 1 ? " project-gallery-single" : ""}`}>{project.gallery.map((image, index) => <figure key={image.asset?._id || index}><div className="project-gallery-media"><Image src={image.asset ? urlFor(image).width(1400).quality(76).url() : "/images/social-sharing.jpg"} alt={image.alt || `${project.title} project image ${index + 1}`} fill sizes={(project.gallery?.length ?? 0) === 1 ? "(max-width: 950px) 100vw, 1100px" : "(max-width: 950px) 100vw, 50vw"} /></div>{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div></section>}
    <section className="section sand-section"><div className="shell service-deliverables"><div><small className="eyebrow">Architectural services</small><h2>Support provided by Hepburn Architects.</h2></div><div className="deliverables-grid">{(project.services ?? []).map((service) => <div key={service}><CheckCircle2 /> {service}</div>)}</div></div></section>
    {projectReview ? <ReviewQuote review={projectReview} compact /> : null}
    {localLocationPage && <section className="section"><div className="shell content-cta"><small className="eyebrow">Local architectural services</small><h2>Planning another residential project in {localLocationPage.name}?</h2><p>Explore local design, planning and Building Regulations services, nearby project experience and area-specific planning guidance.</p><Link className="btn light-btn" href={`/locations/${localLocationPage.slug}`} data-track-event="project_location_cta_click">View {localLocationPage.name} architects <ArrowRight size={17} /></Link></div></section>}
    <section className="section"><div className="shell final-cta" data-track-section="project_enquiry"><small className="eyebrow">Start your project</small><h2>Planning a similar residential project?</h2><p>Discuss the property, approval route and next steps directly with Hepburn Architects.</p><div className="actions centered-actions"><Link className="btn primary" href="/estimate" data-track-event="project_enquiry_click">Get an indicative fee <ArrowRight size={17} /></Link><a className="btn secondary" href={site.phoneHref} data-track-event="project_enquiry_click">Call {site.phone}</a></div></div></section>
  </>;
}
