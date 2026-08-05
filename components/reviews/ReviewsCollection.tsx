"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { Review } from "@/lib/reviews";
import { getReviewAttribution, reviewProjectImage } from "@/lib/reviews";

const filterMap: Array<[string, string[]]> = [["House Extensions", ["House extension"]], ["Planning Applications", ["Planning application"]], ["New Homes", ["New-build home"]], ["Building Regulations", ["Building Regulations"]], ["HMOs and Conversions", ["HMO conversion", "Change of use"]], ["Developments", ["Residential development", "Commercial project"]]];

function ReviewItem({ review, featured = false }: { review: Review; featured?: boolean }) {
  const image = reviewProjectImage(review);
  return <article className={`review-item${featured ? " review-item-featured" : ""}`}>
    {image ? <Image src={image} alt={review.relatedProject?.featuredImage?.alt || review.relatedProject?.title || "Related Hepburn Architects project"} width={600} height={400} sizes="(max-width: 800px) 100vw, 33vw" /> : null}
    <div className="review-item-copy">
      {review.rating ? <div className="review-rating" aria-label={`${review.rating} out of 5`}><span>{review.rating}/5</span>{Array.from({ length: review.rating }).map((_, index) => <Star key={index} size={14} fill="currentColor" aria-hidden="true" />)}</div> : null}
      <blockquote>“{featured && review.quote.length > 420 ? review.quote.slice(0, 417).trimEnd() + "…" : review.quote}”</blockquote>
      <p className="review-attribution"><strong>{getReviewAttribution(review)}</strong>{review.projectType ? <span>{review.projectType}</span> : null}{review.location ? <span>{review.location}</span> : null}{review.source ? <span>{review.source}</span> : null}</p>
      {review.relatedProject?.slug ? <Link className="review-context-link" href={`/projects/${review.relatedProject.slug}`} data-track-event="review_project_click" data-track-review-id={review._id} data-track-project-type={review.projectType} data-track-broad-location={review.location} data-track-review-source={review.source}>View related project <ArrowUpRight size={15} /></Link> : null}
      {review.relatedService ? <Link className="review-context-link" href={`/services/${review.relatedService}`} data-track-event="review_service_click" data-track-review-id={review._id} data-track-project-type={review.projectType} data-track-broad-location={review.location} data-track-review-source={review.source}>Explore related service <ArrowUpRight size={15} /></Link> : null}
      {review.sourceUrl ? <a className="review-source-link" href={review.sourceUrl} target="_blank" rel="noopener noreferrer" data-track-event="review_source_click" data-track-review-id={review._id} data-track-project-type={review.projectType} data-track-broad-location={review.location} data-track-review-source={review.source}>Read original source <ArrowUpRight size={15} /></a> : null}
    </div>
  </article>;
}

export function ReviewsCollection({ reviews, featuredIds = [] }: { reviews: Review[]; featuredIds?: string[] }) {
  const [filter, setFilter] = useState("All");
  const filters = filterMap.filter(([, types]) => reviews.some((review) => types.includes(review.projectType || "")));
  const remaining = reviews.filter((review) => !featuredIds.includes(review._id));
  const visible = useMemo(() => filter === "All" ? remaining : remaining.filter((review) => (filterMap.find(([label]) => label === filter)?.[1] || []).includes(review.projectType || "")), [filter, remaining]);
  if (!reviews.length || !remaining.length) return null;
  return <section className="section reviews-collection" aria-labelledby="review-collection-title"><div className="shell"><div className="section-heading"><small className="eyebrow">Client experiences</small><h2 id="review-collection-title">More client experiences</h2></div>{filters.length > 0 ? <div className="review-filters" role="group" aria-label="Filter client reviews"><button type="button" className={filter === "All" ? "active" : ""} aria-pressed={filter === "All"} onClick={() => { setFilter("All"); window.hepburnTrack?.("review_filter_used", { filter: "All" }); }}>All</button>{filters.map(([label]) => <button type="button" key={label} className={filter === label ? "active" : ""} aria-pressed={filter === label} onClick={() => { setFilter(label); window.hepburnTrack?.("review_filter_used", { filter: label }); }}>{label}</button>)}</div> : null}<div className="review-list">{visible.slice(0, 12).map((review) => <ReviewItem key={review._id} review={review} />)}</div></div></section>;
}

export { ReviewItem };
