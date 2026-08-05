import type { SchemaNode } from "./types";
import { IDS, pageId } from "./utils";

export function buildArticleSchema(input: { url: string; headline: string; description?: string; image?: string; datePublished?: string; dateModified?: string; section?: string; keywords?: string[]; journal?: boolean }): SchemaNode {
  return { "@type": input.journal ? "BlogPosting" : "Article", "@id": `${input.url}#article`, headline: input.headline, description: input.description, image: input.image, author: { "@id": IDS.davidHepburn }, publisher: { "@id": IDS.organisation }, datePublished: input.datePublished, dateModified: input.dateModified, mainEntityOfPage: { "@id": pageId(input.url) }, url: input.url, articleSection: input.section, keywords: input.keywords };
}
