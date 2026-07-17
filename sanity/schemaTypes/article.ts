import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Guides & Blog Posts",
  type: "document",
  groups: [
    { name: "content", title: "Article", default: true },
    { name: "media", title: "Images" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "contentType",
      title: "Content type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Guide", value: "guide" },
          { title: "Blog post", value: "blog" },
        ],
        layout: "radio",
      },
      initialValue: "blog",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "Page address",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      type: "text",
      rows: 4,
      group: "content",
      description: "Used on listing pages and as the default meta description.",
      validation: (rule) => rule.required().min(80).max(220),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          "Planning",
          "Extensions",
          "Loft Conversions",
          "Building Regulations",
          "New Homes",
          "Conversions",
          "HMOs",
          "Property Development",
          "Practice News",
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "content",
      initialValue: "David Hepburn",
    }),
    defineField({
      name: "featured",
      title: "Feature this article",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Article content",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
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
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "blank",
                    title: "Open in a new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Image description",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description: "Leave blank to use the article title.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Leave blank to use the short summary.",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "contentType",
      category: "category",
      media: "featuredImage",
    },
    prepare({ title, type, category, media }) {
      return {
        title,
        subtitle: `${type === "blog" ? "Blog" : "Guide"}${category ? ` · ${category}` : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
