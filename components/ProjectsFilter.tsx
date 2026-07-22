"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { projectImageAlt, projectImageUrl } from "@/lib/projects";

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);
  const [filter, setFilter] = useState("All");
  const visible = useMemo(
    () => filter === "All" ? projects : projects.filter((project) => project.category === filter),
    [filter, projects]
  );

  return (
    <>
      <div className="project-filters" role="group" aria-label="Filter projects by type">
        {categories.map((item) => (
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
        {visible.map((project) => (
          <Link href={`/projects/${project.slug}`} className="project-card" key={project.slug} style={{ alignSelf: "start" }}>
            <Image
              src={projectImageUrl(project.featuredImage, 1200)}
              alt={projectImageAlt(project)}
              width={1200}
              height={800}
              sizes="(max-width: 650px) 100vw, 50vw"
            />
            <div>
              <small>{project.location} · {project.projectType}</small>
              <h2>{project.title}</h2>
              <p style={{ display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {project.description}
              </p>
              <span>View case study <ArrowUpRight size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
