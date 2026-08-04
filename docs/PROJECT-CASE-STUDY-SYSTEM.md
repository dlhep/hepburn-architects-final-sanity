# Project case-study system

Project documents now support evidence-led architectural case studies without requiring a rewrite of older content. Every new field is optional. A project with only the existing summary, images and services continues to render as a concise project page.

## Sanity fields

Fields are grouped in Studio as:

- **Project information:** existing identity and facts plus `projectStatus`, `propertyType`, `projectYear` and `floorArea`.
- **Case study:** `projectDescription`, `clientBrief`, `existingConditions`, `designResponse`, `planningStrategy`, `technicalDesign`, `materialsAndDetailing`, `sustainabilityApproach`, `projectOutcome`, `lessonsAndInsights`, `keyChallenges`, `projectHighlights`, `clientTestimonial` and `beforeAfterIntro`.
- **Planning and technical:** `planningReference`, `constructionRoute` and `projectStages`.
- **Images:** existing featured/gallery images plus `beforeImages`, `afterImages` and `designDrawings`.
- **Related content:** existing service/location/guide/project overrides plus `projectTeam`.
- **Search appearance:** existing SEO fields.
- **Map location:** existing map and geocoding fields.

PortableText case-study fields use the same restrained configuration as `projectDescription`: normal text, H2, H3, blockquote, bullet and numbered lists, bold and italic. No arbitrary heading levels are enabled.

## Recommended entry order

1. Project title and broad location
2. Project type and factual summary
3. Client brief
4. Existing property and constraints
5. Design response
6. Planning strategy
7. Technical approach
8. Outcome
9. Architectural services
10. Featured and gallery images
11. Related service and location overrides

Add challenges, drawings, before/after images, team members, stages and testimonials only when the information is confirmed and publishable.

## Legacy projects and completeness

The website renders focused case-study sections only when content exists. If no focused sections are present, the existing `projectDescription` appears under **The project in detail**. Empty headings are never rendered.

The presentation-only completeness helper returns:

- `basic`: summary, image and services only;
- `developing`: two or more case-study sections, or a substantial existing project description;
- `detailed`: four or more case-study sections plus evidence such as drawings, challenges, an outcome, stages, testimonial or paired before/after images.

The Projects index shows a quiet “Case study” label only for developing or detailed projects. The Studio preview shows the same editorial guidance and never blocks publishing.

## Drawings and before/after images

Use `designDrawings` for plans, elevations, sections, technical details, concept sketches and diagrams. Provide required alt text, a useful caption and the closest drawing type. Drawings are displayed on a neutral background with `object-contain` so information is not cropped.

Use `beforeImages` and `afterImages` only when images can be paired in order. The website shows them side by side on larger screens and stacked on mobile; it does not create a misleading slider. If either side is missing, the section is omitted.

## Privacy and accuracy

- Use broad locations only. Never put a private residential address or full postcode in public project content.
- Do not add planning approvals, construction values, dates, energy systems or consultant claims unless they are verified.
- `constructionRoute` is retained for editorial context and is not displayed by default.
- Client names are optional. Anonymous descriptors such as “Homeowner, Harborne” are supported.
- Publish testimonials only with permission. Review URLs must be public HTTPS URLs.
- Team websites open in a new tab with `noopener noreferrer`.

## SEO and structured data

Project metadata defaults to `[Project title] | [Project type] in [location]`, avoiding duplicate location wording where the title already contains it. Explicit SEO fields and existing curated overrides take precedence.

Each page emits one JSON-LD graph containing a `CreativeWork`, broad `locationCreated`, `BreadcrumbList`, accurate images and available update date. No ratings, residence schema or fabricated claims are generated.

## Related pages and conversion

Manual `relatedServices`, `relatedLocations`, `relatedGuides` and `relatedProjects` selections take precedence. Missing overrides use the existing safe fallbacks based on project type, category, location, services and title; the current project is always excluded.

Related links retain the existing analytics system and additionally record project-specific service, location, guide, project and enquiry interactions. No image-view tracking is added.

## Writing prompts

- **Client brief:** What did the client need to change, and why?
- **Existing conditions:** What was already there, and which constraints shaped the work?
- **Design response:** Which architectural decisions solved the brief?
- **Planning strategy:** Which route and local considerations were actually relevant?
- **Technical design:** What was coordinated for structure, fire, thermal, drainage, access or ventilation?
- **Materials and detailing:** Which choices explain the relationship between old and new?
- **Sustainability:** Which measured fabric, daylight, reuse or energy decisions were made?
- **Outcome:** What is known about approval, completion, use or current status?
- **Project insights:** What can another homeowner or professional learn from this project?

## Project-entry checklist

- [ ] Project title
- [ ] Broad location
- [ ] Project type
- [ ] Factual summary
- [ ] Client brief
- [ ] Existing constraints
- [ ] Design response
- [ ] Planning strategy
- [ ] Technical approach
- [ ] Outcome
- [ ] Services
- [ ] Images with accurate alt text
- [ ] Related service and location
