import type { PublicProjectDirectoryItem } from "@/lib/mapped-projects";
import styles from "./ProjectMapSection.module.css";

export function ProjectLocationDirectory({
  projects,
}: {
  projects: PublicProjectDirectoryItem[];
}) {
  if (projects.length === 0) return null;

  const sortedProjects = [...projects].sort((left, right) =>
    left.townOrCity.localeCompare(right.townOrCity, "en-GB", { sensitivity: "base" }) ||
    left.streetName.localeCompare(right.streetName, "en-GB", { sensitivity: "base" })
  );

  return (
    <section className={styles.directorySection} aria-labelledby="project-location-directory-heading">
      <div className="shell">
        <h2 id="project-location-directory-heading" className={styles.directoryHeading}>
          Projects by location
        </h2>
        <ul className={styles.directoryGrid}>
          {sortedProjects.map((project) => (
            <li key={project.id}>
              <span>{project.streetName}</span>
              <span aria-hidden="true"> · </span>
              <span>{project.townOrCity}</span>
              <span aria-hidden="true"> · </span>
              <span>{project.postcodeDistrict}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
