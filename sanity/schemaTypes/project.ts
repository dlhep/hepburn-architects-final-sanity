import { defineArrayMember, defineField, defineType } from "sanity";
import { SeoPreview } from "../components/SeoPreview";

const categories = [
  "Extensions",
  "Loft Conversions",
  "New Homes",
  "Remodelling",
  "Conversions",
  "Garden Rooms",
  "Developments",
];

const likelyHouseNumber = /^\s*\d{1,3}[a-z]?(?:\s*[-/]\s*\d{1,3}[a-z]?)?\s+\S/i;

const portableTextOf = () => [defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Section heading", value: "h2" },
    { title: "Subheading", value: "h3" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet list", value: "bullet" },
    { title: "Numbered list", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
    ],
  },
})];

const imageFields = [
  defineField({ name: "alt", title: "Image description for accessibility", type: "string", validation: (rule) => rule.required().max(180) }),
  defineField({ name: "caption", title: "Caption", type: "string", validation: (rule) => rule.max(240) }),
];

const caseStudySections = [
  ["clientBrief", "Client brief", "What the client wanted to achieve and the problems the project needed to solve."],
  ["existingConditions", "Existing property and constraints", "The existing building, site conditions, layout issues, planning context or physical limitations."],
  ["designResponse", "Design response", "How the architectural solution responds to the brief, site and existing building."],
  ["planningStrategy", "Planning strategy", "The consent route, relevant policy constraints, heritage issues, neighbour relationships, previous refusals or planning reasoning."],
  ["technicalDesign", "Technical design", "Structure, thermal performance, fire safety, drainage, ventilation, access, detailing and consultant coordination."],
  ["materialsAndDetailing", "Materials and detailing", "Material choices, architectural relationship, construction logic and significant details."],
  ["sustainabilityApproach", "Sustainability and energy approach", "Fabric improvements, glazing strategy, insulation, airtightness, renewable systems, reuse, daylight or low-energy measures."],
  ["projectOutcome", "Outcome", "The planning outcome, completed result, benefits achieved or current project status."],
  ["lessonsAndInsights", "Project insights", "Optional professional insight into what made the project successful or what others can learn from it."],
] as const;

function publicLocationValidation(value?: string) {
  return value && likelyHouseNumber.test(value)
    ? "Remove the house or building number. Enter the street name only."
    : true;
}

function caseStudyCompletenessLabel(selection: Record<string, unknown>) {
  const sections = ["clientBrief", "existingConditions", "designResponse", "planningStrategy", "technicalDesign", "materialsAndDetailing", "sustainabilityApproach", "projectOutcome", "lessonsAndInsights"];
  const count = sections.filter((name) => Array.isArray(selection[name]) && (selection[name] as unknown[]).length > 0).length;
  const evidence = ["keyChallenges", "projectHighlights", "designDrawings", "projectStages"].some((name) => Array.isArray(selection[name]) && (selection[name] as unknown[]).length > 0) || Boolean(selection.clientTestimonial);
  return count >= 4 && evidence ? "Detailed case study" : count >= 2 || Boolean(selection.projectDescription) ? "Developing case study" : "Basic project";
}

export const projectType = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  groups: [
    { name: "content", title: "Project information", default: true },
    { name: "caseStudy", title: "Case study" },
    { name: "planning", title: "Planning and technical" },
    { name: "images", title: "Images" },
    { name: "related", title: "Related content" },
    { name: "seo", title: "Search appearance" },
    { name: "map", title: "Map location" },
  ],
  fieldsets: [
    {
      name: "mapLocation",
      title: "Map Location",
      description:
        "Enter the street, full postcode and town or city. Coordinates are generated automatically after publishing and are never entered here.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({ name: "title", title: "Project title", type: "string", group: "content", validation: (rule) => rule.required().max(80) }),
    defineField({ name: "slug", title: "Page address", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Project category", type: "string", group: "content", options: { list: categories.map((title) => ({ title, value: title })), layout: "dropdown" }, validation: (rule) => rule.required() }),
    defineField({ name: "projectType", title: "Project type", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Project summary", type: "text", rows: 6, group: "content", description: "This automatically becomes the page meta description.", validation: (rule) => rule.required().min(10).max(600) }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo", description: "Optional concise, unbranded search title.", validation: (rule) => rule.max(60) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo", description: "Optional search description. The project summary is used when empty.", validation: (rule) => rule.max(155) }),
    defineField({ name: "projectDescription", title: "Full project description", type: "array", group: "caseStudy", description: "Optional longer project story for legacy projects or an overall narrative. Add focused sections below when available.", of: portableTextOf() }),
    defineField({ name: "localAuthority", title: "Local authority", type: "string", group: "content" }),
    defineField({ name: "applicationType", title: "Application type", type: "string", group: "content" }),
    defineField({ name: "contractValue", title: "Indicative contract value", type: "string", group: "content" }),
    defineField({ name: "completion", title: "Completion / status", type: "string", group: "content" }),
    defineField({ name: "projectStatus", title: "Project status (optional)", type: "string", group: "content", options: { list: ["Concept design", "Planning submitted", "Planning approved", "Technical design", "Under construction", "Completed", "Ongoing"] } }),
    defineField({ name: "propertyType", title: "Property type (optional)", type: "string", group: "content", description: "For example Victorian terrace, Edwardian semi-detached house, bungalow or brownfield site." }),
    defineField({ name: "projectYear", title: "Project year (optional)", type: "number", group: "content", validation: (rule) => rule.custom((value) => value == null || (Number.isInteger(value) && value >= 1900 && value <= 2200) ? true : "Enter a sensible four-digit year.") }),
    defineField({ name: "floorArea", title: "Approximate floor area (optional)", type: "string", group: "content", description: "For example 42 m². Do not enter a private address." }),
    defineField({ name: "planningReference", title: "Planning reference (optional)", type: "string", group: "planning", description: "Optional public planning application reference only." }),
    defineField({ name: "constructionRoute", title: "Construction route (optional)", type: "string", group: "planning", options: { list: ["Traditional contract", "Design and build", "Client-managed", "Contractor-led", "Not applicable", "Not recorded"] }, description: "Not shown publicly by default." }),
    ...caseStudySections.map(([name, title, description]) => defineField({ name, title, type: "array", group: "caseStudy", description, of: portableTextOf() })),
    defineField({ name: "keyChallenges", title: "Key challenges and solutions (optional)", type: "array", group: "caseStudy", description: "Add only factual, project-specific challenges. Do not add generic claims.", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "challenge", title: "Challenge", type: "string", validation: (rule) => rule.required().max(240) }), defineField({ name: "response", title: "Response", type: "text", rows: 4, validation: (rule) => rule.required().max(800) }), defineField({ name: "result", title: "Result (optional)", type: "string", validation: (rule) => rule.max(240) })] })], validation: (rule) => rule.max(8) }),
    defineField({ name: "projectHighlights", title: "Project highlights (optional)", type: "array", group: "caseStudy", description: "Short factual highlights such as planning approval, extension area or energy measures.", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required().max(80) }), defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required().max(180) })] })], validation: (rule) => rule.max(8) }),
    defineField({ name: "clientTestimonial", title: "Client testimonial (optional)", type: "object", group: "caseStudy", fields: [defineField({ name: "quote", title: "Quote", type: "text", rows: 5, validation: (rule) => rule.required().max(800) }), defineField({ name: "clientName", title: "Client name (optional)", type: "string", validation: (rule) => rule.max(120) }), defineField({ name: "clientDescriptor", title: "Client descriptor (optional)", type: "string", description: "For example Homeowner, Harborne.", validation: (rule) => rule.max(120) }), defineField({ name: "reviewSource", title: "Review source (optional)", type: "string", validation: (rule) => rule.max(120) }), defineField({ name: "reviewUrl", title: "Review URL (optional)", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) })] }),
    defineField({ name: "beforeAfterIntro", title: "Before and after introduction (optional)", type: "text", rows: 3, group: "caseStudy", validation: (rule) => rule.max(500) }),
    ...["beforeImages", "afterImages"].map((name) => defineField({ name, title: `${name === "beforeImages" ? "Before" : "After"} images (optional)`, type: "array", group: "images", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: imageFields })], validation: (rule) => rule.max(12) })),
    defineField({ name: "designDrawings", title: "Design drawings and process images (optional)", type: "array", group: "images", description: "Drawings use a neutral background and are not cropped on the website.", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [...imageFields, defineField({ name: "drawingType", title: "Drawing type", type: "string", options: { list: ["Existing plan", "Proposed plan", "Elevation", "Section", "Planning drawing", "Technical detail", "Concept sketch", "Diagram", "Site plan", "Other"] } })] })], validation: (rule) => rule.max(16) }),
    defineField({ name: "projectTeam", title: "Project team (optional)", type: "array", group: "related", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.required().max(100) }), defineField({ name: "organisation", title: "Organisation (optional)", type: "string", validation: (rule) => rule.max(160) }), defineField({ name: "website", title: "Website (optional)", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) })] })], validation: (rule) => rule.max(12) }),
    defineField({ name: "projectStages", title: "Project stages (optional)", type: "array", group: "planning", description: "Use only stages actually known for this project; this does not imply a full RIBA appointment.", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "stage", title: "Stage", type: "string", validation: (rule) => rule.required().max(80) }), defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(120) }), defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (rule) => rule.required().max(500) }), defineField({ name: "status", title: "Status", type: "string", options: { list: ["Complete", "Current", "Future", "Not applicable"] }, validation: (rule) => rule.required() })] })], validation: (rule) => rule.max(10) }),
    defineField({
      name: "showOnProjectMap",
      title: "Show on Project Map",
      type: "boolean",
      group: "map",
      fieldset: "mapLocation",
      description: "Show this project on the Projects-page map and public mapped-project list.",
      initialValue: false,
    }),
    defineField({
      name: "mapStreetName",
      title: "Street Name",
      type: "string",
      group: "map",
      fieldset: "mapLocation",
      description: "Street name only, for example High Street or Bristol Road. Do not include a house or building number.",
      hidden: ({ document }) => document?.showOnProjectMap !== true,
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.showOnProjectMap === true && !value?.trim()) {
          return "Street Name is required when this project is shown on the map.";
        }
        return publicLocationValidation(value);
      }),
    }),
    defineField({
      name: "mapPostcode",
      title: "Postcode",
      type: "string",
      group: "map",
      fieldset: "mapLocation",
      description: "Enter the full postcode internally. The public website displays only its outward district, for example B73.",
      hidden: ({ document }) => document?.showOnProjectMap !== true,
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.showOnProjectMap === true && !value?.trim()) {
          return "Postcode is required when this project is shown on the map.";
        }
        if (!value) return true;
        const normalised = value.trim().toUpperCase().replace(/\s+/g, " ");
        return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/.test(normalised)
          ? true
          : "Enter a valid UK postcode, for example B15 3AA.";
      }),
    }),
    defineField({
      name: "mapTownOrCity",
      title: "Town / City",
      type: "string",
      group: "map",
      fieldset: "mapLocation",
      description: "Required for mapped projects, for example Birmingham, Solihull, Middlesbrough or Worcester.",
      hidden: ({ document }) => document?.showOnProjectMap !== true,
      validation: (rule) => rule.custom((value, context) =>
        context.document?.showOnProjectMap === true && !value?.trim()
          ? "Town or City is required when this project is shown on the map."
          : true
      ),
    }),
    defineField({
      name: "mapCountyOrRegion",
      title: "County or Region",
      type: "string",
      group: "map",
      fieldset: "mapLocation",
      description: "Optional, for example West Midlands, Worcestershire, Warwickshire or Teesside.",
      hidden: () => true,
    }),
    defineField({
      name: "mapLabel",
      title: "Map Label",
      type: "string",
      group: "map",
      fieldset: "mapLocation",
      description: "Optional public label, for example Harborne, Birmingham. Never enter an exact address.",
      hidden: () => true,
    }),
    defineField({
      name: "mapLatitude",
      title: "Approximate Latitude",
      type: "number",
      group: "map",
      fieldset: "mapLocation",
      description: "Internal reduced-precision coordinate generated automatically. Not shown in the standard editor.",
      hidden: () => true,
      readOnly: true,
      validation: (rule) => rule.min(-90).max(90),
    }),
    defineField({
      name: "mapLongitude",
      title: "Approximate Longitude",
      type: "number",
      group: "map",
      fieldset: "mapLocation",
      description: "Internal reduced-precision coordinate generated automatically. Not shown in the standard editor.",
      hidden: () => true,
      readOnly: true,
      validation: (rule) => rule.min(-180).max(180),
    }),
    defineField({
      name: "mapGooglePlaceId",
      title: "Google Place ID",
      type: "string",
      group: "map",
      fieldset: "mapLocation",
      description: "Optional future location-management reference. It does not replace deliberately approximate public coordinates.",
      hidden: () => true,
    }),
    defineField({
      name: "mapLocationNote",
      title: "Coordinate Source or Location Note",
      type: "text",
      rows: 3,
      group: "map",
      fieldset: "mapLocation",
      description: "Optional internal note explaining how the approximate coordinates were chosen. This is never returned to the public website.",
      hidden: () => true,
    }),
    defineField({
      name: "mapGeocodeFingerprint",
      title: "Map Geocode Fingerprint",
      type: "string",
      group: "map",
      description: "Internal value used to avoid geocoding an unchanged location.",
      hidden: () => true,
      readOnly: true,
    }),
    defineField({
      name: "mapGeocodedAt",
      title: "Map Geocoded At",
      type: "datetime",
      group: "map",
      hidden: () => true,
      readOnly: true,
    }),
    defineField({
      name: "mapGeocodingStatus",
      title: "Map Geocoding Status",
      type: "string",
      group: "map",
      hidden: () => true,
      readOnly: true,
    }),
    defineField({ name: "services", title: "Architectural services", type: "array", group: "related", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" }, validation: (rule) => rule.min(1) }),
    defineField({ name: "relatedServices", title: "Related service page slugs (optional)", type: "array", group: "related", description: "Optional overrides, for example house-extensions or planning-applications. Automatic project-type matching is used when empty.", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "relatedLocations", title: "Related location page slugs (optional)", type: "array", group: "related", description: "Optional overrides, for example birmingham-architects or harborne-architects.", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "relatedGuides", title: "Related guide URLs (optional)", type: "array", group: "related", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "relatedProjects", title: "Related project slugs (optional)", type: "array", group: "related", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({
      name: "featured",
      title: "Feature in homepage project grid",
      type: "boolean",
      group: "content",
      description: "Use this for the three project images near the top of the homepage.",
      initialValue: false,
    }),
    defineField({
      name: "featuredCaseStudy",
      title: "Use as homepage featured case study",
      type: "boolean",
      group: "content",
      description: "Select this on one project only. It controls the large featured case study beneath the three homepage project images.",
      initialValue: false,
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "images",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Image description for accessibility", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project gallery",
      type: "array",
      group: "images",
      of: [defineArrayMember({
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({ name: "alt", title: "Image description for accessibility", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "caption", title: "Caption", type: "string" }),
        ],
      })],
    }),
    defineField({
      name: "seoPreview",
      title: "Search result preview",
      type: "string",
      group: "seo",
      readOnly: true,
      components: { input: SeoPreview },
    }),
  ],
  preview: {
    select: { title: "title", location: "location", category: "category", town: "mapTownOrCity", mapped: "showOnProjectMap", media: "featuredImage", projectDescription: "projectDescription", clientBrief: "clientBrief", existingConditions: "existingConditions", designResponse: "designResponse", planningStrategy: "planningStrategy", technicalDesign: "technicalDesign", materialsAndDetailing: "materialsAndDetailing", sustainabilityApproach: "sustainabilityApproach", projectOutcome: "projectOutcome", lessonsAndInsights: "lessonsAndInsights", keyChallenges: "keyChallenges", projectHighlights: "projectHighlights", designDrawings: "designDrawings", projectStages: "projectStages", clientTestimonial: "clientTestimonial" },
    prepare(selection) {
      const { title, location, category, town, mapped, media } = selection;
      const place = mapped && town ? town : location;
      return { title, subtitle: [caseStudyCompletenessLabel(selection), mapped ? "Mapped" : null, place, category].filter(Boolean).join(" · "), media };
    },
  },
  orderings: [
    { title: "Recently updated", name: "updatedDesc", by: [{ field: "_updatedAt", direction: "desc" }] },
    { title: "Project title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
});
