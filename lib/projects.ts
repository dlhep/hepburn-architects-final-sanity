import fallbackProjects from "@/data/projects.json";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  BIRMINGHAM_PROJECTS_QUERY,
  FEATURED_CASE_STUDY_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_QUERY,
  PROJECTS_QUERY,
  PROJECT_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";

export type SanityProjectImage = {
  alt?: string;
  caption?: string;
  asset?: { url?: string; _id?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
  hotspot?: unknown;
  crop?: unknown;
};

export type ProjectPortableText = PortableTextBlock[];
export type ProjectChallenge = { challenge: string; response: string; result?: string };
export type ProjectHighlight = { label: string; value: string };
export type ProjectTestimonial = { quote: string; clientName?: string; clientDescriptor?: string; reviewSource?: string; reviewUrl?: string };
export type ProjectDrawing = SanityProjectImage & { drawingType?: string };
export type ProjectTeamMember = { role: string; organisation?: string; website?: string };
export type ProjectStage = { stage: string; title: string; description: string; status: "Complete" | "Current" | "Future" | "Not applicable" };

export type Project = {
  _id?: string;
  _updatedAt?: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  projectType: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  projectDescription?: PortableTextBlock[];
  localAuthority?: string;
  applicationType?: string;
  contractValue?: string;
  completion?: string;
  projectStatus?: string;
  propertyType?: string;
  projectYear?: number;
  floorArea?: string;
  planningReference?: string;
  constructionRoute?: string;
  services: string[];
  relatedServices?: string[];
  relatedLocations?: string[];
  relatedGuides?: string[];
  relatedProjects?: string[];
  featured?: boolean;
  featuredCaseStudy?: boolean;
  featuredImage: string | SanityProjectImage;
  gallery?: SanityProjectImage[];
  clientBrief?: ProjectPortableText;
  existingConditions?: ProjectPortableText;
  designResponse?: ProjectPortableText;
  planningStrategy?: ProjectPortableText;
  technicalDesign?: ProjectPortableText;
  materialsAndDetailing?: ProjectPortableText;
  sustainabilityApproach?: ProjectPortableText;
  projectOutcome?: ProjectPortableText;
  lessonsAndInsights?: ProjectPortableText;
  keyChallenges?: ProjectChallenge[];
  projectHighlights?: ProjectHighlight[];
  clientTestimonial?: ProjectTestimonial;
  beforeAfterIntro?: string;
  beforeImages?: SanityProjectImage[];
  afterImages?: SanityProjectImage[];
  designDrawings?: ProjectDrawing[];
  projectTeam?: ProjectTeamMember[];
  projectStages?: ProjectStage[];
  alt?: string;
};

const CASE_STUDY_FIELDS = [
  "clientBrief", "existingConditions", "designResponse", "planningStrategy",
  "technicalDesign", "materialsAndDetailing", "sustainabilityApproach",
  "projectOutcome", "lessonsAndInsights",
] as const;

export type ProjectCaseStudyLevel = "basic" | "developing" | "detailed";

export function getProjectCaseStudyLevel(project: Pick<Project, "projectDescription" | "clientBrief" | "existingConditions" | "designResponse" | "planningStrategy" | "technicalDesign" | "materialsAndDetailing" | "sustainabilityApproach" | "projectOutcome" | "lessonsAndInsights" | "keyChallenges" | "projectStages" | "designDrawings" | "clientTestimonial" | "beforeImages" | "afterImages">): ProjectCaseStudyLevel {
  const sectionCount = CASE_STUDY_FIELDS.filter((field) => Boolean(project[field]?.length)).length;
  const evidence = Boolean(project.designDrawings?.length || project.keyChallenges?.length || project.clientTestimonial?.quote || project.projectOutcome?.length || (project.beforeImages?.length && project.afterImages?.length) || project.projectStages?.length);
  if (sectionCount >= 4 && evidence) return "detailed";
  if (sectionCount >= 2 || Boolean(project.projectDescription?.length)) return "developing";
  return "basic";
}

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
      next: { revalidate: 21600, tags: ["sanity-projects"] },
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

export async function getBirminghamProjects(): Promise<Project[]> {
  const result = await fetchSanity<Project[]>(BIRMINGHAM_PROJECTS_QUERY);
  return result || [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await fetchSanity<Project[]>(FEATURED_PROJECTS_QUERY);
  if (result && result.length) return result;
  const local = fallback();
  return local.filter((project) => project.featured).slice(0, 3).length
    ? local.filter((project) => project.featured).slice(0, 3)
    : local.slice(0, 3);
}

export async function getFeaturedCaseStudy(): Promise<Project | undefined> {
  const result = await fetchSanity<Project | null>(FEATURED_CASE_STUDY_QUERY);
  return result || undefined;
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
  if (typeof image === "string") {
    // The retired .com WordPress host rejects optimised image requests. Keep fallback records usable
    // during a Sanity outage without rendering a broken image or mislabelling another project photo.
    if (/^https:\/\/(www\.)?hepburnarchitects\.com\/wp-content\//i.test(image)) return "https://hepburnarchitects.co.uk/images/social-sharing.jpg";
    return image;
  }
  if (!image?.asset) return "https://hepburnarchitects.co.uk/images/social-sharing.jpg";
  return urlFor(image).width(width).quality(76).url();
}

export function projectImageAlt(project: Project): string {
  if (typeof project.featuredImage !== "string" && project.featuredImage?.alt) return project.featuredImage.alt;
  return project.alt || project.title;
}
