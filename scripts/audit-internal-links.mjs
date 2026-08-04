import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appRoot = path.join(root, "app");
const sourceFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith("api") && entry.name !== "studio") walk(full);
    else if (entry.isFile() && /\.(tsx|ts|jsx|js|mjs)$/.test(entry.name)) sourceFiles.push(full);
  }
}
walk(appRoot);
walk(path.join(root, "components"));

const routeFiles = [];
function routeWalk(directory, segments = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) routeWalk(full, [...segments, entry.name]);
    else if (entry.name === "page.tsx" || entry.name === "page.jsx") {
      const routeSegments = segments.filter((segment) => !/^\([^)]*\)$/.test(segment) && !segment.startsWith("[[..."));
      routeFiles.push(`/${routeSegments.map((segment) => segment.startsWith("[") ? `:${segment.replace(/^\[+|\]+$/g, "").replace(/^\.\.\.?/, "")}` : segment).join("/")}`.replace(/\/$/, "") || "/");
    }
  }
}
routeWalk(appRoot);
const routes = new Set(routeFiles);
const dynamicRoutes = [...routes].filter((route) => route.includes(":"));
const files = sourceFiles.map((file) => ({ file, text: fs.readFileSync(file, "utf8") }));
const links = [];
for (const { file, text } of files) {
  const regex = /(?:href|url)\s*=\s*["'`]([^"'`]+)["'`]/g;
  for (const match of text.matchAll(regex)) {
    const href = match[1];
    if (href.startsWith("/")) links.push({ file, href });
  }
}

const isKnown = (href) => {
  const clean = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (clean.startsWith("/downloads/") && fs.existsSync(path.join(root, "public", clean.slice(1)))) return true;
  if (routes.has(clean)) return true;
  return dynamicRoutes.some((route) => {
    const pattern = new RegExp(`^${route.replace(/:[^/]+/g, "[^/]+")}/?$`);
    return pattern.test(clean);
  });
};
const broken = links.filter(({ href }) => !isKnown(href));
const obsolete = files.flatMap(({ file, text }) => [...text.matchAll(/https?:\/\/[^\s"'`)]+/g)].filter(([url]) => /localhost|\.net\b|hepburnarchitects\.com/i.test(url)).map(([url]) => ({ file, url })));
const countsByFile = new Map();
for (const { file, href } of links) {
  const key = `${file}:${href}`;
  countsByFile.set(key, (countsByFile.get(key) || 0) + 1);
}
const repeated = [...countsByFile.entries()].filter(([, count]) => count > 3).map(([key, count]) => `${count}× ${key}`);
const inbound = new Map([...routes].map((route) => [route, 0]));
for (const { href } of links) {
  const clean = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  for (const route of routes) {
    const matches = route === clean || (route.includes(":") && new RegExp(`^${route.replace(/:[^/]+/g, "[^/]+")}/?$`).test(clean));
    if (matches) inbound.set(route, (inbound.get(route) || 0) + 1);
  }
}
const orphanCandidates = [...inbound.entries()].filter(([route, count]) => count === 0 && !route.includes(":") && !["/_not-found", "/admin", "/studio", "/house-extension-guide/thank-you", "/locations/solihull-architects"].includes(route));

console.log(`Internal link audit: ${routes.size} route patterns, ${links.length} static internal references`);
console.log(`Broken relative links: ${broken.length}`);
for (const item of broken.slice(0, 40)) console.log(`  BROKEN ${item.href} (${path.relative(root, item.file)})`);
console.log(`Likely orphan static routes: ${orphanCandidates.length}`);
for (const [route] of orphanCandidates) console.log(`  ORPHAN ${route}`);
console.log(`Repeated template destinations (>3 in one file): ${repeated.length}`);
for (const item of repeated.slice(0, 30)) console.log(`  REPEAT ${item}`);
console.log(`Obsolete/local domain references: ${obsolete.length}`);
for (const item of obsolete.slice(0, 30)) console.log(`  CHECK ${item.url} (${path.relative(root, item.file)})`);
