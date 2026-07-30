import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const images = path.join(root, "public", "images");

const jobs = [
  ["homepage-hero.png", "homepage-hero.webp", 1920, 78],
  ["selected-work-1.png", "selected-work-1.webp", 1600, 76],
  ["selected-work-2.png", "selected-work-2.webp", 1600, 76],
  ["selected-work-3.png", "selected-work-3.webp", 1600, 76],
];

await Promise.all(
  jobs.map(async ([source, output, width, quality]) => {
    await sharp(path.join(images, source))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(path.join(images, output));
  }),
);

await sharp(path.join(images, "homepage-hero.png"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(images, "social-sharing.jpg"));
