import { BLOG_POSTS } from "@/lib/blog";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogCard } from "@/components/ui/BlogCard";
import { CTA } from "@/components/sections/Sections";

export default function BlogIndexPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="sc-blog-header">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <FadeIn>
          <div className="max-w-[45rem] pt-4">
            <h1 className="font-display font-[800] tracking-[-0.04em] mb-5">
              <span className="sc-blog-title block leading-[1.08] text-[#fafafa]">
                Writing
              </span>
              <span className="sc-blog-subtitle block leading-[1.12] text-text-dim mt-1">
                &amp; deep dives.
              </span>
            </h1>
            <p className="sc-blog-desc font-body leading-[1.7] text-text-dim max-w-[33.75rem]">
              Engineering deep dives, architecture decisions, and lessons from building production
              systems. No fluff — just hard-won insights.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Blog cards ── */}
      <section className="sc-blog-cards">
        <div className="flex flex-col gap-4">
          {BLOG_POSTS.map((p, i) => (
            <BlogCard key={p.id} post={p} index={i} />
          ))}
        </div>
      </section>

      <CTA
        comment="// Want to discuss?"
        heading="Got thoughts on<br/>these topics?"
        sub="I'm always up for a technical conversation — reach out anytime."
        btn="Start a Conversation"
      />
    </>
  );
}
