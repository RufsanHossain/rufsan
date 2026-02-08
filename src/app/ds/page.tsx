"use client";

import { useRouter } from "next/navigation";
import { getCasesByVertical } from "@/lib/cases";
import { DS_CAPS, DS_PROCESS, DS_TOOLS } from "@/lib/verticals";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/ui/Shared";
import { CapGrid, CSList, PRRow, Toolkit, CTA } from "@/components/sections/Sections";

export default function DSPage() {
  const router = useRouter();
  const cases = getCasesByVertical("ds");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const sectionPad = isMobile ? "2.5rem 1rem" : "5rem 2rem";

  return (
    <>
      <HeroSection
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Data Science" }]}
        h1={["Data into", "strategic", "decisions."]}
        subtitle="Analytics pipelines, predictive models, and visualization that drive real business value."
        btn1="View Data Projects →"
        btn2="Discuss Your Data"
        on1={() => { /* TODO: scroll to case studies section */ }}
        on2={() => { router.push("/contact"); }}
      />

      <section style={{ padding: isMobile ? "2.5rem 1rem 3.5rem" : "2.5rem 2rem 5rem", maxWidth: "75rem", margin: "0 auto" }}>
        <SectionHeader number="// 01" title="Capabilities" desc="From raw data to boardroom decisions." />
        <CapGrid items={DS_CAPS} />
      </section>

      <section style={{ padding: sectionPad, maxWidth: "75rem", margin: "0 auto" }}>
        <SectionHeader number="// 02" title="My Process" desc="Rigorous, reproducible, grounded in the business question." />
        <PRRow items={DS_PROCESS} />
      </section>

      <section style={{ padding: sectionPad, maxWidth: "75rem", margin: "0 auto" }}>
        <SectionHeader number="// 03" title="Case Studies" desc="Data projects with measurable outcomes." />
        <CSList projects={cases} />
      </section>

      <Toolkit number="// 04" title="Data Toolkit" desc="Tools behind every analysis and model." tools={DS_TOOLS} />

      <CTA
        comment="// Got data?"
        heading="Let's turn it into<br/>your advantage."
        sub="Pipeline, model, or analytics platform — make your data work harder."
        btn="Discuss Your Data"
      />
    </>
  );
}