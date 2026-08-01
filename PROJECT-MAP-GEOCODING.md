# Project Map geocoding setup

The map accepts both full `Project` documents and standalone `Map Project` documents. Full Project editors use the existing map fields. Map Project editors enter only the project name, street, postcode, town/city, project type, optional description/image/full-project link, and Show on Map switch.

Publishing a mapped project triggers a signed Sanity webhook. The server fetches the project with a restricted Sanity token, geocodes `Street Name + Postcode + Town / City`, rounds the result to three decimal places, and writes only the reduced-precision coordinates and a source fingerprint to hidden internal fields. A matching fingerprint prevents repeat geocoding when unrelated project content changes.

## Environment variables

Add these locally to `.env.local` and later to the matching Vercel project environments:

```text
SANITY_MAP_GEOCODING_SECRET=<long-random-webhook-secret>
SANITY_MAP_WRITE_TOKEN=<restricted-sanity-editor-token>
GOOGLE_MAPS_GEOCODING_API_KEY=<server-side-geocoding-key>
CRON_SECRET=<long-random-cron-secret>
```

Keep the existing browser-map variables separate:

```text
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<http-referrer-restricted-browser-key>
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=<map-id>
```

Never prefix the server-side key, webhook secret, or Sanity write token with `NEXT_PUBLIC_`.

## Google Cloud

1. Enable the Geocoding API in the Google Cloud project.
2. Create a separate server-side key for Geocoding; do not reuse the browser Maps JavaScript key.
3. Restrict the key to the Geocoding API only.
4. Where the hosting setup provides stable outbound IPs, restrict the key to those IP addresses. Otherwise keep the API restriction and monitor quota closely.
5. Retain the existing HTTP-referrer-restricted browser key for Maps JavaScript API only.

The geocoded result is displayed only on the Google map. The stored coordinates are deliberately rounded to three decimal places. A protected daily cron refreshes stored Google-derived coordinates by day 29 so they are not retained beyond Google's 30-day caching allowance.

## Sanity token

Create a dedicated Sanity API token with the minimum role that can read and update Project and Map Project documents. Store it as `SANITY_MAP_WRITE_TOKEN`. Do not reuse a broad personal token.

## Sanity webhook

In Sanity Manage → API → Webhooks, create:

- Name: `Geocode mapped projects`
- URL: `https://hepburnarchitects.co.uk/api/sanity/geocode-project`
- Dataset: `production`
- Trigger: create and update
- Filter: `(_type == "project" && showOnProjectMap == true) || (_type == "mapProject" && showOnMap == true)`
- Projection: `{ "_id": _id, "_type": _type }`
- HTTP method: POST
- API version: use the current supported version
- Secret: exactly the value of `SANITY_MAP_GEOCODING_SECRET`
- Drafts: disabled

If the Google key is not configured yet, the endpoint returns a configuration error without exposing secrets. After adding the key, publish the mapped project again to trigger geocoding.

The coordinate patch triggers the webhook once more, but the stored fingerprint identifies the location as unchanged, so no second Google request occurs.

## Scheduled refresh

`vercel.json` calls `/api/cron/refresh-project-geocodes` daily. Vercel sends `CRON_SECRET` as a bearer token. The endpoint refreshes up to 20 mapped projects whose coordinates are missing or 29 days old. This is required because Google Geocoding latitude and longitude may only be cached temporarily; it does not geocode on visitor requests or Projects-page loads.

## Add a standalone Map Project

1. Open Studio and choose **Map Projects**.
2. Create a Map Project.
3. Enter Project Name, Street Name, Postcode, Town / City and Project Type.
4. Optionally add a short description, image or reference to an existing full Project.
5. Leave Show on Map enabled and publish.

The Studio list reports Awaiting geocoding, Map ready or Geocoding failed. Items without safe generated coordinates are excluded from the public query. A linked full Project supplies only an optional case-study URL; when that full Project is already mapped itself, the full Project wins and the linked standalone item is removed deterministically.
