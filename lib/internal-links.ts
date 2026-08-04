import { guides, locations, services } from "@/lib/content-extended";
import type { Project } from "@/lib/projects";

export type LinkDestinationType = "service" | "location" | "project" | "guide" | "journal" | "calculator" | "contact" | "resource";
export type InternalLink = { href: string; label: string; description?: string; destinationType?: LinkDestinationType };
export type ServiceLink = InternalLink & { destinationType: "service" };
export type LocationLink = InternalLink & { destinationType: "location" };
export type ContentLink = InternalLink & { destinationType: "guide" | "journal" };
export type ProjectLink = InternalLink & { destinationType: "project" };
export type RelatedLinkGroup = { heading: string; links: InternalLink[]; group: string; ariaLabel?: string };

export const cornerstonePages: InternalLink[] = [
  { href: "/", label: "Hepburn Architects", destinationType: "resource" },
  ...services.map((item) => ({ href: `/services/${item.slug}`, label: item.shortTitle, description: item.description, destinationType: "service" as const })),
  { href: "/locations/birmingham-architects", label: "Residential architects across Birmingham", destinationType: "location" },
  { href: "/locations", label: "Areas we serve", destinationType: "location" },
  { href: "/projects", label: "Residential architecture projects", destinationType: "project" },
  { href: "/knowledge-centre", label: "Knowledge Centre", destinationType: "guide" },
  { href: "/estimate", label: "Indicative fee calculator", destinationType: "calculator" },
  { href: "/house-extension-guide", label: "House Extension Guide", destinationType: "guide" },
];

const serviceRelationships: Record<string, string[]> = {
  "house-extensions": ["planning-applications", "building-regulations", "loft-conversions"],
  "planning-applications": ["house-extensions", "loft-conversions", "new-build-homes", "hmo-conversions", "building-regulations"],
  "building-regulations": ["house-extensions", "loft-conversions", "new-build-homes", "hmo-conversions"],
  "new-build-homes": ["planning-applications", "building-regulations"],
  "loft-conversions": ["house-extensions", "planning-applications", "building-regulations"],
  "hmo-conversions": ["planning-applications", "building-regulations"],
};

const guideRelationships: Record<string, string[]> = {
  "house-extensions": ["/knowledge-centre/house-extensions", "/knowledge-centre/extension-planning-permission", "/knowledge-centre/house-extension-costs", "/knowledge-centre/house-extension-timeline", "/knowledge-centre/house-extension-ideas", "/house-extension-guide"],
  "planning-applications": ["/knowledge-centre/planning-permission", "/knowledge-centre/extension-planning-permission", "/journal/house-extension-planning-permission-birmingham-2026-guide"],
  "building-regulations": ["/knowledge-centre/building-regulations", "/knowledge-centre/house-extensions", "/knowledge-centre/loft-conversions"],
  "loft-conversions": ["/knowledge-centre/loft-conversions", "/knowledge-centre/extension-planning-permission"],
  "hmo-conversions": ["/knowledge-centre/planning-permission", "/knowledge-centre/building-regulations"],
  "new-build-homes": ["/knowledge-centre/planning-permission", "/knowledge-centre/building-regulations"],
};

const guideLabels: Record<string, string> = {
  "/knowledge-centre/house-extensions": "Complete house extension guide",
  "/knowledge-centre/extension-planning-permission": "Extension planning permission guidance",
  "/knowledge-centre/house-extension-costs": "House extension cost guidance",
  "/knowledge-centre/house-extension-timeline": "House extension timescale guidance",
  "/knowledge-centre/house-extension-ideas": "House extension design ideas",
  "/knowledge-centre/planning-permission": "Planning permission explained",
  "/knowledge-centre/building-regulations": "Building Regulations guidance",
  "/knowledge-centre/loft-conversions": "Loft conversion planning guidance",
  "/house-extension-guide": "Free House Extension Guide",
  "/journal/house-extension-planning-permission-birmingham-2026-guide": "Birmingham extension planning guide",
};

const knownLocationSlugs = new Map(locations.map((location) => [location.shortTitle.toLowerCase(), location.slug]));
const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function serviceLink(slug: string): ServiceLink | undefined {
  const service = services.find((item) => item.slug === slug);
  return service ? { href: `/services/${slug}`, label: service.shortTitle, description: service.description, destinationType: "service" } : undefined;
}

function linkForHref(href: string): InternalLink {
  const service = services.find((item) => href === `/services/${item.slug}`);
  if (service) return { href, label: service.shortTitle, description: service.description, destinationType: "service" };
  const location = locations.find((item) => href === `/locations/${item.slug}`);
  if (location) return { href, label: location.title, description: location.description, destinationType: "location" };
  return { href, label: guideLabels[href] || href.split("/").filter(Boolean).at(-1)?.replace(/-/g, " ") || "Continue your research", destinationType: href.includes("/journal/") ? "journal" : "guide" };
}

export function getRelatedServices(serviceSlug?: string): ServiceLink[] {
  const slugs = serviceSlug ? serviceRelationships[serviceSlug] || [] : services.map((item) => item.slug);
  return slugs.map(serviceLink).filter((item): item is ServiceLink => Boolean(item));
}

export function getRelatedGuides(serviceSlug?: string): ContentLink[] {
  const hrefs = serviceSlug ? guideRelationships[serviceSlug] || [] : guideRelationships["house-extensions"];
  return hrefs.map(linkForHref) as ContentLink[];
}

export function getNearbyLocations(locationSlug: string, limit = 6): LocationLink[] {
  const current = locations.find((item) => item.slug === locationSlug);
  if (!current) return [];
  return current.nearbyAreas
    .map((area) => knownLocationSlugs.get(area.toLowerCase()) || locations.find((item) => normalise(item.shortTitle) === normalise(area))?.slug)
    .filter((slug): slug is string => Boolean(slug) && slug !== locationSlug)
    .map((slug) => locations.find((item) => item.slug === slug))
    .filter((item): item is (typeof locations)[number] => Boolean(item))
    .slice(0, limit)
    .map((item) => ({ href: `/locations/${item.slug}`, label: item.title, description: item.description, destinationType: "location" as const }));
}

export function getLocationLinksForProject(project: Pick<Project, "location">): LocationLink[] {
  const value = normalise(project.location);
  const matches = locations.filter((item) => [item.shortTitle, ...(item.projectTerms || [])].some((term) => value.includes(normalise(term))));
  const fallback = locations.find((item) => item.slug === "birmingham-architects");
  return [...matches, ...(matches.length ? [] : fallback ? [fallback] : [])].slice(0, 2).map((item) => ({ href: `/locations/${item.slug}`, label: item.title, description: item.description, destinationType: "location" as const }));
}

export function getServiceLinksForProjectType(projectType = "", category = ""): ServiceLink[] {
  const value = `${projectType} ${category}`.toLowerCase();
  const slugs = value.includes("loft") ? ["loft-conversions", "planning-applications", "building-regulations"] : value.includes("hmo") || value.includes("conversion") ? ["hmo-conversions", "planning-applications", "building-regulations"] : value.includes("new") || value.includes("development") ? ["new-build-homes", "planning-applications", "building-regulations"] : ["house-extensions", "planning-applications", "building-regulations"];
  return slugs.map(serviceLink).filter((item): item is ServiceLink => Boolean(item));
}

export function getProjectLinks(project: Pick<Project, "slug" | "title" | "location" | "projectType" | "category">, allProjects: Project[] = []): ProjectLink[] {
  const value = `${project.projectType} ${project.category}`.toLowerCase();
  return allProjects.filter((item) => item.slug !== project.slug).sort((a, b) => Number(`${b.projectType} ${b.category}`.toLowerCase().includes(value.split(" ")[0])) - Number(`${a.projectType} ${a.category}`.toLowerCase().includes(value.split(" ")[0]))).slice(0, 3).map((item) => ({ href: `/projects/${item.slug}`, label: item.title, description: `${item.projectType} in ${item.location}`, destinationType: "project" as const }));
}

export function getCommercialLinksForArticle(slug = "", title = ""): { primary: ServiceLink; secondary: ServiceLink; guide?: ContentLink; location?: LocationLink } {
  const value = `${slug} ${title}`.toLowerCase();
  const primarySlug = value.includes("loft") ? "loft-conversions" : value.includes("hmo") || value.includes("article-4") ? "hmo-conversions" : value.includes("building") || value.includes("technical") ? "building-regulations" : value.includes("new") || value.includes("development") ? "new-build-homes" : value.includes("planning") || value.includes("permission") ? "planning-applications" : "house-extensions";
  const primary = serviceLink(primarySlug) || serviceLink("house-extensions")!;
  const secondary = serviceLink(primarySlug === "building-regulations" ? "planning-applications" : "building-regulations") || serviceLink("planning-applications")!;
  const guide = getRelatedGuides(primarySlug)[0];
  const location = value.includes("birmingham") ? linkForHref("/locations/birmingham-architects") as LocationLink : undefined;
  return { primary, secondary, guide, location };
}

export function getProjectTypeLinks(projectType?: string, category?: string) { return getServiceLinksForProjectType(projectType, category); }
