import type { Metadata } from "next";
import { site } from "./site";

export const ROOT_TITLE = "Residential Architects Birmingham | Hepburn Architects";
export const SOCIAL_IMAGE = "/images/social-sharing.jpg";

const SITE_SUFFIX = /\s*\|\s*Hepburn Architects\s*$/i;

export function cleanSeoTitle(value: string): string {
  let title = value.replace(/\s+/g, " ").trim();
  while (SITE_SUFFIX.test(title)) title = title.replace(SITE_SUFFIX, "").trim();
  return title;
}

export const GUIDE_TITLES: Record<string, string> = {
  "building-regulations-drawings": "Building Regulations Drawings Explained",
  "planning-permission-house-extension": "House Extension Planning Permission",
  "planning-conditions-discharge-guide": "Discharging Planning Conditions",
  "architect-fees-residential-project": "Residential Architect Fees",
  "replacement-dwelling-planning": "Replacement Dwelling Planning",
  "two-storey-extension-planning-rules": "Two-Storey Extension Rules",
  "single-storey-extension-planning-rules": "Single-Storey Extension Rules",
  "complete-house-extension-guide": "Complete House Extension Guide",
  "permitted-development-rights-explained": "Permitted Development Rights",
  "planning-vs-building-regulations": "Planning vs Building Regulations",
  "house-extension-cost-uk": "UK House Extension Cost per m²: 2026 Guide",
  "loft-conversion-planning-permission": "Loft Conversion Planning Permission",
  "lawful-development-certificate": "Lawful Development Certificates",
  "planning-application-validation-checklist": "Planning Validation Checklist",
  "planning-refusal-next-steps": "Planning Refusal: Resubmit or Appeal",
  "planning-application-timescales": "Planning Application Timescales",
  "rear-extension-design-ideas": "Rear Extension Design Ideas",
  "hmo-conversion-planning-guide": "HMO Conversion Planning Guide",
  "extending-listed-building": "Extending a Listed Building",
  "convert-house-into-flats": "Converting a House into Flats",
  "garden-room-planning-permission": "Garden Room Planning Rules",
  "side-extension-planning-rules": "Side Extension Planning Rules",
  "wrap-around-extension-planning": "Wrap-Around Extension Planning",
  "planning-permission-conservation-area": "Planning in a Conservation Area",
  "architect-planning-permission": "Architect for Planning Permission",
};

export function guideSeoTitle(slug: string, fallback: string): string {
  return GUIDE_TITLES[slug] || cleanSeoTitle(fallback);
}

export function projectSeoTitle(title: string, location?: string): string {
  const clean = cleanSeoTitle(title)
    .replace(/\s+,/g, ",")
    .replace(/\s+/g, " ")
    .trim();
  if (!location || clean.toLowerCase().includes(location.trim().toLowerCase())) return clean;
  return clean;
}

export const PROJECT_TITLES: Record<string, string> = {
  "house-extension-solihull": "House Extension in Solihull",
  "eight-home-residential-masterplan": "Eight-Home Residential Masterplan",
  "ten-home-residential-masterplan": "Ten-Home Masterplan in Birmingham",
  "house-extension-in-harborne-birmingham": "House Extension in Harborne",
  "replacement-bungalow": "Replacement Dwelling in Upton-upon-Severn",
  "barn-conversion-staffordshire": "Barn Conversion in Staffordshire",
  "new-build-apartments-cornwall": "New-Build Apartments in Cornwall",
  "house-extension-birmingham": "House Extension in Birmingham",
  "rear-house-extension-yorkshire": "Rear Extension in North Yorkshire",
  "contemporary-rural-extension": "Contemporary Rural Extension",
  "modern-extension-to-rural-property": "Modern Extension in North Yorkshire",
  "contemporary-renovation-shropshire": "Rural Renovation in Shropshire",
  "contemporary-rear-extension-and-loft-conversion-wynyard": "Wynyard Extension and Loft Conversion",
  "passive-house-new-build": "Passive House New Build",
  "traditional-barn-conversion-northumberland": "Barn Conversion in Northumberland",
  "victorian-gothic-residence-heritage-extension": "Victorian Gothic Heritage Extension",
  "rear-extension-warwick": "Rear Extension in Warwick",
};

export const PROJECT_DESCRIPTIONS: Record<string, string> = {
  "residential-masterplan": "A ten-home Birmingham residential masterplan shaped around landscape, sustainable drainage, generous gardens and a central shared green.",
  "residential-masterplan-birmingham": "An eight-home West Midlands masterplan arranged around a landscaped shared green, with carefully planned access, amenity and natural surveillance.",
  "eight-home-residential-masterplan": "An eight-home residential masterplan balancing site capacity, access, parking, private amenity, landscape and planning constraints.",
  "ten-home-residential-masterplan": "A ten-home residential masterplan in Birmingham, developed around efficient access, strong streetscape, private amenity and landscape.",
  "house-extension-birmingham": "A rear and side extension with loft conversion in Birmingham, creating more space, better daylight and a stronger garden connection.",
};

export function truncateAtWord(value: string, limit = 155): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const shortened = clean.slice(0, limit + 1);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened
    .slice(0, boundary > 0 ? boundary : limit)
    .replace(/\s+(a|an|and|at|by|for|from|in|of|on|or|the|to|with)$/i, "")
    .replace(/[,:;\s]+$/, "")}.`;
}

export function seoDescription(
  explicit?: string | null,
  fallback?: string | null,
): string {
  return truncateAtWord(explicit || fallback || site.description);
}

export function canonical(path: string): string {
  const normalised = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return new URL(normalised, site.url).toString();
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

type SeoMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function createSeoMetadata({
  title,
  description,
  path,
  image = SOCIAL_IMAGE,
  type = "website",
}: SeoMetadataOptions): Metadata {
  const cleanTitle = cleanSeoTitle(title);
  const cleanDescription = seoDescription(description);
  const url = canonical(path);
  return {
    title: cleanTitle,
    description: cleanDescription,
    alternates: { canonical: url },
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      url,
      siteName: site.name,
      type,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
      images: [image],
    },
  };
}
