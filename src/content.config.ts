import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import readingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

const post = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/post" }), 
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    videoUrl: z.preprocess(value => value === '' ? undefined : value, z.string().url().optional()),
    date: z.coerce.date(),
    author: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    image: image(), 

     // 🛠️ ADD THIS LINE: It defines youtubeId as a completely optional string value
    youtubeId: z.string().optional(),
  }),
});

export const collections = { post };