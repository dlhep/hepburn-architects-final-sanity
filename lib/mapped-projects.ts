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
