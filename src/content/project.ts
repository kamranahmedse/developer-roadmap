import { defineCollection, z } from 'astro:content';

export const projectDifficulties = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type ProjectDifficultyType = (typeof projectDifficulties)[number];

export const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    isNew: z.boolean(),
    sort: z.number(),
    difficulty: z.enum(projectDifficulties),
    nature: z.string(),
    skills: z.array(z.string()),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.array(z.string()),
      ogImageUrl: z.string().optional(),
    }),
    roadmapIds: z.array(z.string()),
  }),
});
