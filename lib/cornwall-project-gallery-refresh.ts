import refresh from "../data/cornwall-project-gallery-refresh.json";
import type { Project } from "./projects";

// Let subsequent Sanity edits take over from this temporary website bridge.
export function applyCornwallGalleryRefresh(project: Project): Project {
  if (project._id !== refresh.documentId || project._updatedAt !== refresh.baselineUpdatedAt) return project;
  return { ...project, showFullImage: true, gallery: [...refresh.images, ...(project.gallery ?? [])] };
}
