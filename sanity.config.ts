"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy123";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "hepburn-architects",
  title: "Hepburn Architects Website",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) => S.list().title("Content").items([
        S.documentTypeListItem("project").title("Projects"),
        S.documentTypeListItem("mapProject").title("Map Projects"),
        S.documentTypeListItem("article").title("Journal & Guides"),
        S.documentTypeListItem("collaborator").title("Collaborative Team"),
        S.documentTypeListItem("review").title("Reviews"),
      ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
