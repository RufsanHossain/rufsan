"use client";

import { useRouter } from "next/navigation";
import { getCasesByVertical } from "@/lib/cases";
import { DEV_CAPS, DEV_PRINCIPLES, DEV_TOOLS } from "@/lib/verticals";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/ui/Shared";
import { CapGrid, CSList, PRRow, Toolkit, CTA } from "@/components/sections/Sections";

export default function DevPage() {
  const router = useRouter();
  const cases = getCasesByVertical("dev");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const sectionPad = isMobile ? "2.5rem 1rem" : "5rem 2rem";

  return (
    <>
      <HeroSection
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Development" }]}
        h1={["Production", "SaaS, built", "to scale."]}
        subtitle="MERN stack and Next.js expertise. Strict TypeScript, clean architecture, security-first engineering."
        btn1="View Dev Projects →"
        btn2="Start a Project"
        on1={() => { /* TODO: scroll to case studies section */ }}
        on2={() => { router.push("/contact"); }}
      />

      <section style={{ padding: isMobile ? "2.5rem 1rem 3.5rem" : "2.5rem 2rem 5rem", maxWidth: "75rem", margin: "0 auto" }}>
        <SectionHeader number="// 01" title="Capabilities" desc="Full-stack engineering — architecture, performance, security." />
        <CapGrid items={DEV_CAPS} />
      </section>

      <section style={{ padding: sectionPad, maxWidth: "75rem", margin: "0 auto" }}>
        <SectionHeader number="// 02" title="Engineering Principles" desc="Non-negotiable standards behind every line of code." />
        <PRRow items={DEV_PRINCIPLES} />
      </section>

      <section style={{ padding: sectionPad, maxWidth: "75rem", margin: "0 auto" }}>
        <SectionHeader number="// 03" title="Case Studies" desc="Real products, real scale, real impact." />
        <CSList projects={cases} />
      </section>

      <Toolkit number="// 04" title="Dev Toolkit" desc="The stack for production systems." tools={DEV_TOOLS} />

      <CTA
        comment="// Ready to build?"
        heading="Let's ship your<br/>next product."
        sub="From MVP to scale — secure, performant, commercially viable."
        btn="Start Your Project"
      />
    </>
  );
}