import type { Metadata } from "next";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { ProjectMapSection } from "@/components/ProjectMapSection";
import { ProjectLocationDirectory } from "@/components/ProjectLocationDirectory";
import { getProjects } from "@/lib/projects";
import { getMappedProjects } from "@/lib/mapped-projects.server";
import { toPublicProjectDirectoryItem } from "@/lib/mapped-projects";
import { RelatedLinks } from "@/components/internal-links/RelatedLinks";
import { getRelatedServices } from "@/lib/internal-links";

export const metadata: Metadata = {
  title: "Residential Architecture Projects in Birmingham & the West Midlands",
  description: "Explore residential architecture projects across Birmingham and the West Midlands, including house extensions, loft conversions, HMOs, new homes and planning work.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, mappedProjects] = await Promise.all([getProjects(), getMappedProjects()]);
  const projectDirectory = mappedProjects.map(toPublicProjectDirectoryItem);
  return (
    <>
      <section className="section projects-index-page">
        <div className="shell page-intro projects-index-intro">
          <small className="eyebrow">Selected residential work</small>
          <h1>Residential Architecture Projects Across Birmingham and the West Midlands</h1>
          <p>Explore extensions, sustainable new homes and whole-house transformations developed by Hepburn Architects.</p>
        </div>
        <div className="shell"><RelatedLinks heading="Explore projects by service" links={getRelatedServices()} group="projects-service-hub" /></div>
        <div className="shell"><ProjectsFilter projects={projects} /></div>
      </section>
      <ProjectMapSection
        projects={mappedProjects}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
      />
      <ProjectLocationDirectory projects={projectDirectory} />
    </>
  );
}
