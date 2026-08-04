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
  seoTitle,
  seoDescription,
  projectDescription,
  localAuthority,
  applicationType,
  contractValue,
  completion,
  projectStatus,
  propertyType,
  projectYear,
  floorArea,
  planningReference,
  constructionRoute,
  services,
  clientBrief,
  existingConditions,
  designResponse,
  planningStrategy,
  technicalDesign,
  materialsAndDetailing,
  sustainabilityApproach,
  projectOutcome,
  lessonsAndInsights,
  keyChallenges[]{challenge, response, result},
  projectHighlights[]{label, value},
  clientTestimonial{quote, clientName, clientDescriptor, reviewSource, reviewUrl},
  beforeAfterIntro,
  beforeImages[]{alt, caption, hotspot, crop, asset->{_id, url, metadata{dimensions}}},
  afterImages[]{alt, caption, hotspot, crop, asset->{_id, url, metadata{dimensions}}},
  designDrawings[]{alt, caption, drawingType, hotspot, crop, asset->{_id, url, metadata{dimensions}}},
  projectTeam[]{role, organisation, website},
  projectStages[]{stage, title, description, status},
  relatedServices,
  relatedLocations,
  relatedGuides,
  relatedProjects,
  featured,
  featuredCaseStudy,
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
  *[_type == "project" && defined(slug.current)] | order(featuredCaseStudy desc, featured desc, _updatedAt desc) {
    ${PROJECT_FIELDS}
  }
`);

export const BIRMINGHAM_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current) &&
    defined(featuredImage.asset) &&
    defined(projectType) &&
    defined(description) &&
    (
      lower(location) match "*birmingham*" ||
      lower(location) match "*harborne*" ||
      lower(location) match "*edgbaston*" ||
      lower(location) match "*moseley*" ||
      lower(location) match "*kings heath*" ||
      lower(location) match "*bournville*" ||
      lower(location) match "*selly oak*" ||
      lower(location) match "*sutton coldfield*" ||
      lower(location) match "*handsworth wood*" ||
      lower(location) match "*hall green*" ||
      lower(location) match "*yardley*" ||
      lower(location) match "*erdington*"
    )
  ] | order(featuredCaseStudy desc, featured desc, _updatedAt desc)[0...3] {
    ${PROJECT_FIELDS}
  }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && featured == true && featuredCaseStudy != true] | order(_updatedAt desc)[0...3] {
    ${PROJECT_FIELDS}
  }
`);

export const FEATURED_CASE_STUDY_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && featuredCaseStudy == true]
  | order(_updatedAt desc)[0] {
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

// Server-only preparation removes full postcodes and normalises both source types before hydration.
export const MAPPED_PROJECT_SOURCES_QUERY = defineQuery(`{
  "fullProjects": *[
    _type == "project" &&
    showOnProjectMap == true &&
    defined(slug.current) &&
    defined(mapLatitude) &&
    defined(mapLongitude)
  ] | order(featuredCaseStudy desc, featured desc, _updatedAt desc) {
    _id, title, "slug": slug.current, category, projectType, description,
    featuredImage { alt, hotspot, crop, asset->{_id, url, metadata{dimensions}} },
    mapStreetName, mapPostcode, mapTownOrCity, mapLatitude, mapLongitude
  },
  "mapProjects": *[
    _type == "mapProject" &&
    showOnMap == true &&
    defined(mapLatitude) &&
    defined(mapLongitude)
  ] | order(_updatedAt desc) {
    _id, projectName, projectType, shortDescription,
    image { alt, hotspot, crop, asset->{_id, url, metadata{dimensions}} },
    streetName, postcode, townOrCity, mapLatitude, mapLongitude,
    "linkedProjectId": linkedProject._ref,
    "linkedProjectSlug": linkedProject->slug.current
  }
}
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

export const GUIDES_QUERY = defineQuery(`
  *[_type == "article" && contentType == "guide" && defined(slug.current)]
  | order(featured desc, publishedAt desc) {
    ${ARTICLE_FIELDS}
  }
`);

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "article" && contentType == "blog" && defined(slug.current)]
  | order(featured desc, publishedAt desc) {
    ${ARTICLE_FIELDS}
  }
`);

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "article" && contentType == $contentType && slug.current == $slug][0] {
    ${ARTICLE_FIELDS}
  }
`);

export const COLLABORATORS_QUERY = defineQuery(`
  *[_type == "collaborator" && active != false]
  | order(coalesce(displayOrder, 999) asc, name asc) {
    _id,
    name,
    role,
    roleCategory,
    relationshipLabel,
    company,
    bio,
    qualifications,
    website,
    linkedin,
    email,
    displayOrder,
    photo {
      alt,
      hotspot,
      crop,
      asset->{_id, url, metadata{dimensions}}
    }
  }
`);
