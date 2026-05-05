import { BLOG_POSTS, getCaseBySlug } from "@/lib/content";
import { HomePageView } from "./HomePageView";

/* RSC wrapper — loads content on the server, hands it to the client view.
 * Keeps the home page free of fs imports in the client bundle. */

const FEATURED_SLUGS = ["ai-qa-platform", "sorushi-journal", "revenue-analytics"] as const;

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((slug) => getCaseBySlug(slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );

  return <HomePageView featured={featured} posts={BLOG_POSTS} />;
}
