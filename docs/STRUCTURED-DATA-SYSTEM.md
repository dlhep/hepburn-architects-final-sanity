# Structured Data System

## Core entities

- Organisation: `https://hepburnarchitects.co.uk/#organisation`
- Website: `https://hepburnarchitects.co.uk/#website`
- Birmingham studio: `https://hepburnarchitects.co.uk/#birmingham-studio`
- Nunthorpe studio: `https://hepburnarchitects.co.uk/#nunthorpe-studio`
- David Hepburn: `https://hepburnarchitects.co.uk/#david-hepburn`
- Page entities: canonical URL plus `#webpage`, `#breadcrumb`, `#service`, `#faq`, `#article` or `#project`

`lib/structured-data` owns typed builders and ID conventions. `components/StructuredData.tsx` is the only component allowed to render `application/ld+json`. It accepts objects, not raw strings, and uses the site’s HTML-safe serializer. `buildGraph` removes empty values, normalises the former `#organization` reference during the migration, supplies predictable IDs to compatible legacy nodes and warns during development if an ID is duplicated in a graph.

## Two-studio model

Hepburn Architects Ltd is the parent Organization. Birmingham and Nunthorpe are the only LocalBusiness/ProfessionalService entities. Both use their complete central-config physical address. A service-area page never receives a branch address. West Midlands location services reference Birmingham; North East and Teesside services reference Nunthorpe. A missing Google Business Profile URL is omitted rather than copied from another region.

## Schema matrix

| Page type | Main schema | Supporting schema | Prohibited / usually avoid |
|---|---|---|---|
| Homepage | WebPage, WebSite, Organization | Two studios, architect | Breadcrumb, SearchAction without search |
| Studio | AboutPage | Organization, studios, breadcrumb | Invented accreditation types |
| Contact | ContactPage | Organization, studios, breadcrumb | Service-area addresses |
| Hub/index | CollectionPage | ItemList, breadcrumb | Full schema for every card |
| Service | WebPage, Service | Breadcrumb, visible FAQ | Product, Offer, price, rating |
| Location | WebPage, Service | Breadcrumb, visible FAQ, Place when useful | LocalBusiness for a suburb; fake coordinates |
| Project | WebPage, CreativeWork | Breadcrumb | Product, Residence, exact address/client data |
| Knowledge guide | WebPage, Article | Breadcrumb, visible FAQ | Fabricated dates |
| Journal article | WebPage, BlogPosting | Breadcrumb, visible FAQ | Embedded duplicate publisher |
| Reviews | CollectionPage | Breadcrumb | AggregateRating; Review by default |
| Fee calculator | WebPage, WebApplication | Breadcrumb | Product, Offer, price/rating |
| Download guide | WebPage, Article | Breadcrumb | Product/Offer merely because it is downloadable |

## Editorial policies

### Reviews and ratings

Self-serving Organization, LocalBusiness and Service aggregate ratings are not emitted. Individual Review schema is also omitted by default even when reviews are visibly displayed. It may be reconsidered only after a fresh policy review confirms visible original wording, accurate attribution, genuine rating/source, correct reviewed item and current Google eligibility. Never create a synthetic quote or average.

### FAQs

Use `buildFaqSchema` only with the same complete questions and answers rendered on the page. Do not mark up chatbot content, hidden CMS entries or user discussion. Google currently limits FAQ rich-result visibility largely to well-known government and health sites; Hepburn uses FAQ schema for semantic clarity, not an enhanced-result promise.

### Projects

Use `buildProjectSchema` with published content only. Broad locality is allowed. Never pass a street address, private postcode, client name, hidden coordinates, unverified completion/approval date or project value. Sanity preview and map-only records without a public route must not enter ItemList output.

### Articles and images

Knowledge Centre content uses Article; Journal content uses BlogPosting. `datePublished` and `dateModified` must come from reliable Sanity/editorial fields—never build or deployment time. Authors must be visibly identified. Images must be relevant, absolute HTTPS URLs, public/crawlable, adequately sized and not preview assets. The approved 1200×630 raster sharing image is the organisation image/logo fallback; project/article featured imagery is preferred.

## Extending the system

For a new service, create a canonical metadata URL, render visible breadcrumbs, and compose `buildWebPageSchema`, `buildServiceSchema`, `buildBreadcrumbSchema`, plus `buildFaqSchema` only when FAQs are visible. For a new location, select the real regional studio, pass accurate `areaServed` places and never add an address. For a new page type, add a focused builder under `lib/structured-data`, export it from `index.ts`, document the graph here and add a representative audit case. Do not insert schema JSON through PortableText or Sanity raw strings.

## Validation

Run in this order:

```text
npm run typecheck
npm run build
npm run links:audit
npm run schema:audit
```

The schema audit reports duplicate IDs, non-HTTPS/relative/localhost URLs, obsolete domains, unintended `.com` or `www` identities, missing page and breadcrumb references, empty values, unexpected postcodes, ratings/reviews and fake LocalBusiness entities. Static analysis cannot confirm live crawlability or rich-result eligibility.

After deployment, manually test these canonical URLs in Google Rich Results Test and Schema.org Validator, then use Search Console URL Inspection: homepage; Birmingham; Four Oaks; Little Aston; House Extensions; Planning Applications; one current project; one Knowledge Centre guide; one Journal article; Reviews; Fee Calculator. Confirm the rendered HTML, screenshot and canonical before requesting indexing. Monitor Search Console Enhancement and Unparsable structured data reports after releases; revalidate representative templates when Google guidance or page content changes.
