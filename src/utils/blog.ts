// Map & App Development posts, written in The Daily Spunkmeyer's editor and published
// here as /blog pages (this copy is canonical). The blog rebuilds this site through a
// deploy hook whenever its feed changes.
// Shape must match the blog's src/pages/feeds/map-and-app-development.json.ts.

const FEED_URL =
  import.meta.env.BLOG_FEED_URL ??
  "https://the-daily-spunkmeyer.vercel.app/feeds/map-and-app-development.json";

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  url: string;
  blogUrl: string;
  publishedDate: string;
  updatedDate: string | null;
  tags: string[];
  cover: { src: string; width: number; height: number; alt: string } | null;
  html: string;
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

/**
 * Fits the blog's HTML into a portfolio page: headings drop a level so the post's
 * h2s read as subsection titles under the page's own section header, and figures
 * take the portfolio's caption styling.
 */
export function adaptPostHtml(html: string): string {
  return html
    .replace(/<(\/?)h([2-5])(\s|>)/g, (_, slash: string, level: string, rest: string) =>
      `<${slash}h${Number(level) + 1}${rest}`
    )
    .replaceAll('class="post-figure"', 'class="project-figure"');
}

// Dates come as UTC midnight, so format in UTC to avoid an off-by-one day.
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", { dateStyle: "long", timeZone: "UTC" });
}
