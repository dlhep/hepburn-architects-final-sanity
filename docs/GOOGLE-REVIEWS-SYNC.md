# Google Business Profile review synchronisation

## Purpose and data flow

The website imports genuine reviews through Google's official Business Profile API. It does not scrape Google Search, Google Maps HTML or use the Places API as its review source.

`Google Business Profile API → /api/reviews/sync → Sanity review documents → existing website review queries`

All Google and Sanity credentials remain in server-only Vercel environment variables. The browser never receives OAuth credentials, refresh tokens, account IDs, location IDs or the Sanity write token.

## Google Cloud setup

1. Use the Google Cloud project approved for the Google account that manages both verified Hepburn Architects Business Profiles.
2. Apply for Google Business Profile API access if the Cloud project has not already been approved. Access is not automatically granted merely by enabling an API.
3. Enable the Google Business Profile APIs required to discover and manage the account, including My Business Account Management API, My Business Business Information API and the Google My Business API used by the v4 reviews endpoint.
4. Configure the OAuth consent screen. Keep the app internal while testing where the Google Workspace arrangement permits it; otherwise complete the appropriate testing/production configuration.
5. Create an OAuth 2.0 client. A web application client is appropriate for a controlled server-side authorisation flow. Register only the redirect URI actually used to obtain the first authorisation code.
6. Authorise the Google account that is an owner or manager of both profiles with this scope:

   `https://www.googleapis.com/auth/business.manage`

The reviews integration uses Google's documented [`accounts.locations.reviews.list`](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list) endpoint, requesting up to 50 reviews per page and following every `nextPageToken`.

## Obtaining the refresh token

Use the normal OAuth 2.0 authorisation-code flow with offline access and consent enabled. Exchange the one-time code at `https://oauth2.googleapis.com/token` using the same client ID, client secret and redirect URI. Store the returned refresh token immediately in Vercel; never paste it into source code, tickets or documentation.

Google OAuth Playground can be used as a controlled one-time setup aid only when **Use your own OAuth credentials** is enabled and the exact Business Profile scope is selected. Remove temporary redirect URIs afterwards. If Google does not return a refresh token, revoke the prior grant for the client and repeat the consent flow with offline access.

## Finding account and location IDs

With a temporary access token for the approved Google account:

- List accounts with My Business Account Management API: `GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts`.
- List locations with Business Information API: `GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/ACCOUNT_ID/locations?readMask=name,title,storeCode`.
- Confirm the Birmingham and Nunthorpe / North East records by their returned titles and resource names. Do not infer an ID from a public Maps URL.

Environment values may be supplied as raw IDs or their final resource-name segments. They are validated before a request is built; request input cannot supply a different account or location.

## Vercel environment variables

Add these as sensitive, server-only values for Production (and Development only when local testing is required):

| Variable | Purpose |
| --- | --- |
| `GOOGLE_BUSINESS_CLIENT_ID` | Approved OAuth client ID |
| `GOOGLE_BUSINESS_CLIENT_SECRET` | OAuth client secret |
| `GOOGLE_BUSINESS_REFRESH_TOKEN` | Offline token for the profile manager account |
| `GOOGLE_BUSINESS_ACCOUNT_ID` | Business Profile account resource ID |
| `GOOGLE_BUSINESS_BIRMINGHAM_LOCATION_ID` | Verified Birmingham profile location ID |
| `GOOGLE_BUSINESS_NORTH_EAST_LOCATION_ID` | Verified Nunthorpe / North East profile location ID |
| `SANITY_REVIEW_SYNC_TOKEN` | Sanity API token with the minimum role needed to create and update review documents |
| `CRON_SECRET` | Long random bearer secret used by Vercel Cron and manual sync requests |
| `ALLOW_PUBLIC_GOOGLE_REVIEW_SYNC` | Explicit `true`/`false` approval for safe automatic publication |

None of these variables should use the `NEXT_PUBLIC_` prefix. Add the two public Google profile URLs separately in central site configuration when they are known; never point both region labels at one profile.

## Sanity token

Create a dedicated Sanity API token for this integration. Use a custom least-privilege role limited to review documents where the Sanity plan supports custom roles. Otherwise use the narrowest available write role, keep it only in Vercel, and rotate it if it is ever disclosed.

## Publication policy

Imported records are always marked as official-source verified. They are not featured automatically. Automatic publication occurs only when all of the following are true:

- `ALLOW_PUBLIC_GOOGLE_REVIEW_SYNC=true`;
- Google returned original review text;
- Google returned a valid rating from one to five;
- Google returned a reviewer attribution and valid creation date;
- the review is not hidden, archived or unavailable at source;
- the record passes the existing published, verified and permission query gate.

The configuration flag records an explicit editorial decision to republish public Business Profile content with its Google attribution. It is not legal advice and does not remove the need to review Google's current API/content terms, UK data-protection obligations and the practice's editorial policy. Leave the flag `false` until David has approved that basis. Manual non-Google reviews continue to require their existing verification and permission workflow.

## Running and testing the sync

The manual endpoint is:

```bash
curl -X POST https://hepburnarchitects.co.uk/api/reviews/sync \
  -H "Authorization: Bearer $CRON_SECRET"
```

Never put the bearer secret in a URL. A successful response contains counts only: fetched, created, updated and archived. It contains no reviewer names, review text, Google identifiers or secrets. An invalid or missing bearer token returns `401`.

For local pure-function checks run:

```bash
npm run reviews:test
```

Test first with `ALLOW_PUBLIC_GOOGLE_REVIEW_SYNC=false`. Inspect the imported Studio documents, confirm the two source profiles and region assignments, then enable publication and run the sync again only after approval.

## Daily cron

`vercel.json` invokes `GET /api/reviews/sync` once daily at `05:30 UTC`. Vercel supplies `Authorization: Bearer CRON_SECRET`. The route exposes both GET for Vercel Cron and POST for controlled manual runs; both use the same constant-time bearer check. Cron jobs run only on production deployments.

## Reconciliation and duplicate protection

- `externalId` is Google's encrypted review ID and is the identity key.
- New Sanity document IDs are deterministic hashes of the official source and external ID.
- Re-running the sync patches the same record rather than creating a duplicate.
- If duplicate API results are ever returned, the newest `updateTime` wins.
- Edited text, rating, reviewer attribution and source timestamps are updated from Google without rewriting the wording.
- Rating-only or unrated records remain available internally for reconciliation but cannot auto-publish.

## Manual overrides

The synchroniser never overwrites:

- `featured` or `featuredPlacement`;
- `displayOrder`;
- `relatedProject` or `relatedService`;
- `manualRegionOverride` or `manualServiceOverride`;
- `showOnHomepage`, `showOnReviewsPage`, `showOnServicePages` or `showOnLocationPages` after creation;
- `hiddenFromWebsite`.

Manual service placement takes priority over related service and automatic keyword matching. Featured placement remains the highest service-page priority. Automatic matching is deliberately conservative and may be blank. The source profile supplies only a broad region; review wording is never used to infer a suburb or precise client address.

## Deleted and unavailable reviews

Only a successfully completed, fully paginated location response is reconciled. If a previously imported review is absent, its Sanity document is retained for audit history and marked `sourceUnavailable` and `archived`. Publication and permission are disabled immediately. The document is not deleted. If Google returns it again later, the archive flags are cleared and normal publication rules are reapplied.

## Attribution

Visible Google reviews retain the display name returned by Google, genuine rating, review date, original comment and a clear “Google Business Profile” source label. Where Google returns a review URL, the website links to it with safe external-link attributes. Reviews are never combined, paraphrased or converted into synthetic testimonials. Recheck [Google Business Profile API policies](https://developers.google.com/my-business/content/policies) before changing the presentation or retention policy.

## Operational checks

After configuring production:

1. Call the endpoint with no bearer token and confirm `401`.
2. Run once with publication disabled and inspect both regions in Studio.
3. Run again and confirm `created: 0` (duplicate protection).
4. Compare counts and wording with each Business Profile.
5. Temporarily edit a controlled test review only if appropriate, sync, and confirm the source edit is reflected while manual placement remains.
6. Hide a record in Studio, sync, and confirm it stays hidden.
7. Confirm `/reviews`, one relevant service page and an eligible location page on desktop and mobile.
8. Check Vercel logs after the first scheduled 05:30 UTC run. Logs should contain only safe summary/error wording.
