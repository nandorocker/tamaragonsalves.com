import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const articleCard = readFileSync(resolve(import.meta.dir, "../src/components/ArticleCard.astro"), "utf8");
const downloadModal = readFileSync(resolve(import.meta.dir, "../src/components/DownloadModal.astro"), "utf8");

describe("download client guards", () => {
  test("article card only auto-downloads PDF responses", () => {
    expect(articleCard).toContain("response.headers.get('content-type')");
    expect(articleCard).toContain("includes('application/pdf')");
  });

  test("modal direct download only auto-downloads PDF responses", () => {
    expect(downloadModal).toContain("fileResponse.headers.get('content-type')");
    expect(downloadModal).toContain("includes('application/pdf')");
  });
});
