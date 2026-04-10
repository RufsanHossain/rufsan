"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
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

import { VerticalIcon } from "@/components/ui/VerticalIcons";

const FEATURED = [CASES[0], CASES[3], CASES[6]];

export default function HomePage() {
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
        btn2="Get in Touch"
        on1={() => {
          document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" });
        }}
        on2={() => { window.location.href = "/contact"; }}
      />

      {/* ── Animated Stats ── */}
      <section
        ref={statsRef as React.RefObject<HTMLElement>}
        className={cn(
          "mx-auto max-w-[75rem]",
          isMobile ? "px-4 pt-5 pb-14" : "px-8 pt-5 pb-20"
        )}
      >
        <div
          className={cn(
            "grid gap-3",
            isMobile ? "grid-cols-2" : "grid-cols-4"
          )}
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
        className={cn(
          "mx-auto max-w-[75rem]",
          isMobile ? "px-4 pt-10 pb-14" : "px-8 pt-10 pb-20"
        )}
      >
        <SectionHeader
          number="// 01"
          title="What I Do"
          desc="Three interconnected verticals — intelligent, data-driven software."
        />
        <div
          className={cn(
            "grid gap-4",
            isMobile
              ? "grid-cols-1"
              : isTablet
                ? "grid-cols-2"
                : "grid-cols-3"
          )}
        >
          {HOME_VERTICALS.map((v, i) => (
            <FadeIn key={v.id} delay={i * 0.08}>
              <Link
                href={v.route}
                className="no-underline group"
              >
                <div
                  className={cn(
                    "flex flex-col rounded-2xl cursor-pointer transition-all duration-300",
                    "bg-surface backdrop-blur-[20px] border border-overlay-border",
                    "hover:bg-white/[0.05] hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_0.5rem_2.5rem_rgba(141,234,178,0.03)]",
                    isMobile ? "p-[1.75rem_1.25rem] min-h-0" : "p-[2.25rem_1.75rem] min-h-[21.25rem]"
                  )}
                >
                  <div className="flex justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/[0.04] border border-accent/[0.09] flex items-center justify-center text-[1.375rem]">
                      <VerticalIcon name={v.icon} size={22} />
                    </div>
                    <span className="font-mono text-xs text-accent/60">
                      {v.n}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "font-display font-bold text-fg mb-3",
                      isMobile ? "text-xl" : "text-[1.375rem]"
                    )}
                  >
                    {v.title}
                  </h3>
                  <p className="font-body text-sm leading-[1.7] text-text-dim flex-1">
                    {v.desc}
                  </p>
                  <div className="flex flex-wrap gap-[0.375rem] mt-6">
                    {v.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-accent/[0.03] border border-accent/[0.08] rounded-md text-[0.6875rem] font-mono text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/[0.05] text-text-dim group-hover:text-accent text-[0.8125rem] font-body font-medium transition-colors duration-300">
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
        className={cn(
          "mx-auto max-w-[75rem]",
          isMobile ? "px-4 py-12" : "px-8 py-20"
        )}
      >
        <SectionHeader
          number="// 02"
          title="Featured Work"
          desc="Selected projects — outcomes, not just code."
        />
        <div className="flex flex-col gap-4">
          {FEATURED.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Link
                href={`/cases/${p.slug}`}
                className="no-underline group"
              >
                <div
                  className={cn(
                    "grid rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
                    "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border",
                    "hover:border-accent/[0.15] hover:shadow-[0_0.5rem_2.5rem_rgba(141,234,178,0.02)]",
                    isMobile ? "grid-cols-1" : "grid-cols-[1fr_1.1fr]"
                  )}
                >
                  {/* Mockup panel */}
                  <div
                    className={cn(
                      isMobile ? "p-4 order-1" : "p-5"
                    )}
                  >
                    <ProjectMockup project={p} carousel={false} />
                  </div>

                  {/* Text panel */}
                  <div
                    className={cn(
                      "flex flex-col justify-center",
                      isMobile ? "px-4 pt-5 pb-6 order-2" : "p-[2rem_1.75rem]"
                    )}
                  >
                    <span className="px-2.5 py-[0.1875rem] bg-accent/[0.06] border border-accent/[0.09] rounded-md text-[0.6875rem] font-mono text-accent w-fit mb-3">
                      {p.vertical}
                    </span>
                    <h3
                      className={cn(
                        "font-display font-bold text-fg mb-2",
                        isMobile ? "text-xl" : "text-[1.375rem]"
                      )}
                    >
                      {p.title}
                    </h3>
                    <p className="font-body text-sm leading-[1.7] text-text-dim mb-4">
                      {p.overview}
                    </p>
                    <div className="flex gap-[0.375rem] flex-wrap">
                      {p.stack.slice(0, isMobile ? 3 : 4).map((s) => (
                        <span
                          key={s}
                          className="py-1 px-2.5 bg-overlay-subtle border border-overlay-border-subtle rounded-md text-[0.6875rem] font-mono text-text-dim"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-text-dim group-hover:text-accent text-[0.8125rem] font-body font-medium transition-colors duration-300">
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

      {/* ── Currently ── */}
      <section className={cn("mx-auto max-w-[75rem]", isMobile ? "px-4 py-12" : "px-8 py-20")}>
        <SectionHeader number="// Now" title="Currently" desc="What I'm building right now." />
        <div
          className={cn(
            "grid gap-4 mt-8",
            isMobile ? "grid-cols-1" : "grid-cols-3"
          )}
        >
          <FadeIn>
            <div
              className={cn(
                "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-2xl border-l-[0.1875rem] border-l-accent h-full",
                isMobile ? "p-[1.5rem_1.25rem]" : "p-[2rem_1.75rem]"
              )}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/[0.07] border border-accent/[0.12] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                    <line x1="9" y1="21" x2="15" y2="21" />
                    <line x1="10" y1="24" x2="14" y2="24" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-accent font-semibold uppercase tracking-[0.05em]">Building</span>
              </div>
              <h3 className={cn("font-display font-bold text-fg mb-2", isMobile ? "text-[1.125rem]" : "text-xl")}>
                <Link href="/cases/sorushi-journal" className="text-inherit no-underline">Sorushi</Link>
              </h3>
              <p className="font-body text-sm leading-[1.7] text-text-dim">
                AI-powered journal that thinks back — challenge questions, pattern recognition, coaching prompts, and weekly synthesis reports. In public beta.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              className={cn(
                "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-2xl border-l-[0.1875rem] border-l-accent h-full",
                isMobile ? "p-[1.5rem_1.25rem]" : "p-[2rem_1.75rem]"
              )}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/[0.07] border border-accent/[0.12] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-accent font-semibold uppercase tracking-[0.05em]">Building</span>
              </div>
              <h3 className={cn("font-display font-bold text-fg mb-2", isMobile ? "text-[1.125rem]" : "text-xl")}>
                Rufsan Shares
              </h3>
              <p className="font-body text-sm leading-[1.7] text-text-dim">
                Multi-user blogging platform with role-based access, rich text editor, and newsletter integration. Built with Next.js 16, Better Auth, and Prisma 7.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div
              className={cn(
                "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-2xl border-l-[0.1875rem] border-l-accent h-full",
                isMobile ? "p-[1.5rem_1.25rem]" : "p-[2rem_1.75rem]"
              )}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/[0.07] border border-accent/[0.12] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path d="m9 14 2 2 4-4" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-accent font-semibold uppercase tracking-[0.05em]">Building</span>
              </div>
              <h3 className={cn("font-display font-bold text-fg mb-2", isMobile ? "text-[1.125rem]" : "text-xl")}>
                Audex
              </h3>
              <p className="font-body text-sm leading-[1.7] text-text-dim">
                AI-powered code quality analysis platform — TypeScript monorepo with background workers, real-time updates, and modular packages. Built with Turborepo and pnpm.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA
        comment="// 06 — Let's Connect"
        heading="Have a project<br/>in mind?"
        sub="Whether it's a SaaS product, an AI integration, or a data pipeline — I'd love to hear about it."
        btn="Start a Conversation"
      />
    </>
  );
}
