import { createClient } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/sanity/env";

export const client = createClient({
  projectId: sanityProjectId || "dummy123",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  // Next.js controls article caching and revalidation; read directly so newly
  // published journal entries are immediately available on their first request.
  useCdn: false,
});
