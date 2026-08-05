# Reviews system

The `/reviews` page publishes only genuine client experiences entered in Sanity. A review must have `published`, `verified` and `permissionToPublish` set to true before it is returned by the public GROQ queries. Drafts, unverified reviews, unpublished reviews and internal source notes never reach the website.

## Adding a review

1. Locate the original review.
2. Confirm the wording.
3. Confirm the public attribution (or use an anonymous descriptor).
4. Confirm permission or the documented lawful republication basis.
5. Enter the source and source URL where available.
6. Link the broad project context, service or project where useful.
7. Mark `verified`.
8. Mark `permissionToPublish`.
9. Mark `published` and optionally `featured`.
10. Preview before deployment.

Do not enter private addresses, full postcodes, contact details or confidential client information. `internalSourceNote` is for Studio administration only.

## Fields and display

Quotes are entered verbatim; `shortQuote` is an optional approved extract and is never generated automatically. Attribution can use `publicAttribution` instead of a name. Ratings are optional and statistics are calculated only from published, verified, permission-cleared reviews with a genuine 1–5 rating. No rating or aggregate rating is output when there are no rated reviews.

Featured reviews appear once near the top of the page. The remaining collection supports understated project-type filters and is server-rendered before filtering. Related projects, services and original source links are optional.

## Structured data decision

The page emits `CollectionPage` and `BreadcrumbList` schema only. It does not emit `Review` or `AggregateRating` schema because self-serving organisation reviews may not qualify for Google review rich results, and the site should not imply eligibility without a formal policy review. Visible review content remains useful without making a rich-result claim.

## Publication and sitemap

`/reviews` is added to the sitemap only when at least one qualifying published review exists. The route itself remains safe with zero reviews: it retains the introduction, process, pathways and enquiry CTA without placeholder testimonials or fake statistics.

## Future platform links

Independent profile links are configured centrally in `lib/site.ts` and rendered with `target="_blank"` and `rel="noopener noreferrer"`. Add only genuine profiles. Review page source and platform clicks use the existing consent-aware analytics helper; no client PII is sent.
