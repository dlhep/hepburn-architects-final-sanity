import { defineQuery } from "next-sanity";

const PROJECT_FIELDS = `
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  location,
  category,
  projectType,
  description,
  localAuthority,
  applicationType,
  contractValue,
  completion,
  services,
  featured,
  featuredImage {
    alt,
    caption,
    hotspot,
    crop,
    asset->{_id, url, metadata{dimensions}}
  },
  gallery[]{
    alt,
    caption,
    hotspot,
    crop,
    asset->{_id, url, metadata{dimensions}}
  }
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(featured desc, _updatedAt desc) {
    ${PROJECT_FIELDS}
  }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && featured == true] | order(_updatedAt desc)[0...3] {
    ${PROJECT_FIELDS}
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_FIELDS}
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)][]{"slug": slug.current}
`);

const ARTICLE_FIELDS = `
  _id,
  _updatedAt,
  contentType,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  author,
  featured,
  body,
  seoTitle,
  seoDescription,
  featuredImage {
    alt,
    caption,
    hotspot,
    crop,
    asset->{_id, url, metadata{dimensions}}
  }
`;

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)] | order(featured desc, publishedAt desc) {
    ${ARTICLE_FIELDS}
  }
`);

export const GUIDES_QUERY = defineQuery(`
  *[_type == "article" && contentType == "guide" && defined(slug.current)] | order(featured desc, publishedAt desc) {
    ${ARTICLE_FIELDS}
  }
`);

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "article" && contentType == "blog" && defined(slug.current)] | order(featured desc, publishedAt desc) {
    ${ARTICLE_FIELDS}
  }
`);

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "article" && contentType == $contentType && slug.current == $slug][0] {
    ${ARTICLE_FIELDS}
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)][]{"slug": slug.current, contentType}
`);
