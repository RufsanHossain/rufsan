import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";
import { BLOG_POSTS } from "@/lib/blog";

const BASE = "https://rufsansanto.com";

/** Parse blog date strings like "Jan 15, 2025" into Date objects. */
function parseBlogDate(dateStr: string): Date {
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date("2025-01-01") : parsed;
}

/** Last meaningful content update to the site. Update when deploying content changes. */
const LAST_CONTENT_UPDATE = new Date("2025-04-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ai`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/dev`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ds`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 0.7 },
  ];

  const casePages: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${BASE}/cases/${c.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: parseBlogDate(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...casePages, ...blogPages];
}
