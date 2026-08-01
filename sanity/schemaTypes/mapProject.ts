import { defineField, defineType } from "sanity";
import { mapProjectTypeOptions } from "./projectMapCategories";

const likelyHouseNumber = /^\s*\d{1,3}[a-z]?(?:\s*[-/]\s*\d{1,3}[a-z]?)?\s+\S/i;

export const mapProjectType = defineType({
  name: "mapProject",
  title: "Map Project",
  type: "document",
  fields: [
    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      description: "A concise public name, for example Rear Extension or New Build Home.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "streetName",
      title: "Street Name",
      type: "string",
      description: "Street name only. Do not include a house, flat or building number.",
      validation: (rule) => rule.required().custom((value) =>
        value && likelyHouseNumber.test(value)
          ? "Remove the house or building number. Enter the street name only."
          : true
      ),
    }),
    defineField({
      name: "postcode",
      title: "Postcode",
      type: "string",
      description: "Enter the full postcode internally. The public website displays only the outward district.",
      validation: (rule) => rule.required().custom((value) => {
        if (!value) return true;
        return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(value.trim())
          ? true
          : "Enter a valid UK postcode, for example B15 3AA.";
      }),
    }),
    defineField({
      name: "townOrCity",
      title: "Town / City",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: { list: [...mapProjectTypeOptions], layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Optional Short Description",
      type: "text",
      rows: 4,
      description: "A concise public summary for the map popup and project list.",
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "image",
      title: "Optional Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description for accessibility",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "linkedProject",
      title: "Optional Link to Existing Website Project",
      type: "reference",
      to: [{ type: "project" }],
      weak: true,
      description: "Select a full Project only when this map item should link to its existing case-study page.",
    }),
    defineField({
      name: "showOnMap",
      title: "Show on Map",
      type: "boolean",
      description: "Publish this item, then automatic geocoding prepares its approximate public marker. Check the document list for status.",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "mapLatitude", title: "Internal Latitude", type: "number", hidden: () => true, readOnly: true, validation: (rule) => rule.min(-90).max(90) }),
    defineField({ name: "mapLongitude", title: "Internal Longitude", type: "number", hidden: () => true, readOnly: true, validation: (rule) => rule.min(-180).max(180) }),
    defineField({ name: "mapGeocodeFingerprint", title: "Internal Geocode Fingerprint", type: "string", hidden: () => true, readOnly: true }),
    defineField({ name: "mapGeocodedAt", title: "Internal Geocoded At", type: "datetime", hidden: () => true, readOnly: true }),
    defineField({ name: "mapGeocodingStatus", title: "Internal Geocoding Status", type: "string", hidden: () => true, readOnly: true }),
  ],
  preview: {
    select: {
      title: "projectName",
      type: "projectType",
      town: "townOrCity",
      enabled: "showOnMap",
      status: "mapGeocodingStatus",
      latitude: "mapLatitude",
      longitude: "mapLongitude",
      media: "image",
    },
    prepare({ title, type, town, enabled, status, latitude, longitude, media }) {
      const locationReady = typeof latitude === "number" && typeof longitude === "number";
      const mapStatus = !enabled ? "Hidden" : locationReady ? "Map ready" : status?.startsWith("failed") ? "Geocoding failed" : "Awaiting geocoding";
      return { title, subtitle: [mapStatus, town, type].filter(Boolean).join(" · "), media };
    },
  },
  orderings: [
    { title: "Recently updated", name: "updatedDesc", by: [{ field: "_updatedAt", direction: "desc" }] },
    { title: "Project name", name: "nameAsc", by: [{ field: "projectName", direction: "asc" }] },
  ],
});
