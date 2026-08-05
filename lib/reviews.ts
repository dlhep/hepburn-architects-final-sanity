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
export function getReviewAttribution(review: Pick<Review, "publicAttribution" | "clientName" | "clientDescriptor">) { return review.publicAttribution || review.clientName || review.clientDescriptor || "Verified client"; }
export function getReviewStatistics(reviews: Review[]) {
  const rated = reviews.filter((review) => typeof review.rating === "number" && review.rating >= 1 && review.rating <= 5);
  if (!rated.length) return { count: 0, average: undefined as number | undefined };
  return { count: rated.length, average: rated.reduce((sum, review) => sum + (review.rating || 0), 0) / rated.length };
}
export function reviewProjectImage(review: Review) { return review.relatedProject?.featuredImage ? projectImageUrl(review.relatedProject.featuredImage, 600) : undefined; }
