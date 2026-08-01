import "server-only";

import { createHash } from "node:crypto";
import { createClient } from "next-sanity";
import { buildPrivateGeocodingAddress, roundPublicCoordinate } from "@/lib/project-location";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/sanity/env";

type GeocodingProject = {
  _id: string;
  enabled?: boolean;
  streetName?: string;
  postcode?: string;
  townOrCity?: string;
  mapGeocodeFingerprint?: string;
};

type GoogleGeocodingResponse = {
  status: string;
  results?: Array<{ geometry?: { location?: { lat?: number; lng?: number } } }>;
};

export type ProjectGeocodingResult = { geocoded: boolean; reason?: string };

function fingerprint(value: string) {
  return createHash("sha256").update(value.toLocaleLowerCase("en-GB")).digest("hex");
}

function writeClient() {
  const token = process.env.SANITY_MAP_WRITE_TOKEN;
  if (!token || !sanityProjectId) throw new Error("Project-map Sanity write access is not configured.");
  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    token,
    useCdn: false,
  });
}

export async function geocodeProjectById(id: string, forceRefresh = false): Promise<ProjectGeocodingResult> {
  const geocodingKey = process.env.GOOGLE_MAPS_GEOCODING_API_KEY;
  if (!geocodingKey) throw new Error("Google server-side geocoding is not configured.");
  const client = writeClient();
  const project = await client.fetch<GeocodingProject | null>(
    `*[_type in ["project", "mapProject"] && _id == $id][0]{
      _id,
      "enabled": select(_type == "project" => showOnProjectMap, showOnMap),
      "streetName": select(_type == "project" => mapStreetName, streetName),
      "postcode": select(_type == "project" => mapPostcode, postcode),
      "townOrCity": select(_type == "project" => mapTownOrCity, townOrCity),
      mapGeocodeFingerprint
    }`,
    { id }
  );
  if (!project?.enabled) return { geocoded: false, reason: "not-enabled" };

  const privateAddress = buildPrivateGeocodingAddress({
    streetName: project.streetName,
    postcode: project.postcode,
    townOrCity: project.townOrCity,
  });
  if (!privateAddress) throw new Error("The project has incomplete or unsafe map location fields.");

  const sourceFingerprint = fingerprint(privateAddress);
  if (!forceRefresh && sourceFingerprint === project.mapGeocodeFingerprint) {
    return { geocoded: false, reason: "unchanged" };
  }

  const parameters = new URLSearchParams({ address: privateAddress, components: "country:GB", key: geocodingKey });
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${parameters.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Google Geocoding request failed.");

  const geocoding = await response.json() as GoogleGeocodingResponse;
  const location = geocoding.results?.[0]?.geometry?.location;
  const latitude = roundPublicCoordinate(location?.lat);
  const longitude = roundPublicCoordinate(location?.lng);
  if (geocoding.status !== "OK" || latitude === undefined || longitude === undefined) {
    await client.patch(project._id).set({ mapGeocodingStatus: `failed:${geocoding.status || "UNKNOWN"}` }).commit();
    throw new Error("No usable approximate location was returned.");
  }

  await client.patch(project._id).set({
    mapLatitude: latitude,
    mapLongitude: longitude,
    mapGeocodeFingerprint: sourceFingerprint,
    mapGeocodedAt: new Date().toISOString(),
    mapGeocodingStatus: "ready",
  }).commit();
  return { geocoded: true };
}

export async function getStaleMappedProjectIds(): Promise<string[]> {
  const client = writeClient();
  const projects = await client.fetch<Array<{ _id: string; mapGeocodedAt?: string }>>(
    `*[
      (_type == "project" && showOnProjectMap == true) ||
      (_type == "mapProject" && showOnMap == true)
    ]{_id, mapGeocodedAt}`
  );
  const refreshBefore = Date.now() - 29 * 24 * 60 * 60 * 1000;
  return projects
    .filter((project) => !project.mapGeocodedAt || Date.parse(project.mapGeocodedAt) < refreshBefore)
    .map((project) => project._id);
}
