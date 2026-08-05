import type { SchemaNode } from "./types";
import { IDS, pageId } from "./utils";

export function buildProjectSchema(input: { url: string; name: string; description?: string; images?: string[]; location?: string; keywords?: string[]; dateCreated?: string; dateModified?: string }): SchemaNode {
  return { "@type": "CreativeWork", "@id": `${input.url}#project`, name: input.name, description: input.description, url: input.url, image: input.images, creator: { "@id": IDS.organisation }, locationCreated: input.location ? { "@type": "Place", name: input.location } : undefined, keywords: input.keywords, dateCreated: input.dateCreated, dateModified: input.dateModified, mainEntityOfPage: { "@id": pageId(input.url) } };
}
