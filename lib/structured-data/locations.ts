import type { Area, SchemaNode } from "./types";

export function buildPlaceSchema(url: string, name: string, containedIn?: Area): SchemaNode {
  return { "@type": "Place", "@id": `${url}#place`, name, containedInPlace: containedIn ? { "@type": containedIn.type || "AdministrativeArea", name: containedIn.name } : undefined };
}
