import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getProject, getProjectSlugs, getProjects, projectImageAlt, projectImageUrl } from "@/lib/projects";
import { ProjectContextLinks } from "@/components/internal-links/ProjectContextLinks";
import {
  ProjectBeforeAfter,
  ProjectCaseStudyDetails,
  ProjectDescription,
  ProjectDrawings,
  ProjectGallery,
  ProjectOverview,
  ProjectServices,
} from "@/components/projects/ProjectCaseStudySections";
import { site } from "@/lib/site";
import { createSeoMetadata, PROJECT_DESCRIPTIONS, PROJECT_TITLES, projectSeoTitle, seoDescription } from "@/lib/seo";

function projectTitle(project: { title: string; location: string; projectType: string; seoTitle?: string }) {
  if (project.seoTitle) return project.seoTitle;
  const base = projectSeoTitle(project.title, project.location);
  if (base.toLowerCase().includes(project.location.toLowerCase())) return base;
  return `${base} | ${project.projectType} in ${project.location}`;
}

export async function generateStaticParams() {
  return (await getProjectSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return createSeoMetadata({
    title: PROJECT_TITLES[slug] || projectTitle(project),
    description: PROJECT_DESCRIPTIONS[slug] || seoDescription(project.seoDescription, `${project.description} ${project.projectType} in ${project.location}.`),
    path: `/projects/${slug}`,
    image: projectImageUrl(project.featuredImage, 1600),
    type: "article",
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const allProjects = await getProjects();
  const heroImage = projectImageUrl(project.featuredImage, 1920);
  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${site.url}/projects/${project.slug}#case-study`,
        name: project.title,
        description: project.description,
        image: [heroImage, ...(project.gallery || []).map((image) => projectImageUrl(image, 1400))],
        creator: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.legalName },
        locationCreated: { "@type": "Place", name: project.location },
        dateModified: project._updatedAt,
        url: `${site.url}/projects/${project.slug}`,
        about: [project.projectType, project.category].filter(Boolean),
        keywords: [project.projectType, project.category, project.location, ...(project.services || [])].filter(Boolean),
        mainEntityOfPage: `${site.url}/projects/${project.slug}`,
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${site.url}/projects/${project.slug}` },
      ] },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    <section className="project-detail-hero">
      <Image src={heroImage} alt={projectImageAlt(project)} width={1920} height={1200} priority sizes="100vw" />
    </section>
    <section className="project-heading-section"><div className="shell"><nav aria-label="Breadcrumb" className="muted small-copy project-heading-breadcrumb"><Link href="/">Home</Link> · <Link href="/projects">Projects</Link> · <span aria-current="page">{project.title}</span></nav><small className="eyebrow project-location-label">{project.location}</small><h1>{project.title}</h1><Link className="project-hero-back project-heading-link" href="/projects">View All Projects <ArrowRight size={15} /></Link></div></section>
    <ProjectOverview project={project} />
    <ProjectDescription value={project.projectDescription} />
    <ProjectGallery gallery={project.gallery} projectTitle={project.title} />
    <ProjectCaseStudyDetails project={project} />
    <ProjectDrawings drawings={project.designDrawings} projectTitle={project.title} />
    <ProjectBeforeAfter intro={project.beforeAfterIntro} beforeImages={project.beforeImages} afterImages={project.afterImages} projectTitle={project.title} />
    <ProjectServices services={project.services} />
    <ProjectContextLinks project={project} allProjects={allProjects} compact />
    <section className="section"><div className="shell final-cta" data-track-section="project_enquiry"><small className="eyebrow">Start your project</small><h2>Planning a similar project?</h2><p>Discuss your property, ideas and likely next steps with Hepburn Architects.</p><div className="actions centered-actions"><Link className="btn primary" href="/contact" data-track-event="project_enquiry_click" data-track-project-slug={project.slug} data-track-project-category={project.category} data-track-project-location={project.location}>Discuss Your Project <ArrowRight size={17} /></Link><Link className="btn secondary" href="/estimate" data-track-event="project_enquiry_click" data-track-project-slug={project.slug} data-track-project-category={project.category} data-track-project-location={project.location}>Get an Indicative Fee <ArrowRight size={17} /></Link></div></div></section>
  </>;
}
