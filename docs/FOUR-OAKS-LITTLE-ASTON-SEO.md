# Four Oaks and Little Aston location-page SEO

## Assigned search intent

### Four Oaks

- Canonical route: `/locations/four-oaks-architects`
- Primary intent: architects and residential architects in Four Oaks.
- Supporting intent: house extensions, remodelling, replacement homes, planning applications, Building Regulations and conservation-area work in Four Oaks.
- Geographic position: Four Oaks is treated as part of Sutton Coldfield and Birmingham. Birmingham City Council is identified as the local planning authority for ordinary residential applications.
- Heritage wording: the page states that Four Oaks includes a designated Conservation Area; it does not imply that every Four Oaks property lies within it or that permitted development rights are universally removed.

The page concentrates on the area’s substantial homes, mature landscape, frontage rhythm, roof form and replacement-dwelling considerations. It links upward to Sutton Coldfield and Birmingham but does not reuse their metadata or H1.

### Little Aston

- Canonical route: `/locations/little-aston-architects`
- Primary intent: architects and residential architects in Little Aston.
- Supporting intent: substantial house extensions, remodelling, one-off and replacement homes, planning applications and Building Regulations in Little Aston.
- Geographic position: Little Aston is described as Staffordshire, outside Birmingham. Lichfield District Council is identified as the local planning authority for ordinary residential applications.
- Policy wording: the page explains that the made Little Aston Neighbourhood Plan forms part of the planning context alongside national and district policy. It does not invent individual policy tests.

The page concentrates on larger plots, landscaped settings, privacy, access, plot coverage and replacement-home design. Birmingham appears only as a useful regional service link, never as Little Aston’s primary locality.

## Cannibalisation boundaries

- `/locations/sutton-coldfield-architects` remains the broad Sutton Coldfield hub, covering its varied housing areas, conservation areas and settlement-edge considerations.
- `/locations/birmingham-architects` remains the city cornerstone for Birmingham-wide residential architecture and services.
- `/locations/aldridge-architects` remains focused on Aldridge and its Walsall planning context.
- Four Oaks owns Four Oaks-specific conservation, extension and replacement-home search intent.
- Little Aston owns Little Aston-specific neighbourhood-plan, large-plot and replacement-home search intent.

The two new pages use distinct titles, descriptions, H1s, editorial sections, FAQs, planning-authority wording and structured `areaServed` values.

## Project and review safeguards

Published Sanity projects are ranked in this order:

1. Exact project-location text.
2. Manual `relatedLocations` assignment to the page slug.
3. Nearby named locations.
4. A relevant residential fallback.

Cards always display the project’s stored location. No project is relabelled as Four Oaks or Little Aston. The section is omitted when no suitable published project is available.

The existing safe public-review query remains authoritative. A page shows no more than one review with `showOnLocationPages` enabled, preferring a manual location relationship and then the Birmingham and West Midlands review region. The review block disappears when no suitable verified, approved and published review exists. A regional review is not presented as proof that work occurred in the exact locality.

## Sitemap and linking

Both routes are included through the central location configuration used by `app/sitemap.ts`. This also gives them static parameters, internal-link resolution and location-hub entries. Four Oaks is grouped with Birmingham and Sutton Coldfield; Little Aston is grouped under Staffordshire border and adjoining areas. Sutton Coldfield links to both pages, Birmingham links to Four Oaks, and exact project locations can link back to the corresponding new page.
