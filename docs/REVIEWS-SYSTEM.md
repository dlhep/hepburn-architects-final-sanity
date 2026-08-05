# Reviews system

The website has one review system: Sanity `review` documents, queried through `lib/reviews.ts`. Do not add hard-coded testimonials to page templates.

## Public safety rule

A review is public only when every condition below passes:

```text
published == true
verified == true
permissionToPublish == true
showOnReviewsPage != false
```

The GROQ projection deliberately excludes `internalSourceNote`, verification administration and any private contact data. Never enter an exact residential address, full postcode, email address or telephone number in a public field. A review copied from Google, Facebook, Houzz or another public platform still requires manual verification and approval before republication.

## Entering a genuine review

1. Copy the exact original review into `quote`.
2. Confirm the source and add the original URL for an online review.
3. Confirm a safe public attribution. Use `publicAttribution` where the client name should not appear.
4. Confirm permission or the documented republication basis.
5. Add only a broad location and useful project type.
6. Link the relevant service or project.
7. Mark `verified`.
8. Mark `permissionToPublish`.
9. Select display placement and enable only the intended surfaces.
10. Preview the result.
11. Mark `published` when ready.

Studio warnings are advisory so drafts can always be saved. A document marked Published but missing verification or permission remains blocked by the website query.

## Attribution and anonymity

`publicAttribution` takes precedence, followed by `clientName`, then `clientDescriptor`. For anonymity, use wording such as “Homeowner, Harborne” or “Residential developer, Birmingham”; do not use an invented name. If all three are empty the website falls back to “Verified client”, but editors should add an intentional public attribution before publication.

## Ratings and quotations

`rating` is optional and must reproduce a genuine 1–5 rating. Reviews without a rating display normally. `shortQuote` is an optional client-approved extract; it must not change the meaning of the original. The website does not publish an overall score, fake review count or organisation AggregateRating.

## Featured and page placement

- `featured` selects up to three large reviews on `/reviews`.
- `showOnHomepage` or the Homepage featured placement makes a review eligible for the compact homepage block; at most two are fetched and one is currently displayed.
- `showOnServicePages` makes a review eligible for a single commercial service placement.
- `showOnLocationPages` enables future location placement. It does not automatically add reviews to thin pages.
- `showOnReviewsPage` defaults true. Setting it false prevents all public-query output under the current safety policy.

`featuredPlacement` is optional. Manual placement wins over automatic matching. Supported placements are General, Homepage, House Extensions, Planning Applications, Building Regulations, New-Build Homes, Loft Conversions, HMO Conversions, Change of Use, Birmingham, Solihull and Other. Service matching then falls back to `relatedService`, followed by `projectType`.

## Linking services, locations and projects

Use the exact service or location slug in `relatedService` or `relatedLocation`. A directly referenced `relatedProject` can show the approved review near the end of that project case study and supplies the optional View related project link elsewhere. Only a review directly referencing that project is eligible for the project page.

`getReviewForLocation(locationSlug)` supports a future restrained rollout to strong location pages. Birmingham retains its dedicated verified-review handling. Do not add a generic review to a location page simply to fill space.

## Reviews page and filtering

Featured reviews are removed from the main collection. Filters appear only with at least six public reviews and at least two populated categories containing two or more reviews each. Filtering is client-side and creates no indexable URLs. The manually approved What clients value wording is qualitative and makes no quantitative claim.

## Sitemap

`/reviews` is added by `app/sitemap.ts` only when `getPublishedReviews()` returns at least one qualifying review. With zero reviews, the route still provides useful process and contact information but is not submitted as a populated review asset. No fake placeholder is shown.

## Structured data

The page emits `CollectionPage` and `BreadcrumbList` only. Individual Review and organisation AggregateRating schema are intentionally omitted: self-serving business reviews may not qualify for Google review rich results, and the practice should not imply eligibility. Reconsider only after a formal policy review and only for visibly rendered, accurately attributed and genuinely rated content.

## External review profiles

Profiles are configured in `lib/site.ts` as named fields. `googleBusinessBirmingham` is configured separately from the optional `googleBusinessNorthEast`; never point both labels to one profile. Facebook is shown only while its URL is configured. Add future Houzz or regional links as separate named configuration values and render them only when present, always with `target="_blank"` and `rel="noopener noreferrer"`.

## Analytics privacy

Review events use the existing consent-aware tracker. Allowed context includes review ID, service slug, project type, broad location, source, link URL/text and conversion location. Client names and full quotations are never sent.
