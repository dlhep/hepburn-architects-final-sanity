export type PublicMappedProject = {
  id: string;
  title: string;
  projectType: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  streetName: string;
  postcodeDistrict: string;
  townOrCity: string;
  locationLabel: string;
  latitude: number;
  longitude: number;
  projectUrl?: string;
  sourceType: "full-project" | "map-project";
};

export type PublicProjectDirectoryItem = Pick<
  PublicMappedProject,
  "id" | "title" | "projectType" | "townOrCity" | "description" | "projectUrl"
>;

export function toPublicProjectDirectoryItem(
  project: PublicMappedProject
): PublicProjectDirectoryItem {
  return {
    id: project.id,
    title: project.title,
    projectType: project.projectType,
    townOrCity: project.townOrCity,
    description: project.description,
    projectUrl: project.projectUrl,
  };
}
