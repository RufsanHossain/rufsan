"use client";

import { useState } from "react";
import { ACCENT, TEXT_DIM, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { FadeIn } from "@/components/ui/FadeIn";

interface TimelineItemProps {
  year: string;
  role: string;
  company: string;
  desc: string;
  index: number;
}

export function TimelineItem({ year, role, company, desc, index }: TimelineItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.1}>
      <div
        className="sc-timeline-row"
        onMouseEnter={() => { setHovered(true); }}
        onMouseLeave={() => { setHovered(false); }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.875rem",
            color: hovered ? ACCENT : TEXT_DIM,
            fontWeight: 500,
            paddingTop: "0.25rem",
            transition: "color 0.2s",
          }}
        >
          {year}
        </span>
        <div>
          <h4
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#fafafa",
              margin: "0 0 0.25rem",
            }}
          >
            {role}
          </h4>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: "0.875rem",
              color: ACCENT,
              display: "block",
              marginBottom: "0.625rem",
            }}
          >
            {company}
          </span>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", lineHeight: 1.7, color: TEXT_DIM, margin: 0 }}>
            {desc}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
