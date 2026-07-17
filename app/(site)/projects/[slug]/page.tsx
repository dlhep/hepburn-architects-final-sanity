import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { getProject, getProjectSlugs, projectImageAlt, projectImageUrl } from "@/lib/projects";
import { site } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";

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
    openGraph: { title: `${title} | Hepburn Architects`, description: project.description, images: [{ url: image, alt: projectImageAlt(project) }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const heroImage = projectImageUrl(project.featuredImage, 2000);
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: heroImage,
    creator: { "@type": "Organization", name: "Hepburn Architects Ltd" },
    locationCreated: project.location,
    url: `${site.url}/projects/${project.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <section className="project-detail-hero">
        <img src={heroImage} alt={projectImageAlt(project)} />
        <div className="shell project-detail-overlay">
          <small>{project.category}</small><h1>{project.title}</h1><p><MapPin size={16} /> {project.location}</p>
        </div>
      </section>
      <section className="section">
        <div className="shell project-detail-grid">
          <div><small className="eyebrow">Project overview</small><h2>{project.projectType}</h2><p className="lead">{project.description}</p><p>The design was developed around the client brief, site context, planning route, spatial priorities and long-term performance of the home.</p></div>
          <dl className="project-facts">
            <div><dt>Location</dt><dd>{project.location}</dd></div>
            {project.localAuthority && <div><dt>Local authority</dt><dd>{project.localAuthority}</dd></div>}
            {project.applicationType && <div><dt>Application</dt><dd>{project.applicationType}</dd></div>}
            {project.contractValue && <div><dt>Indicative value</dt><dd>{project.contractValue}</dd></div>}
            {project.completion && <div><dt>Completion</dt><dd>{project.completion}</dd></div>}
          </dl>
        </div>
      </section>
      {project.gallery && project.gallery.length > 0 && (
        <section className="section project-gallery-section"><div className="shell project-gallery">
          {project.gallery.map((image, index) => (
            <figure key={image.asset?._id || index}>
              <img src={image.asset ? urlFor(image).width(1600).quality(86).url() : "/images/og.svg"} alt={image.alt || `${project.title} project image ${index + 1}`} loading="lazy" />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div></section>
      )}
      <section className="section sand-section"><div className="shell service-deliverables"><div><small className="eyebrow">Architectural services</small><h2>Support provided by Hepburn Architects.</h2></div><div className="deliverables-grid">{project.services.map((service) => <div key={service}><CheckCircle2 /> {service}</div>)}</div></div></section>
      <section className="section"><div className="shell final-cta"><small className="eyebrow">Start your project</small><h2>Planning a similar residential project?</h2><p>Discuss the property, approval route and next steps directly with Hepburn Architects.</p><div className="actions centered-actions"><Link className="btn primary" href="/estimate">Get an indicative fee <ArrowRight size={17} /></Link><a className="btn secondary" href={site.phoneHref}>Call {site.phone}</a></div></div></section>
    </>
  );
}
