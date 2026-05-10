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
    titleClass: z.string().optional(),    
    featuredImage: image(), 

    category: z.enum([
      "GIS Platforms",
      "Web Mapping & Development",
      "Programming & GIS Automation",
      "Cartography & Geovisualization",
      "Design & Visualization Tools",
      "Databases & Data Management",
    ]),
    technologies: z.array(z.string()),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };