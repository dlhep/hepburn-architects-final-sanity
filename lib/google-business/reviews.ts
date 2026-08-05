import "server-only";

import {
  BIRMINGHAM_REGION,
  collectGoogleReviewPages,
  googleAccessToken,
  NORTH_EAST_REGION,
  normaliseGoogleReview,
  type GoogleReviewApiResource,
  type NormalisedGoogleReview,
  type ReviewRegion,
} from "./model";

type GoogleReviewsResponse = {
  reviews?: GoogleReviewApiResource[];
  nextPageToken?: string;
};

type LocationConfig = { id: string; name: string; region: ReviewRegion };

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_BUSINESS_API = "https://mybusiness.googleapis.com/v4";

function requiredEnvironment(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Google Business review sync is missing ${name}.`);
  return value;
}

function resourceId(name: string, value: string) {
  const id = value.split("/").filter(Boolean).at(-1) || "";
  if (!/^[A-Za-z0-9_-]+$/.test(id)) throw new Error(`Google Business review sync has an invalid ${name}.`);
  return id;
}

function retryDelay(response: Response, attempt: number) {
  const retryAfter = Number(response.headers.get("retry-after"));
  return Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter * 1000, 5000) : 500 * (attempt + 1);
}

async function requestWithRetry(url: string, init: RequestInit, label: string) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    let response: Response;
    try {
      response = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(20_000) });
    } catch {
      if (attempt === 2) throw new Error(`${label} could not be reached.`);
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      continue;
    }
    if (response.ok) return response;
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === 2) throw new Error(`${label} failed with status ${response.status}.`);
    await new Promise((resolve) => setTimeout(resolve, retryDelay(response, attempt)));
  }
  throw new Error(`${label} failed.`);
}

async function refreshAccessToken() {
  const response = await requestWithRetry(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: requiredEnvironment("GOOGLE_BUSINESS_CLIENT_ID"),
      client_secret: requiredEnvironment("GOOGLE_BUSINESS_CLIENT_SECRET"),
      refresh_token: requiredEnvironment("GOOGLE_BUSINESS_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  }, "Google OAuth refresh");
  return googleAccessToken(await response.json());
}

function configuredLocations(): LocationConfig[] {
  return [
    {
      id: resourceId("Birmingham location ID", requiredEnvironment("GOOGLE_BUSINESS_BIRMINGHAM_LOCATION_ID")),
      name: "Hepburn Architects Birmingham",
      region: BIRMINGHAM_REGION,
    },
    {
      id: resourceId("North East location ID", requiredEnvironment("GOOGLE_BUSINESS_NORTH_EAST_LOCATION_ID")),
      name: "Hepburn Architects North East",
      region: NORTH_EAST_REGION,
    },
  ];
}

async function fetchLocationReviews(accessToken: string, accountId: string, location: LocationConfig) {
  const reviews: NormalisedGoogleReview[] = [];
  const resources = await collectGoogleReviewPages(async (pageToken) => {
    const parameters = new URLSearchParams({ pageSize: "50", orderBy: "updateTime desc" });
    if (pageToken) parameters.set("pageToken", pageToken);
    const parent = `accounts/${encodeURIComponent(accountId)}/locations/${encodeURIComponent(location.id)}`;
    const response = await requestWithRetry(`${GOOGLE_BUSINESS_API}/${parent}/reviews?${parameters}`, {
      headers: { authorization: `Bearer ${accessToken}` },
    }, `Google Business reviews request for ${location.name}`);
    return await response.json() as GoogleReviewsResponse;
  });
  for (const review of resources) {
    const normalised = normaliseGoogleReview(review, location);
    if (normalised) reviews.push(normalised);
  }
  return reviews;
}

export async function fetchAllGoogleBusinessReviews() {
  const accountId = resourceId("account ID", requiredEnvironment("GOOGLE_BUSINESS_ACCOUNT_ID"));
  const accessToken = await refreshAccessToken();
  const results: NormalisedGoogleReview[] = [];
  for (const location of configuredLocations()) {
    results.push(...await fetchLocationReviews(accessToken, accountId, location));
  }
  return results;
}
