// These existing case studies have matching published pages on the .com site.
export const northEastProjectSlugs = [
  "traditional-barn-conversion-northumberland",
  "modern-extension-to-rural-property",
  "rear-house-extension-yorkshire",
  "contemporary-rear-extension-and-loft-conversion-wynyard",
] as const;

type ProjectRegionSource = {
  websiteRegion?: string | null;
  slug?: string | null;
  location?: string | null;
  townOrCity?: string | null;
  postcode?: string | null;
};

const northEastPlaces = /\b(north east|northumberland|north yorkshire|tyne and wear|county durham|durham|middlesbrough|nunthorpe|teesside|tees valley|wynyard|darlington|hartlepool|stockton on tees|redcar|cleveland|guisborough|stokesley|yarm|northallerton|great ayton|hutton rudby|gateshead|sunderland|tynemouth|whitley bay|ponteland|darras hall|spennymoor)\b/;

function normalise(value?: string | null): string {
  return (value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function isNorthEastProject(project: ProjectRegionSource): boolean {
  if (normalise(project.websiteRegion) === "north east") return true;
  if (northEastProjectSlugs.some((slug) => slug === project.slug)) return true;
  const location = [normalise(project.location), normalise(project.townOrCity)].join(" ");
  if (northEastPlaces.test(location)) return true;
  // Newcastle-under-Lyme belongs to the Midlands portfolio.
  if (/\bnewcastle\b/.test(location) && !/\b(under lyme|staffordshire)\b/.test(location)) return true;
  return /^(TS|DL|DH|NE|SR)\d/i.test((project.postcode || "").replace(/\s+/g, ""));
}

export function isMidlandsWebsiteProject(project: ProjectRegionSource): boolean {
  return !isNorthEastProject(project);
}
