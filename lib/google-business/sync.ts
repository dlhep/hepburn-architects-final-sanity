import "server-only";

import { createHash } from "node:crypto";
import { createClient } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/sanity/env";
import { fetchAllGoogleBusinessReviews } from "./reviews";
import { buildGoogleControlledFields, deduplicateGoogleReviews, GOOGLE_REVIEW_SOURCE, unavailableExternalIds } from "./model";

type ExistingGoogleReview = {
  _id: string;
  externalId: string;
  externalLocationId?: string;
  hiddenFromWebsite?: boolean;
};

export type GoogleReviewSyncSummary = {
  fetched: number;
  created: number;
  updated: number;
  archived: number;
  publishEnabled: boolean;
};

function writeClient() {
  const token = process.env.SANITY_REVIEW_SYNC_TOKEN;
  if (!token || !sanityProjectId) throw new Error("Sanity review sync write access is not configured.");
  return createClient({ projectId: sanityProjectId, dataset: sanityDataset, apiVersion: sanityApiVersion, token, useCdn: false });
}

function documentId(externalId: string) {
  return `google-review-${createHash("sha256").update(`${GOOGLE_REVIEW_SOURCE}:${externalId}`).digest("hex").slice(0, 40)}`;
}

function definedFields(fields: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined));
}

const nullableGoogleFields = ["clientName", "publicAttribution", "reviewDate", "rating", "sourceUrl", "externalUpdatedAt", "reviewerProfilePhotoUrl", "googleReviewUrl", "autoService"];

export async function synchroniseGoogleBusinessReviews(): Promise<GoogleReviewSyncSummary> {
  const client = writeClient();
  const incoming = deduplicateGoogleReviews(await fetchAllGoogleBusinessReviews());
  const existing = await client.fetch<ExistingGoogleReview[]>(
    `*[_type == "review" && externalSource == $source]{_id, externalId, externalLocationId, hiddenFromWebsite}`,
    { source: GOOGLE_REVIEW_SOURCE },
  );
  const existingByExternalId = new Map(existing.map((review) => [review.externalId, review]));
  const incomingIds = new Set(incoming.map((review) => review.externalId));
  const syncedAt = new Date().toISOString();
  let created = 0;
  let updated = 0;
  let archived = 0;

  for (const review of incoming) {
    const current = existingByExternalId.get(review.externalId);
    const id = current?._id || documentId(review.externalId);
    const hidden = current?.hiddenFromWebsite === true;
    const fields = buildGoogleControlledFields(review, { syncedAt, hidden, allowPublic: process.env.ALLOW_PUBLIC_GOOGLE_REVIEW_SYNC === "true" });
    if (!current) {
      await client.createIfNotExists({
        _id: id,
        _type: "review",
        ...definedFields(fields),
        location: review.autoRegion,
        featured: false,
        showOnHomepage: false,
        showOnReviewsPage: true,
        showOnServicePages: true,
        showOnLocationPages: true,
        hiddenFromWebsite: false,
      });
      created += 1;
    } else {
      const missingFields = nullableGoogleFields.filter((field) => fields[field as keyof typeof fields] === undefined);
      let patch = client.patch(id).set(definedFields(fields));
      if (missingFields.length) patch = patch.unset(missingFields);
      await patch.commit();
      updated += 1;
    }
  }

  const unavailableIds = new Set(unavailableExternalIds(existing.map((review) => review.externalId), [...incomingIds]));
  for (const review of existing) {
    if (unavailableIds.has(review.externalId)) {
      await client.patch(review._id).set({
        sourceUnavailable: true,
        archived: true,
        published: false,
        permissionToPublish: false,
        lastSyncedAt: syncedAt,
      }).commit();
      archived += 1;
    }
  }

  return {
    fetched: incoming.length,
    created,
    updated,
    archived,
    publishEnabled: process.env.ALLOW_PUBLIC_GOOGLE_REVIEW_SYNC === "true",
  };
}
