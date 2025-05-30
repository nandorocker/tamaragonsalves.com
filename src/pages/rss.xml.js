import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/global.ts';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  // Sort posts by publication date, newest first
  const sortedPosts = blog.sort((a, b) => 
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  return rss({
    title: site.title,
    description: site.description,
    site: context.site || site.url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      category: post.data.category,
      link: `/blog/${post.slug}/`,
      // Include external URL if available
      ...(post.data.externalUrl && { 
        customData: `<externalUrl>${post.data.externalUrl}</externalUrl>` 
      }),
    })),
  });
}