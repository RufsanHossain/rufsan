"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ACCENT } from "@/lib/constants";
import { getBlogBySlug, BLOG_POSTS, type BlogSection } from "@/lib/blog";
import { getCaseBySlug } from "@/lib/cases";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger } from "@/components/ui/Stagger";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader, BrowserFrame } from "@/components/ui/Shared";
import { CTA } from "@/components/sections/Sections";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { trackEvent } from "@/lib/analytics";

function BlogPostContent() {
  const { slug } = useParams<{ slug: string }>();
  const p = getBlogBySlug(slug);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const total = articleRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  useEffect(() => {
    if (p) trackEvent("blog_read", { slug: p.slug, title: p.title });
  }, [p]);

  if (!p)
    return (
      <div className="py-[12.5rem] px-8 text-center text-text-dim">
        Post not found
      </div>
    );

  const relatedCases = p.relatedCases.map((s) => getCaseBySlug(s)).filter(Boolean);
  const otherPosts = BLOG_POSTS.filter((bp) => bp.id !== p.id);

  const renderSection = (section: BlogSection, i: number) => {
    switch (section.type) {
      case "heading":
        return (
          <FadeIn key={i}>
            <h2
              className={cn(
                "font-display font-bold text-fg tracking-[-0.02em] leading-[1.2]",
                isMobile
                  ? "text-[1.375rem] mt-10 mb-4"
                  : "text-[1.75rem] mt-12 mb-5"
              )}
            >
              {section.content}
            </h2>
          </FadeIn>
        );
      case "text":
        return (
          <FadeIn key={i}>
            <p
              className={cn(
                "font-body leading-[1.9] text-text mb-5",
                isMobile ? "text-[0.9375rem]" : "text-[1.0625rem]"
              )}
            >
              {section.content}
            </p>
          </FadeIn>
        );
      case "code":
        return (
          <FadeIn key={i}>
            <div
              className={cn(
                "rounded-[0.875rem] overflow-hidden border border-border",
                isMobile ? "my-5" : "my-7"
              )}
            >
              <div className="h-9 bg-code-bg flex items-center px-4 gap-[0.375rem] border-b border-border">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-[0.6875rem] text-text-dim">
                  code
                </span>
              </div>
              <pre
                className={cn(
                  "bg-code-bg m-0 overflow-x-auto [-webkit-overflow-scrolling:touch]",
                  isMobile ? "p-4" : "py-6 px-5"
                )}
              >
                <code
                  className={cn(
                    "font-mono leading-[1.7] text-text whitespace-pre-wrap break-words",
                    isMobile ? "text-xs" : "text-[0.8125rem]"
                  )}
                >
                  {section.content}
                </code>
              </pre>
            </div>
          </FadeIn>
        );
      case "callout":
        return (
          <FadeIn key={i}>
            <div
              className={cn(
                "rounded-[0.875rem]",
                isMobile ? "my-6 py-5 px-4" : "my-9 py-7 px-8"
              )}
              style={{
                background: `${ACCENT}06`,
                border: `0.0625rem solid ${ACCENT}20`,
                borderLeft: `0.1875rem solid ${ACCENT}`,
              }}
            >
              <p
                className={cn(
                  "font-body leading-[1.8] text-text m-0 font-medium",
                  isMobile ? "text-sm" : "text-base"
                )}
              >
                {section.content}
              </p>
            </div>
          </FadeIn>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Progress bar — width is scroll-driven so stays inline */}
      <div className="fixed top-16 left-0 right-0 h-0.5 bg-overlay-subtle z-[99]">
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-out"
          style={{
            width: `${String(progress)}%`,
            boxShadow: `0 0 0.5rem ${ACCENT}40`,
          }}
        />
      </div>

      <article ref={articleRef}>
        {/* ── Header ── */}
        <section
          className={cn(
            "max-w-[75rem] mx-auto",
            isMobile ? "pt-[6.25rem] px-4" : "pt-[8.125rem] px-8"
          )}
        >
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: p.title }]}
          />
          <FadeIn>
            <div className="max-w-[47.5rem] mx-auto pt-4">
              <div
                className={cn(
                  "flex items-center mb-6 flex-wrap",
                  isMobile ? "gap-2" : "gap-3"
                )}
              >
                <span
                  className="py-1 px-3 rounded-[0.375rem] text-xs font-mono text-accent font-medium"
                  style={{
                    background: `${ACCENT}08`,
                    border: `0.0625rem solid ${ACCENT}15`,
                  }}
                >
                  {p.tag}
                </span>
                <span className="font-mono text-xs text-text-dim">{p.date}</span>
                <span className="font-mono text-xs text-text-dim">&middot;</span>
                <span className="font-mono text-xs text-text-dim">
                  {p.readTime} read
                </span>
              </div>
              <h1
                className={cn(
                  "font-display font-[800] text-fg tracking-[-0.04em] leading-[1.12] mb-6",
                  isMobile
                    ? "text-[clamp(1.75rem,8vw,2.5rem)]"
                    : "text-[clamp(2.25rem,5vw,3.25rem)]"
                )}
              >
                {p.title}
              </h1>
              <p
                className={cn(
                  "font-body leading-[1.6] text-text-dim mb-10",
                  isMobile ? "text-base" : "text-xl"
                )}
              >
                {p.excerpt}
              </p>
              <div className="flex items-center gap-[0.875rem] pb-10 border-b border-border">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-display text-base font-bold text-accent"
                  style={{
                    background: `${ACCENT}12`,
                    border: `0.0625rem solid ${ACCENT}20`,
                  }}
                >
                  R
                </div>
                <div>
                  <div className="font-body text-[0.9375rem] font-semibold text-fg">
                    Rufsan
                  </div>
                  <div className="font-body text-[0.8125rem] text-text-dim">
                    Senior Full-Stack Developer &amp; Agency Founder
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── Hero image ── */}
        <section
          className={cn(
            "max-w-[75rem] mx-auto",
            isMobile ? "py-8 px-4" : "py-10 px-8"
          )}
        >
          <FadeIn>
            <div className="max-w-[47.5rem] mx-auto">
              <BrowserFrame title={`blog.rufsan.dev/${p.slug}`} color={p.heroImage}>
                <div
                  className={cn(
                    "flex flex-col justify-center items-center gap-4",
                    isMobile
                      ? "py-8 px-5 min-h-40"
                      : "py-10 px-8 min-h-60"
                  )}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-[1.75rem]"
                    style={{
                      background: `${ACCENT}12`,
                      border: `0.0625rem solid ${ACCENT}20`,
                    }}
                  >
                    {p.tag === "AI / ML" ? "\u{1F9E0}" : p.tag === "Engineering" ? "\u26A1" : "\u{1F5C2}"}
                  </div>
                  <div className="h-[0.375rem] w-[60%] bg-white/[0.08] rounded-[0.1875rem]" />
                  <div className="h-1 w-[40%] bg-white/[0.05] rounded-sm" />
                </div>
              </BrowserFrame>
            </div>
          </FadeIn>
        </section>

        {/* ── Article body ── */}
        <section
          className={cn(
            "max-w-[75rem] mx-auto",
            isMobile ? "pt-4 px-4 pb-10" : "pt-5 px-8 pb-[3.75rem]"
          )}
        >
          <div className="max-w-[47.5rem] mx-auto">
            {p.sections.map((s, i) => renderSection(s, i))}
          </div>
        </section>

        {/* ── Tags + Share ── */}
        <section
          className={cn(
            "max-w-[75rem] mx-auto",
            isMobile ? "px-4 pb-10" : "px-8 pb-[3.75rem]"
          )}
        >
          <FadeIn>
            <div className="max-w-[47.5rem] mx-auto pt-10 border-t border-border">
              <div
                className={cn(
                  "flex justify-between",
                  isMobile
                    ? "flex-col items-start gap-5"
                    : "flex-row items-center gap-0"
                )}
              >
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="font-body text-[0.8125rem] text-text-dim mr-1">
                    Tags:
                  </span>
                  <span
                    className="py-1 px-3 rounded-[0.375rem] text-xs font-mono text-accent"
                    style={{
                      background: `${ACCENT}08`,
                      border: `0.0625rem solid ${ACCENT}15`,
                    }}
                  >
                    {p.tag}
                  </span>
                  <span className="py-1 px-3 bg-overlay-subtle border border-overlay-border rounded-[0.375rem] text-xs font-mono text-text-dim">
                    Production
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      trackEvent("share_click", { platform: "twitter", slug: p.slug });
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(p.title)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="py-[0.375rem] px-[0.875rem] bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-[0.375rem] text-text-dim text-xs font-body font-medium cursor-pointer"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => {
                      trackEvent("share_click", { platform: "linkedin", slug: p.slug });
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="py-[0.375rem] px-[0.875rem] bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-[0.375rem] text-text-dim text-xs font-body font-medium cursor-pointer"
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => {
                      trackEvent("share_click", { platform: "copy_link", slug: p.slug });
                      void navigator.clipboard.writeText(window.location.href);
                    }}
                    className="py-[0.375rem] px-[0.875rem] bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-[0.375rem] text-text-dim text-xs font-body font-medium cursor-pointer"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── Related Cases ── */}
        {relatedCases.length > 0 && (
          <section
            className={cn(
              "max-w-[75rem] mx-auto",
              isMobile ? "py-8 px-4 pb-12" : "py-10 px-8 pb-20"
            )}
          >
            <div className="max-w-[47.5rem] mx-auto">
              <SectionHeader
                number="// Related"
                title="See It in Action"
                desc="Case studies where these concepts were applied."
              />
              <div className="flex flex-col gap-3">
                {relatedCases.map(
                  (rc) => {
                    if (!rc) return null;
                    const route = Array.isArray(rc.verticalRoute) ? rc.verticalRoute[0] : rc.verticalRoute;
                    return (
                      <FadeIn key={rc.id}>
                        <Link
                          href={`/cases/${rc.slug}`}
                          className={cn(
                            "no-underline items-center bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-[0.875rem] transition-all duration-300",
                            isMobile
                              ? "grid grid-cols-[auto_1fr] gap-[0.875rem] py-5 px-4"
                              : "grid grid-cols-[auto_1fr_auto] gap-5 py-6 px-7"
                          )}
                        >
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                            style={{
                              background: `${ACCENT}0a`,
                              border: `0.0625rem solid ${ACCENT}18`,
                            }}
                          >
                            {route === "ai" ? "\u{1F9E0}" : route === "dev" ? "\u26A1" : "\u{1F4CA}"}
                          </div>
                          <div>
                            <h4 className="font-display text-base font-bold text-fg mb-1">
                              {rc.title}
                            </h4>
                            <span className="font-mono text-xs text-accent">
                              {rc.outcome}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "font-body text-[0.8125rem] text-text-dim",
                              isMobile ? "hidden" : "block"
                            )}
                          >
                            View &rarr;
                          </span>
                        </Link>
                      </FadeIn>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* ── Keep Reading ── */}
        <section
          className={cn(
            "max-w-[75rem] mx-auto",
            isMobile ? "py-8 px-4 pb-12" : "py-10 px-8 pb-20"
          )}
        >
          <div className="max-w-[60rem] mx-auto">
            <SectionHeader number="// More" title="Keep Reading" />
            <Stagger columns={2} mobileColumns={1} tabletColumns={2}>
              {otherPosts.map((op) => (
                <Link key={op.id} href={`/blog/${op.slug}`} className="no-underline">
                  <div
                    className={cn(
                      "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-2xl flex flex-col h-full transition-all duration-300",
                      isMobile ? "py-6 px-5" : "py-7 px-6"
                    )}
                  >
                    <div className="flex justify-between mb-3">
                      <span
                        className="py-[0.1875rem] px-[0.625rem] rounded-[0.375rem] text-[0.6875rem] font-mono text-accent"
                        style={{
                          background: `${ACCENT}08`,
                          border: `0.0625rem solid ${ACCENT}15`,
                        }}
                      >
                        {op.tag}
                      </span>
                      <span className="font-mono text-[0.6875rem] text-text-dim">
                        {op.readTime}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "font-display font-bold text-fg mb-[0.625rem] leading-[1.3]",
                        isMobile ? "text-base" : "text-lg"
                      )}
                    >
                      {op.title}
                    </h3>
                    <p className="font-body text-[0.8125rem] leading-[1.7] text-text-dim m-0 flex-1">
                      {op.excerpt}
                    </p>
                    <div className="mt-4 font-body text-[0.8125rem] text-accent font-medium">
                      Read Article &rarr;
                    </div>
                  </div>
                </Link>
              ))}
            </Stagger>
          </div>
        </section>

        <CTA
          comment="// Enjoyed this?"
          heading="Let's build something<br/>together."
          sub="From architecture decisions to production deployment — I'd love to collaborate."
          btn="Get in Touch"
        />
      </article>
    </>
  );
}

export default BlogPostContent;
