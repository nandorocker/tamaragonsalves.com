import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("book cover links do not create a fixed empty box on large screens", () => {
  const styles = readFileSync("src/styles/global.css", "utf8");

  expect(styles).not.toContain("@apply h-72;");
  expect(styles).not.toContain("@apply h-80;");
});

test("book covers are top aligned inside their normalizing link boxes", () => {
  const styles = readFileSync("src/styles/global.css", "utf8");

  expect(styles).toContain("flex items-start justify-center mb-6");
  expect(styles).not.toContain("flex items-end justify-center mb-6");
});

test("book covers render larger on large screens", () => {
  const styles = readFileSync("src/styles/global.css", "utf8");
  const bookCard = readFileSync("src/components/BookCard.astro", "utf8");

  expect(styles).toContain("lg:max-h-80");
  expect(styles).toContain("lg:max-w-64");
  expect(bookCard).toContain('sizes="(min-width: 1024px) 256px, (min-width: 768px) 160px, 128px"');
});
