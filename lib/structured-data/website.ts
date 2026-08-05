import { site } from "@/lib/site";
import type { SchemaNode } from "./types";
import { absoluteUrl, IDS, pageId } from "./utils";

export function buildWebSiteSchema(): SchemaNode { return { "@type": "WebSite", "@id": IDS.website, url: `${site.url}/`, name: site.name, publisher: { "@id": IDS.organisation }, inLanguage: "en-GB" }; }

export function buildWebPageSchema(input: { url: string; name: string; description?: string; type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage"; breadcrumb?: string; primaryImage?: string; mainEntity?: string }): SchemaNode {
  return { "@type": input.type || "WebPage", "@id": pageId(input.url), url: input.url, name: input.name, description: input.description, isPartOf: { "@id": IDS.website }, about: { "@id": IDS.organisation }, breadcrumb: input.breadcrumb ? { "@id": input.breadcrumb } : undefined, primaryImageOfPage: input.primaryImage ? { "@type": "ImageObject", url: absoluteUrl(input.primaryImage) } : undefined, mainEntity: input.mainEntity ? { "@id": input.mainEntity } : undefined, inLanguage: "en-GB" };
}

export function buildCollectionPageSchema(input: Parameters<typeof buildWebPageSchema>[0]) { return buildWebPageSchema({ ...input, type: "CollectionPage" }); }
