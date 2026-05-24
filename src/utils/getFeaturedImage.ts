import type { ImageMetadata } from "astro";

const featuredImages = import.meta.glob(
  "../content/projects/**/featured.webp",
  {
    eager: true,
    import: "default",
  }
);

export function getFeaturedImage(
  projectId: string
): ImageMetadata {

  return featuredImages[
    `../content/projects/${projectId}/featured.webp`
  ] as ImageMetadata;

}