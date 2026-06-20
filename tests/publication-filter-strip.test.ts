import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("publication filter strip scrolls horizontally on mobile", () => {
  const page = readFileSync("src/pages/[lang]/publications.astro", "utf8");

  expect(page).toContain("publication-filter-strip");
  expect(page).toContain("-mx-5 px-5 md:mx-0 md:px-0");
});

test("article filter buttons keep natural width and do not shrink", () => {
  const page = readFileSync("src/pages/[lang]/publications.astro", "utf8");

  expect(page).toContain("flex-none");
  expect(page).toContain("whitespace-nowrap");
  expect(page).not.toContain("flex-1 sm:flex-none");
});
