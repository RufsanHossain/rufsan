import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ACCENT } from "@/lib/constants";
import { getCaseBySlug, getCasesByVertical, getCaseContent } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger } from "@/components/ui/Stagger";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader, ProjectMockup } from "@/components/ui/Shared";
import { ExtIcon } from "@/components/ui/Icons";
import { CTA } from "@/components/sections/Sections";
import { TrackCaseView } from "@/components/ui/TrackView";
import { mdxComponents } from "@/components/mdx/MdxComponents";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;
  const p = getCaseBySlug(slug);

  if (!p)
    return (
      <div className="pt-[12.5rem] px-8 text-center text-text-dim">
        Case study not found
      </div>
    );

  const primaryRoute = Array.isArray(p.verticalRoute) ? p.verticalRoute[0] : p.verticalRoute;
  const related = getCasesByVertical(primaryRoute).filter(
    (c) => c.id !== p.id
  );

  // Render the optional extended writeup only when the MDX body has prose
  // content. Bare placeholder comments compile to nothing visible, but
  // checking for prose chars avoids spinning up MDXRemote for empty bodies.
  const rawBody = getCaseContent(slug) ?? "";
  const hasBody = /[A-Za-z0-9]/.test(rawBody.replace(/\{\/\*[\s\S]*?\*\/\}/g, ""));

  return (
    <>
      <TrackCaseView id={p.id} title={p.title} />
      {/* ── Hero ── */}
      <section className="sc-case-hero">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: p.vertical, href: `/${primaryRoute}` },
            { label: p.title },
          ]}
        />

        <div className="sc-case-grid">
          {/* Text */}
          <FadeIn>
            <div>
              <div className="flex gap-[0.625rem] mb-6 flex-wrap items-center">
                <span
                  className="py-[0.3125rem] px-[0.875rem] rounded-lg text-[0.8125rem] font-mono text-accent font-semibold"
                  style={{
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}20`,
                  }}
                >
                  {p.outcome}
                </span>
                <span className="py-[0.3125rem] px-[0.875rem] bg-overlay-subtle border border-overlay-border rounded-lg text-[0.8125rem] font-mono text-text-dim">
                  {p.vertical}
                </span>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[0.375rem] py-[0.3125rem] px-[0.875rem] rounded-lg text-[0.8125rem] font-body text-accent font-semibold no-underline"
                    style={{
                      background: `${ACCENT}08`,
                      border: `1px solid ${ACCENT}25`,
                    }}
                  >
                    <ExtIcon /> Visit Live Site
                  </a>
                )}
              </div>

              <h1 className="font-display font-[800] tracking-[-0.04em] m-0">
                <span className="sc-cs-heading block leading-[1.1] text-fg">
                  {p.title}
                </span>
              </h1>

              <p className="sc-cs-overview font-body leading-[1.7] text-text-dim max-w-[32.5rem] mt-6">
                {p.overview}
              </p>
            </div>
          </FadeIn>

          {/* Mockup */}
          <FadeIn delay={0.2} direction="left">
            <ProjectMockup project={p} />
          </FadeIn>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="sc-case-metrics">
        <div
          className="sc-metrics-grid"
          style={{ gridTemplateColumns: `repeat(${String(p.metrics.length)}, 1fr)` }}
        >
          {p.metrics.map((m, i) => (
            <FadeIn key={m.l} delay={i * 0.1}>
              <div className="sc-case-card-sm bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border text-center">
                <div className="sc-cs-metric-value font-display font-bold text-accent">
                  {m.v}
                </div>
                <div className="font-body text-[0.8125rem] text-text-dim mt-[0.375rem]">
                  {m.l}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Challenge / Solution ── */}
      <section className="sc-section-tight">
        <FadeIn>
          <div className="sc-case-cs-grid">
            {/* Challenge */}
            <div className="sc-case-card bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border">
              <div className="flex items-center gap-[0.625rem] mb-5">
                <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <h3 className="sc-cs-subheading font-display font-bold text-fg m-0">
                  The Challenge
                </h3>
              </div>
              <p className="sc-cs-body font-body leading-[1.8] text-text-dim m-0">
                {p.challenge}
              </p>
            </div>

            {/* Solution */}
            <div
              className="sc-case-card bg-overlay-subtle backdrop-blur-[20px]"
              style={{ border: `1px solid ${ACCENT}15` }}
            >
              <div className="flex items-center gap-[0.625rem] mb-5">
                <div
                  className="w-2 h-2 rounded-full bg-accent"
                  style={{ boxShadow: `0 0 0.5rem ${ACCENT}60` }}
                />
                <h3 className="sc-cs-subheading font-display font-bold text-fg m-0">
                  The Solution
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {p.solutionSteps.map((step, i) => (
                  <div key={i} className="flex gap-[0.875rem]">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs text-accent font-semibold shrink-0 mt-0.5"
                      style={{
                        background: `${ACCENT}10`,
                        border: `1px solid ${ACCENT}20`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <p className="sc-cs-body font-body leading-[1.7] text-text-dim m-0">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Tech Stack ── */}
      <section className="sc-section-tight">
        <SectionHeader number="// Tech Stack" title="Built With" />
        <FadeIn>
          <div className="flex gap-[0.625rem] flex-wrap">
            {p.stack.map((s) => (
              <div key={s} className="sc-cs-chip bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-xl font-mono text-text font-medium">
                {s}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Results ── */}
      <section className="sc-section-tight">
        <SectionHeader number="// Results" title="Impact" />
        <FadeIn>
          <div
            className="sc-case-card bg-overlay-subtle backdrop-blur-[20px]"
            style={{ border: `1px solid ${ACCENT}15` }}
          >
            <p className="sc-cs-overview font-body leading-[1.8] text-text m-0">
              {p.results}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Optional extended writeup (MDX body) ── */}
      {hasBody && (
        <section className="sc-section-tight">
          <SectionHeader number="// Deep Dive" title="The Full Story" />
          <FadeIn>
            <div className="max-w-[47.5rem] mx-auto">
              <MDXRemote source={rawBody} components={mdxComponents} />
            </div>
          </FadeIn>
        </section>
      )}

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section className="sc-section-tight">
          <SectionHeader number="// More" title={`More ${p.vertical} Projects`} />
          <Stagger columns={2} mobileColumns={1}>
            {related.map((rc) => (
              <Link key={rc.id} href={`/cases/${rc.slug}`} className="no-underline">
                <div className="sc-cs-related-card bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-2xl transition-all duration-300">
                  <span
                    className="py-1 px-3 rounded-[0.375rem] text-xs font-mono text-accent font-semibold"
                    style={{
                      background: `${ACCENT}10`,
                      border: `1px solid ${ACCENT}18`,
                    }}
                  >
                    {rc.outcome}
                  </span>
                  <h4 className="font-display text-xl font-bold text-fg mt-4 mb-2">
                    {rc.title}
                  </h4>
                  <p className="font-body text-sm leading-[1.7] text-text-dim m-0">
                    {rc.overview.length <= 120 ? rc.overview : `${rc.overview.slice(0, rc.overview.lastIndexOf(" ", 120))}...`}
                  </p>
                  <div className="mt-4 text-accent text-[0.8125rem] font-body font-medium">
                    View Case Study →
                  </div>
                </div>
              </Link>
            ))}
          </Stagger>
        </section>
      )}

      <CTA
        comment="// Like what you see?"
        heading="Let's build yours<br/>next."
        sub={`Looking for ${p.vertical.toLowerCase()} expertise? Let's talk.`}
        btn="Get in Touch"
      />
    </>
  );
}
