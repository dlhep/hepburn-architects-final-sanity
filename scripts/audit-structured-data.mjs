import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const buildRoot = path.join(root, ".next", "server", "app");
const sourceRoots = ["app", "components", "lib"].map((item) => path.join(root, item));
const errors = [];
const warnings = [];
let scripts = 0;
let pages = 0;

function filesUnder(directory, predicate) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(target, predicate) : predicate(target) ? [target] : [];
  });
}

function visit(value, callback, pathParts = []) {
  if (Array.isArray(value)) return value.forEach((item, index) => visit(item, callback, [...pathParts, String(index)]));
  if (!value || typeof value !== "object") return;
  callback(value, pathParts);
  for (const [key, child] of Object.entries(value)) visit(child, callback, [...pathParts, key]);
}

function checkGraph(graph, file) {
  const nodes = Array.isArray(graph?.["@graph"]) ? graph["@graph"] : [graph];
  const ids = nodes.map((node) => node?.["@id"]).filter(Boolean);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  duplicateIds.forEach((id) => errors.push(`${file}: duplicate @id ${id}`));
  const orgIds = ids.filter((id) => /#(?:organisation|organization|business|architect|company|localbusiness)$/i.test(id));
  const unexpectedOrgIds = orgIds.filter((id) => id !== "https://hepburnarchitects.co.uk/#organisation");
  unexpectedOrgIds.forEach((id) => errors.push(`${file}: inconsistent organisation identity ${id}`));

  visit(graph, (node, parts) => {
    for (const [key, value] of Object.entries(node)) {
      if (typeof value !== "string") continue;
      const propertyPath = [...parts, key].join(".");
      const urlProperty = key === "@id" || ["url", "item", "image", "logo", "mainEntityOfPage", "contentUrl", "thumbnailUrl"].includes(key);
      if (urlProperty && /^(?!https:\/\/|mailto:|tel:|#)/.test(value)) errors.push(`${file}: relative/non-HTTPS schema URL at ${propertyPath}: ${value}`);
      if (urlProperty && /localhost|127\.0\.0\.1/i.test(value)) errors.push(`${file}: localhost URL at ${propertyPath}`);
      if (urlProperty && /hepburnarchitects\.net/i.test(value)) errors.push(`${file}: old .net URL at ${propertyPath}`);
      const isImageUrl = /(?:image|logo|thumbnail|associatedMedia|primaryImageOfPage)/i.test(propertyPath);
      if (!isImageUrl && (key === "@id" || ["url", "item", "mainEntityOfPage"].includes(key)) && /https:\/\/(?:www\.)?hepburnarchitects\.com/i.test(value)) errors.push(`${file}: unintended .com canonical/entity URL at ${propertyPath}`);
      if (urlProperty && /https:\/\/www\.hepburnarchitects\.co\.uk/i.test(value)) errors.push(`${file}: unintended www hostname at ${propertyPath}`);
      if (/\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i.test(value) && !["B1 3NJ", "TS7 0PD"].includes(value.toUpperCase())) warnings.push(`${file}: review possible private postcode at ${propertyPath}`);
      if (value === "") errors.push(`${file}: empty string at ${propertyPath}`);
    }
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    if (types.includes("AggregateRating")) errors.push(`${file}: AggregateRating is prohibited by site policy`);
    if (types.includes("Review")) warnings.push(`${file}: Review entity requires manual policy review`);
    if (types.includes("Product") || types.includes("Offer") || types.includes("OfferCatalog")) errors.push(`${file}: Product/Offer markup is prohibited unless explicitly re-approved for visible content`);
    if (types.includes("LocalBusiness") && !["https://hepburnarchitects.co.uk/#birmingham-studio", "https://hepburnarchitects.co.uk/#nunthorpe-studio"].includes(node["@id"])) errors.push(`${file}: fabricated or unidentified LocalBusiness entity`);
  });

  const pageNode = nodes.find((node) => ["WebPage", "AboutPage", "ContactPage", "CollectionPage"].includes(node?.["@type"]));
  if (!pageNode?.["@id"]?.endsWith("#webpage")) errors.push(`${file}: missing canonical #webpage entity`);
  const breadcrumb = nodes.find((node) => node?.["@type"] === "BreadcrumbList");
  if (breadcrumb && pageNode?.breadcrumb?.["@id"] !== breadcrumb["@id"]) errors.push(`${file}: WebPage breadcrumb reference is missing or inconsistent`);
}

if (fs.existsSync(buildRoot)) {
  for (const file of filesUnder(buildRoot, (name) => name.endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    const matches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    if (!matches.length) continue;
    pages += 1;
    if (matches.length > 1) errors.push(`${path.relative(root, file)}: ${matches.length} JSON-LD scripts; expected one coherent graph`);
    for (const match of matches) {
      scripts += 1;
      try { checkGraph(JSON.parse(match[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&")), path.relative(root, file)); }
      catch (error) { errors.push(`${path.relative(root, file)}: invalid JSON-LD (${error.message})`); }
    }
  }
} else {
  warnings.push("No .next build found; generated HTML checks were skipped. Run npm run build first.");
}

const directScripts = sourceRoots.flatMap((directory) => filesUnder(directory, (name) => /\.(ts|tsx)$/.test(name))).filter((file) => file !== path.join(root, "components", "StructuredData.tsx") && fs.readFileSync(file, "utf8").includes("application/ld+json"));
directScripts.forEach((file) => errors.push(`${path.relative(root, file)}: bypasses the central StructuredData renderer`));

for (const warning of [...new Set(warnings)]) console.warn(`WARN ${warning}`);
for (const error of [...new Set(errors)]) console.error(`ERROR ${error}`);
console.log(`Structured-data audit: ${pages} generated pages, ${scripts} JSON-LD scripts, ${new Set(errors).size} errors, ${new Set(warnings).size} warnings.`);
if (errors.length) process.exit(1);
