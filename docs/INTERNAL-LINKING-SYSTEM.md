# Internal-linking system

## Central map

`lib/internal-links.ts` is the typed source of truth for cornerstone destinations, service relationships, guide relationships, location proximity and project fallbacks. It exports `getRelatedServices`, `getRelatedGuides`, `getNearbyLocations`, `getLocationLinksForProject`, `getServiceLinksForProjectType`, `getProjectLinks` and `getCommercialLinksForArticle`.

## Reusable components

The `components/internal-links` directory provides restrained, keyboard-accessible link sections:

- `RelatedServices` and `RelatedGuides` for topic clusters;
- `NearbyLocations` for geographic clusters;
- `ProjectContextLinks` for service, location, guide and related-project context;
- `CommercialNextStep` for a clear but low-pressure article next step;
- `ContextualLink` for deliberate copy links;
- `RelatedLinks` as the shared semantic `<nav>` renderer.

Important links carry `data-track-internal` and `data-track-group`; the existing analytics layer records `internal_link_click` with the source page, destination type, link group and link text. Ordinary navigation is not instrumented by this component.

## Automatic and manual project relationships

Project links fall back to project type, category, location and related project similarity. The optional Sanity fields `relatedServices`, `relatedLocations`, `relatedGuides` and `relatedProjects` override those fallbacks when populated. Old projects remain valid when these fields are empty.

## Geographic hierarchy

`lib/content-extended.ts` remains the published location inventory. The locations hub presents only existing routes in Birmingham/neighbourhood, Solihull/Warwickshire and Black Country/West Midlands clusters. Nearby links are derived from each location's existing `nearbyAreas` values and are silently omitted when a matching published route is unavailable.

## Adding content

Add a new service or location to the existing content inventory first. Then add its relationship in `serviceRelationships` or the appropriate location's `serviceSlugs` and `nearbyAreas`. For a future article, call `CommercialNextStep` with its slug/title and, where appropriate, an explicit service destination.

Use relative URLs, descriptive varied anchors, and one strong link to a destination per content section. Avoid generic “click here”, repeated exact-match anchors, query-string URLs, and links to unpublished drafts.

## Audit command

```bash
npm run links:audit
```

The audit checks route files and source-code links. It cannot see links stored in Sanity Portable Text until those documents are fetched, so CMS content remains a documented limitation.
