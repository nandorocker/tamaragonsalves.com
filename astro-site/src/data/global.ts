// Global data and utility functions for the site
export const images = '/assets/images';
export const js = '/assets/js';
export const vendor = '/assets/vendor';

// Equivalent to the {% year %} shortcode in 11ty
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

// Site metadata
export const site = {
  title: 'Tamara Amoroso Gonsalves, Human Rights Expert',
  description: 'Human rights expert with 20+ years\' experience specializing in women\'s rights, gender justice, and policy advocacy.',
  url: 'https://www.tamaragonsalves.com',
  ogImage: '/og_image.jpg'
};