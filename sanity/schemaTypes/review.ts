import { defineField, defineType } from "sanity";

const projectTypes = ["House extension", "Loft conversion", "New-build home", "HMO conversion", "Change of use", "Planning application", "Building Regulations", "Residential development", "Commercial project", "Children’s home", "Other"];
const sources = ["Google", "Facebook", "Houzz", "Email", "Written testimonial", "Client feedback form", "LinkedIn", "Other"];

export const reviewType = defineType({
  name: "review",
  title: "Client review",
  type: "document",
  groups: [
    { name: "review", title: "Review", default: true },
    { name: "context", title: "Project context" },
    { name: "source", title: "Source and verification" },
    { name: "display", title: "Display settings" },
  ],
  fields: [
    defineField({ name: "quote", title: "Genuine review", type: "text", rows: 6, group: "review", validation: (rule) => rule.required().max(1200), description: "Enter the genuine client review exactly as supplied or a verified approved extract." }),
    defineField({ name: "shortQuote", title: "Short approved extract", type: "text", rows: 3, group: "review", validation: (rule) => rule.max(260), description: "Optional approved shorter extract. Do not rewrite the original review automatically." }),
    defineField({ name: "clientName", title: "Client name", type: "string", group: "review" }),
    defineField({ name: "clientDescriptor", title: "Client descriptor", type: "string", group: "review", description: "For example Homeowner, Property investor or Developer." }),
    defineField({ name: "publicAttribution", title: "Public attribution", type: "string", group: "review", description: "Use this instead of a name where appropriate, for example Homeowner, Harborne." }),
    defineField({ name: "reviewDate", title: "Review date", type: "date", group: "review" }),
    defineField({ name: "rating", title: "Rating", type: "number", group: "review", validation: (rule) => rule.integer().min(1).max(5), description: "Optional genuine rating only." }),
    defineField({ name: "projectType", title: "Project type", type: "string", group: "context", options: { list: projectTypes.map((title) => ({ title, value: title })), layout: "dropdown" } }),
    defineField({ name: "location", title: "Broad public location", type: "string", group: "context", description: "Do not enter a private street address or full postcode." }),
    defineField({ name: "services", title: "Services", type: "array", group: "context", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "relatedProject", title: "Related project", type: "reference", group: "context", to: [{ type: "project" }] }),
    defineField({ name: "relatedService", title: "Related service slug", type: "string", group: "context", description: "For example house-extensions or planning-applications." }),
    defineField({ name: "relatedLocation", title: "Related location slug", type: "string", group: "context" }),
    defineField({ name: "source", title: "Original source", type: "string", group: "source", options: { list: sources.map((title) => ({ title, value: title })), layout: "dropdown" } }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url", group: "source", validation: (rule) => rule.uri({ scheme: ["http", "https"], allowRelative: false }), description: "Required for online reviews where available." }),
    defineField({ name: "verified", title: "Wording verified", type: "boolean", group: "source", initialValue: false, description: "Confirm the wording and attribution against the original source." }),
    defineField({ name: "permissionToPublish", title: "Permission to publish confirmed", type: "boolean", group: "source", initialValue: false, description: "Confirm permission or the documented lawful basis for republication." }),
    defineField({ name: "internalSourceNote", title: "Internal source note", type: "text", rows: 4, group: "source", description: "Internal only. Never displayed on the website." }),
    defineField({ name: "published", title: "Published", type: "boolean", group: "display", initialValue: false }),
    defineField({ name: "featured", title: "Featured on reviews page", type: "boolean", group: "display", initialValue: false }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", group: "display", validation: (rule) => rule.integer().min(0).max(999) }),
    defineField({ name: "showOnHomepage", title: "Show on homepage", type: "boolean", group: "display", initialValue: false }),
    defineField({ name: "showOnReviewsPage", title: "Show on reviews page", type: "boolean", group: "display", initialValue: true }),
  ],
  preview: {
    select: { title: "publicAttribution", clientName: "clientName", projectType: "projectType", location: "location", source: "source", sourceUrl: "sourceUrl", rating: "rating", verified: "verified", permission: "permissionToPublish" },
    prepare({ title, clientName, projectType, location, source, sourceUrl, rating, verified, permission }) {
      const attribution = title || clientName || "No public attribution";
      const status = verified && permission ? "Ready" : "Needs verification/permission";
      const sourceWarning = source && ["Google", "Facebook", "Houzz", "LinkedIn"].includes(source) && !sourceUrl ? "Source URL missing" : undefined;
      return { title: attribution, subtitle: [projectType, location, source, rating ? `${rating}/5` : undefined, sourceWarning, status].filter(Boolean).join(" · ") };
    },
  },
});
