"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { projectImageAlt, projectImageUrl } from "@/lib/projects";
import { matchesProjectFilter, projectFilters, type ProjectFilter } from "@/lib/project-filters";

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const visible = useMemo(
    () => projects.filter((project) => matchesProjectFilter(project, filter)),
    [filter, projects]
  );

  return (
    <>
      <div className="project-filters" role="group" aria-label="Filter projects by type">
        {projectFilters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "active" : ""}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="projects-grid expanded-projects genuine-projects" style={{ alignItems: "start" }} aria-live="polite">
        {visible.map((project, index) => (
          <Link href={`/projects/${project.slug}`} className="project-card" key={project.slug} style={{ alignSelf: "start" }}>
            <Image
              src={projectImageUrl(project.featuredImage, 900)}
              alt={projectImageAlt(project)}
              width={900}
              height={project.showFullImage ? 506 : 600}
              style={project.showFullImage ? { height: "auto", aspectRatio: "16 / 9", objectFit: "contain" } : undefined}
              sizes="(max-width: 650px) 100vw, 50vw"
              priority={index < 3}
            />
            <div>
              <small>{project.location} · {project.projectType}{project.isConcept ? ` · ${project.conceptLabel || "Concept study"}` : ""}</small>
              <h2>{project.title}</h2>
              <p style={{ display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {project.description}
              </p>
              <span>View case study <ArrowUpRight size={16} /></span>
            </div>
          </Link>
        ))}
        {visible.length === 0 && <p className="project-empty-state">No projects in this category yet. Choose another filter to explore our work.</p>}
      </div>
    </>
  );
}

