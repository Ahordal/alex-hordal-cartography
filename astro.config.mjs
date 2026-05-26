import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://alexhordal.ca",

  integrations: [mdx(), sitemap()],

  output: "static",

  adapter: vercel(),
});