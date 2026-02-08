"use client";

import { useState } from "react";
import Link from "next/link";
import { ACCENT, TEXT_DIM, GLASS, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTA } from "@/components/sections/Sections";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function BlogIndexPage() {
  const [h, sH] = useState<number | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <>
      {/* ── Header ── */}
      <section
        style={{
          padding: isMobile ? "6.25rem 1rem 2.5rem" : "8.125rem 2rem 3.75rem",
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
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
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "clamp(1.75rem, 8vw, 2.5rem)" : "clamp(2.25rem, 5vw, 3.5rem)",
                  lineHeight: 1.08,
                  color: "#fafafa",
                }}
              >
                Writing
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "clamp(1.25rem, 6vw, 1.75rem)" : "clamp(1.5rem, 3.2vw, 2.375rem)",
                  lineHeight: 1.12,
                  color: TEXT_DIM,
                  marginTop: "0.25rem",
                }}
              >
                &amp; deep dives.
              </span>
            </h1>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: isMobile ? "0.9375rem" : "1.0625rem",
                lineHeight: 1.7,
                color: TEXT_DIM,
                maxWidth: "33.75rem",
              }}
            >
              Engineering deep dives, architecture decisions, and lessons from building production
              systems. No fluff — just hard-won insights.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Blog cards ── */}
      <section
        style={{
          padding: isMobile ? "1rem 1rem 3rem" : "1.25rem 2rem 5rem",
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {BLOG_POSTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <Link
                href={`/blog/${p.slug}`}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => { sH(i); }}
                onMouseLeave={() => { sH(null); }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 0.4fr",
                    ...GLASS,
                    border: `0.0625rem solid ${h === i ? `${ACCENT}25` : "rgba(255,255,255,0.07)"}`,
                    borderRadius: "1rem",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: h === i ? `0 0.5rem 2.5rem ${ACCENT}06` : "none",
                  }}
                >
                  {/* ── Text side ── */}
                  <div
                    style={{
                      padding: isMobile ? "1.5rem 1.25rem" : "2.25rem 2rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      order: isMobile ? 2 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: isMobile ? "0.5rem" : "0.75rem",
                        alignItems: "center",
                        marginBottom: "1rem",
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
                      <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>
                        {p.date}
                      </span>
                      <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>·</span>
                      <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>
                        {p.readTime}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: isMobile ? "1.25rem" : "1.5rem",
                        fontWeight: 700,
                        color: "#fafafa",
                        margin: "0 0 0.75rem",
                        lineHeight: 1.25,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {p.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: isMobile ? "0.875rem" : "0.9375rem",
                        lineHeight: 1.7,
                        color: TEXT_DIM,
                        margin: "0 0 1.25rem",
                      }}
                    >
                      {p.excerpt}
                    </p>
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: "0.875rem",
                        color: h === i ? ACCENT : TEXT_DIM,
                        fontWeight: 500,
                        transition: "color 0.3s",
                      }}
                    >
                      Read Article →
                    </span>
                  </div>

                  {/* ── Visual side ── */}
                  <div
                    style={{
                      background: p.heroImage,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: isMobile ? "8rem" : "12.5rem",
                      order: isMobile ? 1 : 2,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.75rem",
                          background: `${ACCENT}12`,
                          border: `0.0625rem solid ${ACCENT}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.375rem",
                        }}
                      >
                        {p.tag === "AI / ML" ? "🧠" : p.tag === "Engineering" ? "⚡" : "🗂"}
                      </div>
                      <div
                        style={{
                          height: "0.25rem",
                          width: "3.75rem",
                          background: "rgba(255,255,255,0.08)",
                          borderRadius: "0.125rem",
                        }}
                      />
                      <div
                        style={{
                          height: "0.1875rem",
                          width: "2.5rem",
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "0.125rem",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
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