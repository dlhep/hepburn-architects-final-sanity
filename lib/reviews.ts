import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { FEATURED_REVIEWS_QUERY, PUBLISHED_REVIEWS_QUERY } from "@/sanity/lib/queries";
import { projectImageUrl, type SanityProjectImage } from "@/lib/projects";
import { BIRMINGHAM_REGION, NORTH_EAST_REGION, regionForLocationSlug } from "@/lib/google-business/model";

export type Review = {
  _id: string;
  _updatedAt?: string;
  quote: string;
  shortQuote?: string;
  clientName?: string;
  clientDescriptor?: string;
  publicAttribution?: string;
  reviewDate?: string;
  rating?: number;
  projectType?: string;
  location?: string;
  services?: string[];
  source?: string;
  sourceUrl?: string;
  featured?: boolean;
  showOnHomepage?: boolean;
  showOnReviewsPage?: boolean;
  showOnServicePages?: boolean;
  showOnLocationPages?: boolean;
  featuredPlacement?: string;
  relatedService?: string;
  relatedLocation?: string;
  externalSource?: string;
  googleReviewUrl?: string;
  autoRegion?: string;
  autoService?: string;
  manualRegionOverride?: string;
  manualServiceOverride?: string;
  relatedProject?: { title: string; slug: string; location?: string; featuredImage?: SanityProjectImage };
};

const REVIEW_SERVICE_LINKS: Record<string, string> = {
  "house-extensions": "/services/house-extensions",
  "planning-applications": "/services/planning-applications",
  "building-regulations": "/services/building-regulations",
  "new-build-homes": "/services/new-build-homes",
  "loft-conversions": "/services/loft-conversions",
  "hmo-conversions": "/services/hmo-conversions",
  "change-of-use": "/services/planning-applications",
  "change-of-use-birmingham": "/services/planning-applications",
  "small-sites-backland": "/services/new-build-homes",
};

export function getReviewServiceUrl(value?: string | null): string | undefined {
  const normalised = value
    ?.trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^services\//, "")
    .replace(/[\s_]+/g, "-");
  return normalised ? REVIEW_SERVICE_LINKS[normalised] : undefined;
}

async function fetchReviews(query: string) {
  if (!isSanityConfigured) return [] as Review[];
  try { return (await client.fetch<Review[]>(query, {}, { next: { revalidate: 60, tags: ["sanity-reviews"] } })) || []; } catch { return []; }
}

export async function getPublishedReviews() { return fetchReviews(PUBLISHED_REVIEWS_QUERY); }
export async function getFeaturedReviews() { return fetchReviews(FEATURED_REVIEWS_QUERY); }
const placementByService: Record<string, string> = {
  "house-extensions": "House Extensions", "planning-applications": "Planning Applications",
  "building-regulations": "Building Regulations", "new-build-homes": "New-Build Homes",
  "loft-conversions": "Loft Conversions", "hmo-conversions": "HMO Conversions",
  "change-of-use": "Change of Use", "small-sites-backland": "New-Build Homes",
};
const projectTypeByService: Record<string, string[]> = {
  "house-extensions": ["House extension"], "planning-applications": ["Planning application"],
  "building-regulations": ["Building Regulations"], "new-build-homes": ["New-build home", "Residential development"],
  "loft-conversions": ["Loft conversion"], "hmo-conversions": ["HMO conversion", "Change of use"],
  "change-of-use": ["Change of use", "HMO conversion"], "small-sites-backland": ["Residential development", "New-build home"],
};
export function selectReviewForService(reviews: Review[], serviceSlug: string, location?: string) {
  const eligible = reviews.filter((review) => review.showOnServicePages === true);
  const placement = placementByService[serviceSlug];
  const region = location ? regionForLocationSlug(location) : undefined;
  const regionEligible = region ? eligible.filter((review) => getReviewRegion(review) === region) : eligible;
  const candidates = regionEligible.length ? regionEligible : region ? [] : eligible;
  return candidates.find((review) => review.featuredPlacement === placement)
    || candidates.find((review) => review.manualServiceOverride === serviceSlug)
    || candidates.find((review) => review.relatedService === serviceSlug)
    || candidates.find((review) => review.autoService === serviceSlug)
    || candidates.find((review) => (projectTypeByService[serviceSlug] || []).includes(review.projectType || ""))
    || candidates[0];
}
export async function getReviewForService(serviceSlug: string, location?: string) { return selectReviewForService(await getPublishedReviews(), serviceSlug, location); }
export async function getReviewForLocation(locationSlug: string) {
  const reviews = (await getPublishedReviews()).filter((review) => review.showOnLocationPages === true);
  const placement = locationSlug.includes("birmingham") ? "Birmingham" : locationSlug.includes("solihull") ? "Solihull" : undefined;
  const region = regionForLocationSlug(locationSlug);
  return reviews.find((review) => placement && review.featuredPlacement === placement)
    || reviews.find((review) => review.relatedLocation === locationSlug)
    || reviews.find((review) => region && getReviewRegion(review) === region);
}
export async function getReviewForProject(projectSlug: string) { return (await getPublishedReviews()).find((review) => review.relatedProject?.slug === projectSlug); }
export async function getHomepageReviews() {
  const reviews = await getPublishedReviews();
  const eligible = reviews.filter((review) => review.showOnHomepage === true || review.featuredPlacement === "Homepage");
  const birmingham = eligible.find((review) => getReviewRegion(review) === BIRMINGHAM_REGION);
  const northEast = eligible.find((review) => getReviewRegion(review) === NORTH_EAST_REGION);
  return [birmingham, northEast, ...eligible].filter((review, index, values): review is Review => Boolean(review) && values.findIndex((item) => item?._id === review?._id) === index).slice(0, 2);
}
export function getReviewAttribution(review: Pick<Review, "publicAttribution" | "clientName" | "clientDescriptor">) { return review.publicAttribution || review.clientName || review.clientDescriptor || "Verified client"; }
export function getReviewRegion(review: Pick<Review, "manualRegionOverride" | "autoRegion" | "location">) { return review.manualRegionOverride || review.autoRegion || review.location; }
export function getReviewService(review: Pick<Review, "featuredPlacement" | "manualServiceOverride" | "relatedService" | "autoService">) { return review.manualServiceOverride || review.relatedService || review.autoService; }
export function getReviewSourceUrl(review: Pick<Review, "googleReviewUrl" | "sourceUrl">) { return review.googleReviewUrl || review.sourceUrl; }
export function getReviewSourceLabel(review: Pick<Review, "externalSource" | "source">) { return review.externalSource === "google_business_profile" ? "Google Business Profile" : review.source; }
export function getReviewDisplayDate(review: Pick<Review, "reviewDate">) {
  if (!review.reviewDate) return undefined;
  const date = new Date(`${review.reviewDate}T00:00:00Z`);
  return Number.isNaN(date.valueOf()) ? undefined : new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}
export function getReviewStatistics(reviews: Review[]) {
  const rated = reviews.filter((review) => typeof review.rating === "number" && review.rating >= 1 && review.rating <= 5);
  if (!rated.length) return { count: 0, average: undefined as number | undefined };
  return { count: rated.length, average: rated.reduce((sum, review) => sum + (review.rating || 0), 0) / rated.length };
}
export function reviewProjectImage(review: Review) { return review.relatedProject?.featuredImage ? projectImageUrl(review.relatedProject.featuredImage, 600) : undefined; }
