// Downloads the largest available version of every work photo from the old
// Jimdo site, strips all metadata (the originals carry GPS EXIF data) and
// writes web-sized copies to /public plus src/content/photos.json.
//
// Usage: node scripts/import-jimdo-images.mjs
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(
  await fs.readFile(path.join(root, "scripts/jimdo-images.json"), "utf8"),
);
const cacheDir = path.join(root, ".cache/jimdo");
const publicDir = path.join(root, "public/arbeiten");
const BASE = "https://image.jimcdn.com/app/cms/image/transf";
const SITE_PATH = "path/s1532c4abd337504b/image";
const MAX_EDGE = 2000;

// "none" returns the untouched upload. Photos the owner rotated in Jimdo only
// exist rotated as a rendition; Jimdo never upscales, so a large box is safe.
function sourceUrl(item) {
  const transf = item.rotate
    ? "dimension=2400x2400:format=jpg:rotate=90"
    : "none";
  return `${BASE}/${transf}/${SITE_PATH}/${item.id}/version/${item.version}/image.${item.ext}`;
}

async function download(item) {
  const file = path.join(cacheDir, `${item.id}${item.rotate ? "-r" : ""}.${item.ext}`);
  try {
    return await fs.readFile(file);
  } catch {
    const res = await fetch(sourceUrl(item));
    if (!res.ok) throw new Error(`${res.status} ${sourceUrl(item)}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(file, buf);
    return buf;
  }
}

function toHex({ r, g, b }) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

await fs.mkdir(cacheDir, { recursive: true });
await fs.rm(publicDir, { recursive: true, force: true });

const photos = [];
for (const item of manifest) {
  const input = await download(item);
  const oriented = await sharp(input, { failOn: "none" }).rotate().toBuffer();
  const out = path.join(publicDir, item.file);
  await fs.mkdir(path.dirname(out), { recursive: true });
  const info = await sharp(oriented)
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out);
  const { dominant } = await sharp(oriented).stats();
  photos.push({
    src: `/arbeiten/${item.file}`,
    alt: item.alt,
    category: item.category,
    width: info.width,
    height: info.height,
    color: toHex(dominant),
  });
  process.stdout.write(".");
}

const og = manifest.find((m) => m.file.startsWith("holzbau/01-"));
await sharp(await download(og), { failOn: "none" })
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, "public/og.jpg"));

await fs.writeFile(
  path.join(root, "src/content/photos.json"),
  JSON.stringify(photos, null, 1) + "\n",
);
console.log(`\n${photos.length} photos written`);
