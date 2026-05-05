import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getBlogBySlug,
  getBlogContent,
  getCaseBySlug,
  BLOG_POSTS,
} from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { BlogPostView } from "./BlogPostView";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="py-[12.5rem] px-8 text-center text-text-dim">
        Post not found
      </div>
    );
  }

  const content = getBlogContent(slug) ?? "";
  const relatedCases = post.relatedCases
    .map((s) => getCaseBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const otherPosts = BLOG_POSTS.filter((bp) => bp.id !== post.id);

  return (
    <BlogPostView post={post} relatedCases={relatedCases} otherPosts={otherPosts}>
      <MDXRemote source={content} components={mdxComponents} />
    </BlogPostView>
  );
}
