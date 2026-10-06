import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/post" }),
    schema: ({image}) => z.object ({
      author: z.string(),
      slug: z.string(),
      categories: z.array(z.string()),
      date: z.string(),
      featured: z.boolean(),
      image: image(),
      title: z.string(),
      
    })
})

export const collections =  {
  post: postsCollection
}
