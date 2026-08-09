"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { useState } from "react";
import type { Review } from "@/lib/reviews";
import { getReviewAttribution, getReviewDisplayDate, getReviewRegion, getReviewService, getReviewServiceUrl, getReviewSourceLabel, getReviewSourceUrl, reviewProjectImage } from "@/lib/reviews";
import { BIRMINGHAM_REGION, NORTH_EAST_REGION } from "@/lib/google-business/model";

const serviceFilters: Array<[string, string, string[]]> = [["House Extensions", "house-extensions", ["House extension"]], ["Planning Applications", "planning-applications", ["Planning application"]], ["Building Regulations", "building-regulations", ["Building Regulations"]], ["New Homes", "new-build-homes", ["New-build home"]], ["Loft Conversions", "loft-conversions", ["Loft conversion"]], ["HMOs and Conversions", "hmo-conversions", ["HMO conversion", "Change of use"]], ["Developments", "small-sites-backland", ["Residential development", "Commercial project"]]];

function reviewMatchesService(review: Review, slug: string, projectTypes: string[]) {
  return getReviewService(review) === slug || projectTypes.includes(review.projectType || "");
}

function ReviewItem({ review, featured = false }: { review: Review; featured?: boolean }) {
  const image = reviewProjectImage(review);
  const region = getReviewRegion(review);
  const sourceLabel = getReviewSourceLabel(review);
  const sourceUrl = getReviewSourceUrl(review);
  const date = getReviewDisplayDate(review);
  const serviceUrl = getReviewServiceUrl(review.relatedService);
  return <article className={`review-item${featured ? " review-item-featured" : ""}`}>
    {image ? <Image src={image} alt={review.relatedProject?.featuredImage?.alt || review.relatedProject?.title || "Related Hepburn Architects project"} width={600} height={400} sizes="(max-width: 800px) 100vw, 33vw" /> : null}
    <div className="review-item-copy">
      {review.rating ? <div className="review-rating" aria-label={`${review.rating} out of 5`}><span>{review.rating}/5</span>{Array.from({ length: review.rating }).map((_, index) => <Star key={index} size={14} fill="currentColor" aria-hidden="true" />)}</div> : null}
      <blockquote>{review.quote}</blockquote>
      <p className="review-attribution"><strong>{getReviewAttribution(review)}</strong>{review.projectType ? <span>{review.projectType}</span> : null}{region ? <span>{region}</span> : null}{date ? <span>{date}</span> : null}{sourceLabel ? <span>{sourceLabel}</span> : null}</p>
      {review.relatedProject?.slug ? <Link className="review-context-link" href={`/projects/${review.relatedProject.slug}`} data-track-event="review_project_click" data-track-review-id={review._id} data-track-project-type={review.projectType} data-track-broad-location={review.location} data-track-review-source={review.source}>View related project <ArrowUpRight size={15} /></Link> : null}
      {serviceUrl ? <Link className="review-context-link" href={serviceUrl} data-track-event="review_service_click" data-track-review-id={review._id} data-track-project-type={review.projectType} data-track-broad-location={review.location} data-track-review-source={review.source}>Explore related service <ArrowUpRight size={15} /></Link> : null}
      {sourceUrl ? <a className="review-source-link" href={sourceUrl} target="_blank" rel="noopener noreferrer" data-track-event="review_source_click" data-track-review-id={review._id} data-track-project-type={review.projectType} data-track-broad-location={region} data-track-review-source={review.source}>Read on {sourceLabel || "original source"} <ArrowUpRight size={15} /></a> : null}
    </div>
  </article>;
}

export function ReviewsCollection({ reviews, featuredIds = [] }: { reviews: Review[]; featuredIds?: string[] }) {
  const [filter, setFilter] = useState("All");
  const remaining = reviews.filter((review) => !featuredIds.includes(review._id));
  const regionFilters = [[BIRMINGHAM_REGION, BIRMINGHAM_REGION], [NORTH_EAST_REGION, NORTH_EAST_REGION]] as const;
  const availableRegions = regionFilters.filter(([, region]) => remaining.filter((review) => getReviewRegion(review) === region).length >= 2);
  const availableServices = serviceFilters.filter(([, slug, types]) => remaining.filter((review) => reviewMatchesService(review, slug, types)).length >= 2);
  const visible = (() => {
    if (filter === "All") return remaining;
    const region = regionFilters.find(([label]) => label === filter)?.[1];
    if (region) return remaining.filter((review) => getReviewRegion(review) === region);
    const service = serviceFilters.find(([label]) => label === filter);
    return service ? remaining.filter((review) => reviewMatchesService(review, service[1], service[2])) : remaining;
  })();
  if (!reviews.length || !remaining.length) return null;
  const filters = [...availableRegions.map(([label]) => label), ...availableServices.map(([label]) => label)];
  const showFilters = reviews.length >= 6 && filters.length >= 2;
  return <section className="section reviews-collection" aria-labelledby="review-collection-title"><div className="shell"><div className="section-heading"><small className="eyebrow">Client experiences</small><h2 id="review-collection-title">More client experiences</h2></div>{showFilters ? <div className="review-filters" role="group" aria-label="Filter client reviews"><button type="button" className={filter === "All" ? "active" : ""} aria-pressed={filter === "All"} onClick={() => { setFilter("All"); window.hepburnTrack?.("review_filter_used", { filter: "All" }); }}>All</button>{filters.map((label) => <button type="button" key={label} className={filter === label ? "active" : ""} aria-pressed={filter === label} onClick={() => { setFilter(label); window.hepburnTrack?.("review_filter_used", { filter: label }); }}>{label}</button>)}</div> : null}<div className="review-list">{visible.map((review) => <ReviewItem key={review._id} review={review} />)}</div></div></section>;
}

export { ReviewItem };
