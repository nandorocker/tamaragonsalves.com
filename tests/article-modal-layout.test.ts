import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("article preview close button overlaps the popup corner, not the title", () => {
  const styles = readFileSync("src/components/ArticleModal.astro", "utf8");

  expect(styles).toContain("top: -0.875rem");
  expect(styles).toContain("right: -0.875rem");
});

test("article preview modal is centered in the viewport", () => {
  const styles = readFileSync("src/components/ArticleModal.astro", "utf8");

  expect(styles).toContain(".article-modal[open]");
  expect(styles).toContain("display: flex");
  expect(styles).toContain("align-items: center");
  expect(styles).toContain("justify-content: center");
});

test("modal content is column flex with viewport-aware max height", () => {
  const styles = readFileSync("src/components/ArticleModal.astro", "utf8");

  expect(styles).toContain("flex-direction: column");
  expect(styles).toContain("max-height: calc(100dvh - 2rem)");
});

test("modal body scrolls independently on mobile", () => {
  const styles = readFileSync("src/components/ArticleModal.astro", "utf8");

  expect(styles).toContain("min-height: 0");
  expect(styles).toContain("overflow-y: auto");
  expect(styles).toContain("padding-bottom: 4.5rem");
});

test("article dialog resets native positioning so it fills the viewport", () => {
  const styles = readFileSync("src/components/ArticleModal.astro", "utf8");

  expect(styles).toContain("margin: 0");
  expect(styles).toContain("box-sizing: border-box");
  expect(styles).toContain("overflow: hidden");
});

test("modal body receives focus instead of the close button on open", () => {
  const markup = readFileSync("src/components/ArticleModal.astro", "utf8");

  expect(markup).toContain('data-modal-body tabindex="-1"');
  expect(markup).toContain("body.focus({ preventScroll: true })");
  expect(markup).toContain(".modal-body:focus");
  expect(markup).toContain("outline: none");
});

test("article preview stacks vertically on mobile", () => {
  const markup = readFileSync("src/components/ArticleModal.astro", "utf8");

  expect(markup).toContain("flex-col md:flex-row");
  expect(markup).toContain("md:ml-[calc(6rem+1rem)]");
  expect(markup).not.toContain("flex-col sm:flex-row");
  expect(markup).not.toContain("sm:ml-[calc(6rem+1rem)]");
});

test("article modal arrows are pulled closer at intermediate breakpoints", () => {
  const styles = readFileSync("src/components/ArticleModal.astro", "utf8");

  expect(styles).toContain("@media (min-width: 641px) and (max-width: 1023px)");
  expect(styles).toContain("left: -1.5rem");
  expect(styles).toContain("right: -1.5rem");
  expect(styles).toContain("max-width: calc(100vw - 5rem)");
});
