import { defineCollection, z } from 'astro:content';

export const authorCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    imageUrl: z.string(),
    employment: z
      .object({
        title: z.string(),
        company: z.string(),
      })
      .optional(),
    social: z
      .object({
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
});
