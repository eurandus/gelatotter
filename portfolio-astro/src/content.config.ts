import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  // Files starting with "_" (like _case-study-template.md) are ignored.
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['Case study', 'Prototype']),
    org: z.string(),
    /** one line shown on the card */
    summary: z.string(),
    /** the headline result, e.g. "Cut onboarding time from 5 days to 1". Shown on the card. */
    outcome: z.string().optional(),
    /** path under /public, e.g. /work/trading/thumb.jpg */
    thumbnail: z.string().optional(),
    /** short looping mp4 under /public, plays on hover */
    video: z.string().optional(),
    /** if set, the card links out (e.g. Notion) instead of to a hosted page */
    external: z.string().url().optional(),
    order: z.number().default(100),
    role: z.string().optional(),
    timeline: z.string().optional(),
  }),
});

export const collections = { projects };
