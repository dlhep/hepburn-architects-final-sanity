import type { Project } from "./projects";

export const projectFilters = [
  "All", "Extensions", "Loft Conversions", "New homes", "Conversions", "Technical design",
  "C2 Projects", "Residential Development", "Change of Use",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export function matchesProjectFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter === "All") return true;
  const identity = [project.category, project.projectType, project.title].filter(Boolean).join(" ").toLowerCase();
  const text = [identity, project.description, ...(project.services || [])].filter(Boolean).join(" ").toLowerCase();
  switch (filter) {
    case "Extensions": return /extension|remodell|alteration/.test(text);
    case "Loft Conversions": return /\bloft\b|\bdormer\b/.test(identity);
    case "New homes": return /new.?build|new home|replacement dwelling/.test(text);
    case "Conversions": return /conversion|loft|hmo|change of use/.test(text);
    case "Technical design": return /technical|building regulation|planning|survey|design/.test(text);
    case "C2 Projects": return /\bc2\b|care home|dementia care|children[’']?s home/.test(identity);
    case "Residential Development": return /residential development|housing development|housing scheme|residential masterplan|\bdevelopments\b|new.?build apartments/.test(identity);
    case "Change of Use": return /change of use|class\s+e\s+to\s+c3|commercial.to.residential|office.to.residential|class\s+ma/.test(identity);
  }
}
