import { defineField, defineType } from "sanity";

const projectTypes = ["House extension", "Loft conversion", "New-build home", "HMO conversion", "Change of use", "Planning application", "Building Regulations", "Residential development", "Commercial project", "Children’s home", "Other"];
const sources = ["Google", "Facebook", "Houzz", "Email", "Written testimonial", "Client feedback form", "LinkedIn", "Other"];
const placements = ["General", "Homepage", "House Extensions", "Planning Applications", "Building Regulations", "New-Build Homes", "Loft Conversions", "HMO Conversions", "Change of Use", "Birmingham", "Solihull", "Other"];
const onlineSources = ["Google", "Facebook", "Houzz", "LinkedIn"];

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
    defineField({ name: "publicAttribution", title: "Public attribution", type: "string", group: "review", description: "Use this instead of a name where appropriate, for example Homeowner, Harborne.", validation: (rule) => rule.custom((value, context) => (context.document?.published && !value && !context.document?.clientName && !context.document?.clientDescriptor ? "Add a safe public attribution before publication." : true)).warning() }),
    defineField({ name: "reviewDate", title: "Review date", type: "date", group: "review" }),
    defineField({ name: "rating", title: "Rating", type: "number", group: "review", validation: (rule) => rule.integer().min(1).max(5), description: "Optional genuine rating only." }),
    defineField({ name: "projectType", title: "Project type", type: "string", group: "context", options: { list: projectTypes.map((title) => ({ title, value: title })), layout: "dropdown" } }),
    defineField({ name: "location", title: "Broad public location", type: "string", group: "context", description: "Do not enter a private street address or full postcode." }),
    defineField({ name: "services", title: "Services", type: "array", group: "context", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "relatedProject", title: "Related project", type: "reference", group: "context", to: [{ type: "project" }] }),
    defineField({ name: "relatedService", title: "Related service slug", type: "string", group: "context", description: "For example house-extensions or planning-applications." }),
    defineField({ name: "relatedLocation", title: "Related location slug", type: "string", group: "context" }),
    defineField({ name: "source", title: "Original source", type: "string", group: "source", options: { list: sources.map((title) => ({ title, value: title })), layout: "dropdown" } }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url", group: "source", validation: (rule) => rule.uri({ scheme: ["http", "https"], allowRelative: false }).custom((value, context) => (onlineSources.includes(String(context.document?.source || "")) && !value ? "Add the original URL for an online review." : true)).warning(), description: "Required for online reviews where available." }),
    defineField({ name: "verified", title: "Wording verified", type: "boolean", group: "source", initialValue: false, description: "Confirm the wording and attribution against the original source. Unverified reviews never appear publicly.", validation: (rule) => rule.custom((value, context) => (context.document?.published && value !== true ? "Published is selected, but this review cannot appear until verification is confirmed." : true)).warning() }),
    defineField({ name: "permissionToPublish", title: "Permission to publish confirmed", type: "boolean", group: "source", initialValue: false, description: "Confirm permission or the documented lawful basis for republication. Approval is required for every source, including public platforms.", validation: (rule) => rule.custom((value, context) => (context.document?.published && value !== true ? "Published is selected, but this review cannot appear until permission is confirmed." : true)).warning() }),
    defineField({ name: "internalSourceNote", title: "Internal source note", type: "text", rows: 4, group: "source", description: "Internal only. Never displayed on the website." }),
    defineField({ name: "published", title: "Published", type: "boolean", group: "display", initialValue: false }),
    defineField({ name: "featured", title: "Featured on reviews page", type: "boolean", group: "display", initialValue: false }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", group: "display", validation: (rule) => rule.integer().min(0).max(999) }),
    defineField({ name: "showOnHomepage", title: "Show on homepage", type: "boolean", group: "display", initialValue: false }),
    defineField({ name: "showOnReviewsPage", title: "Show on reviews page", type: "boolean", group: "display", initialValue: true }),
    defineField({ name: "showOnServicePages", title: "Show on service pages", type: "boolean", group: "display", description: "Optional. Enable this review for one relevant commercial service page." }),
    defineField({ name: "showOnLocationPages", title: "Show on location pages", type: "boolean", group: "display", description: "Optional. Enable only where the broad location is genuinely relevant." }),
    defineField({ name: "featuredPlacement", title: "Featured placement", type: "string", group: "display", options: { list: placements.map((title) => ({ title, value: title })), layout: "dropdown" }, description: "Optional manual placement. This takes priority over automatic service or location matching." }),
  ],
  preview: {
    select: { title: "publicAttribution", clientName: "clientName", descriptor: "clientDescriptor", projectType: "projectType", location: "location", source: "source", sourceUrl: "sourceUrl", rating: "rating", verified: "verified", permission: "permissionToPublish", published: "published", placement: "featuredPlacement" },
    prepare({ title, clientName, descriptor, projectType, location, source, sourceUrl, rating, verified, permission, published, placement }) {
      const attribution = title || clientName || descriptor || "⚠ No public attribution";
      const safe = verified && permission;
      const publication = published ? (safe ? "Published" : "⚠ Published but blocked") : "Draft";
      const sourceWarning = source && onlineSources.includes(source) && !sourceUrl ? "⚠ Source URL missing" : undefined;
      return { title: attribution, subtitle: [projectType, location, source, rating ? `${rating}/5` : undefined, placement, sourceWarning, verified ? "Verified" : "⚠ Unverified", permission ? "Approved" : "⚠ No permission", publication].filter(Boolean).join(" · ") };
    },
  },
});
