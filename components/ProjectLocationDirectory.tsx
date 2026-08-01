import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PublicProjectDirectoryItem } from "@/lib/mapped-projects";
import styles from "./ProjectMapSection.module.css";

function normaliseForComparison(value: string) {
  return value.toLocaleLowerCase("en-GB").replace(/[^a-z0-9]+/g, " ").trim();
}

function displayTitle(project: PublicProjectDirectoryItem) {
  const title = normaliseForComparison(project.title);
  const locationParts = project.townOrCity
    .split(",")
    .map(normaliseForComparison)
    .filter((part) => part.length >= 4);

  return locationParts.some((part) => title.includes(part))
    ? project.title
    : `${project.title} in ${project.townOrCity}`;
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
    left.title.localeCompare(right.title, "en-GB", { sensitivity: "base" })
  );

  return (
    <section className={styles.directorySection} aria-labelledby="project-location-directory-heading">
      <div className="shell">
        <header className={styles.directoryIntro}>
          <small className="eyebrow">Residential architecture by area</small>
          <h2 id="project-location-directory-heading">
            Residential projects across Birmingham and the wider Midlands
          </h2>
          <p>
            Explore house extensions, loft conversions, HMOs, new homes and planning projects
            completed by Hepburn Architects across Birmingham, Solihull, Worcestershire,
            Warwickshire, the wider West Midlands and Teesside.
          </p>
        </header>

        <div className={styles.directoryGrid}>
          {sortedProjects.map((project) => (
            <article className={styles.directoryCard} key={project.id}>
              <small>{project.projectType}</small>
              <h3>{displayTitle(project)}</h3>
              <p className={styles.directoryLocation}>{project.townOrCity}</p>
              {project.description && <p>{project.description}</p>}
              {project.projectUrl && (
                <Link href={project.projectUrl}>
                  View project <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
