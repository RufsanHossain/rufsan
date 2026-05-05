/* Pure types for blog + case content. Safe to import from any environment
 * (server, client, edge) — no fs, no Node built-ins.
 * Loader functions and content arrays live in @/lib/content (server-only). */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  excerpt: string;
  heroImage: string;
  relatedCases: string[];
}

export interface CaseMetric {
  v: string;
  l: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  vertical: string;
  verticalRoute: string | string[];
  title: string;
  outcome: string;
  overview: string;
  metrics: CaseMetric[];
  challenge: string;
  solutionSteps: string[];
  stack: string[];
  results: string;
  liveUrl?: string;
  mockupColor: string;
  images?: string[];
}
