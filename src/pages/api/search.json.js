import { getCollection } from 'astro:content';

export async function GET({ url }) {
  const blog = await getCollection('blog');
  
  // Get search parameters
  const searchParams = url.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';
  const limit = parseInt(searchParams.get('limit') || '20');
  
  // Prepare search data
  let searchData = blog.map(entry => ({
    slug: entry.slug,
    title: entry.data.title,
    description: entry.data.description,
    category: entry.data.category,
    tags: entry.data.tags,
    pubDate: entry.data.pubDate.toISOString(),
    featured: entry.data.featured,
    externalUrl: entry.data.externalUrl || null,
  }));
  
  // Apply search query if provided
  if (query) {
    searchData = searchData.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query)) ||
      item.category.toLowerCase().includes(query)
    );
  }
  
  // Apply category filter if provided
  if (category) {
    searchData = searchData.filter(item => item.category.toLowerCase() === category);
  }
  
  // Sort by publication date, newest first
  searchData.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  
  // Apply limit
  searchData = searchData.slice(0, limit);
  
  // Get tag statistics
  const tagStats = {};
  blog.forEach(entry => {
    entry.data.tags.forEach(tag => {
      tagStats[tag] = (tagStats[tag] || 0) + 1;
    });
  });
  
  const popularTags = Object.entries(tagStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));
  
  const response = {
    query: query || null,
    category: category || null,
    total: searchData.length,
    totalPosts: blog.length,
    results: searchData,
    popularTags,
    categories: ['publication', 'research', 'speaking', 'advocacy']
  };
  
  return new Response(JSON.stringify(response, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Enable CORS for external usage
    },
  });
}