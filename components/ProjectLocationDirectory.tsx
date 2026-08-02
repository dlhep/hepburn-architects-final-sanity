import type { PublicProjectDirectoryItem } from "@/lib/mapped-projects";
import styles from "./ProjectMapSection.module.css";

function locationHeadingId(value: string) {
  const slug = value
    .toLocaleLowerCase("en-GB")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `project-location-${slug || "area"}`;
}

export function ProjectLocationDirectory({
  projects,
}: {
  projects: PublicProjectDirectoryItem[];
}) {
  if (projects.length === 0) return null;

  const sortedProjects = [...projects].sort((left, right) =>
    left.townOrCity.localeCompare(right.townOrCity, "en-GB", { sensitivity: "base" }) ||
    left.projectType.localeCompare(right.projectType, "en-GB", { sensitivity: "base" }) ||
    left.streetName.localeCompare(right.streetName, "en-GB", { sensitivity: "base" })
  );

  const groupedProjects = sortedProjects.reduce(
    (groups, project) => {
      const location = project.townOrCity.trim();
      const locationProjects = groups.get(location) ?? [];
      locationProjects.push(project);
      groups.set(location, locationProjects);
      return groups;
    },
    new Map<string, PublicProjectDirectoryItem[]>()
  );

  return (
    <section className={styles.directorySection} aria-labelledby="project-location-directory-heading">
      <div className="shell">
        <h2 id="project-location-directory-heading" className={styles.directoryHeading}>
          Projects by location
        </h2>
        <div className={styles.directoryGroups}>
          {[...groupedProjects.entries()].map(([location, locationProjects]) => {
            const headingId = locationHeadingId(location);

            return (
              <section className={styles.directoryGroup} aria-labelledby={headingId} key={location}>
                <h3 id={headingId}>{location} projects</h3>
                <ul className={styles.directoryList}>
                  {locationProjects.map((project) => (
                    <li key={project.id}>
                      <span className={styles.directoryProjectType}>{project.projectType}</span>
                      <span aria-hidden="true"> · </span>
                      <span className={styles.directoryStreet}>{project.streetName}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{project.postcodeDistrict}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
