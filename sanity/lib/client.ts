import { createClient } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/sanity/env";

export const client = createClient({
  projectId: sanityProjectId || "dummy123",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
});
