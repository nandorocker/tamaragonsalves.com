# Copilot Instructions — tamaragonsalves.com

## Commands

```bash
bun install        # Install dependencies
bun run build      # Build for production (primary way to verify changes)
bun run preview    # Preview production build
bun run clean      # Remove dist/
```

**Never use `npm` or `pnpm`.** Always use `bun`.

Avoid running the dev server to test. Use `bun run build` instead. If you're having trouble reading terminal output, stop after a few attempts and ask the user to check.

Don't use "Simple Browser".

---

## Architecture

**Astro 6** static site with Vercel adapter, Tailwind CSS, and bilingual (EN/PT) i18n routing.

```
src/
  pages/
    index.astro          # Redirects to /en/
    [lang]/              # All real pages live here (en + pt)
      index.astro
      publications.astro
      services.astro
      speaking.astro
      background.astro
  layouts/
    BaseLayout.astro     # Root layout: head, header, footer, scripts, dark mode
  components/            # Reusable Astro components
  data/                  # Language-agnostic static data (gallery, books, videos, projects)
  i18n/
    en/                  # English UI strings (JSON)
    pt/                  # Portuguese UI strings (JSON)
  utils/
    i18n.ts              # Translation helpers
  styles/
    global.css           # Tailwind base + custom utility classes
public/
  js/                    # Vanilla JS scripts loaded inline by BaseLayout
  images/
  vendor/                # fontawesome, fslightbox
```

### Routing & i18n

- Default locale is `en` with **no URL prefix** (`/` → `/en/` redirect, but `/about` renders English)
- Portuguese pages are at `/pt/...`
- All `[lang]` pages export `getStaticPaths` from `src/utils/i18n.ts`

### Translation Pattern

Pages load translations with `loadAllTranslations(lang, 'pageName')`, then use `getTranslationSync(translations, 'dot.notation.key')`:

```ts
const allTranslations = await loadAllTranslations(currentLang, 'home');
const t = (key: string) => getTranslationSync(allTranslations, key);
// Then in template: {t('heroSection.subtitle')}
```

- **UI strings** → `src/i18n/[lang]/[page].json`  
- **Structured content** (books, gallery, videos, projects) → `src/data/*.json` + `src/i18n/[lang]/*.json` for translated fields

### BaseLayout

Accepts `title`, `description?`, and `pageTheme?: 'yellow' | 'white' | 'soap' | 'violet'`.  
Loads all JS scripts from `public/js/` via `is:inline`. Dark mode is class-based (`dark`), persisted in `localStorage`, applied before first paint to avoid FOUC. Uses Astro `<ClientRouter />` for view transitions.

---

## Key Conventions

### Scroll Animations

Add `data-animate` to elements that should fade in + slide up. Wrap staggered groups in `data-stagger`:

```html
<div data-stagger>
  <h2 data-animate>First</h2>
  <p data-animate>Second (100ms later)</p>
</div>
```

Do **not** animate: navigation, footer, above-the-fold critical content.  
See `ANIMATION_GUIDE.md` for full details.

### Tailwind Custom Tokens

**Colors:** `soap`, `mustard`, `bubblegum`, `flamingo` (each with 50–900 shades)  
**Fonts:** `font-sans` → Alegreya Sans, `font-display` → Sansita  
**Font size base:** `18px` (set on `html`)  
**Viewport heights:** `h-10vh` through `h-100vh` available as utilities  
**Max-width fractions:** `max-w-1/12` through `max-w-11/12`

### CSS Utility Classes (global.css)

Custom component classes defined in `@layer components` include `contain-wide`, `contain-medium`, `contain-narrow`, `section-margins-*`, `bg-gradient-yellow`, `button`, `button-secondary`, `button-outline`, `button-xs`, `button-lg`, `button-xl`. Prefer these over raw Tailwind for layout containers.

### Data Flow

Content data in `src/data/` is language-agnostic (keys, IDs, image paths). Translated labels/titles live in `src/i18n/[lang]/`. Pages merge both via `loadAllTranslations`.

### Adding a New Page

1. Create `src/pages/[lang]/newpage.astro`
2. Export `getStaticPaths` from `src/utils/i18n.ts`
3. Add translation JSON to both `src/i18n/en/` and `src/i18n/pt/`
4. Use `loadAllTranslations(currentLang, 'newpage')` and `getTranslationSync`