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

- No tests exist (`tests/` directory is empty)
- `.env.example` contains API keys for a task-master config (not used by this site)
