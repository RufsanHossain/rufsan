"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ACCENT, TEXT, TEXT_DIM, SURFACE, GLASS, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger } from "@/components/ui/Stagger";
import { SectionHeader } from "@/components/ui/Shared";
import { ExtIcon } from "@/components/ui/Icons";
import { VerticalIcon } from "@/components/ui/VerticalIcons";
import type { Capability, ToolCategory, Principle } from "@/lib/verticals";
import type { CaseStudy } from "@/lib/cases";
import type { Testimonial } from "@/lib/testimonials";
import type { BlogPost } from "@/lib/blog";

// ─── CAP GRID ────────────────────────────────────────────────

export function CapGrid({ items }: { items: Capability[] }) {
  const [h, sH] = useState<number | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <Stagger columns={3} mobileColumns={1} tabletColumns={2}>
      {items.map((c, i) => (
        <div
          key={i}
          onMouseEnter={() => { sH(i); }}
          onMouseLeave={() => { sH(null); }}
          style={{
            padding: isMobile ? "1.5rem 1.25rem" : "2rem 1.5rem",
            background: h === i ? "rgba(255,255,255,0.05)" : SURFACE,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${h === i ? `${ACCENT}30` : "rgba(255,255,255,0.07)"}`,
            borderRadius: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            boxShadow: h === i ? `0 0.5rem 2.5rem ${ACCENT}08` : "none",
            transform: h === i ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div
              style={{
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "0.75rem",
                background: `${ACCENT}0a`,
                border: `1px solid ${ACCENT}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
              }}
            >
              <VerticalIcon name={c.icon} size={20} />
            </div>
            <h3
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "#fafafa",
                margin: 0,
              }}
            >
              {c.title}
            </h3>
          </div>
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
            {c.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "1.25rem" }}>
            {c.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.1875rem 0.5625rem",
                  background: `${ACCENT}08`,
                  border: `1px solid ${ACCENT}15`,
                  borderRadius: "0.375rem",
                  fontSize: "0.6875rem",
                  fontFamily: FONT_MONO,
                  color: ACCENT,
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </Stagger>
  );
}

// ─── CASE STUDY LIST ─────────────────────────────────────────

export function CSList({ projects }: { projects: CaseStudy[] }) {
  const [exp, sExp] = useState<number | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {projects.map((p, i) => (
        <FadeIn key={i} delay={i * 0.1}>
          <div
            style={{
              ...GLASS,
              border: `1px solid ${exp === i ? `${ACCENT}25` : "rgba(255,255,255,0.07)"}`,
              borderRadius: "1rem",
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: exp === i ? `0 0.5rem 2.5rem ${ACCENT}06` : "none",
            }}
          >
            {/* Header row */}
            <button
              type="button"
              onClick={() => { sExp(exp === i ? null : i); }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                padding: isMobile ? "1.25rem 1rem" : "2rem",
                cursor: "pointer",
                gap: isMobile ? "0.75rem" : "1.5rem",
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                color: "inherit",
                font: "inherit",
              }}
            >
              <div>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}18`,
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    fontFamily: FONT_MONO,
                    color: ACCENT,
                    fontWeight: 600,
                    display: "inline-block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {p.outcome}
                </span>
                <h3
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: isMobile ? "1.25rem" : "1.5rem",
                    fontWeight: 700,
                    color: "#fafafa",
                    margin: "0 0 0.5rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: TEXT_DIM,
                    margin: 0,
                  }}
                >
                  {p.overview}
                </p>
              </div>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.625rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: ACCENT,
                  fontSize: "1.125rem",
                  flexShrink: 0,
                  alignSelf: "center",
                  transition: "transform 0.3s",
                  transform: exp === i ? "rotate(180deg)" : "rotate(0)",
                }}
              >
                ↓
              </div>
            </button>

            {/* Expanded content */}
            {exp === i && (
              <div
                style={{
                  padding: isMobile ? "0 1rem 1.25rem" : "0 2rem 2rem",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: isMobile ? "1rem" : "1.5rem",
                }}
              >
                {/* Challenge / Solution */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "1rem" : "2rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: ACCENT,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.625rem",
                        fontFamily: FONT_BODY,
                      }}
                    >
                      Challenge
                    </h4>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: TEXT_DIM,
                        margin: 0,
                        fontFamily: FONT_BODY,
                      }}
                    >
                      {p.challenge}
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: ACCENT,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.625rem",
                        fontFamily: FONT_BODY,
                      }}
                    >
                      Solution
                    </h4>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: TEXT_DIM,
                        margin: 0,
                        fontFamily: FONT_BODY,
                      }}
                    >
                      {p.solutionSteps[0]}
                    </p>
                  </div>
                </div>

                {/* Stack tags + action buttons */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "stretch" : "center",
                    gap: isMobile ? "1rem" : "0.5rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {p.stack.slice(0, isMobile ? 4 : 5).map((s) => (
                      <span
                        key={s}
                        style={{
                          padding: "0.3125rem 0.75rem",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "0.375rem",
                          fontSize: "0.75rem",
                          fontFamily: FONT_MONO,
                          color: TEXT,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.625rem",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "0.5rem 1.25rem",
                          borderRadius: "0.5rem",
                          color: TEXT,
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          fontFamily: FONT_BODY,
                          textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${ACCENT}30`;
                          e.currentTarget.style.color = ACCENT;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                          e.currentTarget.style.color = TEXT;
                        }}
                      >
                        <ExtIcon /> Live Site
                      </a>
                    )}
                    <Link
                      href={`/cases/${p.slug}`}
                      onClick={(e) => { e.stopPropagation(); }}
                      style={{
                        background: `${ACCENT}12`,
                        border: `1px solid ${ACCENT}25`,
                        padding: "0.5rem 1.25rem",
                        borderRadius: "0.5rem",
                        color: ACCENT,
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        fontFamily: FONT_BODY,
                        textDecoration: "none",
                      }}
                    >
                      Full Case Study →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

// ─── TOOLKIT ─────────────────────────────────────────────────

export function Toolkit({
  number,
  title,
  desc,
  tools,
}: {
  number: string;
  title: string;
  desc: string;
  tools: ToolCategory[];
}) {
  const [ac, sAc] = useState(tools[0].category);
  const [h, sH] = useState<string | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <section
      style={{
        padding: isMobile ? "2.5rem 1rem" : "5rem 2rem",
        maxWidth: "75rem",
        margin: "0 auto",
      }}
    >
      <SectionHeader number={number} title={title} desc={desc} />

      {/* Tab bar — wrapping grid on mobile, inline row on desktop */}
      <FadeIn>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : `repeat(${String(tools.length)}, auto)`,
            gap: isMobile ? "0.375rem" : "0.25rem",
            marginBottom: isMobile ? "1.5rem" : "2rem",
            padding: "0.25rem",
            ...GLASS,
            borderRadius: isMobile ? "0.75rem" : "0.625rem",
            width: isMobile ? "100%" : "fit-content",
          }}
        >
          {tools.map((t) => (
            <button
              key={t.category}
              onClick={() => { sAc(t.category); }}
              style={{
                background: ac === t.category ? "rgba(255,255,255,0.08)" : "transparent",
                border: ac === t.category
                  ? `1px solid ${ACCENT}20`
                  : "1px solid transparent",
                padding: isMobile ? "0.5rem 0.75rem" : "0.5rem 1.125rem",
                borderRadius: "0.4375rem",
                color: ac === t.category ? "#fafafa" : TEXT_DIM,
                fontSize: isMobile ? "0.75rem" : "0.8125rem",
                fontFamily: FONT_BODY,
                fontWeight: ac === t.category ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {t.category}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Tool items grid */}
      <Stagger columns={5} mobileColumns={2} tabletColumns={3} gap={12}>
        {tools
          .find((t) => t.category === ac)
          ?.items.map((item) => (
            <div
              key={item}
              onMouseEnter={() => { sH(item); }}
              onMouseLeave={() => { sH(null); }}
              style={{
                padding: isMobile ? "1.5rem 1rem" : "2rem 1.25rem",
                ...GLASS,
                border: `1px solid ${h === item ? `${ACCENT}25` : "rgba(255,255,255,0.07)"}`,
                borderRadius: "0.875rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                cursor: "pointer",
                transition: "all 0.2s",
                minHeight: isMobile ? "5.5rem" : "6.875rem",
                boxShadow: h === item ? `0 0.25rem 1.5rem ${ACCENT}06` : "none",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.625rem",
                  background: `${ACCENT}08`,
                  border: `1px solid ${h === item ? `${ACCENT}30` : `${ACCENT}12`}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_MONO,
                  fontSize: "0.875rem",
                  color: ACCENT,
                  fontWeight: 600,
                  transition: "border-color 0.2s",
                }}
              >
                {item.charAt(0)}
              </div>
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: h === item ? "#fafafa" : TEXT_DIM,
                  transition: "color 0.2s",
                  textAlign: "center",
                }}
              >
                {item}
              </span>
            </div>
          ))}
      </Stagger>
    </section>
  );
}

// ─── PRINCIPLES ROW ──────────────────────────────────────────

export function PRRow({ items }: { items: Principle[] }) {
  const [h, sH] = useState<number | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <Stagger columns={items.length} mobileColumns={1} tabletColumns={2} gap={12}>
      {items.map((p, i) => (
        <div
          key={i}
          onMouseEnter={() => { sH(i); }}
          onMouseLeave={() => { sH(null); }}
          style={{
            padding: isMobile ? "1.25rem 1rem" : "1.75rem 1.5rem",
            ...GLASS,
            border: `1px solid ${h === i ? `${ACCENT}25` : "rgba(255,255,255,0.07)"}`,
            borderRadius: "0.875rem",
            transition: "all 0.3s",
            cursor: "default",
            boxShadow: h === i ? `0 0.25rem 1.5rem ${ACCENT}06` : "none",
            position: "relative",
          }}
        >
          {p.step && (
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: isMobile ? "2.5rem" : "3rem",
                fontWeight: 800,
                color: `${ACCENT}10`,
                position: "absolute",
                top: "0.75rem",
                right: "1rem",
                lineHeight: 1,
              }}
            >
              {p.step}
            </span>
          )}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
                background: ACCENT,
                marginBottom: "1rem",
                boxShadow: `0 0 0.5rem ${ACCENT}40`,
              }}
            />
            <h4
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1rem",
                fontWeight: 700,
                color: "#fafafa",
                margin: "0 0 0.5rem",
              }}
            >
              {p.title}
            </h4>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: "0.8125rem",
                lineHeight: 1.6,
                color: TEXT_DIM,
                margin: 0,
              }}
            >
              {p.description}
            </p>
          </div>
        </div>
      ))}
    </Stagger>
  );
}

// ─── CTA ─────────────────────────────────────────────────────

export function CTA({
  comment,
  heading,
  sub,
  btn,
  href = "/contact",
}: {
  comment: string;
  heading: string;
  sub: string;
  btn: string;
  href?: string;
}) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <section
      style={{
        padding: isMobile ? "2.5rem 1rem" : "5rem 2rem",
        maxWidth: "75rem",
        margin: "0 auto",
      }}
    >
      <FadeIn>
        <div
          style={{
            ...GLASS,
            borderRadius: isMobile ? "1.25rem" : "1.5rem",
            padding: isMobile ? "3rem 1.5rem" : "5rem 3.75rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "37.5rem",
              height: "37.5rem",
              background: `radial-gradient(circle, ${ACCENT}05 0%, transparent 70%)`,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.8125rem",
                color: ACCENT,
                fontWeight: 500,
                display: "block",
                marginBottom: "1.25rem",
              }}
            >
              {comment}
            </span>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
                fontWeight: 800,
                color: "#fafafa",
                letterSpacing: "-0.03em",
                margin: "0 0 1rem",
                lineHeight: 1.1,
              }}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: isMobile ? "0.875rem" : "1rem",
                color: TEXT_DIM,
                lineHeight: 1.7,
                maxWidth: "30rem",
                margin: "0 auto 2.5rem",
              }}
            >
              {sub}
            </p>
            <Link
              href={href}
              style={{
                display: "inline-block",
                background: ACCENT,
                color: "#050505",
                border: "none",
                padding: isMobile ? "0.875rem 2rem" : "1rem 2.5rem",
                borderRadius: "0.625rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
                fontFamily: FONT_BODY,
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {btn}
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  useEffect(() => {
    const timer = setInterval(() => { setActive((p) => (p + 1) % testimonials.length); }, 5000);
    return () => { clearInterval(timer); };
  }, [testimonials.length]);

  return (
    <section
      style={{
        padding: isMobile ? "2.5rem 1rem" : "5rem 2rem",
        maxWidth: "75rem",
        margin: "0 auto",
      }}
    >
      <SectionHeader
        number="// 04"
        title="What Clients Say"
        desc="Outcomes over opinions — hear from the people I've built for."
      />
      <FadeIn>
        <div
          style={{
            ...GLASS,
            borderRadius: isMobile ? "1rem" : "1.25rem",
            padding: isMobile ? "2rem 1.25rem" : "3rem 3.5rem",
            position: "relative",
            minHeight: isMobile ? "auto" : "15rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: isMobile ? "0.75rem" : "1.5rem",
              right: isMobile ? "1rem" : "2rem",
              fontFamily: FONT_DISPLAY,
              fontSize: isMobile ? "4.5rem" : "7.5rem",
              color: `${ACCENT}08`,
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            &ldquo;
          </div>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.5s ease",
                position: active === i ? "relative" : "absolute",
                top: active === i ? "auto" : isMobile ? "2rem" : "3rem",
                left: active === i ? "auto" : isMobile ? "1.25rem" : "3.5rem",
                right: active === i ? "auto" : isMobile ? "1.25rem" : "3.5rem",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: isMobile ? "0.9375rem" : "1.125rem",
                  lineHeight: 1.8,
                  color: TEXT,
                  margin: "0 0 2rem",
                  fontStyle: "italic",
                  maxWidth: "43.75rem",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "0.75rem",
                    background: `${ACCENT}12`,
                    border: `1px solid ${ACCENT}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_DISPLAY,
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: ACCENT,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "0.9375rem", fontWeight: 600, color: "#fafafa" }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "0.8125rem", color: TEXT_DIM }}>
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); }}
                style={{
                  width: active === i ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  borderRadius: "0.25rem",
                  background: active === i ? ACCENT : "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── BLOG SECTION (HOME) ─────────────────────────────────────

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  const [h, sH] = useState<number | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <section
      style={{
        padding: isMobile ? "2.5rem 1rem" : "5rem 2rem",
        maxWidth: "75rem",
        margin: "0 auto",
      }}
    >
      <FadeIn>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? "2rem" : "3.5rem",
            gap: isMobile ? "1rem" : "0",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: "0.8125rem", color: ACCENT, fontWeight: 500 }}>
                // 05
              </span>
              <div style={{ height: 1, width: "3rem", background: `${ACCENT}40` }} />
            </div>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Writing
            </h2>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: isMobile ? "0.875rem" : "1rem",
                color: TEXT_DIM,
                lineHeight: 1.7,
                marginTop: "0.75rem",
                maxWidth: "37.5rem",
              }}
            >
              Sharing what I learn — engineering deep dives and architecture decisions.
            </p>
          </div>
          <Link
            href="/blog"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              color: TEXT_DIM,
              fontSize: "0.8125rem",
              fontFamily: FONT_BODY,
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            View All Articles →
          </Link>
        </div>
      </FadeIn>

      <Stagger columns={3} mobileColumns={1} tabletColumns={2}>
        {posts.map((p, i) => (
          <Link
            key={p.id}
            href={`/blog/${p.slug}`}
            style={{ textDecoration: "none" }}
            onMouseEnter={() => { sH(i); }}
            onMouseLeave={() => { sH(null); }}
          >
            <div
              style={{
                padding: isMobile ? "1.5rem 1.25rem" : "2rem 1.5rem",
                ...GLASS,
                border: `1px solid ${h === i ? `${ACCENT}25` : "rgba(255,255,255,0.07)"}`,
                borderRadius: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                transform: h === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: h === i ? `0 0.5rem 2.5rem ${ACCENT}08` : "none",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    padding: "0.1875rem 0.625rem",
                    background: `${ACCENT}08`,
                    border: `1px solid ${ACCENT}15`,
                    borderRadius: "0.375rem",
                    fontSize: "0.6875rem",
                    fontFamily: FONT_MONO,
                    color: ACCENT,
                    fontWeight: 500,
                  }}
                >
                  {p.tag}
                </span>
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.6875rem", color: TEXT_DIM }}>
                  {p.readTime}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#fafafa",
                  margin: "0 0 0.75rem",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
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
                {p.excerpt}
              </p>
              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.6875rem", color: TEXT_DIM }}>
                  {p.date}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: h === i ? ACCENT : TEXT_DIM,
                    fontFamily: FONT_BODY,
                    fontWeight: 500,
                    transition: "color 0.3s",
                  }}
                >
                  Read →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Stagger>
    </section>
  );
}