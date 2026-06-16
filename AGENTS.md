# Tamara Gonsalves Website - Agent Instructions

## Commands

```bash
bun install          # Install dependencies (NOT npm/pnpm)
bun run dev         # Start dev server
bun run build       # Build for production
bun run preview     # Preview production build
bun run astro ...   # Run Astro CLI commands
```

## Important Conventions

- **Package manager**: Use `bun`, never `npm` or `pnpm`
- **Testing**: Build first, avoid running dev server during testing

## Astro i18n and Vercel Routing

This site intentionally uses prefixed locale routes for both languages:

- English: `/en/`, `/en/about`, `/en/publications`, `/en/speaking`, `/en/services`
- Portuguese: `/pt/`, `/pt/about`, `/pt/publications`, `/pt/speaking`, `/pt/services`
- Root `/` renders the English home page directly

Required Astro i18n config:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'pt'],
  routing: {
    prefixDefaultLocale: true,
    redirectToDefaultLocale: false
  }
}
```

Do not add a Vercel redirect from `/en/:path*` to `/:path*`. Vercel will redirect real generated English pages to ungenerated paths and cause 404s.

Do not use client-side redirects or meta refresh in `src/pages/index.astro`; static Astro builds expose those as a visible "Redirecting..." page.

`src/pages/index.astro` should render the English home page directly:

```astro
---
import HomePage from './[lang]/index.astro';
---

<HomePage lang="en" />
```

When changing routing, verify with:

```bash
bun test
bun run build
```

Then confirm Vercel output contains:

```bash
.vercel/output/static/index.html
.vercel/output/static/en/about/index.html
.vercel/output/static/en/publications/index.html
.vercel/output/static/en/speaking/index.html
.vercel/output/static/en/services/index.html
.vercel/output/static/pt/about/index.html
.vercel/output/static/pt/publications/index.html
.vercel/output/static/pt/speaking/index.html
.vercel/output/static/pt/services/index.html
```

Also scan for accidental redirect artifacts:

```bash
rg -n 'Redirecting|http-equiv|window\.location|"source": "/en/:path' .vercel/output dist vercel.json
```

Expected: no matches.

## Architecture

- **Framework**: Astro 6 with Tailwind CSS
- **i18n**: English (`src/i18n/en/`) and Portuguese (`src/i18n/pt/`) with locale routing
- **Data**: Static JSON files in `src/data/` and `src/i18n/[lang]/`
- **Deployment**: Vercel adapter (see `astro.config.mjs`)
- **Font Awesome**: Pro version enabled via `tailwind-fontawesome` plugin

## Scroll Animations

This site uses a custom scroll-based entrance animation system (see `ANIMATION_GUIDE.md`):

- Add `data-animate` to elements that should fade in + slide up on scroll
- Wrap staggered elements in a container with `data-stagger`
- Automatically respects `prefers-reduced-motion`

## Tailwind Customizations

- **Colors**: `soap`, `mustard`, `bubblegum`, `flamingo` (with shades)
- **Fonts**: `sans` (Alegreya Sans), `display` (Sansita)
- **Custom sizes**: `10vh`-`100vh` for height/minHeight/maxHeight, `1/12`-`11/12` fractions

## Key Files

- `astro.config.mjs` - Astro config with Vercel adapter and i18n routing
- `tailwind.config.js` - Custom theme colors, fonts, sizes
- `src/layouts/BaseLayout.astro` - Main layout
- `src/pages/[lang]/` - Localized pages (en, pt subdirectories)
- `src/components/` - Reusable Astro components

## Missing Setup

- Minimal routing regression coverage exists in `tests/routing.test.ts`; no broader test suite exists yet
- `.env.example` contains API keys for a task-master config (not used by this site)

## Decorative Photo Pattern

The home page hero photo uses two offset background boxes to create a layered visual effect:

```astro
<div class="relative">
  <!-- Bottom-left origin box (flamingo/red) -->
  <div class="absolute -bottom-8 -left-8 w-[calc(100%+2rem)] h-[calc(100%+2rem)] bg-flamingo-700 rounded-lg"></div>
  <!-- Top-right origin box (navy/indigo) -->
  <div class="absolute -top-8 -right-8 w-[calc(100%+2rem)] h-[calc(100%+2rem)] bg-indigo-900 rounded-lg"></div>
  <!-- Photo container -->
  <div class="relative z-10 overflow-hidden ...">
    <img ... />
  </div>
</div>
```

**How it works:**
- The flamingo box anchors to the **bottom-left** corner of the photo
- The indigo box anchors to the **top-right** corner of the photo
- Each box extends beyond the image by the offset amount (currently 2rem/8 units)
- The "exposed" area is the part outside the photo boundaries

**To adjust exposed area:**
- Change `-bottom-8` and `-left-8` (and their `calc()` values) together to grow/shrink the flamingo box
- Change `-top-8` and `-right-8` (and their `calc()` values) together to grow/shrink the indigo box
- Keep values symmetrical: if you use `-bottom-4`, use `-left-4` and `calc(100%+1rem)`
