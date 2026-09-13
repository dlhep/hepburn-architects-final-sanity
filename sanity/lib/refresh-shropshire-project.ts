import type { useClient } from "sanity";
import refresh from "../../data/shropshire-project-refresh.json";

export const shropshireRefreshId = refresh.migrationId;

export async function refreshShropshireProject(client: ReturnType<typeof useClient>, onProgress: (message: string) => void) {
  const config = client.config();
  if (config.projectId !== "5xwjrn3e" || config.dataset !== "production") {
    throw new Error("This update is only available in the Midlands Studio.");
  }
  if (await client.getDocument(refresh.migrationId)) return;

  const documents = await client.fetch<Array<{ _id: string; _type: string; _rev: string; _updatedAt: string }>>(
    '*[_id in $ids]{_id, _type, _rev, _updatedAt}',
    { ids: [refresh.documentId, `drafts.${refresh.documentId}`] },
    { perspective: "raw" },
  );
  const current = documents.find((document) => document._id === refresh.documentId);
  if (!current || current._type !== "project") throw new Error("The original Shropshire project could not be found.");
  if (documents.some((document) => document._id.startsWith("drafts.")) || current._updatedAt !== refresh.baselineUpdatedAt) {
    throw new Error("This project has newer edits or an unpublished draft. The update has stopped to preserve your work.");
  }

  const gallery: Array<{ _type: "image"; _key: string; asset: { _type: "reference"; _ref: string }; alt: string; caption: string }> = [];
  for (const [index, image] of refresh.fields.gallery.entries()) {
    onProgress(`Uploading replacement image ${index + 1} of ${refresh.fields.gallery.length}…`);
    const response = await fetch(image.url);
    if (!response.ok) throw new Error("A replacement image could not be loaded. Please try again.");
    const asset = await client.assets.upload("image", await response.blob(), {
      filename: image.url.split("/").pop(), title: image.caption, contentType: "image/webp",
    });
    gallery.push({
      _type: "image", _key: `shropshire-refreshed-${index}`,
      asset: { _type: "reference", _ref: asset._id }, alt: image.alt, caption: image.caption,
    });
  }
  const { _key: galleryKey, ...featuredImage } = gallery[1];
  void galleryKey;
  onProgress("Publishing the updated Shropshire project…");
  await client.transaction()
    .patch(refresh.documentId, (patch) => patch.ifRevisionId(current._rev).set({ ...refresh.fields, featuredImage, gallery }))
    .create({ _id: refresh.migrationId, _type: "contentMigration", completedAt: new Date().toISOString() })
    .commit({ visibility: "sync" });
}
