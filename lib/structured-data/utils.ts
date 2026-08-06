import { site } from "@/lib/site";
import type { SchemaNode, SchemaValue } from "./types";

export const IDS = {
  organisation: `${site.url}/#organisation`,
  website: `${site.url}/#website`,
  birminghamStudio: `${site.url}/#birmingham-studio`,
  nunthorpeStudio: `${site.url}/#nunthorpe-studio`,
  davidHepburn: `${site.url}/#david-hepburn`,
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${site.url}/`).toString().replace(/\/$/, path === "/" ? "/" : "");
}

function cleanValue(value: SchemaValue | undefined): SchemaValue | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (Array.isArray(value)) return value.map(cleanValue).filter((item): item is SchemaValue => item !== undefined);
  if (typeof value === "object") return cleanSchema(value as SchemaNode);
  if (typeof value === "string") return value.replace(`${site.url}/#organization`, IDS.organisation);
  return value;
}

export function cleanSchema<T extends SchemaNode>(node: T): T {
  return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, cleanValue(value)]).filter(([, value]) => value !== undefined)) as T;
}

export function buildGraph(...nodes: Array<SchemaNode | undefined | false>) {
  const flattened = nodes.filter((node): node is SchemaNode => Boolean(node)).flatMap((node) => {
    const nested = node["@graph"];
    return Array.isArray(nested) ? nested.filter((item): item is SchemaNode => typeof item === "object" && item !== null && !Array.isArray(item)) : [node];
  }).map((node) => {
    const entity = { ...cleanSchema(node) };
    delete entity["@context"];
    return entity;
  });
  const canonical = flattened.find((node) => ["WebPage", "AboutPage", "ContactPage", "CollectionPage"].includes(String(node["@type"])))?.url
    || flattened.find((node) => typeof node.url === "string")?.url
    || flattened.find((node) => typeof node.mainEntityOfPage === "string")?.mainEntityOfPage;
  let graph = flattened.map((node) => {
    if (node["@id"] || typeof canonical !== "string") return node;
    const type = String(node["@type"]);
    const suffix = type === "BreadcrumbList" ? "breadcrumb" : type === "FAQPage" ? "faq" : type === "Service" ? "service" : type === "Article" || type === "BlogPosting" ? "article" : type.includes("Page") ? "webpage" : undefined;
    return suffix ? { ...node, "@id": `${canonical}#${suffix}` } : node;
  });
  if (typeof canonical === "string") {
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const mainEntity = graph.find((node) => ["Service", "Article", "BlogPosting", "CreativeWork", "WebApplication"].includes(String(node["@type"])));
    const pageIndex = graph.findIndex((node) => ["WebPage", "AboutPage", "ContactPage", "CollectionPage"].includes(String(node["@type"])));
    if (pageIndex < 0) graph = [{ "@type": "WebPage", "@id": pageId(canonical), url: canonical, isPartOf: { "@id": IDS.website }, about: { "@id": IDS.organisation }, breadcrumb: breadcrumb?.["@id"] ? { "@id": breadcrumb["@id"] } : undefined, mainEntity: mainEntity?.["@id"] ? { "@id": mainEntity["@id"] } : undefined, inLanguage: "en-GB" }, ...graph];
    else if (breadcrumb?.["@id"] && !graph[pageIndex].breadcrumb) graph[pageIndex] = { ...graph[pageIndex], breadcrumb: { "@id": breadcrumb["@id"] } };
  }
  if (process.env.NODE_ENV !== "production") {
    const ids = graph.map((node) => node["@id"]).filter(Boolean);
    const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    if (duplicates.length) console.warn(`[structured-data] Duplicate @id values: ${duplicates.join(", ")}`);
  }
  return { "@context": "https://schema.org" as const, "@graph": graph };
}

export function pageId(url: string) { return `${url}#webpage`; }
export function breadcrumbId(url: string) { return `${url}#breadcrumb`; }
export function serviceId(url: string) { return `${url}#service`; }
export function faqId(url: string) { return `${url}#faq`; }
