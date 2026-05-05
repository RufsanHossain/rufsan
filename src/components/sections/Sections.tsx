"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger } from "@/components/ui/Stagger";
import { SectionHeader } from "@/components/ui/Shared";
import { ExtIcon } from "@/components/ui/Icons";
import { VerticalIcon } from "@/components/ui/VerticalIcons";
import type { Capability, ToolCategory, Principle } from "@/lib/verticals";
import type { CaseStudy } from "@/lib/content-types";
import type { Testimonial } from "@/lib/testimonials";
import type { BlogPost } from "@/lib/content-types";

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
          className={cn(
            "backdrop-blur-[20px] rounded-[1rem] cursor-default transition-all duration-300 flex flex-col",
            isMobile ? "p-[1.5rem_1.25rem]" : "p-[2rem_1.5rem]",
            h === i
              ? "bg-white/[0.05] border border-accent/[0.19] shadow-[0_0.5rem_2.5rem_rgba(141,234,178,0.03)] -translate-y-1"
              : "bg-surface border border-overlay-border shadow-none translate-y-0"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[2.75rem] h-[2.75rem] rounded-[0.75rem] bg-accent/[0.04] border border-accent/[0.094] flex items-center justify-center text-[1.25rem] text-accent">
              <VerticalIcon name={c.icon} size={20} />
            </div>
            <h3 className="font-display text-[1.0625rem] font-bold text-fg m-0">
              {c.title}
            </h3>
          </div>
          <p className="font-body text-[0.8125rem] leading-[1.7] text-text-dim m-0 flex-1">
            {c.description}
          </p>
          <div className="flex flex-wrap gap-[0.375rem] mt-5">
            {c.tags.map((tag) => (
              <span
                key={tag}
                className="py-[0.1875rem] px-[0.5625rem] bg-accent/[0.03] border border-accent/[0.08] rounded-[0.375rem] text-[0.6875rem] font-mono text-accent font-medium"
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
    <div className="flex flex-col gap-4">
      {projects.map((p, i) => (
        <FadeIn key={i} delay={i * 0.1}>
          <div
            className={cn(
              "bg-overlay-subtle backdrop-blur-[20px] rounded-[1rem] overflow-hidden transition-all duration-300",
              exp === i
                ? "border border-accent/[0.145] shadow-[0_0.5rem_2.5rem_rgba(141,234,178,0.024)]"
                : "border border-overlay-border shadow-none"
            )}
          >
            {/* Header row */}
            <button
              type="button"
              onClick={() => { sExp(exp === i ? null : i); }}
              className={cn(
                "grid grid-cols-[1fr_auto] cursor-pointer bg-transparent border-none w-full text-left text-inherit font-[inherit]",
                isMobile ? "p-[1.25rem_1rem] gap-3" : "p-8 gap-6"
              )}
            >
              <div>
                <span className="py-1 px-3 bg-accent/[0.06] border border-accent/[0.094] rounded-[0.375rem] text-xs font-mono text-accent font-semibold inline-block mb-3">
                  {p.outcome}
                </span>
                <h3
                  className={cn(
                    "font-display font-bold text-fg mb-2 mt-0",
                    isMobile ? "text-[1.25rem]" : "text-2xl"
                  )}
                >
                  {p.title}
                </h3>
                <p className="font-body text-sm leading-[1.7] text-text-dim m-0">
                  {p.overview}
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-[0.625rem] bg-overlay-subtle border border-overlay-border flex items-center justify-center text-accent text-[1.125rem] shrink-0 self-center transition-transform duration-300"
                style={{ transform: exp === i ? "rotate(180deg)" : "rotate(0)" }}
              >
                ↓
              </div>
            </button>

            {/* Expanded content */}
            {exp === i && (
              <div
                className={cn(
                  "border-t border-white/[0.05]",
                  isMobile ? "px-4 pb-5 pt-4" : "px-8 pb-8 pt-6"
                )}
              >
                {/* Challenge / Solution */}
                <div
                  className={cn(
                    "grid mb-6",
                    isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-8"
                  )}
                >
                  <div>
                    <h4 className="text-[0.8125rem] font-semibold text-accent uppercase tracking-[0.05em] mb-[0.625rem] font-body">
                      Challenge
                    </h4>
                    <p className="text-sm leading-[1.7] text-text-dim m-0 font-body">
                      {p.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[0.8125rem] font-semibold text-accent uppercase tracking-[0.05em] mb-[0.625rem] font-body">
                      Solution
                    </h4>
                    <p className="text-sm leading-[1.7] text-text-dim m-0 font-body">
                      {p.solutionSteps[0]}
                    </p>
                  </div>
                </div>

                {/* Stack tags + action buttons */}
                <div
                  className={cn(
                    "flex",
                    isMobile
                      ? "flex-col items-stretch gap-4"
                      : "flex-row justify-between items-center gap-2"
                  )}
                >
                  <div className="flex gap-2 flex-wrap">
                    {p.stack.slice(0, isMobile ? 4 : 5).map((s) => (
                      <span
                        key={s}
                        className="py-[0.3125rem] px-3 bg-overlay-subtle border border-overlay-border rounded-[0.375rem] text-xs font-mono text-text"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-[0.625rem] items-center flex-wrap">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); }}
                        className="inline-flex items-center gap-[0.375rem] bg-overlay-subtle border border-overlay-border py-2 px-5 rounded-lg text-text text-[0.8125rem] font-medium font-body no-underline transition-all duration-200 hover:border-accent/[0.19] hover:text-accent"
                      >
                        <ExtIcon /> Live Site
                      </a>
                    )}
                    <Link
                      href={`/cases/${p.slug}`}
                      onClick={(e) => { e.stopPropagation(); }}
                      className="bg-accent/[0.07] border border-accent/[0.145] py-2 px-5 rounded-lg text-accent text-[0.8125rem] font-semibold font-body no-underline"
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
      className={cn(
        "max-w-[75rem] mx-auto",
        isMobile ? "py-10 px-4" : "py-20 px-8"
      )}
    >
      <SectionHeader number={number} title={title} desc={desc} />

      {/* Tab bar */}
      <FadeIn>
        <div
          className={cn(
            "grid p-1 bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border",
            isMobile
              ? "grid-cols-2 gap-[0.375rem] mb-6 rounded-[0.75rem] w-full"
              : "gap-1 mb-8 rounded-[0.625rem] w-fit"
          )}
          style={
            !isMobile
              ? { gridTemplateColumns: `repeat(${String(tools.length)}, auto)` }
              : undefined
          }
        >
          {tools.map((t) => (
            <button
              key={t.category}
              onClick={() => { sAc(t.category); }}
              className={cn(
                "rounded-[0.4375rem] font-body cursor-pointer transition-all duration-200 whitespace-nowrap text-center",
                isMobile ? "py-2 px-3 text-xs" : "py-2 px-[1.125rem] text-[0.8125rem]",
                ac === t.category
                  ? "bg-overlay-active border border-accent/[0.125] text-fg font-semibold"
                  : "bg-transparent border border-transparent text-text-dim font-medium"
              )}
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
              className={cn(
                "bg-overlay-subtle backdrop-blur-[20px] rounded-[0.875rem] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200",
                isMobile
                  ? "p-[1.5rem_1rem] min-h-[5.5rem]"
                  : "p-[2rem_1.25rem] min-h-[6.875rem]",
                h === item
                  ? "border border-accent/[0.145] shadow-[0_0.25rem_1.5rem_rgba(141,234,178,0.024)]"
                  : "border border-overlay-border shadow-none"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-[0.625rem] bg-accent/[0.03] flex items-center justify-center font-mono text-sm text-accent font-semibold transition-[border-color] duration-200",
                  h === item
                    ? "border border-accent/[0.19]"
                    : "border border-accent/[0.07]"
                )}
              >
                {item.charAt(0)}
              </div>
              <span
                className={cn(
                  "font-body text-[0.8125rem] font-medium transition-colors duration-200 text-center",
                  h === item ? "text-fg" : "text-text-dim"
                )}
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
          className={cn(
            "bg-overlay-subtle backdrop-blur-[20px] rounded-[0.875rem] transition-all duration-300 cursor-default relative",
            isMobile ? "p-[1.25rem_1rem]" : "p-[1.75rem_1.5rem]",
            h === i
              ? "border border-accent/[0.145] shadow-[0_0.25rem_1.5rem_rgba(141,234,178,0.024)]"
              : "border border-overlay-border shadow-none"
          )}
        >
          {p.step && (
            <span
              className={cn(
                "font-display font-extrabold text-accent/[0.06] absolute top-3 right-4 leading-none",
                isMobile ? "text-[2.5rem]" : "text-[3rem]"
              )}
            >
              {p.step}
            </span>
          )}
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-accent mb-4 shadow-[0_0_0.5rem_rgba(141,234,178,0.25)]" />
            <h4 className="font-display text-base font-bold text-fg mt-0 mb-2">
              {p.title}
            </h4>
            <p className="font-body text-[0.8125rem] leading-[1.6] text-text-dim m-0">
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
      className={cn(
        "max-w-[75rem] mx-auto",
        isMobile ? "py-10 px-4" : "py-20 px-8"
      )}
    >
      <FadeIn>
        <div
          className={cn(
            "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border text-center relative overflow-hidden",
            isMobile
              ? "rounded-[1.25rem] p-[3rem_1.5rem]"
              : "rounded-[1.5rem] p-[5rem_3.75rem]"
          )}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[37.5rem] h-[37.5rem] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(141,234,178,0.02) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <span className="font-mono text-[0.8125rem] text-accent font-medium block mb-5">
              {comment}
            </span>
            <h2
              className="font-display text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold text-fg tracking-[-0.03em] mt-0 mb-4 leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
            <p
              className={cn(
                "font-body text-text-dim leading-[1.7] max-w-[30rem] mx-auto mb-10 mt-0",
                isMobile ? "text-sm" : "text-base"
              )}
            >
              {sub}
            </p>
            <Link
              href={href}
              className={cn(
                "inline-block bg-accent text-accent-fg border-none rounded-[0.625rem] text-[0.9375rem] font-semibold font-body no-underline transition-[transform,box-shadow] duration-200",
                isMobile ? "py-3.5 px-8" : "py-4 px-10"
              )}
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
  const touchStartX = useRef<number | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  useEffect(() => {
    const timer = setInterval(() => { setActive((p) => (p + 1) % testimonials.length); }, 5000);
    return () => { clearInterval(timer); };
  }, [testimonials.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) setActive((p) => (p + 1) % testimonials.length);
      else setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
    }
    touchStartX.current = null;
  };

  return (
    <section
      className={cn(
        "max-w-[75rem] mx-auto",
        isMobile ? "py-10 px-4" : "py-20 px-8"
      )}
    >
      <SectionHeader
        number="// 04"
        title="What Clients Say"
        desc="Outcomes over opinions — hear from the people I've built for."
      />
      <FadeIn>
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border relative",
            isMobile
              ? "rounded-[1rem] p-[2rem_1.25rem] min-h-0"
              : "rounded-[1.25rem] p-[3rem_3.5rem] min-h-[15rem]"
          )}
        >
          <div
            className={cn(
              "absolute font-display text-accent/[0.03] leading-none pointer-events-none",
              isMobile
                ? "top-3 right-4 text-[4.5rem]"
                : "top-6 right-8 text-[7.5rem]"
            )}
          >
            &ldquo;
          </div>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="transition-all duration-500 ease-in-out"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateY(0)" : "translateY(10px)",
                position: active === i ? "relative" : "absolute",
                top: active === i ? "auto" : isMobile ? "2rem" : "3rem",
                left: active === i ? "auto" : isMobile ? "1.25rem" : "3.5rem",
                right: active === i ? "auto" : isMobile ? "1.25rem" : "3.5rem",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <p
                className={cn(
                  "font-body leading-[1.8] text-text mb-8 mt-0 italic max-w-[43.75rem]",
                  isMobile ? "text-[0.9375rem]" : "text-[1.125rem]"
                )}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-[2.75rem] h-[2.75rem] rounded-[0.75rem] bg-accent/[0.07] border border-accent/[0.125] flex items-center justify-center font-display text-sm font-bold text-accent">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-body text-[0.9375rem] font-semibold text-fg">
                    {t.name}
                  </div>
                  <div className="font-body text-[0.8125rem] text-text-dim">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${String(i + 1)}`}
                onClick={() => { setActive(i); }}
                className={cn(
                  "h-2 rounded-[0.25rem] border-none cursor-pointer transition-all duration-300 ease-in-out",
                  active === i
                    ? "w-8 bg-accent"
                    : "w-2 bg-white/10"
                )}
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
      className={cn(
        "max-w-[75rem] mx-auto",
        isMobile ? "py-10 px-4" : "py-20 px-8"
      )}
    >
      <FadeIn>
        <div
          className={cn(
            "flex",
            isMobile
              ? "flex-col items-start mb-8 gap-4"
              : "flex-row justify-between items-end mb-14 gap-0"
          )}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[0.8125rem] text-accent font-medium">
                // 05
              </span>
              <div className="h-px w-12 bg-accent/25" />
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-fg tracking-[-0.03em] m-0">
              Writing
            </h2>
            <p
              className={cn(
                "font-body text-text-dim leading-[1.7] mt-3 max-w-[37.5rem]",
                isMobile ? "text-sm" : "text-base"
              )}
            >
              Sharing what I learn — engineering deep dives and architecture decisions.
            </p>
          </div>
          <Link
            href="/blog"
            className="bg-transparent border border-overlay-border py-2 px-5 rounded-lg text-text-dim text-[0.8125rem] font-body font-medium no-underline transition-all duration-200 whitespace-nowrap"
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
            className="no-underline"
            onMouseEnter={() => { sH(i); }}
            onMouseLeave={() => { sH(null); }}
          >
            <div
              className={cn(
                "bg-overlay-subtle backdrop-blur-[20px] rounded-[1rem] cursor-pointer transition-all duration-300 ease-in-out flex flex-col h-full",
                isMobile ? "p-[1.5rem_1.25rem]" : "p-[2rem_1.5rem]",
                h === i
                  ? "border border-accent/[0.145] -translate-y-1 shadow-[0_0.5rem_2.5rem_rgba(141,234,178,0.03)]"
                  : "border border-overlay-border translate-y-0 shadow-none"
              )}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="py-[0.1875rem] px-[0.625rem] bg-accent/[0.03] border border-accent/[0.08] rounded-[0.375rem] text-[0.6875rem] font-mono text-accent font-medium">
                  {p.tag}
                </span>
                <span className="font-mono text-[0.6875rem] text-text-dim">
                  {p.readTime}
                </span>
              </div>
              <h3 className="font-display text-[1.125rem] font-bold text-fg mt-0 mb-3 leading-[1.3]">
                {p.title}
              </h3>
              <p className="font-body text-[0.8125rem] leading-[1.7] text-text-dim m-0 flex-1">
                {p.excerpt}
              </p>
              <div className="mt-5 pt-4 border-t border-white/[0.05] flex justify-between items-center">
                <span className="font-mono text-[0.6875rem] text-text-dim">
                  {p.date}
                </span>
                <span
                  className={cn(
                    "text-[0.8125rem] font-body font-medium transition-colors duration-300",
                    h === i ? "text-accent" : "text-text-dim"
                  )}
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
