import { getCasesByVertical } from "@/lib/cases";
import { DEV_CAPS, DEV_PRINCIPLES, DEV_TOOLS } from "@/lib/verticals";
import { HeroWithActions } from "@/components/ui/HeroActions";
import { SectionHeader } from "@/components/ui/Shared";
import { CapGrid, CSList, PRRow, Toolkit, CTA } from "@/components/sections/Sections";

export default function DevPage() {
  const cases = getCasesByVertical("dev");

  return (
    <>
      <HeroWithActions
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Development" }]}
        h1={["Production", "SaaS, built", "to scale."]}
        subtitle="MERN stack and Next.js expertise. Strict TypeScript, clean architecture, security-first engineering."
        btn1="View Dev Projects →"
        btn2="Start a Project"
        action1={{ type: "scroll", target: "case-studies" }}
        action2={{ type: "navigate", href: "/contact" }}
      />

      <section className="sc-section-cap">
        <SectionHeader number="// 01" title="Capabilities" desc="Full-stack engineering — architecture, performance, security." />
        <CapGrid items={DEV_CAPS} />
      </section>

      <section className="sc-section">
        <SectionHeader number="// 02" title="Engineering Principles" desc="Non-negotiable standards behind every line of code." />
        <PRRow items={DEV_PRINCIPLES} />
      </section>

      <section id="case-studies" className="sc-section">
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
