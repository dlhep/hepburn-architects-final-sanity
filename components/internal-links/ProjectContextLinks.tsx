import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectLink } from "@/lib/internal-links";
import type { Project } from "@/lib/projects";
import { getProjectLinks } from "@/lib/internal-links";
import { projectImageAlt, projectImageUrl } from "@/lib/projects";
import styles from "./internal-links.module.css";

type CompactProject = ProjectLink & { image?: { src: string; alt: string } };

function CompactProjectLink({ link }: { link: CompactProject }) {
  return <Link href={link.href} className={styles.compactProject} data-track-internal="true" data-track-group="related-projects" data-track-event="project_case_study_engagement">
    {link.image ? <Image src={link.image.src} alt={link.image.alt} width={96} height={68} sizes="96px" /> : null}<span><strong>{link.label}</strong>{link.description ? <small>{link.description}</small> : null}</span><ArrowRight aria-hidden="true" size={16} />
  </Link>;
}

export function ProjectContextLinks({ project, allProjects = [], compact = true }: { project: Project; allProjects?: Project[]; compact?: boolean }) {
  const relatedProjects: CompactProject[] = project.relatedProjects?.length
    ? project.relatedProjects
      .filter((slug) => slug !== project.slug)
      .map((slug) => allProjects.find((item) => item.slug === slug))
      .filter((item): item is Project => Boolean(item))
      .filter((item, index, list) => list.findIndex((candidate) => candidate.slug === item.slug) === index)
      .slice(0, 3)
      .map((item) => ({ href: `/projects/${item.slug}`, label: item.title, description: item.location, destinationType: "project" as const, image: { src: projectImageUrl(item.featuredImage, 220), alt: projectImageAlt(item) } }))
    : getProjectLinks(project, allProjects).slice(0, 3).map((link) => {
      const related = allProjects.find((item) => `/projects/${item.slug}` === link.href);
      return related ? { ...link, description: related.location, image: { src: projectImageUrl(related.featuredImage, 220), alt: projectImageAlt(related) } } : null;
    }).filter(Boolean) as CompactProject[];
  if (!relatedProjects.length) return null;
  if (!compact) return <ProjectContextLinks project={project} allProjects={allProjects} compact />;
  return <section className={styles.compactSection} aria-labelledby={`more-projects-${project.slug}`}>
    <div className="shell"><div className={styles.compactHeading}><small className="eyebrow">Selected projects</small><h2 id={`more-projects-${project.slug}`}>More projects</h2></div>
      <div className={styles.compactGrid}>{relatedProjects.map((link) => <CompactProjectLink key={link.href} link={link} />)}</div>
    </div>
  </section>;
}
