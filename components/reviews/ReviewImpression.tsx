import { getReviewRegion, type Review } from "@/lib/reviews";

export function ReviewImpression({ review, serviceSlug }: { review: Review; serviceSlug?: string }) {
  return <span hidden data-review-impression data-track-review-id={review._id} data-track-service-slug={serviceSlug} data-track-project-type={review.projectType} data-track-broad-location={getReviewRegion(review)} data-track-review-source={review.source} />;
}

export function ReviewPageView() {
  return <span hidden data-review-page-view />;
}
