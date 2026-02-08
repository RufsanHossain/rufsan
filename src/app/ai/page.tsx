"use client";

import { useRouter } from "next/navigation";
import { getCasesByVertical } from "@/lib/cases";
import { AI_CAPS, AI_TOOLS } from "@/lib/verticals";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/ui/Shared";
import { CapGrid, CSList, Toolkit, CTA } from "@/components/sections/Sections";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function AIPage() {
  const router = useRouter();
  const cases = getCasesByVertical("ai");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <>
      <HeroSection
        breadcrumb={[{ label: "Home", href: "/" }, { label: "AI / Machine Learning" }]}
        h1={["Building", "intelligent", "systems."]}
        subtitle="From LLM orchestration and RAG pipelines to computer vision and fine-tuning — AI that goes beyond demos into production."
        btn1="View AI Projects →"
        btn2="Discuss Your AI Idea"
        on1={() => { /* TODO: scroll to case studies section */ }}
        on2={() => { router.push("/contact"); }}
      />

      <section style={{ padding: isMobile ? "1.5rem 1rem 3rem" : "2.5rem 2rem 5rem", maxWidth: "75rem", margin: "0 auto" }}>
        <SectionHeader number="// 01" title="Capabilities" desc="End-to-end AI expertise — prototyping to production." />
        <CapGrid items={AI_CAPS} />
      </section>

      <section style={{ padding: isMobile ? "2.5rem 1rem" : "5rem 2rem", maxWidth: "75rem", margin: "0 auto" }}>
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