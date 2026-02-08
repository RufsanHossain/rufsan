"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACCENT, TEXT_DIM, GLASS, RESUME_URL, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { TIMELINE } from "@/lib/verticals";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger } from "@/components/ui/Stagger";
import { SectionHeader } from "@/components/ui/Shared";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTA } from "@/components/sections/Sections";
import { useBreakpoint } from "@/hooks/useBreakpoint";

function handleDownloadResume() {
  const link = document.createElement("a");
  link.href = RESUME_URL;
  link.download = "Rufsan-Brand-Palette.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function AboutPage() {
  const router = useRouter();
  const [tH, stH] = useState<number | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  return (
    <>
      <HeroSection
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        h1={["Engineer.", "Founder.", "Builder."]}
        subtitle="I'm Rufsan — a senior full-stack developer and agency founder building intelligent SaaS products for the US market."
        btn1="View My Work →"
        btn2="Download Resume"
        on1={() => { router.push("/dev"); }}
        on2={handleDownloadResume}
        btn2Resume
      />

      {/* ── About Me ── */}
      <section
        style={{
          padding: isMobile ? "1.5rem 1rem 3rem" : "2.5rem 2rem 5rem",
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
        <SectionHeader number="// 01" title="About Me" />
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "1.5rem" : "3rem",
            }}
          >
            <div style={{ fontFamily: FONT_BODY, fontSize: isMobile ? "0.9375rem" : "1rem", lineHeight: 1.8, color: TEXT_DIM }}>
              <p style={{ margin: "0 0 1.25rem" }}>
                I specialize in turning complex business ideas into production-ready software at the
                intersection of <span style={{ color: ACCENT }}>AI/ML</span>,{" "}
                <span style={{ color: ACCENT }}>full-stack development</span>, and{" "}
                <span style={{ color: ACCENT }}>data science</span>.
              </p>
              <p style={{ margin: 0 }}>
                Over 5+ years and 40+ projects, I&apos;ve built everything from multi-tenant SaaS
                platforms generating $2M+ ARR to AI-powered QA tools that cut testing cycles by 60%.
              </p>
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: isMobile ? "0.9375rem" : "1rem", lineHeight: 1.8, color: TEXT_DIM }}>
              <p style={{ margin: "0 0 1.25rem" }}>
                My approach is domain-first: model the business before writing code, work backwards
                from the end goal, treat security and performance as non-negotiable.
              </p>
              <p style={{ margin: 0 }}>
                Based in Dhaka, working primarily with US-market clients building commercially viable
                products.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Values ── */}
      <section
        style={{
          padding: isMobile ? "2.5rem 1rem" : "5rem 2rem",
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
        <SectionHeader number="// 02" title="Values" desc="What drives how I work." />
        <Stagger columns={3} mobileColumns={1} tabletColumns={2}>
          {[
            {
              title: "Craft Over Speed",
              desc: "Clean architecture and strict standards over quick hacks. Every shortcut costs more later.",
            },
            {
              title: "Business First",
              desc: "Code exists to solve business problems. I think in outcomes, not features.",
            },
            {
              title: "Continuous Learning",
              desc: "AI, ML, and the stack evolve daily. I stay current so my clients stay ahead.",
            },
          ].map((v, i) => (
            <div key={i} style={{ padding: isMobile ? "1.75rem 1.25rem" : "2.25rem 1.75rem", ...GLASS, borderRadius: "1rem" }}>
              <div
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  borderRadius: "50%",
                  background: ACCENT,
                  marginBottom: "1.25rem",
                  boxShadow: `0 0 0.5rem ${ACCENT}40`,
                }}
              />
              <h3
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: isMobile ? "1.125rem" : "1.25rem",
                  fontWeight: 700,
                  color: "#fafafa",
                  margin: "0 0 0.75rem",
                }}
              >
                {v.title}
              </h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", lineHeight: 1.7, color: TEXT_DIM, margin: 0 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </Stagger>
      </section>

      {/* ── Experience / Timeline ── */}
      <section
        style={{
          padding: isMobile ? "2.5rem 1rem" : "5rem 2rem",
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
        <SectionHeader number="// 03" title="Experience" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {TIMELINE.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                onMouseEnter={() => { stH(i); }}
                onMouseLeave={() => { stH(null); }}
                style={{
                  display: isMobile ? "flex" : "grid",
                  flexDirection: isMobile ? "column" : undefined,
                  gridTemplateColumns: isMobile ? undefined : isTablet ? "8.75rem 1fr" : "11.25rem 1fr",
                  gap: isMobile ? "0.5rem" : isTablet ? "1.5rem" : "2.5rem",
                  padding: isMobile ? "1.5rem 0" : "2rem 0",
                  borderBottom: "0.0625rem solid rgba(255,255,255,0.05)",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: isMobile ? "0.8125rem" : "0.875rem",
                    color: tH === i ? ACCENT : TEXT_DIM,
                    fontWeight: 500,
                    paddingTop: isMobile ? 0 : "0.25rem",
                    transition: "color 0.2s",
                  }}
                >
                  {t.year}
                </span>
                <div>
                  <h4
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: isMobile ? "1rem" : "1.125rem",
                      fontWeight: 700,
                      color: "#fafafa",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    {t.role}
                  </h4>
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: "0.875rem",
                      color: ACCENT,
                      display: "block",
                      marginBottom: "0.625rem",
                    }}
                  >
                    {t.company}
                  </span>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", lineHeight: 1.7, color: TEXT_DIM, margin: 0 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTA
        comment="// Let's work together"
        heading="Ready to build<br/>something great?"
        sub="Open to interesting projects and long-term collaborations."
        btn="Get in Touch"
      />
    </>
  );
}