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
            <div className="font-body text-base leading-[1.8] text-text-dim">
              <p className="mb-5">
                I specialize in turning complex business ideas into production-ready software at the
                intersection of <span className="text-accent">AI/ML</span>,{" "}
                <span className="text-accent">full-stack development</span>, and{" "}
                <span className="text-accent">data science</span>.
              </p>
              <p>
                Over 5+ years and 40+ projects, I&apos;ve built everything from multi-tenant SaaS
                platforms generating $2M+ ARR to AI-powered QA tools that cut testing cycles by 60%.
              </p>
            </div>
            <div className="font-body text-base leading-[1.8] text-text-dim">
              <p className="mb-5">
                My approach is domain-first: model the business before writing code, work backwards
                from the end goal, treat security and performance as non-negotiable.
              </p>
              <p>
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
            <div key={i} className="sc-value-card bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-2xl">
              <div className="w-2 h-2 rounded-full bg-accent mb-5 shadow-[0_0_0.5rem_rgba(141,234,178,0.25)]" />
              <h3 className="font-display text-xl font-bold text-fg mb-3">
                {v.title}
              </h3>
              <p className="font-body text-sm leading-[1.7] text-text-dim">
                {v.desc}
              </p>
            </div>
          ))}
        </Stagger>
      </section>

      {/* ── Experience / Timeline ── */}
      <section className="sc-about-section">
        <SectionHeader number="// 03" title="Experience" />
        <div className="flex flex-col">
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
