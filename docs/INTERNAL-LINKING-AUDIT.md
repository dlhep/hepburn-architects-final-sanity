# Internal-linking audit

Audit date: 4 August 2026

## Cornerstone pages

The primary commercial and hub pages are `/`, `/services/house-extensions`, `/services/planning-applications`, `/services/building-regulations`, `/services/new-build-homes`, `/services/loft-conversions`, `/services/hmo-conversions`, `/locations/birmingham-architects`, `/projects`, `/locations`, `/knowledge-centre`, `/estimate` and `/house-extension-guide`. The published service dataset currently contains six general service slugs; `/services/change-of-use` and `/services/small-sites-backland` are not published routes and were intentionally not fabricated.

## Existing patterns found

The site already had service-specific guide sections, location service/project/nearby-area sections, project breadcrumbs and location context, guide related-guide sections, article CTAs, a project location directory, and footer location links. These were useful but used several separate URL maps and some stale `/guides/...` references in the journal topic fallback.

## Weak or previously missing pathways

- Project pages did not consistently expose service, location, guide and related-project links from one system.
- Generic location pages had nearby links but no consistent guide module.
- The projects hub had filters and a map/directory but no restrained service hub links.
- Guide and journal templates had commercial CTAs but no shared configuration or click instrumentation.
- Footer navigation did not expose the primary service set requested for the cornerstone cluster.
- The CMS project schema had no optional manual related-link overrides.

## Repetition and orphan review

Run `npm run links:audit` after route or CMS changes. The script reports static route patterns, broken relative references, likely orphan static routes, repeated destinations within a template, and obsolete/local domain references. CMS-authored Portable Text links cannot be fully audited statically; published Sanity content should be checked in the CMS preview and through the generated page source.

## Cluster recommendations

House extensions is the main topic cluster: the service page points to planning, cost, timescale, design-ideas, Building Regulations and the free guide; those resources point back through shared commercial next-step pathways. Birmingham is the geographic parent for the neighbourhood pages, with location data providing nearby-area relationships. Projects connect automatically by project type, location and category, while explicit Sanity overrides take precedence.
