"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { websiteProjectImportTool } from "./sanity/components/ImportWebsiteProjects";
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
        S.listItem().id("fee-settings").title("Fee Settings").child(S.document().schemaType("feeSettings").documentId("feeSettings").initialValueTemplate("feeSettings")),
        S.documentTypeListItem("project").title("Projects"),
        S.documentTypeListItem("mapProject").title("Map Projects"),
        S.documentTypeListItem("article").title("Journal & Guides"),
        S.documentTypeListItem("collaborator").title("Collaborative Team"),
        S.documentTypeListItem("review").title("Reviews"),
      ]),
    }),
    visionTool(),
    websiteProjectImportTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: options => options.filter(option => option.templateId !== "feeSettings"),
    actions: (actions, context) => context.schemaType === "feeSettings"
      ? actions.filter(action => ["publish", "discardChanges", "restore"].includes(action.action ?? ""))
      : actions,
  },
});

