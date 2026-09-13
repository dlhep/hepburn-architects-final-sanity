"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useClient } from "sanity";
import { refreshCornwallGallery, cornwallGalleryRefreshId } from "../lib/refresh-cornwall-gallery";

export function RefreshCornwallGallery() {
  const client = useClient({ apiVersion: "2026-02-01" });
  const [state, setState] = useState<"checking" | "ready" | "updating" | "complete" | "error">("checking");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    client.getDocument(cornwallGalleryRefreshId).then((marker) => {
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
      await refreshCornwallGallery(client, setMessage);
      setState("complete");
      setMessage("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "The update could not finish. Please try again.");
    }
  }

  return (
    <section style={{ padding: "28px 0", borderBottom: "1px solid #8885" }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>New Build Apartments Cornwall</h2>
      <p style={{ lineHeight: 1.6 }}>Save the marketing interior and the new Hepburn-style architectural sketch to this project’s gallery in Sanity. Both images are already shown on the website.</p>
      <p style={{ lineHeight: 1.6 }}>The existing exterior images and project details are preserved. Newer edits or unpublished drafts will stop the update for review.</p>
      <div aria-live="polite" style={{ margin: "24px 0" }}>
        {state === "complete" ? (
          <div><strong>Update complete. The refreshed project is editable in Sanity.</strong><p><Link href="/studio/structure">Open Projects in Sanity</Link></p></div>
        ) : (
          <button type="button" disabled={state === "checking" || state === "updating"} onClick={runUpdate} style={{ padding: "14px 20px", font: "inherit", borderRadius: 6, border: "1px solid currentColor", cursor: "pointer" }}>
            {state === "checking" ? "Checking update status…" : state === "updating" ? "Updating…" : "Update Cornwall gallery"}
          </button>
        )}
        {message && <p role={state === "error" ? "alert" : "status"} style={{ lineHeight: 1.6 }}>{message}</p>}
      </div>
    </section>
  );
}
