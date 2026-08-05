export const GOOGLE_REVIEW_SOURCE = "google_business_profile" as const;
export const BIRMINGHAM_REGION = "Birmingham and West Midlands" as const;
export const NORTH_EAST_REGION = "North East and Teesside" as const;

export type ReviewRegion = typeof BIRMINGHAM_REGION | typeof NORTH_EAST_REGION;

export type GoogleReviewApiResource = {
  name?: string;
  reviewId?: string;
  reviewer?: { displayName?: string; profilePhotoUrl?: string; isAnonymous?: boolean };
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: { comment?: string; updateTime?: string };
  reviewReplyUrl?: string;
};

export type NormalisedGoogleReview = {
  externalId: string;
  quote: string;
  reviewerDisplayName?: string;
  reviewerProfilePhotoUrl?: string;
  rating?: number;
  createTime?: string;
  updateTime?: string;
  googleReviewUrl?: string;
  externalLocationId: string;
  externalLocationName: string;
  autoRegion: ReviewRegion;
  autoService?: string;
};

const ratingValues: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export function googleStarRating(value?: string) {
  return value ? ratingValues[value.toUpperCase()] : undefined;
}

export function googleAccessToken(payload: unknown) {
  const accessToken = typeof payload === "object" && payload !== null && "access_token" in payload
    ? (payload as { access_token?: unknown }).access_token
    : undefined;
  if (typeof accessToken !== "string" || !accessToken) throw new Error("Google OAuth refresh returned no access token.");
  return accessToken;
}

function safeGoogleUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return url.protocol === "https:" && (hostname === "google.com" || hostname.endsWith(".google.com")) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function containsAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function hasWord(value: string, word: string) {
  return value.split(" ").includes(word);
}

export function matchReviewService(comment?: string): string | undefined {
  const value = comment?.toLocaleLowerCase("en-GB").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  if (!value) return undefined;

  if (containsAny(value, ["house in multiple occupation", "hmo conversion", "hmos"]) || hasWord(value, "hmo")) return "hmo-conversions";
  if (containsAny(value, ["loft", "dormer", "attic"])) return "loft-conversions";
  if (containsAny(value, ["building regulations", "technical drawings", "construction drawings"])) return "building-regulations";
  if (containsAny(value, ["planning application", "planning permission"]) || hasWord(value, "planning")) return "planning-applications";
  if (containsAny(value, ["kitchen extension", "rear extension", "side extension", "house extension"]) || hasWord(value, "extension")) return "house-extensions";
  if (containsAny(value, ["new build", "new-build", "new house", "replacement dwelling"])) return "new-build-homes";
  if (containsAny(value, ["change of use"]) || hasWord(value, "conversion")) return "change-of-use";
  if (containsAny(value, ["apartments", "housing development", "developer", "development site", "small development"]) || hasWord(value, "development")) return "small-sites-backland";
  return undefined;
}

export function normaliseGoogleReview(
  review: GoogleReviewApiResource,
  location: { id: string; name: string; region: ReviewRegion },
): NormalisedGoogleReview | undefined {
  const externalId = review.reviewId || review.name?.split("/").at(-1);
  if (!externalId) return undefined;
  const quote = typeof review.comment === "string" ? review.comment : "";
  const reviewerDisplayName = review.reviewer?.displayName || (review.reviewer?.isAnonymous ? "Anonymous Google reviewer" : undefined);
  return {
    externalId,
    quote,
    reviewerDisplayName,
    reviewerProfilePhotoUrl: review.reviewer?.profilePhotoUrl,
    rating: googleStarRating(review.starRating),
    createTime: review.createTime,
    updateTime: review.updateTime,
    googleReviewUrl: safeGoogleUrl(review.reviewReplyUrl),
    externalLocationId: location.id,
    externalLocationName: location.name,
    autoRegion: location.region,
    autoService: matchReviewService(quote),
  };
}

export function deduplicateGoogleReviews(reviews: NormalisedGoogleReview[]) {
  const unique = new Map<string, NormalisedGoogleReview>();
  for (const review of reviews) {
    const current = unique.get(review.externalId);
    if (!current || Date.parse(review.updateTime || "") >= Date.parse(current.updateTime || "")) unique.set(review.externalId, review);
  }
  return [...unique.values()];
}

export function unavailableExternalIds(existingIds: string[], incomingIds: string[]) {
  const incoming = new Set(incomingIds);
  return existingIds.filter((id) => !incoming.has(id));
}

export async function collectGoogleReviewPages(
  loadPage: (pageToken?: string) => Promise<{ reviews?: GoogleReviewApiResource[]; nextPageToken?: string }>,
) {
  const reviews: GoogleReviewApiResource[] = [];
  const seenPageTokens = new Set<string>();
  let pageToken: string | undefined;
  do {
    const page = await loadPage(pageToken);
    reviews.push(...(page.reviews || []));
    pageToken = page.nextPageToken;
    if (pageToken && seenPageTokens.has(pageToken)) throw new Error("Google Business review pagination repeated a page token.");
    if (pageToken) seenPageTokens.add(pageToken);
  } while (pageToken);
  return reviews;
}

export function regionForLocationSlug(locationSlug: string): ReviewRegion | undefined {
  const slug = locationSlug.toLowerCase();
  if (["birmingham", "harborne", "edgbaston", "moseley", "kings-heath", "bournville", "west-midlands", "solihull"].some((value) => slug.includes(value))) return BIRMINGHAM_REGION;
  if (["nunthorpe", "middlesbrough", "redcar", "saltburn", "teesside", "north-east"].some((value) => slug.includes(value))) return NORTH_EAST_REGION;
  return undefined;
}

export function buildGoogleControlledFields(
  review: NormalisedGoogleReview,
  options: { syncedAt: string; hidden: boolean; allowPublic: boolean },
) {
  const canPublish = options.allowPublic
    && !options.hidden
    && review.quote.trim().length > 0
    && Boolean(review.reviewerDisplayName)
    && Boolean(review.createTime && !Number.isNaN(Date.parse(review.createTime)))
    && typeof review.rating === "number"
    && review.rating >= 1
    && review.rating <= 5;
  return {
    quote: review.quote,
    clientName: review.reviewerDisplayName,
    publicAttribution: review.reviewerDisplayName,
    reviewDate: review.createTime?.slice(0, 10),
    rating: review.rating,
    source: "Google",
    sourceUrl: review.googleReviewUrl,
    verified: true,
    permissionToPublish: canPublish,
    published: canPublish,
    externalId: review.externalId,
    externalSource: GOOGLE_REVIEW_SOURCE,
    externalLocationId: review.externalLocationId,
    externalLocationName: review.externalLocationName,
    externalUpdatedAt: review.updateTime,
    importedAutomatically: true,
    lastSyncedAt: options.syncedAt,
    reviewerProfilePhotoUrl: review.reviewerProfilePhotoUrl,
    googleReviewUrl: review.googleReviewUrl,
    autoRegion: review.autoRegion,
    autoService: review.autoService,
    sourceUnavailable: false,
    archived: false,
  };
}
