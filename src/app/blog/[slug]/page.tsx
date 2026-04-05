"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ACCENT, TEXT, TEXT_DIM, BORDER, GLASS, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { getBlogBySlug, BLOG_POSTS, type BlogSection } from "@/lib/blog";
import { getCaseBySlug } from "@/lib/cases";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger } from "@/components/ui/Stagger";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader, BrowserFrame } from "@/components/ui/Shared";
import { CTA } from "@/components/sections/Sections";
import { useBreakpoint } from "@/hooks/useBreakpoint";

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

  if (!p)
    return (
      <div
        style={{
          padding: "12.5rem 2rem",
          textAlign: "center",
          color: TEXT_DIM,
        }}
      >
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
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: isMobile ? "1.375rem" : "1.75rem",
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.02em",
                margin: isMobile ? "2.5rem 0 1rem" : "3rem 0 1.25rem",
                lineHeight: 1.2,
              }}
            >
              {section.content}
            </h2>
          </FadeIn>
        );
      case "text":
        return (
          <FadeIn key={i}>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: isMobile ? "0.9375rem" : "1.0625rem",
                lineHeight: 1.9,
                color: TEXT,
                margin: "0 0 1.25rem",
              }}
            >
              {section.content}
            </p>
          </FadeIn>
        );
      case "code":
        return (
          <FadeIn key={i}>
            <div
              style={{
                margin: isMobile ? "1.25rem 0" : "1.75rem 0",
                borderRadius: "0.875rem",
                overflow: "hidden",
                border: `0.0625rem solid ${BORDER}`,
              }}
            >
              <div
                style={{
                  height: "2.25rem",
                  background: "#111",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 1rem",
                  gap: "0.375rem",
                  borderBottom: `0.0625rem solid ${BORDER}`,
                }}
              >
                <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#ffbd2e" }} />
                <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#28c840" }} />
                <span
                  style={{
                    marginLeft: "0.75rem",
                    fontFamily: FONT_MONO,
                    fontSize: "0.6875rem",
                    color: TEXT_DIM,
                  }}
                >
                  code
                </span>
              </div>
              <pre
                style={{
                  background: "#0a0a0a",
                  padding: isMobile ? "1rem" : "1.5rem 1.25rem",
                  margin: 0,
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <code
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: isMobile ? "0.75rem" : "0.8125rem",
                    lineHeight: 1.7,
                    color: TEXT,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
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
              style={{
                margin: isMobile ? "1.5rem 0" : "2.25rem 0",
                padding: isMobile ? "1.25rem 1rem" : "1.75rem 2rem",
                background: `${ACCENT}06`,
                border: `0.0625rem solid ${ACCENT}20`,
                borderRadius: "0.875rem",
                borderLeft: `0.1875rem solid ${ACCENT}`,
              }}
            >
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  lineHeight: 1.8,
                  color: TEXT,
                  margin: 0,
                  fontWeight: 500,
                }}
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
      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          top: "4rem",
          left: 0,
          right: 0,
          height: "0.125rem",
          background: "rgba(255,255,255,0.03)",
          zIndex: 99,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${String(progress)}%`,
            background: ACCENT,
            transition: "width 0.1s ease-out",
            boxShadow: `0 0 0.5rem ${ACCENT}40`,
          }}
        />
      </div>

      <article ref={articleRef}>
        {/* ── Header ── */}
        <section
          style={{
            padding: isMobile ? "6.25rem 1rem 0" : "8.125rem 2rem 0",
            maxWidth: "75rem",
            margin: "0 auto",
          }}
        >
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: p.title }]}
          />
          <FadeIn>
            <div style={{ maxWidth: "47.5rem", margin: "0 auto", paddingTop: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "0.5rem" : "0.75rem",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: `${ACCENT}08`,
                    border: `0.0625rem solid ${ACCENT}15`,
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    fontFamily: FONT_MONO,
                    color: ACCENT,
                    fontWeight: 500,
                  }}
                >
                  {p.tag}
                </span>
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>{p.date}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>·</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>
                  {p.readTime} read
                </span>
              </div>
              <h1
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: isMobile ? "clamp(1.75rem, 8vw, 2.5rem)" : "clamp(2.25rem, 5vw, 3.25rem)",
                  fontWeight: 800,
                  color: "#fafafa",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.12,
                  margin: "0 0 1.5rem",
                }}
              >
                {p.title}
              </h1>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: isMobile ? "1rem" : "1.25rem",
                  lineHeight: 1.6,
                  color: TEXT_DIM,
                  margin: "0 0 2.5rem",
                }}
              >
                {p.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  paddingBottom: "2.5rem",
                  borderBottom: `0.0625rem solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "0.75rem",
                    background: `${ACCENT}12`,
                    border: `0.0625rem solid ${ACCENT}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_DISPLAY,
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: ACCENT,
                  }}
                >
                  R
                </div>
                <div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "0.9375rem", fontWeight: 600, color: "#fafafa" }}>
                    Rufsan
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "0.8125rem", color: TEXT_DIM }}>
                    Senior Full-Stack Developer & Agency Founder
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── Hero image ── */}
        <section
          style={{
            padding: isMobile ? "2rem 1rem" : "2.5rem 2rem",
            maxWidth: "75rem",
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div style={{ maxWidth: "47.5rem", margin: "0 auto" }}>
              <BrowserFrame title={`blog.rufsan.dev/${p.slug}`} color={p.heroImage}>
                <div
                  style={{
                    padding: isMobile ? "2rem 1.25rem" : "2.5rem 2rem",
                    minHeight: isMobile ? "10rem" : "15rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "1rem",
                      background: `${ACCENT}12`,
                      border: `0.0625rem solid ${ACCENT}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.75rem",
                    }}
                  >
                    {p.tag === "AI / ML" ? "🧠" : p.tag === "Engineering" ? "⚡" : "🗂"}
                  </div>
                  <div
                    style={{
                      height: "0.375rem",
                      width: "60%",
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "0.1875rem",
                    }}
                  />
                  <div
                    style={{
                      height: "0.25rem",
                      width: "40%",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "0.125rem",
                    }}
                  />
                </div>
              </BrowserFrame>
            </div>
          </FadeIn>
        </section>

        {/* ── Article body ── */}
        <section
          style={{
            padding: isMobile ? "1rem 1rem 2.5rem" : "1.25rem 2rem 3.75rem",
            maxWidth: "75rem",
            margin: "0 auto",
          }}
        >
          <div style={{ maxWidth: "47.5rem", margin: "0 auto" }}>
            {p.sections.map((s, i) => renderSection(s, i))}
          </div>
        </section>

        {/* ── Tags + Share ── */}
        <section
          style={{
            padding: isMobile ? "0 1rem 2.5rem" : "0 2rem 3.75rem",
            maxWidth: "75rem",
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div
              style={{
                maxWidth: "47.5rem",
                margin: "0 auto",
                paddingTop: "2.5rem",
                borderTop: `0.0625rem solid ${BORDER}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "1.25rem" : "0",
                }}
              >
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: "0.8125rem",
                      color: TEXT_DIM,
                      marginRight: "0.25rem",
                    }}
                  >
                    Tags:
                  </span>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: `${ACCENT}08`,
                      border: `0.0625rem solid ${ACCENT}15`,
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      fontFamily: FONT_MONO,
                      color: ACCENT,
                    }}
                  >
                    {p.tag}
                  </span>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "0.0625rem solid rgba(255,255,255,0.08)",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      fontFamily: FONT_MONO,
                      color: TEXT_DIM,
                    }}
                  >
                    Production
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <button
                    onClick={() => {
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(p.title)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    style={{
                      padding: "0.375rem 0.875rem",
                      ...GLASS,
                      borderRadius: "0.375rem",
                      color: TEXT_DIM,
                      fontSize: "0.75rem",
                      fontFamily: FONT_BODY,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    style={{
                      padding: "0.375rem 0.875rem",
                      ...GLASS,
                      borderRadius: "0.375rem",
                      color: TEXT_DIM,
                      fontSize: "0.75rem",
                      fontFamily: FONT_BODY,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => {
                      void navigator.clipboard.writeText(window.location.href);
                    }}
                    style={{
                      padding: "0.375rem 0.875rem",
                      ...GLASS,
                      borderRadius: "0.375rem",
                      color: TEXT_DIM,
                      fontSize: "0.75rem",
                      fontFamily: FONT_BODY,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
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
            style={{
              padding: isMobile ? "2rem 1rem 3rem" : "2.5rem 2rem 5rem",
              maxWidth: "75rem",
              margin: "0 auto",
            }}
          >
            <div style={{ maxWidth: "47.5rem", margin: "0 auto" }}>
              <SectionHeader
                number="// Related"
                title="See It in Action"
                desc="Case studies where these concepts were applied."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {relatedCases.map(
                  (rc) => {
                    if (!rc) return null;
                    const route = Array.isArray(rc.verticalRoute) ? rc.verticalRoute[0] : rc.verticalRoute;
                    return (
                      <FadeIn key={rc.id}>
                        <Link
                          href={`/cases/${rc.slug}`}
                          style={{
                            textDecoration: "none",
                            display: "grid",
                            gridTemplateColumns: isMobile ? "auto 1fr" : "auto 1fr auto",
                            gap: isMobile ? "0.875rem" : "1.25rem",
                            alignItems: "center",
                            padding: isMobile ? "1.25rem 1rem" : "1.5rem 1.75rem",
                            ...GLASS,
                            borderRadius: "0.875rem",
                            transition: "all 0.3s",
                          }}
                        >
                          <div
                            style={{
                              width: "3rem",
                              height: "3rem",
                              borderRadius: "0.75rem",
                              background: `${ACCENT}0a`,
                              border: `0.0625rem solid ${ACCENT}18`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.25rem",
                            }}
                          >
                            {route === "ai" ? "🧠" : route === "dev" ? "⚡" : "📊"}
                          </div>
                          <div>
                            <h4
                              style={{
                                fontFamily: FONT_DISPLAY,
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "#fafafa",
                                margin: "0 0 0.25rem",
                              }}
                            >
                              {rc.title}
                            </h4>
                            <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: ACCENT }}>
                              {rc.outcome}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: "0.8125rem",
                              color: TEXT_DIM,
                              display: isMobile ? "none" : "block",
                            }}
                          >
                            View →
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
          style={{
            padding: isMobile ? "2rem 1rem 3rem" : "2.5rem 2rem 5rem",
            maxWidth: "75rem",
            margin: "0 auto",
          }}
        >
          <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
            <SectionHeader number="// More" title="Keep Reading" />
            <Stagger columns={2} mobileColumns={1} tabletColumns={2}>
              {otherPosts.map((op) => (
                <Link key={op.id} href={`/blog/${op.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      padding: isMobile ? "1.5rem 1.25rem" : "1.75rem 1.5rem",
                      ...GLASS,
                      borderRadius: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      transition: "all 0.3s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.1875rem 0.625rem",
                          background: `${ACCENT}08`,
                          border: `0.0625rem solid ${ACCENT}15`,
                          borderRadius: "0.375rem",
                          fontSize: "0.6875rem",
                          fontFamily: FONT_MONO,
                          color: ACCENT,
                        }}
                      >
                        {op.tag}
                      </span>
                      <span style={{ fontFamily: FONT_MONO, fontSize: "0.6875rem", color: TEXT_DIM }}>
                        {op.readTime}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: isMobile ? "1rem" : "1.125rem",
                        fontWeight: 700,
                        color: "#fafafa",
                        margin: "0 0 0.625rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {op.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: "0.8125rem",
                        lineHeight: 1.7,
                        color: TEXT_DIM,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {op.excerpt}
                    </p>
                    <div
                      style={{
                        marginTop: "1rem",
                        fontFamily: FONT_BODY,
                        fontSize: "0.8125rem",
                        color: ACCENT,
                        fontWeight: 500,
                      }}
                    >
                      Read Article →
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