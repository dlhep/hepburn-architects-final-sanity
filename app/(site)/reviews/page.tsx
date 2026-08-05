import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReviewsCollection, ReviewItem } from "@/components/reviews/ReviewsCollection";
import { getFeaturedReviews, getPublishedReviews } from "@/lib/reviews";
import { createSeoMetadata, serializeJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { ReviewPageView } from "@/components/reviews/ReviewImpression";

export const metadata: Metadata = createSeoMetadata({ title: "Hepburn Architects Reviews | Client Experiences", description: "Read verified client reviews of Hepburn Architects for extensions, planning applications, new homes and residential projects across Birmingham and the West Midlands.", path: "/reviews" });

const pathways = [
  ["House Extensions", "/services/house-extensions"], ["Planning Applications", "/services/planning-applications"], ["Building Regulations", "/services/building-regulations"], ["New-Build Homes", "/services/new-build-homes"], ["HMO Conversions", "/services/hmo-conversions"], ["Selected Projects", "/projects"],
];

const process = ["Initial discussion", "Clear written scope", "Survey and feasibility", "Design development", "Planning or lawful-development route", "Technical information where appointed", "Clear next steps"];

export default async function ReviewsPage() {
  const [reviews, featured] = await Promise.all([getPublishedReviews(), getFeaturedReviews()]);
  const featuredReviews = featured.slice(0, 3);
  const featuredIds = featuredReviews.map((review) => review._id);
  const schemas = { "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", "@id": `${site.url}/reviews`, name: "Hepburn Architects Reviews | Client Experiences", url: `${site.url}/reviews`, description: metadata.description }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }, { "@type": "ListItem", position: 2, name: "Client Reviews", item: `${site.url}/reviews` }] }] };
  return <>
    <ReviewPageView />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemas) }} />
    <section className="section reviews-hero"><div className="shell page-intro"><small className="eyebrow">Client experiences</small><h1>Reviews of Hepburn Architects</h1><p className="lead">Read verified client experiences from residential, planning and development projects across Birmingham, the West Midlands and the North East.</p><div className="actions"><Link className="btn primary" href="/contact" data-track-event="review_cta_click">Discuss Your Project <ArrowRight size={17} /></Link><Link className="btn secondary" href="/projects" data-track-event="review_cta_click">View Projects <ArrowRight size={17} /></Link></div></div></section>
    <section className="section reviews-introduction"><div className="shell editorial-grid"><div><small className="eyebrow">A considered decision</small><h2>Choosing an architect is a significant decision.</h2></div><div><p className="lead">Architectural appointments involve trust, communication, planning judgement and technical coordination.</p><p>Client experiences can help you understand how a practice communicates, responds to questions, develops ideas, supports planning and prepares technical information. The scope is agreed for each appointment.</p></div></div></section>
    {featuredReviews.length ? <section className="section reviews-featured"><div className="shell"><div className="section-heading"><small className="eyebrow">Verified experiences</small><h2>What clients have shared</h2></div><div className="reviews-featured-grid">{featuredReviews.map((review) => <ReviewItem key={review._id} review={review} featured />)}</div></div></section> : null}
    <ReviewsCollection reviews={reviews} featuredIds={featuredIds} />
    {reviews.length ? <section className="section reviews-values"><div className="shell"><div className="section-heading"><small className="eyebrow">Working together</small><h2>What clients value about working with Hepburn Architects</h2></div><div className="reviews-value-list"><div>Clear professional advice</div><div>Direct communication</div><div>Thoughtful design development</div><div>Planning and technical understanding</div><div>Responsive project coordination</div><div>A clear understanding of the brief</div></div></div></section> : null}
    <section className="section reviews-pathways"><div className="shell"><div className="section-heading"><small className="eyebrow">Continue exploring</small><h2>Find the right starting point</h2></div><nav className="review-pathway-list" aria-label="Relevant services and projects">{pathways.map(([label, href]) => <Link key={href} href={href} data-track-event={href === "/projects" ? "review_project_click" : "review_service_click"}>{label}<ArrowRight size={16} /></Link>)}</nav></div></section>
    <section className="section reviews-process"><div className="shell editorial-grid"><div><small className="eyebrow">The process</small><h2>Clear steps, agreed for your appointment.</h2><p>The scope is agreed for each appointment, so the process reflects the project rather than assuming every client needs the same service.</p></div><ol className="review-process-list">{process.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div></section>
    <section className="section reviews-independent"><div className="shell"><div className="section-heading"><small className="eyebrow">Independent sources</small><h2>Read independent reviews</h2></div><p>Where profiles are configured, you can also read feedback on the original platform.</p><div className="actions">{site.googleBusinessBirmingham ? <a className="btn secondary" href={site.googleBusinessBirmingham} target="_blank" rel="noopener noreferrer" data-track-event="review_source_click">Google Business Profile Birmingham <ArrowRight size={17} /></a> : null}{site.googleBusinessNorthEast ? <a className="btn secondary" href={site.googleBusinessNorthEast} target="_blank" rel="noopener noreferrer" data-track-event="review_source_click">Google Business Profile North East <ArrowRight size={17} /></a> : null}{site.facebook ? <a className="btn secondary" href={site.facebook} target="_blank" rel="noopener noreferrer" data-track-event="review_source_click">Facebook <ArrowRight size={17} /></a> : null}</div></div></section>
    <section className="section"><div className="shell final-cta"><small className="eyebrow">Start a conversation</small><h2>Planning your own project?</h2><p>Discuss your property, objectives and likely next steps directly with Hepburn Architects.</p><div className="actions centered-actions"><Link className="btn primary" href="/contact" data-track-event="review_cta_click">Discuss Your Project <ArrowRight size={17} /></Link><Link className="btn secondary" href="/estimate" data-track-event="review_cta_click">Get an Indicative Fee <ArrowRight size={17} /></Link></div></div></section>
  </>;
}
