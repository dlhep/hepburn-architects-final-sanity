import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { getProject, getProjectSlugs, projectImageAlt, projectImageUrl } from "@/lib/projects";
import { site } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";

type PortableTextBlock = {
  children?: Array<{ text?: string }>;
};

function portableTextCharacterCount(blocks?: PortableTextBlock[]) {
  return (blocks ?? []).reduce(
    (total, block) =>
      total +
      (block.children ?? []).reduce(
        (blockTotal, child) => blockTotal + (child.text?.trim().length ?? 0),
        0,
      ),
    0,
  );
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
  { terms: ["moseley", "kings heath", "balsall heath", "hall green"], slug: "moseley-architects", name: "Moseley" },
  { terms: ["harborne", "selly oak", "quinton", "bartley green", "moor pool"], slug: "harborne-architects", name: "Harborne" },
  { terms: ["edgbaston", "calthorpe", "ladywood"], slug: "edgbaston-architects", name: "Edgbaston" },
  { terms: ["sutton coldfield", "four oaks", "boldmere", "wylde green", "streetly", "mere green"], slug: "sutton-coldfield-architects", name: "Sutton Coldfield" },
  { terms: ["solihull", "knowle", "dorridge", "shirley", "olton", "balsall common", "dickens heath"], slug: "solihull-architects", name: "Solihull" },
  { terms: ["birmingham", "west midlands"], slug: "birmingham-architects", name: "Birmingham" },
];

function getProjectLocationPage(location: string) {
  const normalised = location.toLowerCase();
  return localLocationPages.find((page) => page.terms.some((term) => normalised.includes(term)));
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  const title = `${project.title}, ${project.location}`;
  const image = projectImageUrl(project.featuredImage, 1600);

  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${title} | Hepburn Architects`,
      description: project.description,
      type: "article" as const,
      url: `/projects/${slug}`,
      modifiedTime: project._updatedAt,
      images: [{ url: image, alt: projectImageAlt(project) }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: project.description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const heroImage = projectImageUrl(project.featuredImage, 2000);
  const hasProjectDescription = Boolean(project.projectDescription?.length);
  const useDescriptionColumns = portableTextCharacterCount(project.projectDescription as PortableTextBlock[] | undefined) >= 360;
  const localLocationPage = getProjectLocationPage(project.location);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": ["CreativeWork", "VisualArtwork"],
      name: project.title,
      description: project.description,
      image: heroImage,
      creator: { "@type": "Organization", "@id": `${site.url}/#organization`, name: "Hepburn Architects Ltd" },
      locationCreated: project.location,
      dateModified: project._updatedAt,
      url: `${site.url}/projects/${project.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${site.url}/projects/${project.slug}` },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="project-detail-hero">
        <Image
          src={heroImage}
          alt={projectImageAlt(project)}
          width={2000}
          height={1250}
          priority
          sizes="100vw"
        />
        <div className="shell project-detail-overlay">
          <small>{project.category}</small>
          <h1>{project.title}</h1>
          <p><MapPin size={16} /> {project.location}</p>
        </div>
      </section>

      <section className="section project-content-section">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="muted small-copy">
            <Link href="/">Home</Link> · <Link href="/projects">Projects</Link>
          </nav>
          <div className="project-detail-grid">
            <div>
              <small className="eyebrow">Project overview</small>
              <h2>{project.projectType}</h2>
              <p className="lead">{project.description}</p>
              {!hasProjectDescription && (
                <p>The design was developed around the client brief, site context, planning route, spatial priorities and long-term performance of the home.</p>
              )}
            </div>

            <dl className="project-facts">
              <div><dt>Location</dt><dd>{project.location}</dd></div>
              {project.localAuthority && <div><dt>Local authority</dt><dd>{project.localAuthority}</dd></div>}
              {project.applicationType && <div><dt>Application</dt><dd>{project.applicationType}</dd></div>}
              {project.contractValue && <div><dt>Indicative value</dt><dd>{project.contractValue}</dd></div>}
              {project.completion && <div><dt>Completion</dt><dd>{project.completion}</dd></div>}
            </dl>
          </div>

          {hasProjectDescription && (
            <div className="project-description-panel">
              <div className="project-description-heading"><small className="eyebrow">Project description</small><h2>The project in detail.</h2></div>
              <div className={`project-description-copy${useDescriptionColumns ? " is-multicolumn" : ""}`}>
                <PortableText value={project.projectDescription as any} components={projectDescriptionComponents} />
              </div>
            </div>
          )}
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="section project-gallery-section">
          <div className={`shell project-gallery${project.gallery.length === 1 ? " project-gallery-single" : ""}`}>
            {project.gallery.map((image, index) => (
              <figure key={image.asset?._id || index}>
                <div className="project-gallery-media">
                  <Image
                    src={image.asset ? urlFor(image).width(1600).quality(86).url() : "/images/og.svg"}
                    alt={image.alt || `${project.title} project image ${index + 1}`}
                    fill
                    sizes={(project.gallery?.length ?? 0) === 1
                      ? "(max-width: 950px) 100vw, 1100px"
                      : "(max-width: 950px) 100vw, 50vw"}
                  />
                </div>
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="section sand-section">
        <div className="shell service-deliverables">
          <div><small className="eyebrow">Architectural services</small><h2>Support provided by Hepburn Architects.</h2></div>
          <div className="deliverables-grid">
            {(project.services ?? []).map((service) => <div key={service}><CheckCircle2 /> {service}</div>)}
          </div>
        </div>
      </section>

      {localLocationPage && (
        <section className="section">
          <div className="shell content-cta">
            <small className="eyebrow">Local architectural services</small>
            <h2>Planning another residential project in {localLocationPage.name}?</h2>
            <p>Explore local design, planning and Building Regulations services, nearby project experience and area-specific planning guidance.</p>
            <Link className="btn light-btn" href={`/locations/${localLocationPage.slug}`}>View {localLocationPage.name} architects <ArrowRight size={17} /></Link>
          </div>
        </section>
      )}

      <section className="section">
        <div className="shell final-cta">
          <small className="eyebrow">Start your project</small>
          <h2>Planning a similar residential project?</h2>
          <p>Discuss the property, approval route and next steps directly with Hepburn Architects.</p>
          <div className="actions centered-actions">
            <Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={17} /></Link>
            <a className="btn secondary" href={site.phoneHref}>Call {site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
