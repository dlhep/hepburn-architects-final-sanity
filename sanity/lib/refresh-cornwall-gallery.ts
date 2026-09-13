import type { useClient } from "sanity";
import refresh from "../../data/cornwall-project-gallery-refresh.json";

export const cornwallGalleryRefreshId = refresh.migrationId;
type GalleryImage = { _type: string; _key: string; asset: { _type: string; _ref: string }; alt?: string; caption?: string };

export async function refreshCornwallGallery(client: ReturnType<typeof useClient>, onProgress: (message: string) => void) {
  const config = client.config();
  if (config.projectId !== "5xwjrn3e" || config.dataset !== "production") {
    throw new Error("This update is only available in the Midlands Studio.");
  }
  if (await client.getDocument(refresh.migrationId)) return;
  const documents = await client.fetch<Array<{ _id: string; _type: string; _rev: string; _updatedAt: string; gallery?: GalleryImage[] }>>(
    '*[_id in $ids]{_id, _type, _rev, _updatedAt, gallery}',
    { ids: [refresh.documentId, `drafts.${refresh.documentId}`] },
    { perspective: "raw" },
  );
  const current = documents.find((document) => document._id === refresh.documentId);
  if (!current || current._type !== "project") throw new Error("The original Cornwall project could not be found.");
  if (documents.some((document) => document._id.startsWith("drafts.")) || current._updatedAt !== refresh.baselineUpdatedAt) {
    throw new Error("This project has newer edits or an unpublished draft. The update has stopped to preserve your work.");
  }
  const additions: GalleryImage[] = [];
  for (const [index, image] of refresh.images.entries()) {
    onProgress(`Uploading gallery image ${index + 1} of ${refresh.images.length}…`);
    const response = await fetch(image.url);
    if (!response.ok) throw new Error("A gallery image could not be loaded. Please try again.");
    const asset = await client.assets.upload("image", await response.blob(), {
      filename: image.url.split("/").pop(), title: image.caption, contentType: "image/webp",
    });
    additions.push({
      _type: "image", _key: `cornwall-gallery-refresh-${index}`,
      asset: { _type: "reference", _ref: asset._id }, alt: image.alt, caption: image.caption,
    });
  }
  onProgress("Publishing the updated Cornwall gallery…");
  await client.transaction()
    .patch(refresh.documentId, (patch) => patch.ifRevisionId(current._rev).set({ showFullImage: true, gallery: [...additions, ...(current.gallery ?? [])] }))
    .create({ _id: refresh.migrationId, _type: "contentMigration", completedAt: new Date().toISOString() })
    .commit({ visibility: "sync" });
}
