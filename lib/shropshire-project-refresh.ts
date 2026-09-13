import refresh from "../data/shropshire-project-refresh.json";
import type { Project } from "./projects";

// Bridge the prepared website refresh to the authenticated Studio update.
// Any subsequent CMS edit takes precedence, including changes made before import.
export function applyShropshireProjectRefresh(project: Project): Project {
  if (project._id !== refresh.documentId || project._updatedAt !== refresh.baselineUpdatedAt) return project;
  return { ...project, ...refresh.fields } as Project;
}
