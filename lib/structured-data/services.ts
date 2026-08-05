import type { Area, SchemaNode } from "./types";
import { absoluteUrl, IDS, serviceId } from "./utils";
import type { StudioKey } from "./business-locations";
import { studioId } from "./business-locations";

export function buildServiceSchema(input: { url: string; name: string; description: string; serviceType?: string; areas?: Area[]; studio?: StudioKey; image?: string }): SchemaNode {
  return { "@type": "Service", "@id": serviceId(input.url), name: input.name, description: input.description, serviceType: input.serviceType || input.name, url: input.url, provider: { "@id": input.studio ? studioId(input.studio) : IDS.organisation }, areaServed: input.areas?.map((area) => ({ "@type": area.type || "Place", name: area.name })), image: input.image ? absoluteUrl(input.image) : undefined };
}

export function buildItemListSchema(url: string, name: string, items: Array<{ name: string; url: string; image?: string }>): SchemaNode {
  return { "@type": "ItemList", "@id": `${url}#item-list`, name, numberOfItems: items.length, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: item.url, image: item.image })) };
}
