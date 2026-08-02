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
  "id" | "projectType" | "streetName" | "townOrCity" | "postcodeDistrict"
>;

export function toPublicProjectDirectoryItem(
  project: PublicMappedProject
): PublicProjectDirectoryItem {
  return {
    id: project.id,
    projectType: project.projectType,
    streetName: project.streetName,
    townOrCity: project.townOrCity,
    postcodeDistrict: project.postcodeDistrict,
  };
}
