/**
 * One-time upload script: uploads publication PDFs from public/files/publications/ to Vercel Blob.
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=... bun run scripts/upload-pdfs-to-blob.ts
 *
 * Requires BLOB_READ_WRITE_TOKEN from Vercel Blob storage settings.
 */

import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { put } from "@vercel/blob";
import articlesData from "../src/data/articles.json";

const PDF_DIR = resolve(import.meta.dir, "../public/files/publications");
const PREFIX = "publications";

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN is not set.");
    process.exit(1);
  }

  const filesOnDisk = new Set(readdirSync(PDF_DIR).filter((f) => f.endsWith(".pdf")));
  const articlesWithFiles = articlesData.filter(
    (a): a is typeof a & { file: string } => typeof a.file === "string"
  );

  let uploaded = 0;
  let skipped = 0;

  for (const article of articlesWithFiles) {
    if (!filesOnDisk.has(article.file)) {
      console.warn(`  SKIP (not found on disk): ${article.file}`);
      skipped++;
      continue;
    }

    const filePath = resolve(PDF_DIR, article.file);
    const blobPath = `${PREFIX}/${article.file}`;
    const data = readFileSync(filePath);

    const blob = await put(blobPath, data, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });

    console.log(`  UPLOADED: ${blob.url}`);
    uploaded++;
  }

  console.log(`\nDone. Uploaded: ${uploaded}, Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
