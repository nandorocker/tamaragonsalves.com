import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // Use coerce.date() to handle string dates from YAML
    category: z.enum(['publication', 'speaking', 'research', 'advocacy']),
    tags: z.array(z.string()),
    featured: z.boolean(),
    externalUrl: z.string().url().optional(),
  }),
});

export const collections = {
  blog,
};