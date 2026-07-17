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
