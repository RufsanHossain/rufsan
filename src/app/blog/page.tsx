import { TEXT_DIM, FONT_DISPLAY, FONT_BODY } from "@/lib/constants";
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
          <div style={{ maxWidth: "45rem", paddingTop: "1rem" }}>
            <h1
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: "0 0 1.25rem",
              }}
            >
              <span className="sc-blog-title" style={{ display: "block", lineHeight: 1.08, color: "#fafafa" }}>
                Writing
              </span>
              <span className="sc-blog-subtitle" style={{ display: "block", lineHeight: 1.12, color: TEXT_DIM, marginTop: "0.25rem" }}>
                &amp; deep dives.
              </span>
            </h1>
            <p className="sc-blog-desc" style={{ fontFamily: FONT_BODY, lineHeight: 1.7, color: TEXT_DIM, maxWidth: "33.75rem" }}>
              Engineering deep dives, architecture decisions, and lessons from building production
              systems. No fluff — just hard-won insights.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Blog cards ── */}
      <section className="sc-blog-cards">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
