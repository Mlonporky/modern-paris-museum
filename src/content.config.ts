import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const artworks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/artworks' }),
  schema: z.object({
    title: z.string().min(1),
    originalTitle: z.string().min(1).optional(),
    artist: z.string().min(1),
    artistOriginal: z.string().min(1),
    year: z.number().int().min(1800).max(1900),
    theme: z.string().min(1),
    order: z.number().int().positive(),
    image: z.string().min(1),
    imageAlt: z.string().min(20),
    museum: z.string().min(1),
    sourceUrl: z.url(),
    imageSourceUrl: z.url(),
    rightsNote: z.string().min(1),
    timelineIds: z.array(z.string().min(1)).min(1),
  }),
});

const timeline = defineCollection({
  loader: file('./src/data/timeline.json'),
  schema: z.object({
    order: z.number().int().positive(),
    yearLabel: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(20),
    category: z.enum(['城市', '工业', '社会', '艺术市场']),
  }),
});

export const collections = { artworks, timeline };
