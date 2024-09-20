import { defineCollection, z } from 'astro:content';

export const questionGroupCollection = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    briefTitle: z.string(),
    briefDescription: z.string(),
    title: z.string(),
    description: z.string(),
    isNew: z.boolean(),
    authorId: z.string().optional(),
    date: z.string().optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImageUrl: z.string().optional(),
      keywords: z.array(z.string()),
    }),
    sitemap: z.object({
      priority: z.number(),
      changefreq: z.string(),
    }),
    questions: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
        topics: z.array(z.string()),
      }),
    ),
  }),
});
