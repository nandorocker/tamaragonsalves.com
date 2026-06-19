import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("DevPanel is gated on import.meta.env.DEV", () => {
  const source = readFileSync("src/components/DevPanel.astro", "utf8");

  expect(source).toContain("import.meta.env.DEV");
  expect(source).toContain("data-dev-clear-download-gate");
  expect(source).toContain("data-dev-panel");
});

test("publications page includes DevPanel", () => {
  const source = readFileSync("src/pages/[lang]/publications.astro", "utf8");

  expect(source).toContain("import DevPanel from");
  expect(source).toContain("<DevPanel");
});
