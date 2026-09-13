import { applyShropshireProjectRefresh } from "./shropshire-project-refresh";
import { applyCornwallGalleryRefresh } from "./cornwall-project-gallery-refresh";
import { birminghamExtensionProjects, birminghamExtensionImportId } from "./birmingham-extension-projects";
import { westMidlandsLoftProjects, westMidlandsLoftImportId } from "./west-midlands-loft-projects";
import fallbackProjects from "@/data/projects.json";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  BIRMINGHAM_PROJECTS_QUERY,
  FEATURED_CASE_STUDY_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_QUERY,
  PROJECTS_QUERY,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";
import { isMidlandsWebsiteProject } from "@/lib/project-region";

export type SanityProjectImage = {
  url?: string;
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
  websiteRegion?: string;
  category: string;
  isConcept?: boolean;
  conceptLabel?: string;
  showFullImage?: boolean;
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
  })).filter(isMidlandsWebsiteProject);
}

// Guards against the Sanity field label "Project summary" (see schemaTypes/project.ts)
// being pasted into the description value itself. Strips a stray leading label so it
// never renders on project cards, the map info window, or meta descriptions.
const STRAY_SUMMARY_LABEL = /^\s*project\s+summary\s*[:.\-–—]?\s+/i;
function normaliseProject(project: Project): Project {
  project = applyShropshireProjectRefresh(project);
  project = applyCornwallGalleryRefresh(project);
  if (typeof project.description !== "string") return project;
  const description = project.description.replace(STRAY_SUMMARY_LABEL, "").trim();
  return description === project.description ? project : { ...project, description };
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

const LOFT_IMPORT_COMPLETE_QUERY = `defined(*[_id == "${westMidlandsLoftImportId}"][0])`;
const EXTENSION_IMPORT_COMPLETE_QUERY = `defined(*[_id == "${birminghamExtensionImportId}"][0])`;

export async function getProjects(): Promise<Project[]> {
  const [result, imported, loftsImported] = await Promise.all([
    fetchSanity<Project[]>(PROJECTS_QUERY),
    fetchSanity<boolean>(EXTENSION_IMPORT_COMPLETE_QUERY),
    fetchSanity<boolean>(LOFT_IMPORT_COMPLETE_QUERY),
  ]);
  const projects = (result ?? fallback()).filter(isMidlandsWebsiteProject).map(normaliseProject);
  if (imported && loftsImported) return projects;
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const pending = [
    ...(!loftsImported ? westMidlandsLoftProjects : []),
    ...(!imported ? birminghamExtensionProjects : []),
  ];
  const additions = pending.map((project) => bySlug.get(project.slug) ?? project);
  const addedSlugs = new Set(additions.map((project) => project.slug));
  return [...additions, ...projects.filter((project) => !addedSlugs.has(project.slug))];
}

export async function getBirminghamProjects(): Promise<Project[]> {
  const result = await fetchSanity<Project[]>(BIRMINGHAM_PROJECTS_QUERY);
  return (result || []).filter(isMidlandsWebsiteProject).slice(0, 3).map(normaliseProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await fetchSanity<Project[]>(FEATURED_PROJECTS_QUERY);
  if (result) return result.filter(isMidlandsWebsiteProject).slice(0, 3).map(normaliseProject);
  const local = fallback();
  const featured = local.filter((project) => project.featured).slice(0, 3);
  return (featured.length ? featured : local.slice(0, 3)).map(normaliseProject);
}

export async function getFeaturedCaseStudy(): Promise<Project | undefined> {
  const result = await fetchSanity<Project[]>(FEATURED_CASE_STUDY_QUERY);
  const project = result?.find(isMidlandsWebsiteProject);
  return project ? normaliseProject(project) : undefined;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const result = await fetchSanity<Project | null>(PROJECT_QUERY, { slug });
  const loftSeed = westMidlandsLoftProjects.find((item) => item.slug === slug);
  const seed = loftSeed || birminghamExtensionProjects.find((item) => item.slug === slug);
  const markerQuery = loftSeed ? LOFT_IMPORT_COMPLETE_QUERY : EXTENSION_IMPORT_COMPLETE_QUERY;
  const imported = !result && seed ? await fetchSanity<boolean>(markerQuery) : true;
  const project = result || (!imported ? seed : undefined) || fallback().find((item) => item.slug === slug);
  return project && isMidlandsWebsiteProject(project) ? normaliseProject(project) : undefined;
}

export async function getProjectSlugs(): Promise<string[]> {
  return (await getProjects()).map((project) => project.slug);
}

// Replace Meadow View's previous masterplan image on the website. Matching the
// asset rather than the project means a later image upload in Sanity takes over.
const MEADOW_VIEW_PREVIOUS_IMAGE = "image-3d47e6bcdc220656b154b769f0e4b00d38cd6cb0-2096x1774-png";
const MEADOW_VIEW_IMAGE_ALT = "Meadow View concept street scene with detached brick and stone homes, pitched slate roofs and a landscaped shared green";

export function projectImageUrl(image: Project["featuredImage"], width = 1600): string {
  if (typeof image === "string") {
    // The retired .com WordPress host rejects optimised image requests. Keep fallback records usable
    // during a Sanity outage without rendering a broken image or mislabelling another project photo.
    if (/^https:\/\/(www\.)?hepburnarchitects\.com\/wp-content\//i.test(image)) return "https://hepburnarchitects.co.uk/images/social-sharing.jpg";
    return image;
  }
  if (image?.url) return image.url;
  if (!image?.asset) return "https://hepburnarchitects.co.uk/images/social-sharing.jpg";
  if (image.asset._id === MEADOW_VIEW_PREVIOUS_IMAGE) return "https://hepburnarchitects.co.uk/images/projects/meadow-view-street-scene.webp";
  return urlFor(image).width(width).quality(76).url();
}

export function projectImageAlt(project: Project): string {
  if (typeof project.featuredImage !== "string" && project.featuredImage?.asset?._id === MEADOW_VIEW_PREVIOUS_IMAGE) return MEADOW_VIEW_IMAGE_ALT;
  if (typeof project.featuredImage !== "string" && project.featuredImage?.alt) return project.featuredImage.alt;
  return project.alt || project.title;
}
