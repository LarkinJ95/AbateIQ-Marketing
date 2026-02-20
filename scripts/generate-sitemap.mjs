import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://abateiq.com";
const postsDir = path.join(root, "public", "content", "posts");
const pagesDir = path.join(root, "public", "content", "pages");
const outPath = path.join(root, "public", "sitemap.xml");
const postsIndexPath = path.join(postsDir, "index.json");
const pagesIndexPath = path.join(pagesDir, "index.json");

const staticPaths = [
  "/",
  "/features",
  "/pricing",
  "/resources",
  "/resources/blog",
  "/resources/guides",
  "/resources/templates",
  "/resources/brand/press-kit",
  "/company",
  "/login",
  "/asbestos-survey-software",
  "/air-monitoring-software",
  "/industrial-hygiene-software",
  "/nea-reporting-software",
  "/environmental-compliance-software",
  "/osha-compliance-software",
  "/ih-data-management-platform",
];

const postPaths = [];
const postFiles = [];
if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".json"));
  for (const file of files) {
    if (file === "index.json") {
      continue;
    }
    const fullPath = path.join(postsDir, file);
    try {
      const parsed = JSON.parse(fs.readFileSync(fullPath, "utf8"));
      if (typeof parsed.slug === "string" && parsed.slug.startsWith("/")) {
        postPaths.push(parsed.slug);
        postFiles.push(file);
      }
    } catch {
      // Ignore malformed post files and continue.
    }
  }
}

const pageFiles = [];
if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir).filter((file) => file.endsWith(".json"));
  for (const file of files) {
    if (file === "index.json") {
      continue;
    }
    pageFiles.push(file);
  }
}

const urls = Array.from(new Set([...staticPaths, ...postPaths]));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((pathname) => `  <url><loc>${baseUrl}${pathname}</loc></url>`)
  .join("\n")}\n</urlset>\n`;

fs.writeFileSync(outPath, xml);
fs.writeFileSync(postsIndexPath, `${JSON.stringify({ files: postFiles.sort() }, null, 2)}\n`);
fs.writeFileSync(pagesIndexPath, `${JSON.stringify({ files: pageFiles.sort() }, null, 2)}\n`);
console.log(`Generated sitemap with ${urls.length} urls -> ${outPath}`);
