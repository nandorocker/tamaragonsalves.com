import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  './images/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true }
);

const images: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(modules)) {
  const key = path.replace('./images/', '');
  images[key] = mod.default;
}

export default images;
