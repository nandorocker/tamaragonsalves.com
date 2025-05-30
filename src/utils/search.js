// Search utilities for the blog
// Provides both FlexSearch and Fuse.js implementations

export class SearchEngine {
  constructor(searchData, engine = 'flexsearch') {
    this.searchData = searchData;
    this.engine = engine;
    this.searchIndex = null;
    this.initializeEngine();
  }

  async initializeEngine() {
    if (this.engine === 'flexsearch') {
      const { Index } = await import('flexsearch');
      this.searchIndex = new Index({
        tokenize: 'forward',
        cache: true,
        resolution: 9
      });

      // Add documents to search index
      this.searchData.forEach((item, index) => {
        const searchableText = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.category}`;
        this.searchIndex.add(index, searchableText);
      });
    } else if (this.engine === 'fuse') {
      const Fuse = (await import('fuse.js')).default;
      this.searchIndex = new Fuse(this.searchData, {
        keys: ['title', 'description', 'tags', 'category'],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true
      });
    }
  }

  search(query, options = {}) {
    const { limit = 20, filters = [] } = options;
    
    if (!query || query.trim().length === 0) {
      return [];
    }

    let results = [];

    if (this.engine === 'flexsearch') {
      const indices = this.searchIndex.search(query, { limit });
      results = indices.map(index => this.searchData[index]);
    } else if (this.engine === 'fuse') {
      const fuseResults = this.searchIndex.search(query);
      results = fuseResults.slice(0, limit).map(result => ({
        ...result.item,
        score: result.score,
        matches: result.matches
      }));
    }

    // Apply category filters
    if (filters.length > 0) {
      results = results.filter(item => filters.includes(item.category));
    }

    return results;
  }

  // Get suggestions for autocomplete
  getSuggestions(query, limit = 5) {
    if (!query || query.length < 2) return [];
    
    const allTerms = new Set();
    this.searchData.forEach(item => {
      const terms = [
        ...item.title.toLowerCase().split(/\s+/),
        ...item.description.toLowerCase().split(/\s+/),
        ...item.tags.map(tag => tag.toLowerCase()),
        item.category.toLowerCase()
      ];
      terms.forEach(term => {
        if (term.length > 2 && term.includes(query.toLowerCase())) {
          allTerms.add(term);
        }
      });
    });

    return Array.from(allTerms).slice(0, limit);
  }

  // Get popular tags
  getPopularTags(limit = 10) {
    const tagCount = {};
    this.searchData.forEach(item => {
      item.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));
  }

  // Get related posts based on tags
  getRelatedPosts(currentSlug, limit = 3) {
    const currentPost = this.searchData.find(item => item.slug === currentSlug);
    if (!currentPost) return [];

    const related = this.searchData
      .filter(item => item.slug !== currentSlug)
      .map(item => {
        const commonTags = item.tags.filter(tag => currentPost.tags.includes(tag));
        return {
          ...item,
          relevanceScore: commonTags.length + (item.category === currentPost.category ? 1 : 0)
        };
      })
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    return related;
  }
}