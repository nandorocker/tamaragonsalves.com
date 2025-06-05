import { defineCollection, z } from 'astro:content';

const booksCollection = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    id: z.string(),
    author: z.string(),
    imageUrl: z.string(),
    linkGroups: z.array(z.object({
      type: z.string(),
      links: z.array(z.object({
        labels: z.record(z.string()),
        url: z.string()
      }))
    }))
  }))
});

const videosCollection = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    id: z.string(),
    videoUrl: z.string(),
    thumbnailUrl: z.string(),
    date: z.string()
  }))
});

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    id: z.string(),
    imageUrl: z.string(),
    linkUrl: z.string(),
    linkIcon: z.string().optional()
  }))
});

const galleryCollection = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    src: z.string(),
    altKey: z.string(),
    fslightboxGroup: z.string(),
    gridClass: z.string().optional()
  }))
});

export const collections = {
  'books': booksCollection,
  'videos': videosCollection,
  'projects': projectsCollection,
  'gallery': galleryCollection
};