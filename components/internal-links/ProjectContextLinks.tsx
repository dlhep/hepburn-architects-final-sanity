import type { Project } from "@/lib/projects";
import { getLocationLinksForProject, getLocationLinksForSlugs, getProjectLinks, getRelatedGuides, getServiceLinksForProjectType, getServiceLinksForSlugs } from "@/lib/internal-links";
import { RelatedLinks } from "./RelatedLinks";

export function ProjectContextLinks({ project, allProjects = [] }: { project: Project; allProjects?: Project[] }) {
  const services = project.relatedServices?.length ? getServiceLinksForSlugs(project.relatedServices) : getServiceLinksForProjectType(project.projectType, project.category);
  const locations = project.relatedLocations?.length ? getLocationLinksForSlugs(project.relatedLocations) : getLocationLinksForProject(project);
  const guides = project.relatedGuides?.length ? project.relatedGuides.map((href) => ({ href, label: href.split("/").at(-1)?.replace(/-/g, " ") || "Helpful guide", destinationType: "guide" as const })) : getRelatedGuides(services[0]?.href.split("/").at(-1));
  const projects = project.relatedProjects?.length ? project.relatedProjects.filter((slug) => slug !== project.slug).map((slug) => allProjects.find((item) => item.slug === slug)).filter((item): item is Project => Boolean(item)).map((item) => ({ href: `/projects/${item.slug}`, label: item.title, description: `${item.projectType} in ${item.location}`, destinationType: "project" as const })) : getProjectLinks(project, allProjects);
  return <div>
    <RelatedLinks heading="Services for this project type" links={services} group="project-services" />
    <RelatedLinks heading="Project locations" links={locations} group="project-locations" />
    {guides.length ? <RelatedLinks heading="Helpful guides" links={guides.slice(0, 2)} group="project-guides" /> : null}
    {projects.length ? <RelatedLinks heading="Related projects" links={projects} group="related-projects" /> : null}
  </div>;
}
