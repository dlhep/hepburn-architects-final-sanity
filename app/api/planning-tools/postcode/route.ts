const DATASETS = ["green-belt", "conservation-area", "article-4-direction-area", "area-of-outstanding-natural-beauty", "world-heritage-site", "site-of-special-scientific-interest", "scheduled-monument", "listed-building", "flood-risk-zone", "air-quality-management-area"] as const;

type PostcodeResult = { latitude: number; longitude: number; admin_district?: string; admin_ward?: string; region?: string; codes?: { admin_district?: string } };

async function getJson(url: string) {
  const response = await fetch(url, { headers: { Accept: "application/json", "User-Agent": "HepburnArchitectsPlanningTools/1.0" }, next: { revalidate: 86400 } });
  if (!response.ok) throw new Error(`Lookup failed: ${response.status}`);
  return response.json();
}

export async function GET(request: Request) {
  const postcode = new URL(request.url).searchParams.get("postcode")?.trim().toUpperCase();
  if (!postcode || postcode.length > 10) return Response.json({ error: "Enter a valid UK postcode." }, { status: 400 });
  try {
    const postcodeData = await getJson(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    const place = postcodeData.result as PostcodeResult;
    if (!place?.latitude || !place?.longitude) throw new Error("Postcode not found");
    const checks = await Promise.all(DATASETS.map(async (dataset) => {
      const url = new URL("https://www.planning.data.gov.uk/entity.json");
      url.searchParams.set("dataset", dataset);
      url.searchParams.set("longitude", String(place.longitude));
      url.searchParams.set("latitude", String(place.latitude));
      url.searchParams.set("limit", "5");
      try {
        const data = await getJson(url.toString());
        const entities = data.entities || data.entity || [];
        const publicEntities = Array.isArray(entities) ? entities.map((entity) => ({
          id: entity.entity,
          name: entity.name || entity.reference || dataset,
          reference: entity.reference,
          dataset: entity.dataset || dataset,
        })) : [];
        return [dataset, publicEntities] as const;
      } catch { return [dataset, []] as const; }
    }));
    return Response.json({ postcode, latitude: place.latitude, longitude: place.longitude, council: place.admin_district, councilCode: place.codes?.admin_district, ward: place.admin_ward, region: place.region, constraints: Object.fromEntries(checks) }, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
  } catch {
    return Response.json({ error: "We could not complete that postcode check. Confirm the postcode and try again." }, { status: 502 });
  }
}
