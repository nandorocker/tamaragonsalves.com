import { getCollection } from 'astro:content';
import { site } from '../data/global.ts';

export async function GET() {
  const blog = await getCollection('blog');
  
  const staticPages = [
    '',
    'blog',
    'search',
  ];
  
  const blogPages = blog.map(post => `blog/${post.slug}`);
  
  const allPages = [...staticPages, ...blogPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${site.url}${page ? `/${page}` : ''}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.startsWith('blog/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page === 'blog' ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}