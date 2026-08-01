"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { PublicMappedProject } from "@/lib/mapped-projects";
import { trackEvent } from "@/lib/analytics";
import styles from "./ProjectMapSection.module.css";

const GoogleProjectMap = dynamic(
  () => import("./GoogleProjectMap").then((module) => module.GoogleProjectMap),
  { ssr: false, loading: () => <div className={styles.mapLoading}>Preparing the interactive map…</div> }
);

const FILTERS = [
  "All Projects",
  "Extensions",
  "Loft Conversions",
  "Garage Conversions",
  "HMOs",
  "New Builds",
  "Change of Use",
  "Planning Permission",
] as const;

function searchable(project: PublicMappedProject) {
  return [
    project.title,
    project.projectType,
    project.streetName,
    project.postcodeDistrict,
    project.townOrCity,
    project.locationLabel,
  ].filter(Boolean).join(" ").toLocaleLowerCase("en-GB");
}

function matchesFilter(project: PublicMappedProject, filter: string) {
  if (filter === "All Projects") return true;
  const values = project.projectType.toLocaleLowerCase("en-GB");
  const terms: Record<string, string[]> = {
    Extensions: ["extension"],
    "Loft Conversions": ["loft"],
    "Garage Conversions": ["garage conversion"],
    HMOs: ["hmo", "house in multiple occupation"],
    "New Builds": ["new home", "new build"],
    "Change of Use": ["change of use"],
    "Planning Permission": ["planning"],
  };
  return (terms[filter] || []).some((term) => values.includes(term));
}

export function ProjectMapSection({
  projects,
  apiKey,
  mapId,
}: {
  projects: PublicMappedProject[];
  apiKey?: string;
  mapId?: string;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All Projects");
  const [query, setQuery] = useState("");
  const normalisedQuery = query.trim().toLocaleLowerCase("en-GB");

  const filtered = useMemo(
    () => projects.filter((project) =>
      matchesFilter(project, filter) && (!normalisedQuery || searchable(project).includes(normalisedQuery))
    ),
    [filter, normalisedQuery, projects]
  );
  const filterCounts = useMemo(() => Object.fromEntries(
    FILTERS.map((item) => [item, projects.filter((project) => matchesFilter(project, item)).length])
  ), [projects]);

  function reset() {
    setFilter("All Projects");
    setQuery("");
  }

  return (
    <section className={styles.section} aria-labelledby="project-map-heading">
      <div className="shell">
        <header className={styles.intro}>
          <small className="eyebrow">Projects by location</small>
          <h2 id="project-map-heading">Explore Projects Near You</h2>
          <p>Explore a selection of residential architecture projects completed across Birmingham, Solihull, Worcestershire, Warwickshire, the wider West Midlands and Teesside.</p>
          <p>Browse the interactive map or search by area to discover house extensions, loft conversions, HMOs, new homes, change-of-use schemes and planning projects near you.</p>
        </header>

        {projects.length === 0 ? (
          <div className={styles.emptyPanel}>
            <span>Mapped project locations are being prepared.</span>
            <p>Our complete project portfolio remains available above.</p>
          </div>
        ) : (
          <>
            <div className={styles.controls}>
              <div className={styles.filters} role="group" aria-label="Filter mapped projects by type">
                {FILTERS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={filter === item ? styles.activeFilter : undefined}
                    aria-pressed={filter === item}
                    disabled={item !== "All Projects" && filterCounts[item] === 0}
                    onClick={() => {
                      setFilter(item);
                      trackEvent("project_map_filter_selected", { filter: item });
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className={styles.searchRow}>
                <label htmlFor="project-location-search">Search projects by location</label>
                <div className={styles.searchField}>
                  <Search aria-hidden="true" size={19} />
                  <input
                    id="project-location-search"
                    type="search"
                    value={query}
                    placeholder="Search town, city or postcode..."
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") trackEvent("project_location_search_used", { result_count: filtered.length });
                    }}
                  />
                </div>
                {(filter !== "All Projects" || query) && (
                  <button type="button" className={styles.reset} onClick={reset}><X size={16} /> Reset</button>
                )}
              </div>
            </div>

            <p className={styles.resultCount} aria-live="polite" aria-atomic="true">
              Showing {filtered.length} mapped {filtered.length === 1 ? "project" : "projects"}
            </p>

            {filtered.length ? (
              <GoogleProjectMap projects={filtered} apiKey={apiKey} mapId={mapId} />
            ) : (
              <div className={styles.emptyPanel} role="status">
                <span>No mapped projects match this search.</span>
                <p>Try another town, postcode district or project type.</p>
                <button type="button" className="btn secondary" onClick={reset}>Clear filters</button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
