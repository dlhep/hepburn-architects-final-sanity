import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { getReviewAttribution, getReviewDisplayDate, getReviewForService, getReviewRegion, getReviewSourceLabel, getReviewSourceUrl, type Review } from "@/lib/reviews";
import { ReviewImpression } from "./ReviewImpression";

export function ReviewQuote({ review, serviceSlug, compact = false }: { review: Review; serviceSlug?: string; compact?: boolean }) {
  const context = [review.projectType, getReviewRegion(review), getReviewDisplayDate(review), getReviewSourceLabel(review)].filter(Boolean).join(" · ");
  const sourceUrl = getReviewSourceUrl(review);
  return <section className={`relevant-review${compact ? " relevant-review-compact" : ""}`} aria-label="Client experience">
    <ReviewImpression review={review} serviceSlug={serviceSlug} />
    <div className="shell relevant-review-inner">
      <small className="eyebrow">Client experience</small>
      <Quote className="relevant-review-mark" aria-hidden="true" />
      {review.rating ? <p className="relevant-review-rating" aria-label={`${review.rating} out of 5 stars`}><span>{review.rating}/5</span>{Array.from({length:review.rating}).map((_,index)=><Star key={index} size={14} fill="currentColor" aria-hidden="true" />)}</p> : null}
      <blockquote>{review.shortQuote || review.quote}</blockquote>
      <p className="relevant-review-attribution"><strong>{getReviewAttribution(review)}</strong>{context ? <span>{context}</span> : null}</p>
      <div className="relevant-review-links">
        {review.relatedProject?.slug ? <Link href={`/projects/${review.relatedProject.slug}`} data-track-event={serviceSlug ? "service_review_project_click" : "review_project_click"} data-track-review-id={review._id} data-track-service-slug={serviceSlug} data-track-project-type={review.projectType} data-track-broad-location={review.location} data-track-review-source={review.source}>View related project <ArrowRight size={15}/></Link> : null}
        {sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer" data-track-event="review_source_click" data-track-review-id={review._id} data-track-review-source={review.source}>Read on {getReviewSourceLabel(review)} <ArrowRight size={15}/></a> : null}
        <Link href="/reviews" data-track-event="review_service_click" data-track-review-id={review._id} data-track-service-slug={serviceSlug}>Read client reviews <ArrowRight size={15}/></Link>
      </div>
    </div>
  </section>;
}

export async function RelevantReview({ serviceSlug, location }: { serviceSlug: string; location?: string }) {
  const review = await getReviewForService(serviceSlug, location);
  return review ? <ReviewQuote review={review} serviceSlug={serviceSlug} /> : null;
}
