import type { MetadataRoute } from "next";
import { services, locations, guides } from "@/lib/content";
import { getProjects } from "@/lib/projects";
import { getBlogPosts, getSanityGuides } from "@/lib/articles";
import { site } from "@/lib/site";

const STATIC_LAST_MODIFIED = "2026-07-23";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, blogPosts, sanityGuides] = await Promise.all([
    getProjects(),
    getBlogPosts(),
    getSanityGuides(),
  ]);

  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const add = (path: string, lastModified: string | Date = STATIC_LAST_MODIFIED) => {
    const url = `${site.url}${path}`;
    entries.set(url, { url, lastModified });
  };

  [
    "",
    "/services",
    "/locations",
    "/guides",
    "/blog",
    "/estimate",
    "/projects",
    "/about",
    "/contact",
    "/privacy",
  ].forEach((path) => add(path));

  services.forEach((item) => add(`/services/${item.slug}`));
  locations.forEach((item) => add(`/locations/${item.slug}`));

  // Sanity-only guides, including the Complete House Extension Guide.
  sanityGuides.forEach((item) =>
    add(`/guides/${item.slug}`, item._updatedAt || item.publishedAt || STATIC_LAST_MODIFIED),
  );

  // Static guides take priority over any legacy Sanity placeholder using the same slug.
  guides.forEach((item) => add(`/guides/${item.slug}`));

  blogPosts.forEach((item) =>
    add(`/blog/${item.slug}`, item._updatedAt || item.publishedAt || STATIC_LAST_MODIFIED),
  );

  projects.forEach((project) =>
    add(`/projects/${project.slug}`, project._updatedAt || STATIC_LAST_MODIFIED),
  );

  return Array.from(entries.values());
}
