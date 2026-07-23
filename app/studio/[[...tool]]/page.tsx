import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="studio-page studio-setup">
        <div>
          <small>Hepburn Architects CMS</small>
          <h1>Connect the Sanity project.</h1>
          <p>Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> in Vercel, then redeploy.</p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
