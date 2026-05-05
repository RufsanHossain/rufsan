import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/* Types live in ./content-types so client components can import them
 * without dragging fs/path into the client bundle. Re-exported here for
 * server-side ergonomics. */
export type { BlogPost, CaseStudy, CaseMetric } from "./content-types";
import type { BlogPost, CaseStudy } from "./content-types";

interface MdxFile<T> {
  slug: string;
  meta: T;
  content: string;
}

/* ──────────────────────────────────────────────────────────
 *  Loader — reads MDX files at module load (cached for the
 *  lifetime of the server process)
 * ──────────────────────────────────────────────────────── */

const CONTENT_DIR = path.join(process.cwd(), "content");

function readCollection<T extends { slug: string; id: string }>(
  subdir: string,
): MdxFile<T>[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      const parsed = matter(raw);
      const data = parsed.data as Record<string, unknown>;
      const meta = { ...data, slug, id: slug } as T;
      return { slug, meta, content: parsed.content };
    });
}

const blogFiles = readCollection<BlogPost>("blog");
const caseFiles = readCollection<CaseStudy>("cases");

/* ──────────────────────────────────────────────────────────
 *  Public API — preserves the export shape of the previous
 *  src/lib/blog.ts and src/lib/cases.ts so consumers don't
 *  need rewrites beyond the import path.
 * ──────────────────────────────────────────────────────── */

export const BLOG_POSTS: BlogPost[] = [...blogFiles]
  .map((f) => f.meta)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const CASES: CaseStudy[] = caseFiles.map((f) => f.meta);

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((b) => b.slug === slug);
}

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function getCasesByVertical(verticalRoute: string): CaseStudy[] {
  return CASES.filter((c) =>
    Array.isArray(c.verticalRoute)
      ? c.verticalRoute.includes(verticalRoute)
      : c.verticalRoute === verticalRoute,
  );
}

/** Raw MDX body source for the post page. Returns undefined if not found. */
export function getBlogContent(slug: string): string | undefined {
  return blogFiles.find((f) => f.slug === slug)?.content;
}

/** Raw MDX body source for the case study page. Returns undefined if not
 *  found. The body is optional — most cases ship with empty bodies and
 *  use frontmatter for structured fields. */
export function getCaseContent(slug: string): string | undefined {
  return caseFiles.find((f) => f.slug === slug)?.content;
}
