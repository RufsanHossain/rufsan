import { ACCENT, TEXT_DIM, GLASS, FONT_DISPLAY, FONT_BODY } from "@/lib/constants";
import { TIMELINE } from "@/lib/verticals";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger } from "@/components/ui/Stagger";
import { SectionHeader } from "@/components/ui/Shared";
import { HeroWithActions } from "@/components/ui/HeroActions";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { CTA } from "@/components/sections/Sections";

export default function AboutPage() {
  return (
    <>
      <HeroWithActions
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        h1={["Engineer.", "Founder.", "Builder."]}
        subtitle="I'm Rufsan — a senior full-stack developer and agency founder building intelligent SaaS products for the US market."
        btn1="View My Work →"
        btn2="Download Resume"
        action1={{ type: "navigate", href: "/dev" }}
        action2={{ type: "download" }}
        btn2Resume
      />

      {/* ── About Me ── */}
      <section className="sc-about-section-first">
        <SectionHeader number="// 01" title="About Me" />
        <FadeIn>
          <div className="sc-about-grid">
            <div style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.8, color: TEXT_DIM }}>
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
            <div style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.8, color: TEXT_DIM }}>
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
      <section className="sc-about-section">
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
            <div key={i} className="sc-value-card" style={{ ...GLASS, borderRadius: "1rem" }}>
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
                  fontSize: "1.25rem",
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
      <section className="sc-about-section">
        <SectionHeader number="// 03" title="Experience" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {TIMELINE.map((t, i) => (
            <TimelineItem
              key={i}
              year={t.year}
              role={t.role}
              company={t.company}
              desc={t.desc}
              index={i}
            />
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
