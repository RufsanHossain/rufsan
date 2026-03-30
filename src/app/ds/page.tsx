import { getCasesByVertical } from "@/lib/cases";
import { DS_CAPS, DS_PROCESS, DS_TOOLS } from "@/lib/verticals";
import { HeroWithActions } from "@/components/ui/HeroActions";
import { SectionHeader } from "@/components/ui/Shared";
import { CapGrid, CSList, PRRow, Toolkit, CTA } from "@/components/sections/Sections";

export default function DSPage() {
  const cases = getCasesByVertical("ds");

  return (
    <>
      <HeroWithActions
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Data Science" }]}
        h1={["Data into", "strategic", "decisions."]}
        subtitle="Analytics pipelines, predictive models, and visualization that drive real business value."
        btn1="View Data Projects →"
        btn2="Discuss Your Data"
        action1={{ type: "scroll", target: "case-studies" }}
        action2={{ type: "navigate", href: "/contact" }}
      />

      <section className="sc-section-cap">
        <SectionHeader number="// 01" title="Capabilities" desc="From raw data to boardroom decisions." />
        <CapGrid items={DS_CAPS} />
      </section>

      <section className="sc-section">
        <SectionHeader number="// 02" title="My Process" desc="Rigorous, reproducible, grounded in the business question." />
        <PRRow items={DS_PROCESS} />
      </section>

      <section id="case-studies" className="sc-section">
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
