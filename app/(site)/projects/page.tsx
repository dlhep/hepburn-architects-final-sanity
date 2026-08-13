import type { Metadata } from "next";
import Image from "next/image";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { ProjectMapSection } from "@/components/ProjectMapSection";
import { ProjectLocationDirectory } from "@/components/ProjectLocationDirectory";
import { getProjects } from "@/lib/projects";
import { getMappedProjects } from "@/lib/mapped-projects.server";
import { toPublicProjectDirectoryItem } from "@/lib/mapped-projects";
import { projectImageUrl } from "@/lib/projects";
import { StructuredData } from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildGraph, buildItemListSchema, breadcrumbId } from "@/lib/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Architecture Projects in Birmingham & the West Midlands",
  description: "Explore residential architecture projects across Birmingham and the West Midlands, including house extensions, loft conversions, HMOs, new homes and planning work.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, mappedProjects] = await Promise.all([getProjects(), getMappedProjects()]);
  const projectDirectory = mappedProjects.map(toPublicProjectDirectoryItem);
  const url = `${site.url}/projects`;
  return (
    <>
      <StructuredData data={buildGraph(buildCollectionPageSchema({ url, name: "Projects", description: metadata.description as string, breadcrumb: breadcrumbId(url) }), buildBreadcrumbSchema(url, [{ name: "Home", url: `${site.url}/` }, { name: "Projects", url }]), buildItemListSchema(url, "Published projects", projects.map((project) => ({ name: project.title, url: `${url}/${project.slug}`, image: projectImageUrl(project.featuredImage, 1200) }))))} />
      <section className="projects-index-page">
        <div className="projects-index-hero">
          <Image
            className="projects-index-hero-background"
            src="/images/homepage-hero-farmhouse-photoreal.png"
            alt="Contemporary extension to a traditional farmhouse by Hepburn Architects"
            fill
            priority
            sizes="100vw"
          />
          <div className="projects-index-hero-shade" aria-hidden="true" />
          <div className="shell projects-index-hero-grid primary-index-hero-copy">
            <div className="projects-index-intro">
              <small className="eyebrow">Selected residential work</small>
              <h1>Residential Architecture Projects Across Birmingham and the West Midlands</h1>
              <p>Explore extensions, sustainable new homes and whole-house transformations developed by Hepburn Architects.</p>
            </div>
            <span className="projects-index-hero-caption">Contemporary farmhouse extension · Residential architecture</span>
          </div>
        </div>
        <div className="shell projects-index-list"><ProjectsFilter projects={projects} /></div>
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
