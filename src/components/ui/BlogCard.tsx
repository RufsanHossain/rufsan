"use client";

import { useState } from "react";
import Link from "next/link";
import { ACCENT, TEXT_DIM, GLASS, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { FadeIn } from "@/components/ui/FadeIn";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post: p, index }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.1}>
      <Link
        href={`/blog/${p.slug}`}
        style={{ textDecoration: "none" }}
        onMouseEnter={() => { setHovered(true); }}
        onMouseLeave={() => { setHovered(false); }}
      >
        <div
          className="sc-blog-card-grid"
          style={{
            ...GLASS,
            border: `0.0625rem solid ${hovered ? `${ACCENT}25` : "rgba(255,255,255,0.07)"}`,
            borderRadius: "1rem",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: hovered ? `0 0.5rem 2.5rem ${ACCENT}06` : "none",
          }}
        >
          {/* Text side */}
          <div
            className="sc-blog-card-text"
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <div className="sc-blog-card-meta-gap" style={{ display: "flex", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  background: `${ACCENT}08`,
                  border: `0.0625rem solid ${ACCENT}15`,
                  borderRadius: "0.375rem",
                  fontSize: "0.75rem",
                  fontFamily: FONT_MONO,
                  color: ACCENT,
                  fontWeight: 500,
                }}
              >
                {p.tag}
              </span>
              <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>{p.date}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>·</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: TEXT_DIM }}>{p.readTime}</span>
            </div>
            <h2
              className="sc-blog-card-title"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                color: "#fafafa",
                margin: "0 0 0.75rem",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              {p.title}
            </h2>
            <p
              className="sc-blog-card-excerpt"
              style={{ fontFamily: FONT_BODY, lineHeight: 1.7, color: TEXT_DIM, margin: "0 0 1.25rem" }}
            >
              {p.excerpt}
            </p>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: "0.875rem",
                color: hovered ? ACCENT : TEXT_DIM,
                fontWeight: 500,
                transition: "color 0.3s",
              }}
            >
              Read Article →
            </span>
          </div>

          {/* Visual side */}
          <div
            className="sc-blog-card-visual"
            style={{ background: p.heroImage, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.75rem",
                  background: `${ACCENT}12`,
                  border: `0.0625rem solid ${ACCENT}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.375rem",
                }}
              >
                {p.tag === "AI / ML" ? "🧠" : p.tag === "Engineering" ? "⚡" : "🗂"}
              </div>
              <div style={{ height: "0.25rem", width: "3.75rem", background: "rgba(255,255,255,0.08)", borderRadius: "0.125rem" }} />
              <div style={{ height: "0.1875rem", width: "2.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.125rem" }} />
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
