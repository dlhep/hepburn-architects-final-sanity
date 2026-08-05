# Structured Data Audit

Audit completed 5 August 2026 against the repository’s public App Router routes and the current Google Search structured-data documentation and Schema.org vocabulary.

## Executive findings

The previous implementation emitted four identity scripts from the site layout on every page, while templates added further independent scripts. The organisation appeared as `#organization`, full organisation and branch records were repeated, the Birmingham branch was used on pages that merely described a service area, Nunthorpe was absent from the central identity graph, and many page entities and breadcrumbs had no stable IDs. Several article templates embedded new Person and Organization objects. Project pages used `#case-study`, and the Birmingham page spread a map URL into `PostalAddress`.

No public `AggregateRating` was found. The Reviews page did not mark up individual reviews, which remains the conservative decision. FAQ content is visibly rendered on the pages where FAQ schema is retained. Project schema used a broad public locality and did not expose a client name or exact residential address; that privacy boundary has been preserved.

## Page-type audit and final graph

| Page type | Previous state | Risks found | Final graph | Rich-result position |
|---|---|---|---|---|
| Homepage | Global WebSite, Organization, Birmingham branch and Person in separate scripts | Repeated sitewide; no Nunthorpe branch | WebSite, WebPage, Organization, two real studios, architect | Organisation identity; no SearchAction because there is no site search |
| Studio/About | Only the global graph | No page or breadcrumb entity | AboutPage, BreadcrumbList, Organization, two studios, architect | Semantic organisation information |
| Contact | Only the global graph | Two visible offices but one structured branch | ContactPage, BreadcrumbList, Organization, Birmingham and Nunthorpe studios | LocalBusiness information for real offices only |
| Services hub | Global graph only | Missing collection identity | CollectionPage, ItemList, BreadcrumbList | No service-card rich-result expectation |
| Service page | Separate Service, FAQ and breadcrumb scripts; mixed provider IDs | Missing stable IDs; one page used OfferCatalog | WebPage, Service, BreadcrumbList, visible FAQ where present | Service is semantic; no Product, Offer or rating |
| Locations hub | Global graph only | Missing collection identity | CollectionPage, ItemList, BreadcrumbList | Semantic collection |
| Location page | Some pages created LocalBusiness for service areas; provider varied | Fake branch risk and Birmingham/North East confusion | WebPage, Service, BreadcrumbList, visible FAQ; Place where useful; real regional studio reference | No fabricated local office |
| Projects hub | No page schema | Visible published list unrepresented | CollectionPage, ItemList, BreadcrumbList | Semantic collection |
| Project page | CreativeWork with `#case-study`; embedded organisation | Unstable ID; duplicate organisation; privacy review required | WebPage, CreativeWork `#project`, BreadcrumbList | No Product, Residence or client/address data |
| Knowledge Centre hub | Breadcrumb only | No collection or visible-resource list | CollectionPage, ItemList, BreadcrumbList | Semantic collection |
| Knowledge guide | Several independent scripts and embedded publisher objects | Missing IDs and inconsistent publisher/author | WebPage, Article, BreadcrumbList, visible FAQ | Article eligibility depends on complete reliable dates/images |
| Journal hub | CollectionPage with nested ItemList but no breadcrumb ID | Inconsistent page identity | CollectionPage, ItemList, BreadcrumbList | Semantic collection |
| Journal article | BlogPosting plus embedded publisher/author | Duplicate organisation identity; SVG fallback logo | WebPage, BlogPosting, BreadcrumbList, visible FAQ | Article rich-result testing appropriate |
| Reviews | CollectionPage and breadcrumb | No stable WebPage ID | CollectionPage, BreadcrumbList | No Review or AggregateRating by default |
| Fee Calculator | No page schema | Interactive tool unrepresented | WebPage, WebApplication, BreadcrumbList | No Product, Offer, rating or price |
| House Extension Guide | No schema | Downloadable guide unrepresented | WebPage, Article, BreadcrumbList | No Product/Offer for the free guide |
| Sitemap/metadata | Canonicals generally on `.co.uk` | Schema IDs did not always follow canonical | Builders use absolute canonical `.co.uk` URLs | Sitemap remains independent of JSON-LD |
| Sanity fields | Reliable `_updatedAt`, publication fields and public image data available | Deployment time must not become an article date | Builders accept dates only when supplied by the content model | Editors must maintain publication dates |

## Duplicates and unsupported properties removed

- Removed the layout-wide identity scripts and the unused legacy renderer.
- Standardised the organisation identity to `https://hepburnarchitects.co.uk/#organisation`.
- Removed embedded Organisation and Person definitions from dynamic articles and projects; these now use references.
- Limited `LocalBusiness`/`ProfessionalService` entities to the two actual offices.
- Removed map data accidentally nested inside `PostalAddress`.
- Removed the service-page Offer/OfferCatalog path from the standard architecture. No price, Product or AggregateRating is emitted.
- Consolidated each page into one JSON-LD `@graph` script.

## Privacy and visibility

Only a project’s public title, description, images, service/category terms and broad locality may enter project schema. Exact residential addresses, private postcodes, client details, private coordinates, unpublished projects and internal Sanity fields are prohibited. FAQ schema is generated only from the same arrays rendered on-page. Review documents, internal notes and imported reviewer data are not added to JSON-LD.

## Static-audit limitations

`schema:audit` examines built HTML when `.next/server/app` exists and source code for renderer bypasses. It cannot decide whether prose is factually true, whether Google will grant a rich result, whether a remote image is crawlable at validation time, or whether a CMS record has changed after the build. Those items require live URL testing and editorial review.
