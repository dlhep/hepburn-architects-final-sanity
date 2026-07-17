import type { MetadataRoute } from "next";
import { services, locations, guides } from "@/lib/content";
import { getProjectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getProjectSlugs();
  const paths = ["", "/services", "/locations", "/guides", "/estimate", "/projects", "/before-after", "/about", "/contact", "/privacy"];
  const dynamic = [
    ...services.map((item) => `/services/${item.slug}`),
    ...locations.map((item) => `/locations/${item.slug}`),
    ...guides.map((item) => `/guides/${item.slug}`),
    ...projectSlugs.map((slug) => `/projects/${slug}`),
  ];
  return [...paths, ...dynamic].map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
