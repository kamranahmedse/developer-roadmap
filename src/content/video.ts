import { defineCollection, z } from 'astro:content';

export const videoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    authorId: z.string(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    isNew: z.boolean(),
    duration: z.string(),
    date: z.date(),
    sitemap: z.object({
      priority: z.number(),
      changefreq: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    }),
    tags: z.array(z.string()),
  }),
});
