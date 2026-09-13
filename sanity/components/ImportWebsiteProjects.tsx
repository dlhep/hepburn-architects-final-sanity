"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { definePlugin, useClient } from "sanity";
import { RefreshShropshireProject } from "./RefreshShropshireProject";
import { importWebsiteProjects, websiteProjectImportBatches, type WebsiteProjectImportBatch } from "../lib/import-website-projects";

function ProjectImportBatch({ batch }: { batch: WebsiteProjectImportBatch }) {
  const client = useClient({ apiVersion: "2026-02-01" });
  const [state, setState] = useState<"checking" | "ready" | "importing" | "complete" | "error">("checking");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    client.getDocument(batch.id).then((marker) => {
      if (active) setState(marker ? "complete" : "ready");
    }).catch(() => {
      if (active) { setState("error"); setMessage("Could not check the import status. Please refresh and try again."); }
    });
    return () => { active = false; };
  }, [client, batch.id]);

  async function runImport() {
    setState("importing");
    setMessage("Checking existing projects…");
    try {
      await importWebsiteProjects(client, setMessage, batch);
      setState("complete");
      setMessage("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "The import could not finish. Please try again.");
    }
  }

  return (
    <section style={{ padding: "28px 0", borderBottom: "1px solid #8885" }}>
      
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>{batch.title}</h2>
      <p style={{ lineHeight: 1.6 }}>Move the {batch.projects.length === 1 ? "project" : `${batch.projects.length} projects`} below into Sanity with their current images, descriptions, categories and status labels. Once imported, you can edit and publish them under Projects.</p>
      <p style={{ lineHeight: 1.6 }}>This publishes the prepared content already shown on the website. Existing Sanity projects and edits are preserved.</p>
      <div aria-live="polite" style={{ margin: "24px 0" }}>
        {state === "complete" ? (
          <div>
            <strong>Import complete. Your projects are editable in Sanity.</strong>
            <p>Open Structure → Projects. Published updates normally appear after the website cache refreshes, usually within a few minutes.</p>
            <Link href="/studio/structure">Open Projects in Sanity</Link>
          </div>
        ) : (
          <button type="button" disabled={state === "checking" || state === "importing"} onClick={runImport} style={{ padding: "14px 20px", font: "inherit", borderRadius: 6, border: "1px solid currentColor", cursor: state === "checking" || state === "importing" ? "wait" : "pointer" }}>
            {state === "checking" ? "Checking import status…" : state === "importing" ? "Importing…" : `Import and publish ${batch.projects.length === 1 ? "project" : `${batch.projects.length} projects`}`}
          </button>
        )}
        {message && <p role={state === "error" ? "alert" : "status"} style={{ lineHeight: 1.6 }}>{message}</p>}
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead><tr><th style={{ padding: "12px 0" }} scope="col">Project</th><th scope="col">Category</th></tr></thead>
        <tbody>{batch.projects.map((project) => (
          <tr key={project._id} style={{ borderTop: "1px solid #8885" }}>
            <td style={{ padding: "12px 0" }}>{project.title}</td><td>{project.category}</td>
          </tr>
        ))}</tbody>
      </table>
    </section>
  );
}

export function ImportWebsiteProjects() {
  return (
    <main style={{ padding: "40px 24px", maxWidth: 900, margin: "0 auto", fontFamily: "inherit" }}>
      <p style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Midlands website</p>
      <h1 style={{ fontSize: 30 }}>Import website projects</h1>
      <RefreshShropshireProject />
      {websiteProjectImportBatches.map((batch) => <ProjectImportBatch key={batch.id} batch={batch} />)}
    </main>
  );
}

export const websiteProjectImportTool = definePlugin({
  name: "website-project-import",
  tools: [{ name: "import-projects", title: "Import website projects", component: ImportWebsiteProjects }],
});
