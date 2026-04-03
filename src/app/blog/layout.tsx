import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering deep dives and architecture decisions — articles on AI/ML, full-stack development, and system design.",
  alternates: { canonical: "https://rufsansanto.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
