"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useClient } from "sanity";
import { refreshShropshireProject, shropshireRefreshId } from "../lib/refresh-shropshire-project";

export function RefreshShropshireProject() {
  const client = useClient({ apiVersion: "2026-02-01" });
  const [state, setState] = useState<"checking" | "ready" | "updating" | "complete" | "error">("checking");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    client.getDocument(shropshireRefreshId).then((marker) => {
      if (active) setState(marker ? "complete" : "ready");
    }).catch(() => {
      if (active) { setState("error"); setMessage("Could not check the update status. Please refresh and try again."); }
    });
    return () => { active = false; };
  }, [client]);

  async function runUpdate() {
    setState("updating");
    setMessage("Checking the original project…");
    try {
      await refreshShropshireProject(client, setMessage);
      setState("complete");
      setMessage("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "The update could not finish. Please try again.");
    }
  }

  return (
    <section style={{ padding: "28px 0", borderBottom: "1px solid #8885" }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>Contemporary Renovation Shropshire</h2>
      <p style={{ lineHeight: 1.6 }}>Save the two refreshed visualisations, fuller project description and updated search information to the existing Sanity project. These changes are already shown on the website.</p>
      <p style={{ lineHeight: 1.6 }}>The project keeps its current address, recorded details and homepage placement. Newer edits or unpublished drafts will stop the update for review.</p>
      <div aria-live="polite" style={{ margin: "24px 0" }}>
        {state === "complete" ? (
          <div><strong>Update complete. The refreshed project is editable in Sanity.</strong><p><Link href="/studio/structure">Open Projects in Sanity</Link></p></div>
        ) : (
          <button type="button" disabled={state === "checking" || state === "updating"} onClick={runUpdate} style={{ padding: "14px 20px", font: "inherit", borderRadius: 6, border: "1px solid currentColor", cursor: "pointer" }}>
            {state === "checking" ? "Checking update status…" : state === "updating" ? "Updating…" : "Update Shropshire project"}
          </button>
        )}
        {message && <p role={state === "error" ? "alert" : "status"} style={{ lineHeight: 1.6 }}>{message}</p>}
      </div>
    </section>
  );
}
