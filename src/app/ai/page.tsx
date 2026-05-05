import { getCasesByVertical } from "@/lib/content";
import { AI_CAPS, AI_TOOLS } from "@/lib/verticals";
import { HeroWithActions } from "@/components/ui/HeroActions";
import { SectionHeader } from "@/components/ui/Shared";
import { CapGrid, CSList, Toolkit, CTA } from "@/components/sections/Sections";

export default function AIPage() {
  const cases = getCasesByVertical("ai");

  return (
    <>
      <HeroWithActions
        breadcrumb={[{ label: "Home", href: "/" }, { label: "AI / Machine Learning" }]}
        h1={["Building", "intelligent", "systems."]}
        subtitle="From LLM orchestration and RAG pipelines to computer vision and fine-tuning — AI that goes beyond demos into production."
        btn1="View AI Projects →"
        btn2="Discuss Your AI Idea"
        action1={{ type: "scroll", target: "case-studies" }}
        action2={{ type: "navigate", href: "/contact" }}
      />

      <section className="sc-section-ai-cap">
        <SectionHeader number="// 01" title="Capabilities" desc="End-to-end AI expertise — prototyping to production." />
        <CapGrid items={AI_CAPS} />
      </section>

      <section id="case-studies" className="sc-section">
        <SectionHeader number="// 02" title="Case Studies" desc="Real AI projects with measurable business impact." />
        <CSList projects={cases} />
      </section>

      <Toolkit number="// 03" title="AI Toolkit" desc="Frameworks and tools I use daily." tools={AI_TOOLS} />

      <CTA
        comment="// Ready to build with AI?"
        heading="Let's make your<br/>product smarter."
        sub="LLM integration, RAG pipeline, or full AI feature — let's talk."
        btn="Discuss Your AI Project"
      />
    </>
  );
}
