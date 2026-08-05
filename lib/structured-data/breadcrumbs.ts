import type { BreadcrumbItem, SchemaNode } from "./types";
import { breadcrumbId } from "./utils";

export function buildBreadcrumbSchema(url: string, items: BreadcrumbItem[]): SchemaNode {
  return { "@type": "BreadcrumbList", "@id": breadcrumbId(url), itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })) };
}
