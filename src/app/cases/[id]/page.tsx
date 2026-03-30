import Link from "next/link";
import { ACCENT, TEXT, TEXT_DIM, GLASS, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { getCaseBySlug, getCasesByVertical } from "@/lib/cases";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger } from "@/components/ui/Stagger";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader, ProjectMockup } from "@/components/ui/Shared";
import { ExtIcon } from "@/components/ui/Icons";
import { CTA } from "@/components/sections/Sections";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;
  const p = getCaseBySlug(slug);

  if (!p)
    return (
      <div
        style={{
          padding: "12.5rem 2rem",
          textAlign: "center",
          color: TEXT_DIM,
        }}
      >
        Case study not found
      </div>
    );

  const related = getCasesByVertical(p.verticalRoute).filter(
    (c) => c.id !== p.id
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="sc-case-hero">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: p.vertical, href: `/${p.verticalRoute}` },
            { label: p.title },
          ]}
        />

        <div className="sc-case-grid">
          {/* Text */}
          <FadeIn>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "0.625rem",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    padding: "0.3125rem 0.875rem",
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}20`,
                    borderRadius: "0.5rem",
                    fontSize: "0.8125rem",
                    fontFamily: FONT_MONO,
                    color: ACCENT,
                    fontWeight: 600,
                  }}
                >
                  {p.outcome}
                </span>
                <span
                  style={{
                    padding: "0.3125rem 0.875rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "0.5rem",
                    fontSize: "0.8125rem",
                    fontFamily: FONT_MONO,
                    color: TEXT_DIM,
                  }}
                >
                  {p.vertical}
                </span>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      padding: "0.3125rem 0.875rem",
                      background: `${ACCENT}08`,
                      border: `1px solid ${ACCENT}25`,
                      borderRadius: "0.5rem",
                      fontSize: "0.8125rem",
                      fontFamily: FONT_BODY,
                      color: ACCENT,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <ExtIcon /> Visit Live Site
                  </a>
                )}
              </div>

              <h1
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  margin: 0,
                }}
              >
                <span className="sc-cs-heading" style={{ display: "block", lineHeight: 1.1, color: "#fafafa" }}>
                  {p.title}
                </span>
              </h1>

              <p className="sc-cs-overview" style={{ fontFamily: FONT_BODY, lineHeight: 1.7, color: TEXT_DIM, maxWidth: "32.5rem", marginTop: "1.5rem" }}>
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
              <div className="sc-case-card-sm" style={{ ...GLASS, textAlign: "center" }}>
                <div className="sc-cs-metric-value" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: ACCENT }}>
                  {m.v}
                </div>
                <div style={{ fontFamily: FONT_BODY, fontSize: "0.8125rem", color: TEXT_DIM, marginTop: "0.375rem" }}>
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
            <div className="sc-case-card" style={{ ...GLASS }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
                <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#ef4444" }} />
                <h3 className="sc-cs-subheading" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: "#fafafa", margin: 0 }}>
                  The Challenge
                </h3>
              </div>
              <p className="sc-cs-body" style={{ fontFamily: FONT_BODY, lineHeight: 1.8, color: TEXT_DIM, margin: 0 }}>
                {p.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="sc-case-card" style={{ ...GLASS, border: `1px solid ${ACCENT}15` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
                <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: ACCENT, boxShadow: `0 0 0.5rem ${ACCENT}60` }} />
                <h3 className="sc-cs-subheading" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: "#fafafa", margin: 0 }}>
                  The Solution
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {p.solutionSteps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem" }}>
                    <div
                      style={{
                        width: "1.75rem",
                        height: "1.75rem",
                        borderRadius: "0.5rem",
                        background: `${ACCENT}10`,
                        border: `1px solid ${ACCENT}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: FONT_MONO,
                        fontSize: "0.75rem",
                        color: ACCENT,
                        fontWeight: 600,
                        flexShrink: 0,
                        marginTop: "0.125rem",
                      }}
                    >
                      {i + 1}
                    </div>
                    <p className="sc-cs-body" style={{ fontFamily: FONT_BODY, lineHeight: 1.7, color: TEXT_DIM, margin: 0 }}>
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
          <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
            {p.stack.map((s) => (
              <div key={s} className="sc-cs-chip" style={{ ...GLASS, borderRadius: "0.75rem", fontFamily: FONT_MONO, color: TEXT, fontWeight: 500 }}>
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
          <div className="sc-case-card" style={{ ...GLASS, border: `1px solid ${ACCENT}15` }}>
            <p className="sc-cs-overview" style={{ fontFamily: FONT_BODY, lineHeight: 1.8, color: TEXT, margin: 0 }}>
              {p.results}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section className="sc-section-tight">
          <SectionHeader number="// More" title={`More ${p.vertical} Projects`} />
          <Stagger columns={2} mobileColumns={1}>
            {related.map((rc) => (
              <Link key={rc.id} href={`/cases/${rc.slug}`} style={{ textDecoration: "none" }}>
                <div className="sc-cs-related-card" style={{ ...GLASS, borderRadius: "1rem", transition: "all 0.3s" }}>
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
                    }}
                  >
                    {rc.outcome}
                  </span>
                  <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem", fontWeight: 700, color: "#fafafa", margin: "1rem 0 0.5rem" }}>
                    {rc.title}
                  </h4>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", lineHeight: 1.7, color: TEXT_DIM, margin: 0 }}>
                    {rc.overview.length <= 120 ? rc.overview : `${rc.overview.slice(0, rc.overview.lastIndexOf(" ", 120))}...`}
                  </p>
                  <div style={{ marginTop: "1rem", color: ACCENT, fontSize: "0.8125rem", fontFamily: FONT_BODY, fontWeight: 500 }}>
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
