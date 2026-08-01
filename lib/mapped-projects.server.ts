import "server-only";

import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { MAPPED_PROJECT_SOURCES_QUERY } from "@/sanity/lib/queries";
import { projectImageUrl, type SanityProjectImage } from "@/lib/projects";
import type { PublicMappedProject } from "@/lib/mapped-projects";
import { roundPublicCoordinate, safePublicLocationPart, toPublicPostcodeDistrict } from "@/lib/project-location";

type FullProjectSource = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  projectType?: string;
  description?: string;
  featuredImage?: SanityProjectImage;
  mapStreetName?: string;
  mapPostcode?: string;
  mapTownOrCity?: string;
  mapLatitude?: number;
  mapLongitude?: number;
};

type MapProjectSource = {
  _id: string;
  projectName: string;
  projectType: string;
  shortDescription?: string;
  image?: SanityProjectImage;
  streetName?: string;
  postcode?: string;
  townOrCity?: string;
  mapLatitude?: number;
  mapLongitude?: number;
  linkedProjectId?: string;
  linkedProjectSlug?: string;
};

type MappedProjectSources = { fullProjects: FullProjectSource[]; mapProjects: MapProjectSource[] };

function publicLocation(source: {
  streetName?: string;
  postcode?: string;
  townOrCity?: string;
  latitude?: number;
  longitude?: number;
}) {
  const streetName = safePublicLocationPart(source.streetName);
  const townOrCity = safePublicLocationPart(source.townOrCity);
  const postcodeDistrict = toPublicPostcodeDistrict(source.postcode);
  const latitude = roundPublicCoordinate(source.latitude);
  const longitude = roundPublicCoordinate(source.longitude);
  if (!streetName || !townOrCity || !postcodeDistrict || latitude === undefined || longitude === undefined) return null;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  return {
    streetName,
    townOrCity,
    postcodeDistrict,
    locationLabel: [streetName, townOrCity, postcodeDistrict].join(", "),
    latitude,
    longitude,
  };
}

function prepareFullProject(project: FullProjectSource): PublicMappedProject | null {
  const location = publicLocation({
    streetName: project.mapStreetName,
    postcode: project.mapPostcode,
    townOrCity: project.mapTownOrCity,
    latitude: project.mapLatitude,
    longitude: project.mapLongitude,
  });
  if (!location) return null;
  return {
    id: `project:${project._id}`,
    title: project.title,
    projectType: project.projectType || project.category || "Residential architecture",
    description: project.description?.trim() || undefined,
    imageUrl: project.featuredImage?.asset ? projectImageUrl(project.featuredImage, 900) : undefined,
    imageAlt: project.featuredImage?.alt || project.title,
    projectUrl: `/projects/${project.slug}`,
    sourceType: "full-project",
    ...location,
  };
}

function prepareMapProject(project: MapProjectSource): PublicMappedProject | null {
  const location = publicLocation({
    streetName: project.streetName,
    postcode: project.postcode,
    townOrCity: project.townOrCity,
    latitude: project.mapLatitude,
    longitude: project.mapLongitude,
  });
  if (!location) return null;
  return {
    id: `map-project:${project._id}`,
    title: project.projectName,
    projectType: project.projectType,
    description: project.shortDescription?.trim() || undefined,
    imageUrl: project.image?.asset ? projectImageUrl(project.image, 900) : undefined,
    imageAlt: project.image?.alt || project.projectName,
    projectUrl: project.linkedProjectSlug ? `/projects/${project.linkedProjectSlug}` : undefined,
    sourceType: "map-project",
    ...location,
  };
}

export async function getMappedProjects(): Promise<PublicMappedProject[]> {
  if (!isSanityConfigured) return [];
  try {
    const sources = await client.fetch<MappedProjectSources>(MAPPED_PROJECT_SOURCES_QUERY, {}, {
      next: { revalidate: 60, tags: ["sanity-projects"] },
    });
    const mappedFullIds = new Set(sources.fullProjects.map((project) => project._id));
    const fullProjects = sources.fullProjects.map(prepareFullProject).filter((project): project is PublicMappedProject => Boolean(project));
    const mapProjects = sources.mapProjects
      .filter((project) => !project.linkedProjectId || !mappedFullIds.has(project.linkedProjectId))
      .map(prepareMapProject)
      .filter((project): project is PublicMappedProject => Boolean(project));
    return [...fullProjects, ...mapProjects];
  } catch (error) {
    console.error("Mapped project fetch failed; rendering the map section without projects.", error);
    return [];
  }
}
