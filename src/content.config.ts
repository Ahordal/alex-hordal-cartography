// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),


  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    plainTitle: z.string(),
    category: z.enum([
      "Interactive GIS",
      "Data Visualization",
      "Cartographic Design",
      "Spatial Analysis",
      "Terrain & Relief Visualization",
    ]),
    
    technologies: z.array(z.string()),
   
    appliedSkills: z.array(z.string()).optional(),
    downloadFile: z.string().optional(),
    downloadLabel: z.string().optional(),
    listClass: z.string().optional(),
    objectPosition: z.string().optional(),
    heroCaption: z.string().optional(),
    video: z.string().optional(),
    featuredImage: image()
  }),
});

export const collections = { projects };