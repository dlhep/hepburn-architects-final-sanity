import type { MetadataRoute } from "next";
import { services, locations, guides } from "@/lib/content-extended";
import { getProjects } from "@/lib/projects";
import { getBlogPosts, getSanityGuides } from "@/lib/articles";
import { getPublishedReviews } from "@/lib/reviews";
import { site } from "@/lib/site";

const STATIC_LAST_MODIFIED = "2026-08-13";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, blogPosts, sanityGuides, reviews] = await Promise.all([getProjects(), getBlogPosts(), getSanityGuides(), getPublishedReviews()]);
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const add = (path: string, lastModified: string | Date = STATIC_LAST_MODIFIED) => {
    const url = `${site.url}${path}`;
    entries.set(url, { url, lastModified });
  };

  ["", "/services", "/services/c2-planning-applications-childrens-homes", "/development-potential-appraisal", "/locations", "/guides", "/knowledge-centre", "/services/house-extensions", "/knowledge-centre/house-extension-costs", "/knowledge-centre/house-extension-timeline", "/knowledge-centre/house-extension-ideas", "/knowledge-centre/property-professional-architectural-support", "/knowledge-centre/loft-conversions", "/knowledge-centre/extension-planning-permission", "/knowledge-centre/planning-permission", "/knowledge-centre/building-regulations", "/journal", "/journal/new-nppf-2026-default-yes-residential-development", "/journal/how-to-choose-the-best-architect-in-birmingham", "/journal/house-extension-planning-permission-birmingham-2026-guide", "/journal/loft-conversion-planning-rules-birmingham", "/estimate", "/planning-tools", "/projects", "/about", "/contact", "/privacy"].forEach((path) => add(path, path === "/development-potential-appraisal" ? "2026-09-05" : STATIC_LAST_MODIFIED));

  services.forEach((item) => add(`/services/${item.slug}`));
  locations.forEach((item) => add(`/locations/${item.slug}`));
  sanityGuides.forEach((item) => add(`/guides/${item.slug}`, item._updatedAt || item.publishedAt || STATIC_LAST_MODIFIED));
  guides.forEach((item) => add(`/guides/${item.slug}`));
  blogPosts.forEach((item) => add(`/blog/${item.slug}`, item._updatedAt || item.publishedAt || STATIC_LAST_MODIFIED));
  projects.forEach((project) => add(`/projects/${project.slug}`, project._updatedAt || STATIC_LAST_MODIFIED));
  if (reviews.length > 0) add("/reviews");
  return Array.from(entries.values());
}
