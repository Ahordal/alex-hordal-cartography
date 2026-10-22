// Map & App Development posts from The Daily Spunkmeyer, fetched at build time.
// The blog rebuilds this site through a deploy hook whenever the feed changes.
// Shape must match the blog's src/pages/feeds/map-and-app-development.json.ts.

const FEED_URL =
  import.meta.env.BLOG_FEED_URL ??
  "https://the-daily-spunkmeyer.vercel.app/feeds/map-and-app-development.json";

export interface BlogPost {
  title: string;
  summary: string;
  url: string;
  publishedDate: string;
  updatedDate: string | null;
  tags: string[];
  cover: { src: string; width: number; height: number; alt: string } | null;
}

export interface BlogFeed {
  title: string;
  home: string;
  items: BlogPost[];
}

// A blog outage shouldn't break a portfolio build; the page shows its empty state instead.
export async function getBlogFeed(): Promise<BlogFeed | null> {
  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as BlogFeed;
  } catch (err) {
    console.warn(`[blog] Couldn't load ${FEED_URL}: ${err}`);
    return null;
  }
}

// Dates come as UTC midnight, so format in UTC to avoid an off-by-one day.
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", { dateStyle: "long", timeZone: "UTC" });
}
