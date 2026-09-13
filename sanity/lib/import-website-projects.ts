import type { SanityDocumentStub } from "@sanity/client";
import type { useClient } from "sanity";
import projects from "../../data/birmingham-extension-projects.json";
import { birminghamExtensionImportId } from "../../lib/birmingham-extension-projects";

export const websiteProjectImportId = birminghamExtensionImportId;
export const websiteProjectImportList = projects.map(({ _id, title, category }) => ({ _id, title, category }));

type ImportableProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  featuredImage: string;
  alt?: string;
  isTestExample?: boolean;
  [field: string]: unknown;
};
export type WebsiteProjectImportBatch = { id: string; title: string; projects: ImportableProject[] };
export const websiteProjectImportBatches: WebsiteProjectImportBatch[] = [
  { id: websiteProjectImportId, title: "Three small Birmingham rear extensions", projects },
];

type ExistingProject = {
  _id: string;
  _type: string;
  slug?: string;
  websiteRegion?: string;
  featuredImage?: { asset?: { _ref?: string } };
  isTestExample?: boolean;
};

export async function importWebsiteProjects(client: ReturnType<typeof useClient>, onProgress: (message: string) => void, batch: WebsiteProjectImportBatch = websiteProjectImportBatches[0]) {
  const { projects, id: importId } = batch;
  const config = client.config();
  if (config.projectId !== "5xwjrn3e" || config.dataset !== "production") {
    throw new Error("This import is only available in the Midlands Studio.");
  }
  if (await client.getDocument(importId)) return;
  const existing = await client.fetch<ExistingProject[]>(
    '*[_id in $ids || _id in $draftIds || (_type == "project" && slug.current in $slugs)]{_id, _type, "slug": slug.current, websiteRegion, featuredImage, isTestExample}',
    { ids: projects.map((project) => project._id), draftIds: projects.map((project) => `drafts.${project._id}`), slugs: projects.map((project) => project.slug) },
    { perspective: "raw" },
  );

  const missing = projects.filter((project) => {
    const match = existing.find((doc) => doc._id === project._id);
    const conflictingSlug = existing.some((doc) => doc.slug === project.slug && ![project._id, `drafts.${project._id}`].includes(doc._id));
    const draftOnly = !match && existing.some((doc) => doc._id === `drafts.${project._id}`);
    if (conflictingSlug || draftOnly) throw new Error(`${project.title} conflicts with existing content. Please review it before importing.`);
    if (match && (match._type !== "project" || match.slug !== project.slug || match.websiteRegion !== "Midlands" || !match.featuredImage?.asset?._ref || (project.isTestExample && !match.isTestExample))) {
      throw new Error(`${project.title} already exists with different settings. The import has stopped to preserve your edits.`);
    }
    return !match;
  });

  let transaction = client.transaction();
  for (const [index, project] of missing.entries()) {
    onProgress(`Uploading image ${index + 1} of ${missing.length}: ${project.title}`);
    const response = await fetch(project.featuredImage);
    if (!response.ok) throw new Error(`Could not load the image for ${project.title}. Please try again.`);
    const asset = await client.assets.upload("image", await response.blob(), {
      filename: project.featuredImage.split("/").pop(), title: project.title, contentType: "image/webp",
    });
    const { featuredImage: sourceImage, alt, slug, ...fields } = project;
    void sourceImage;
    const document: SanityDocumentStub = {
      ...fields,
      _type: "project",
      slug: { _type: "slug", current: slug },
      publishedAt: new Date().toISOString(),
      showOnProjectMap: false,
      featuredImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt },
    };
    transaction = transaction.create(document);
  }
  onProgress("Publishing the projects to Sanity…");
  await transaction.create({ _id: importId, _type: "contentMigration", completedAt: new Date().toISOString() }).commit({ visibility: "sync" });
}
