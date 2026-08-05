import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { FEATURED_REVIEWS_QUERY, PUBLISHED_REVIEWS_QUERY } from "@/sanity/lib/queries";
import { projectImageUrl, type SanityProjectImage } from "@/lib/projects";

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
  relatedProject?: { title: string; slug: string; location?: string; featuredImage?: SanityProjectImage };
};

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
  const locationValue = location?.toLowerCase();
  return eligible.find((review) => review.featuredPlacement === placement && (!locationValue || review.location?.toLowerCase().includes(locationValue)))
    || eligible.find((review) => review.featuredPlacement === placement)
    || eligible.find((review) => review.relatedService === serviceSlug && (!locationValue || review.location?.toLowerCase().includes(locationValue)))
    || eligible.find((review) => review.relatedService === serviceSlug)
    || eligible.find((review) => (projectTypeByService[serviceSlug] || []).includes(review.projectType || ""));
}
export async function getReviewForService(serviceSlug: string, location?: string) { return selectReviewForService(await getPublishedReviews(), serviceSlug, location); }
export async function getReviewForLocation(locationSlug: string) {
  const reviews = (await getPublishedReviews()).filter((review) => review.showOnLocationPages === true);
  const placement = locationSlug.includes("birmingham") ? "Birmingham" : locationSlug.includes("solihull") ? "Solihull" : undefined;
  return reviews.find((review) => placement && review.featuredPlacement === placement) || reviews.find((review) => review.relatedLocation === locationSlug);
}
export async function getReviewForProject(projectSlug: string) { return (await getPublishedReviews()).find((review) => review.relatedProject?.slug === projectSlug); }
export async function getHomepageReviews() {
  const reviews = await getPublishedReviews();
  return reviews.filter((review) => review.showOnHomepage === true || review.featuredPlacement === "Homepage").slice(0, 2);
}
export function getReviewAttribution(review: Pick<Review, "publicAttribution" | "clientName" | "clientDescriptor">) { return review.publicAttribution || review.clientName || review.clientDescriptor || "Verified client"; }
export function getReviewStatistics(reviews: Review[]) {
  const rated = reviews.filter((review) => typeof review.rating === "number" && review.rating >= 1 && review.rating <= 5);
  if (!rated.length) return { count: 0, average: undefined as number | undefined };
  return { count: rated.length, average: rated.reduce((sum, review) => sum + (review.rating || 0), 0) / rated.length };
}
export function reviewProjectImage(review: Review) { return review.relatedProject?.featuredImage ? projectImageUrl(review.relatedProject.featuredImage, 600) : undefined; }
