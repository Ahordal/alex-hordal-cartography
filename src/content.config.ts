// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),

  
  schema: () => z.object({
    title: z.string(),
    description: z.string(),        
    plainTitle: z.string(),
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
    appliedSkills: z.array(z.string()).optional(),
    layoutClass: z.string().optional(),
    downloadFile: z.string().optional(),
    downloadLabel: z.string().optional(),
    listClass: z.string().optional(),
    heroCaption: z.string().optional()


  }),
});

export const collections = { projects };