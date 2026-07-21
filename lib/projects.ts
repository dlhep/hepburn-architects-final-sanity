import fallbackProjects from "@/data/projects.json";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { FEATURED_PROJECTS_QUERY, PROJECT_QUERY, PROJECTS_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export type SanityProjectImage = {
  alt?: string;
  caption?: string;
  asset?: { url?: string; _id?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
  hotspot?: unknown;
  crop?: unknown;
};

export type Project = {
  _id?: string;
  _updatedAt?: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  projectType: string;
  description: string;
  projectDescription?: any[];
  localAuthority?: string;
  applicationType?: string;
  contractValue?: string;
  completion?: string;
  services: string[];
  featured?: boolean;
  featuredImage: string | SanityProjectImage;
  gallery?: SanityProjectImage[];
  alt?: string;
};

function fallback(): Project[] {
  return (fallbackProjects as Array<Record<string, unknown>>).map((project) => ({
    ...(project as unknown as Project),
    featuredImage: String(project.featuredImage || project.image || ""),
    featured: Boolean(project.featured ?? false),
    gallery: [],
  }));
}

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags: ["sanity-projects"] },
    });
  } catch (error) {
    console.error("Sanity project fetch failed; using local fallback.", error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const result = await fetchSanity<Project[]>(PROJECTS_QUERY);
  return result && result.length ? result : fallback();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await fetchSanity<Project[]>(FEATURED_PROJECTS_QUERY);
  if (result && result.length) return result;
  const local = fallback();
  return local.filter((project) => project.featured).slice(0, 3).length
    ? local.filter((project) => project.featured).slice(0, 3)
    : local.slice(0, 3);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const result = await fetchSanity<Project | null>(PROJECT_QUERY, { slug });
  return result || fallback().find((project) => project.slug === slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  const result = await fetchSanity<Array<{ slug: string }>>(PROJECT_SLUGS_QUERY);
  return result && result.length ? result.map((item) => item.slug) : fallback().map((project) => project.slug);
}

export function projectImageUrl(image: Project["featuredImage"], width = 1600): string {
  if (typeof image === "string") return image;
  if (!image?.asset) return "/images/og.svg";
  return urlFor(image).width(width).quality(86).url();
}

export function projectImageAlt(project: Project): string {
  if (typeof project.featuredImage !== "string" && project.featuredImage?.alt) return project.featuredImage.alt;
  return project.alt || `${project.title} in ${project.location} by Hepburn Architects`;
}
