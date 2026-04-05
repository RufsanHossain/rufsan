"use client";

import { useState } from "react";
import Link from "next/link";
import { ACCENT, TEXT_DIM, SURFACE, GLASS, RESUME_URL, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { CASES } from "@/lib/cases";
import { BLOG_POSTS } from "@/lib/blog";
import { TESTIMONIALS } from "@/lib/testimonials";
import { HOME_STATS, HOME_VERTICALS, HOME_TOOLS } from "@/lib/verticals";
import { useInView } from "@/hooks/useInView";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FadeIn } from "@/components/ui/FadeIn";
import { CounterStat, SectionHeader, ProjectMockup } from "@/components/ui/Shared";
import { HeroSection } from "@/components/sections/HeroSection";
import { Toolkit, TestimonialsSection, BlogSection, CTA } from "@/components/sections/Sections";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { VerticalIcon } from "@/components/ui/VerticalIcons";

const FEATURED = [CASES[0], CASES[3], CASES[6]];

export default function HomePage() {
  const [vh, svh] = useState<string | null>(null);
  const [ph, sph] = useState<number | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [statsRef, statsVis] = useInView();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  return (
    <>
      <HeroSection
        badge="Available for projects"
        badgeIcon="pulse"
        h1={["I build", "intelligent", "software."]}
        subtitle="Senior Full-Stack Developer & Agency Founder specializing in AI-integrated SaaS products, scalable architectures, and data-driven solutions."
        btn1="View My Work →"
        btn2="Download Resume"
        on1={() => {
          document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" });
        }}
        on2={() => { setResumeOpen(true); }}
        btn2Resume
      />

      {/* ── Animated Stats ── */}
      <section
        ref={statsRef as React.RefObject<HTMLElement>}
        style={{
          padding: isMobile ? "1.25rem 1rem 3.5rem" : "1.25rem 2rem 5rem",
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(4, 1fr)",
            gap: "0.75rem",
          }}
        >
          {HOME_STATS.map((s, i) => (
            <FadeIn key={s.l} delay={i * 0.1}>
              <CounterStat value={s.v} label={s.l} trigger={statsVis} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── What I Do ── */}
      <section
        style={{
          padding: isMobile
            ? "2.5rem 1rem 3.5rem"
            : "2.5rem 2rem 5rem",
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
        <SectionHeader
          number="// 01"
          title="What I Do"
          desc="Three interconnected verticals — intelligent, data-driven software."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          {HOME_VERTICALS.map((v, i) => (
            <FadeIn key={v.id} delay={i * 0.08}>
              <Link
                href={v.route}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => { svh(v.id); }}
                onMouseLeave={() => { svh(null); }}
              >
                <div
                  style={{
                    padding: isMobile ? "1.75rem 1.25rem" : "2.25rem 1.75rem",
                    background:
                      vh === v.id
                        ? "rgba(255,255,255,0.05)"
                        : SURFACE,
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${vh === v.id ? `${ACCENT}30` : "rgba(255,255,255,0.07)"}`,
                    borderRadius: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: isMobile ? "auto" : "21.25rem",
                    boxShadow:
                      vh === v.id ? `0 0.5rem 2.5rem ${ACCENT}08` : "none",
                    transform:
                      vh === v.id ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "0.75rem",
                        background: `${ACCENT}0a`,
                        border: `1px solid ${ACCENT}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.375rem",
                      }}
                    >
                      <VerticalIcon name={v.icon} size={22} />
                    </div>
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.75rem",
                        color: `${ACCENT}60`,
                      }}
                    >
                      {v.n}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: isMobile ? "1.25rem" : "1.375rem",
                      fontWeight: 700,
                      color: "#fafafa",
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      color: TEXT_DIM,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {v.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.375rem",
                      marginTop: "1.5rem",
                    }}
                  >
                    {v.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.25rem 0.625rem",
                          background: `${ACCENT}08`,
                          border: `1px solid ${ACCENT}15`,
                          borderRadius: "0.375rem",
                          fontSize: "0.6875rem",
                          fontFamily: FONT_MONO,
                          color: ACCENT,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: "1.5rem",
                      paddingTop: "1.25rem",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      color: vh === v.id ? ACCENT : TEXT_DIM,
                      fontSize: "0.8125rem",
                      fontFamily: FONT_BODY,
                      fontWeight: 500,
                      transition: "color 0.3s",
                    }}
                  >
                    Explore →
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Featured Work ── */}
      <section
        id="featured-work"
        style={{
          padding: isMobile ? "3rem 1rem" : "5rem 2rem",
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
        <SectionHeader
          number="// 02"
          title="Featured Work"
          desc="Selected projects — outcomes, not just code."
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {FEATURED.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Link
                href={`/cases/${p.slug}`}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => { sph(i); }}
                onMouseLeave={() => { sph(null); }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
                    ...GLASS,
                    border: `1px solid ${ph === i ? `${ACCENT}25` : "rgba(255,255,255,0.07)"}`,
                    borderRadius: "1rem",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    boxShadow:
                      ph === i ? `0 0.5rem 2.5rem ${ACCENT}06` : "none",
                  }}
                >
                  {/* Mockup panel */}
                  <div
                    style={{
                      padding: isMobile ? "1rem" : "1.25rem",
                      order: isMobile ? 1 : undefined,
                    }}
                  >
                    <ProjectMockup project={p} carousel={false} />
                  </div>

                  {/* Text panel */}
                  <div
                    style={{
                      padding: isMobile
                        ? "1.25rem 1rem 1.5rem"
                        : "2rem 1.75rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      order: isMobile ? 2 : undefined,
                    }}
                  >
                    <span
                      style={{
                        padding: "0.1875rem 0.625rem",
                        background: `${ACCENT}10`,
                        border: `1px solid ${ACCENT}18`,
                        borderRadius: "0.375rem",
                        fontSize: "0.6875rem",
                        fontFamily: FONT_MONO,
                        color: ACCENT,
                        width: "fit-content",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {p.vertical}
                    </span>
                    <h3
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: isMobile ? "1.25rem" : "1.375rem",
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
                        margin: "0 0 1rem",
                      }}
                    >
                      {p.overview}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.375rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {p.stack.slice(0, isMobile ? 3 : 4).map((s) => (
                        <span
                          key={s}
                          style={{
                            padding: "0.25rem 0.625rem",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "0.375rem",
                            fontSize: "0.6875rem",
                            fontFamily: FONT_MONO,
                            color: TEXT_DIM,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        marginTop: "1rem",
                        color: ph === i ? ACCENT : TEXT_DIM,
                        fontSize: "0.8125rem",
                        fontFamily: FONT_BODY,
                        fontWeight: 500,
                        transition: "color 0.3s",
                      }}
                    >
                      View Case Study →
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <Toolkit
        number="// 03"
        title="Tech Stack"
        desc="Tools and technologies powering every project."
        tools={HOME_TOOLS}
      />
      <TestimonialsSection testimonials={TESTIMONIALS} />
      <BlogSection posts={BLOG_POSTS} />
      <CTA
        comment="// 06 — Let's Connect"
        heading="Have a project<br/>in mind?"
        sub="Whether it's a SaaS product, an AI integration, or a data pipeline — I'd love to hear about it."
        btn="Start a Conversation"
      />

      <ResumeModal
        open={resumeOpen}
        onClose={() => { setResumeOpen(false); }}
        resumeUrl={RESUME_URL}
      />
    </>
  );
}