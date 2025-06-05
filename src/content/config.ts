import { defineCollection, z } from 'astro:content';

// Define a flexible data collection that can handle different JSON structures
const dataCollection = defineCollection({
  type: 'data',
  schema: z.any() // Use a flexible schema since we have different data structures
});

export const collections = {
  'data': dataCollection
};