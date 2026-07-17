import type { Metadata } from "next";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Residential Architecture Projects | Extensions, New Homes & Conversions",
  description: "Explore genuine Hepburn Architects projects including house extensions, barn conversions, Passivhaus homes, new-build houses and whole-home remodelling.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section className="section">
      <div className="shell page-intro">
        <small className="eyebrow">Selected residential work</small>
        <h1>Genuine projects designed around place and purpose.</h1>
        <p>Explore extensions, sustainable new homes and whole-house transformations developed by Hepburn Architects.</p>
      </div>
      <div className="shell"><ProjectsFilter projects={projects} /></div>
    </section>
  );
}
