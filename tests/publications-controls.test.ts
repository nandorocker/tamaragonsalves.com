import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("publication controls reinitialize after Astro client-side navigation", () => {
  const bookCard = readFileSync("src/components/BookCard.astro", "utf8");
  const articleCard = readFileSync("src/components/ArticleCard.astro", "utf8");

  expect(bookCard).toContain("astro:page-load");
  expect(articleCard).toContain("astro:page-load");
});
