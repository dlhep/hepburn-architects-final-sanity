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

export const projectType = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  groups: [
    { name: "content", title: "Project information", default: true },
    { name: "images", title: "Images" },
    { name: "seo", title: "Automatic SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Project title", type: "string", group: "content", validation: (rule) => rule.required().max(80) }),
    defineField({ name: "slug", title: "Page address", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Project category", type: "string", group: "content", options: { list: categories.map((title) => ({ title, value: title })), layout: "dropdown" }, validation: (rule) => rule.required() }),
    defineField({ name: "projectType", title: "Project type", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Project summary", type: "text", rows: 6, group: "content", description: "This automatically becomes the page meta description.", validation: (rule) => rule.required().min(80).max(600) }),
    defineField({ name: "localAuthority", title: "Local authority", type: "string", group: "content" }),
    defineField({ name: "applicationType", title: "Application type", type: "string", group: "content" }),
    defineField({ name: "contractValue", title: "Indicative contract value", type: "string", group: "content" }),
    defineField({ name: "completion", title: "Completion / status", type: "string", group: "content" }),
    defineField({ name: "services", title: "Architectural services", type: "array", group: "content", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" }, validation: (rule) => rule.min(1) }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", group: "content", initialValue: false }),
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
    select: { title: "title", subtitle: "location", media: "featuredImage" },
  },
  orderings: [
    { title: "Recently updated", name: "updatedDesc", by: [{ field: "_updatedAt", direction: "desc" }] },
    { title: "Project title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
});
