import { defineCollection, z } from 'astro:content';

export const changelogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seo: z
      .object({
        title: z.string(),
        description: z.string().optional(),
      })
      .optional(),
    date: z.date(),
  }),
});
