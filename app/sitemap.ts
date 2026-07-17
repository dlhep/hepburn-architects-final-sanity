import type { MetadataRoute } from "next";
import { services, locations } from "@/lib/content";
import { getArticleSlugs } from "@/lib/articles";
import { getProjectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, articleSlugs] = await Promise.all([getProjectSlugs(), getArticleSlugs()]);
  const paths = ["", "/services", "/locations", "/guides", "/blog", "/estimate", "/projects", "/before-after", "/about", "/contact", "/privacy"];
  const dynamic = [
    ...services.map((item) => `/services/${item.slug}`),
    ...locations.map((item) => `/locations/${item.slug}`),
    ...articleSlugs.map((item) => `/${item.contentType === "blog" ? "blog" : "guides"}/${item.slug}`),
    ...projectSlugs.map((slug) => `/projects/${slug}`),
  ];
  return [...paths, ...dynamic].map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
