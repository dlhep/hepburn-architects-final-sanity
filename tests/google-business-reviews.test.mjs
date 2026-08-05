import assert from "node:assert/strict";
import test from "node:test";
import {
  BIRMINGHAM_REGION,
  buildGoogleControlledFields,
  collectGoogleReviewPages,
  deduplicateGoogleReviews,
  googleAccessToken,
  googleStarRating,
  matchReviewService,
  normaliseGoogleReview,
  NORTH_EAST_REGION,
  regionForLocationSlug,
  unavailableExternalIds,
} from "../lib/google-business/model.ts";

const location = { id: "123", name: "Hepburn Architects Birmingham", region: BIRMINGHAM_REGION };

test("maps only clear service language", () => {
  assert.equal(matchReviewService("Our rear extension and kitchen extension were carefully designed."), "house-extensions");
  assert.equal(matchReviewService("Technical drawings for Building Regulations were clear."), "building-regulations");
  assert.equal(matchReviewService("Planning was handled professionally."), "planning-applications");
  assert.equal(matchReviewService("We needed an HMO."), "hmo-conversions");
  assert.equal(matchReviewService("Helpful and responsive throughout."), undefined);
});

test("normalises Google fields without changing review wording", () => {
  const comment = "Excellent advice — exactly as written.";
  const review = normaliseGoogleReview({ reviewId: "review-1", reviewer: { displayName: "A Client" }, starRating: "FIVE", comment, createTime: "2026-08-01T10:00:00Z", updateTime: "2026-08-02T10:00:00Z" }, location);
  assert.equal(review?.quote, comment);
  assert.equal(review?.rating, 5);
  assert.equal(review?.reviewerDisplayName, "A Client");
  assert.equal(review?.autoRegion, BIRMINGHAM_REGION);
});

test("accepts only HTTPS Google review links", () => {
  assert.equal(normaliseGoogleReview({ reviewId: "safe-url", reviewReplyUrl: "https://search.google.com/local/reviews/1" }, location)?.googleReviewUrl, "https://search.google.com/local/reviews/1");
  assert.equal(normaliseGoogleReview({ reviewId: "unsafe-url", reviewReplyUrl: "javascript:alert(1)" }, location)?.googleReviewUrl, undefined);
  assert.equal(normaliseGoogleReview({ reviewId: "off-domain", reviewReplyUrl: "https://example.com/review" }, location)?.googleReviewUrl, undefined);
});

test("retains rating-only and unrated records safely for internal reconciliation", () => {
  assert.equal(normaliseGoogleReview({ reviewId: "rating-only", starRating: "FOUR" }, location)?.quote, "");
  assert.equal(normaliseGoogleReview({ reviewId: "no-rating", comment: "Written feedback" }, location)?.rating, undefined);
  assert.equal(googleStarRating("STAR_RATING_UNSPECIFIED"), undefined);
});

test("uses the newest version when a review is returned more than once", () => {
  const base = normaliseGoogleReview({ reviewId: "same", comment: "Original", updateTime: "2026-01-01T00:00:00Z" }, location);
  const edited = normaliseGoogleReview({ reviewId: "same", comment: "Edited", updateTime: "2026-02-01T00:00:00Z" }, location);
  const result = deduplicateGoogleReviews([base, edited].filter(Boolean));
  assert.equal(result.length, 1);
  assert.equal(result[0].quote, "Edited");
});

test("handles a zero-review response", () => {
  assert.deepEqual(deduplicateGoogleReviews([]), []);
  assert.deepEqual(unavailableExternalIds(["old-1", "old-2"], []), ["old-1", "old-2"]);
});

test("identifies disappeared reviews without deleting retained reviews", () => {
  assert.deepEqual(unavailableExternalIds(["keep", "deleted"], ["keep", "new"]), ["deleted"]);
});

test("rejects an OAuth refresh response without an access token", () => {
  assert.throws(() => googleAccessToken({ error: "invalid_grant" }), /no access token/);
});

test("collects every review page and rejects repeated page tokens", async () => {
  const pages = [];
  const reviews = await collectGoogleReviewPages(async (token) => {
    pages.push(token || "first");
    return token ? { reviews: [{ reviewId: "second" }] } : { reviews: [{ reviewId: "first" }], nextPageToken: "page-2" };
  });
  assert.deepEqual(pages, ["first", "page-2"]);
  assert.deepEqual(reviews.map((review) => review.reviewId), ["first", "second"]);
  await assert.rejects(() => collectGoogleReviewPages(async () => ({ nextPageToken: "same" })), /repeated a page token/);
});

test("associates only supported location families with a source region", () => {
  assert.equal(regionForLocationSlug("harborne-architects"), BIRMINGHAM_REGION);
  assert.equal(regionForLocationSlug("middlesbrough-architects"), NORTH_EAST_REGION);
  assert.equal(regionForLocationSlug("unrelated-location"), undefined);
});

test("publishes only safe official records and never returns editorial override fields", () => {
  const review = normaliseGoogleReview({ reviewId: "safe", reviewer: { displayName: "A Client" }, comment: "Genuine feedback", starRating: "FIVE", createTime: "2026-08-01T10:00:00Z" }, location);
  const controlled = buildGoogleControlledFields(review, { syncedAt: "2026-08-05T05:30:00Z", hidden: false, allowPublic: true });
  assert.equal(controlled.published, true);
  for (const manualField of ["featured", "featuredPlacement", "displayOrder", "relatedProject", "relatedService", "manualRegionOverride", "manualServiceOverride", "hiddenFromWebsite"]) {
    assert.equal(Object.hasOwn(controlled, manualField), false);
  }
  assert.equal(buildGoogleControlledFields({ ...review, quote: "" }, { syncedAt: "now", hidden: false, allowPublic: true }).published, false);
  assert.equal(buildGoogleControlledFields(review, { syncedAt: "now", hidden: true, allowPublic: true }).published, false);
  assert.equal(buildGoogleControlledFields(review, { syncedAt: "now", hidden: false, allowPublic: false }).published, false);
});
