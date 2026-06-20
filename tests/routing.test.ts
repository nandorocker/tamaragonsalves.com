import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";

test("Astro i18n has a real root index without redirect markup", () => {
  const astroConfig = readFileSync("astro.config.mjs", "utf8");
  const rootIndex = readFileSync("src/pages/index.astro", "utf8");

  expect(astroConfig).toContain("prefixDefaultLocale: true");
  expect(astroConfig).toContain("redirectToDefaultLocale: false");
  expect(rootIndex).toContain("<HomePage lang=\"en\" />");
  expect(rootIndex).not.toContain("Astro.redirect");
  expect(rootIndex).not.toContain("window.location.href");
  expect(rootIndex).not.toContain("http-equiv=\"refresh\"");
});

test("Vercel does not redirect valid /en routes away from generated pages", () => {
  const vercelConfig = readFileSync("vercel.json", "utf8");
  const header = readFileSync("src/components/Header.astro", "utf8");
  const languageSwitcher = readFileSync("src/components/LanguageSwitcher.astro", "utf8");

  expect(existsSync("src/pages/[lang]/index.astro")).toBe(true);
  expect(existsSync("src/pages/[...lang]/index.astro")).toBe(false);
  expect(header).toContain("lang === 'en' ? '/en' : `/${lang}`");
  expect(languageSwitcher).toContain("const href = `/${langCode}${pathWithoutLang}`");
  expect(vercelConfig).not.toContain('"source": "/en/:path*"');
});

test("Contact page exists for both languages", () => {
  expect(existsSync("src/pages/[lang]/contact.astro")).toBe(true);
});
