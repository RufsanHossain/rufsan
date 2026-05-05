import type { Metadata } from "next";
import { getBlogBySlug } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://rufsansanto.com/blog/${slug}` },
  };
}

export default async function BlogPostLayout({
  params,
  children,
}: {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) return children;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@id": "https://rufsansanto.com/#person",
    },
    publisher: {
      "@id": "https://rufsansanto.com/#person",
    },
    url: `https://rufsansanto.com/blog/${slug}`,
    mainEntityOfPage: `https://rufsansanto.com/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {children}
    </>
  );
}
