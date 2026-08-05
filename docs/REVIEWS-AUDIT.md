# Reviews implementation audit

Audit completed 5 August 2026 against the existing Hepburn Architects `.co.uk` Next.js and Sanity implementation.

## What already existed

- A first-party `/reviews` route with hero, introduction, featured reviews, filtered collection, values, service pathways, process, external sources and CTA.
- A single Sanity `review` document type registered in `sanity/schemaTypes/index.ts`.
- Safe public and featured GROQ queries, plus `lib/reviews.ts` fetching and attribution helpers.
- `ReviewsCollection` and `ReviewItem` components with optional ratings, project images, source links and related links.
- Consent-aware analytics names and review data attributes in the global conversion tracker.
- Verified-review filtering on the Birmingham cornerstone page.
- Conditional `/reviews` sitemap inclusion and an existing Client Reviews footer link.

## What worked

- Public queries already required `published == true`, `verified == true`, `permissionToPublish == true` and `showOnReviewsPage != false`.
- `internalSourceNote`, verification flags and private administrative data were not projected publicly.
- Featured IDs were removed from the main collection, preventing immediate duplication.
- Ratings were optional and no organisation `AggregateRating` schema was emitted.
- The empty state used no fake reviews, ratings or placeholders.
- Review links used the consent-aware analytics delegation already present across the site.

## Gaps found

- The schema lacked `showOnServicePages`, `showOnLocationPages` and `featuredPlacement`.
- Studio preview did not show publication or placement status and warnings were limited.
- The dynamic service template contained a separate hard-coded two-review system, bypassing Sanity approval.
- No reusable selector existed for service, location or directly related project placement.
- Filters appeared with too little data and did not enforce the agreed six-review/two-category threshold.
- Homepage trust proof linked directly to one Google profile rather than the first-party verified collection.
- Project pages could not show a directly linked review.
- Site configuration had one ambiguous `googleBusiness` value rather than named regional profile fields.

## Existing placements before this work

- `/reviews`: full Sanity-backed collection.
- Birmingham cornerstone: up to three verified Birmingham reviews.
- Dynamic service template: two hard-coded external testimonials (duplicate system; removed).
- Homepage: external review-profile link only, no Sanity review.
- Project template: no linked review.
- Generic location template: legacy hard-coded Birmingham reviews in a branch superseded by the dedicated Birmingham route; no rollout to thin location pages.

## Pages lacking review support before this work

- Bespoke House Extensions and HMO service pages.
- Dynamic Planning Applications, Building Regulations, New-Build Homes and Loft Conversions pages.
- Individual project pages.
- Homepage featured-review placement.
- Reusable future location selection.

Routes for `/services/change-of-use` and `/services/small-sites-backland` do not currently exist, so no new or duplicate routes were invented. The selector already recognises both slugs for future use.

## Layout and contrast findings

- Review page cards used the existing paper, cream, ink, muted and orange tokens and had no known white-on-cream issue.
- Card corners, long-quote wrapping, focus visibility and natural flex layout needed strengthening.
- The old global `.review-card` system used minimum heights and belonged to the hard-coded template block; the new compact placement does not use it.

## Links, sitemap and duplication

- `/reviews` was already included in the sitemap only when `getPublishedReviews()` returned at least one qualifying record. This remains correct.
- The footer already linked to `/reviews` as Client Reviews.
- About lacked a direct reviews link; one has been added.
- The hard-coded dynamic service testimonials were the principal duplicate system and have been removed.
- Project-level `clientTestimonial` content remains part of the project content model, but public review placement is now governed by the approved review documents and direct project references.
