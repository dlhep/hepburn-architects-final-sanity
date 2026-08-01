import type { Metadata } from "next";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { ProjectMapSection } from "@/components/ProjectMapSection";
import { getProjects } from "@/lib/projects";
import { getMappedProjects } from "@/lib/mapped-projects.server";

export const metadata: Metadata = {
  title: "Residential Architecture Projects",
  description: "Explore genuine Hepburn Architects projects including house extensions, barn conversions, Passivhaus homes, new-build houses and whole-home remodelling.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, mappedProjects] = await Promise.all([getProjects(), getMappedProjects()]);
  return (
    <>
      <section className="section projects-index-page">
        <div className="shell page-intro projects-index-intro">
          <small className="eyebrow">Selected residential work</small>
          <h1>Genuine projects designed around place and purpose.</h1>
          <p>Explore extensions, sustainable new homes and whole-house transformations developed by Hepburn Architects.</p>
        </div>
        <div className="shell"><ProjectsFilter projects={projects} /></div>
      </section>
      <ProjectMapSection
        projects={mappedProjects}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
      />
    </>
  );
}
