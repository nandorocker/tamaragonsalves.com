// Global data for asset paths and utility functions
// Converted from 11ty's addGlobalData configuration

export const assets = {
  images: "/assets/images",
  js: "/assets/js",
  vendor: "/assets/vendor",
} as const;

// Copyright year function (converted from 11ty shortcode)
export function getCopyrightYear(): string {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  return currentYear === startYear
    ? `${currentYear}`
    : `${startYear}–${currentYear}`;
}

// Site metadata
export const site = {
  title: "Tamara Amoroso Gonsalves",
  description: "Human rights expert with 20+ years' experience specializing in women's rights, gender justice, and policy advocacy.",
  url: "https://www.tamaragonsalves.com",
  ogImage: "/og_image.jpg",
} as const;