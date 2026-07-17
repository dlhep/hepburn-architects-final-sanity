import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: "2026-02-01", useCdn: false });
const file = await fs.readFile(path.join(process.cwd(), "data/projects.json"), "utf8");
const projects = JSON.parse(file);

async function uploadImage(url, title) {
  if (!url || !url.startsWith("http")) return null;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to download ${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const filename = new URL(url).pathname.split("/").pop() || `${title}.jpg`;
  return client.assets.upload("image", buffer, { filename, title });
}

for (const project of projects) {
  console.log(`Importing ${project.title}...`);
  const source = project.featuredImage || project.image;
  const asset = await uploadImage(source, project.title);
  const doc = {
    _id: `project-${project.slug}`,
    _type: "project",
    title: project.title,
    slug: { _type: "slug", current: project.slug },
    location: project.location,
    category: project.category,
    projectType: project.projectType,
    description: project.description,
    localAuthority: project.localAuthority || undefined,
    applicationType: project.applicationType || undefined,
    contractValue: project.contractValue || undefined,
    completion: project.completion || undefined,
    services: project.services || [],
    featured: Boolean(project.featured),
    featuredImage: asset ? {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: project.alt || `${project.title} in ${project.location} by Hepburn Architects`,
    } : undefined,
  };
  await client.createOrReplace(doc);
}
console.log(`Imported ${projects.length} projects into Sanity.`);
