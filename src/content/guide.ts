import { defineCollection, z } from 'astro:content';

export const guideCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    authorId: z.string(),
    canonicalUrl: z.string().optional(),
    excludedBySlug: z.string().optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImageUrl: z.string().optional(),
    }),
    isNew: z.boolean(),
    type: z.enum(['visual', 'textual']),
    date: z.date(),
    sitemap: z.object({
      priority: z.number(),
      changefreq: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    }),
    tags: z.array(z.string()).optional(),
  }),
});
