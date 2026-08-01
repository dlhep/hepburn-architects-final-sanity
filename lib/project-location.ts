const UK_POSTCODE = /^([A-Z]{1,2}\d[A-Z\d]?)\s*\d[A-Z]{2}$/i;
const LIKELY_HOUSE_NUMBER = /^\s*\d{1,3}[a-z]?(?:\s*[-/]\s*\d{1,3}[a-z]?)?\s+\S/i;

export function toPublicPostcodeDistrict(postcode?: string | null): string | undefined {
  if (!postcode) return undefined;
  const normalised = postcode.trim().toUpperCase().replace(/\s+/g, "");
  const match = normalised.match(UK_POSTCODE);
  return match?.[1];
}

export function normaliseInternalPostcode(postcode?: string | null): string | undefined {
  if (!postcode) return undefined;
  const compact = postcode.trim().toUpperCase().replace(/\s+/g, "");
  if (!UK_POSTCODE.test(compact)) return undefined;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

export function buildPrivateGeocodingAddress(location: {
  streetName?: string | null;
  postcode?: string | null;
  townOrCity?: string | null;
}): string | undefined {
  const streetName = safePublicLocationPart(location.streetName);
  const postcode = normaliseInternalPostcode(location.postcode);
  const townOrCity = safePublicLocationPart(location.townOrCity);
  if (!streetName || !postcode || !townOrCity) return undefined;
  return [streetName, postcode, townOrCity, "United Kingdom"].join(", ");
}

export function safePublicLocationPart(value?: string | null): string | undefined {
  const normalised = value?.trim().replace(/\s+/g, " ");
  if (!normalised || LIKELY_HOUSE_NUMBER.test(normalised)) return undefined;
  return normalised;
}

export function roundPublicCoordinate(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.round(value * 1_000) / 1_000;
}
