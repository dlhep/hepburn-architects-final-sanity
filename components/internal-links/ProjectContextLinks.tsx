import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { InternalLink, ProjectLink } from "@/lib/internal-links";
import type { Project } from "@/lib/projects";
import { getLocationLinksForProject, getLocationLinksForSlugs, getProjectLinks, getRelatedGuides, getServiceLinksForProjectType, getServiceLinksForSlugs } from "@/lib/internal-links";
import { projectImageAlt, projectImageUrl } from "@/lib/projects";
import styles from "./internal-links.module.css";

function labelForGuide(href: string) {
  return href.split("/").at(-1)?.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Helpful guide";
}

type CompactProject = ProjectLink & { image?: { src: string; alt: string } };

function CompactLink({ link, group }: { link: InternalLink; group: string }) {
  return <Link href={link.href} className={styles.compactLink} data-track-internal="true" data-track-group={group} data-track-event="project_case_study_engagement">
    <span><strong>{link.label}</strong>{link.description ? <small>{link.description}</small> : null}</span><ArrowRight aria-hidden="true" size={16} />
  </Link>;
}

function CompactProjectLink({ link }: { link: CompactProject }) {
  return <Link href={link.href} className={styles.compactProject} data-track-internal="true" data-track-group="related-projects" data-track-event="project_case_study_engagement">
    {link.image ? <Image src={link.image.src} alt={link.image.alt} width={96} height={68} sizes="96px" /> : null}<span><strong>{link.label}</strong>{link.description ? <small>{link.description}</small> : null}</span><ArrowRight aria-hidden="true" size={16} />
  </Link>;
}

export function ProjectContextLinks({ project, allProjects = [], compact = true }: { project: Project; allProjects?: Project[]; compact?: boolean }) {
  const services = project.relatedServices?.length ? getServiceLinksForSlugs(project.relatedServices) : getServiceLinksForProjectType(project.projectType, project.category);
  const locations = project.relatedLocations?.length ? getLocationLinksForSlugs(project.relatedLocations) : getLocationLinksForProject(project);
  const primaryService = services[0];
  const primaryLocation = locations[0];
  const guides = project.relatedGuides?.length
    ? project.relatedGuides.map((href) => ({ href, label: labelForGuide(href), description: "Supporting project guidance", destinationType: "guide" as const }))
    : getRelatedGuides(primaryService?.href.split("/").at(-1)).slice(0, 1);
  const relatedProjects: CompactProject[] = project.relatedProjects?.length
    ? project.relatedProjects
      .filter((slug) => slug !== project.slug)
      .map((slug) => allProjects.find((item) => item.slug === slug))
      .filter((item): item is Project => Boolean(item))
      .filter((item, index, list) => list.findIndex((candidate) => candidate.slug === item.slug) === index)
      .slice(0, 2)
      .map((item) => ({ href: `/projects/${item.slug}`, label: item.title, description: `${item.projectType} in ${item.location}`, destinationType: "project" as const, image: { src: projectImageUrl(item.featuredImage, 220), alt: projectImageAlt(item) } }))
    : getProjectLinks(project, allProjects).slice(0, 2).map((link) => {
      const related = allProjects.find((item) => `/projects/${item.slug}` === link.href);
      return related ? { ...link, image: { src: projectImageUrl(related.featuredImage, 220), alt: projectImageAlt(related) } } : link;
    });
  const itemEntries = [
    primaryService ? { link: primaryService, group: "project-services" } : null,
    primaryLocation ? { link: primaryLocation, group: "project-locations" } : null,
    guides[0] ? { link: guides[0], group: "project-guides" } : null,
  ].filter(Boolean) as Array<{ link: InternalLink; group: string }>;
  const items = itemEntries.filter((entry, index, list) => list.findIndex((item) => item.link.href === entry.link.href) === index);
  if (!items.length && !relatedProjects.length) return null;
  if (!compact) return <ProjectContextLinks project={project} allProjects={allProjects} compact />;
  return <section className={styles.compactSection} aria-labelledby={`related-information-${project.slug}`}>
    <div className="shell"><div className={styles.compactHeading}><small className="eyebrow">Related information</small><h2 id={`related-information-${project.slug}`}>Continue exploring</h2></div>
      <div className={styles.compactGrid}>
        {items.map(({ link, group }) => <CompactLink key={link.href} link={link} group={group} />)}
        {relatedProjects.map((link) => <CompactProjectLink key={link.href} link={link} />)}
      </div>
    </div>
  </section>;
}
