import { defineArrayMember, defineField, defineType } from "sanity";

const roleCategories = [
  "Architecture & Design",
  "Planning",
  "Engineering",
  "Energy & Sustainability",
  "Environment & Landscape",
  "Interiors & Specialist Design",
  "Other Specialists",
];

export const collaboratorType = defineType({
  name: "collaborator",
  title: "Collaborative Team",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "links", title: "Company and links" },
    { name: "display", title: "Display settings" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "role",
      title: "Professional role",
      type: "string",
      group: "profile",
      description: "For example: Structural Engineer or Planning Consultant.",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "roleCategory",
      title: "Role filter category",
      type: "string",
      group: "profile",
      description:
        "Controls which role filter this person appears under on the Studio page.",
      options: {
        list: roleCategories.map((title) => ({ title, value: title })),
        layout: "dropdown",
      },
      initialValue: "Other Specialists",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relationshipLabel",
      title: "Relationship to Hepburn Architects",
      type: "string",
      group: "profile",
      initialValue: "Independent collaborator",
      options: {
        list: [
          { title: "Independent collaborator", value: "Independent collaborator" },
          { title: "Specialist project partner", value: "Specialist project partner" },
          { title: "Consultant architect", value: "Consultant architect" },
          { title: "Technical collaborator", value: "Technical collaborator" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company or practice",
      type: "string",
      group: "profile",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "bio",
      title: "Profile description",
      type: "text",
      rows: 6,
      group: "profile",
      description:
        "Explain their expertise and how they contribute to relevant projects.",
      validation: (rule) => rule.required().min(20).max(600),
    }),
    defineField({
      name: "qualifications",
      title: "Qualifications and memberships",
      type: "array",
      group: "profile",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "photo",
      title: "Profile photograph",
      type: "image",
      group: "profile",
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
      name: "website",
      title: "Company website",
      type: "url",
      group: "links",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn profile",
      type: "url",
      group: "links",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "email",
      title: "Public contact email",
      type: "email",
      group: "links",
      description:
        "Optional. Leave blank when enquiries should come through Hepburn Architects.",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "display",
      initialValue: 10,
      description: "Lower numbers appear first.",
      validation: (rule) => rule.required().integer().min(0).max(999),
    }),
    defineField({
      name: "active",
      title: "Show on Studio page",
      type: "boolean",
      group: "display",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      role: "role",
      category: "roleCategory",
      company: "company",
      media: "photo",
    },
    prepare({ title, role, category, company, media }) {
      return {
        title,
        subtitle: [role, company, category].filter(Boolean).join(" · "),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Studio page order",
      name: "displayOrderAsc",
      by: [
        { field: "displayOrder", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
    {
      title: "Role category",
      name: "roleCategoryAsc",
      by: [
        { field: "roleCategory", direction: "asc" },
        { field: "displayOrder", direction: "asc" },
      ],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
