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

function publicLocationValidation(value?: string) {
  return value && likelyHouseNumber.test(value)
    ? "Remove the house or building number. Enter the street name only."
    : true;
}

export const projectType = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  groups: [
    { name: "content", title: "Project information", default: true },
    { name: "images", title: "Images" },
    { name: "seo", title: "Search appearance" },
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
    defineField({
      name: "projectDescription",
      title: "Full project description",
      type: "array",
      group: "content",
      description:
        "Add the longer project story, including the client brief, design approach, planning considerations and outcome.",
      of: [
        defineArrayMember({
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
        }),
      ],
    }),
    defineField({ name: "localAuthority", title: "Local authority", type: "string", group: "content" }),
    defineField({ name: "applicationType", title: "Application type", type: "string", group: "content" }),
    defineField({ name: "contractValue", title: "Indicative contract value", type: "string", group: "content" }),
    defineField({ name: "completion", title: "Completion / status", type: "string", group: "content" }),
    defineField({
      name: "showOnProjectMap",
      title: "Show on Project Map",
      type: "boolean",
      group: "content",
      fieldset: "mapLocation",
      description: "Show this project on the Projects-page map and public mapped-project list.",
      initialValue: false,
    }),
    defineField({
      name: "mapStreetName",
      title: "Street Name",
      type: "string",
      group: "content",
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
      group: "content",
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
      group: "content",
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
      group: "content",
      fieldset: "mapLocation",
      description: "Optional, for example West Midlands, Worcestershire, Warwickshire or Teesside.",
      hidden: () => true,
    }),
    defineField({
      name: "mapLabel",
      title: "Map Label",
      type: "string",
      group: "content",
      fieldset: "mapLocation",
      description: "Optional public label, for example Harborne, Birmingham. Never enter an exact address.",
      hidden: () => true,
    }),
    defineField({
      name: "mapLatitude",
      title: "Approximate Latitude",
      type: "number",
      group: "content",
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
      group: "content",
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
      group: "content",
      fieldset: "mapLocation",
      description: "Optional future location-management reference. It does not replace deliberately approximate public coordinates.",
      hidden: () => true,
    }),
    defineField({
      name: "mapLocationNote",
      title: "Coordinate Source or Location Note",
      type: "text",
      rows: 3,
      group: "content",
      fieldset: "mapLocation",
      description: "Optional internal note explaining how the approximate coordinates were chosen. This is never returned to the public website.",
      hidden: () => true,
    }),
    defineField({
      name: "mapGeocodeFingerprint",
      title: "Map Geocode Fingerprint",
      type: "string",
      group: "content",
      description: "Internal value used to avoid geocoding an unchanged location.",
      hidden: () => true,
      readOnly: true,
    }),
    defineField({
      name: "mapGeocodedAt",
      title: "Map Geocoded At",
      type: "datetime",
      group: "content",
      hidden: () => true,
      readOnly: true,
    }),
    defineField({
      name: "mapGeocodingStatus",
      title: "Map Geocoding Status",
      type: "string",
      group: "content",
      hidden: () => true,
      readOnly: true,
    }),
    defineField({ name: "services", title: "Architectural services", type: "array", group: "content", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" }, validation: (rule) => rule.min(1) }),
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
    select: { title: "title", location: "location", category: "category", town: "mapTownOrCity", mapped: "showOnProjectMap", media: "featuredImage" },
    prepare({ title, location, category, town, mapped, media }) {
      const place = mapped && town ? town : location;
      return { title, subtitle: [mapped ? "Mapped" : null, place, category].filter(Boolean).join(" · "), media };
    },
  },
  orderings: [
    { title: "Recently updated", name: "updatedDesc", by: [{ field: "_updatedAt", direction: "desc" }] },
    { title: "Project title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
});
