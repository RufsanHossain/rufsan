"use client";

import { FadeIn } from "@/components/ui/FadeIn";

interface TimelineItemProps {
  year: string;
  role: string;
  company: string;
  desc: string;
  index: number;
}

export function TimelineItem({ year, role, company, desc, index }: TimelineItemProps) {
  return (
    <FadeIn delay={index * 0.1}>
      <div className="sc-timeline-row group">
        <span className="font-mono text-sm text-text-dim font-medium pt-1 transition-colors duration-200 group-hover:text-accent">
          {year}
        </span>
        <div>
          <h4 className="font-display text-lg font-bold text-[#fafafa] m-0 mb-1">
            {role}
          </h4>
          <span className="font-body text-sm text-accent block mb-[0.625rem]">
            {company}
          </span>
          <p className="font-body text-sm leading-[1.7] text-text-dim m-0">
            {desc}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
