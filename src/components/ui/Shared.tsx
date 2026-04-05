"use client";

import { useState } from "react";
import Image from "next/image";
import { ACCENT, TEXT_DIM, GLASS, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { useCounter } from "@/hooks/useCounter";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FadeIn } from "./FadeIn";
import type { CaseStudy } from "@/lib/cases";

// ─── SECTION HEADER ──────────────────────────────────────────

interface SectionHeaderProps {
  number: string;
  title: string;
  desc?: string;
}

export function SectionHeader({ number, title, desc }: SectionHeaderProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <FadeIn>
      <div style={{ marginBottom: isMobile ? "2.25rem" : "3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: "0.8125rem", color: ACCENT, fontWeight: 500 }}>{number}</span>
          <div style={{ height: "0.0625rem", width: "3rem", background: `${ACCENT}40` }} />
        </div>
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: isMobile ? "clamp(1.625rem, 7vw, 2.25rem)" : "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {title}
        </h2>
        {desc && (
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: isMobile ? "0.875rem" : "1rem",
              color: TEXT_DIM,
              lineHeight: 1.7,
              marginTop: "0.75rem",
              maxWidth: "37.5rem",
            }}
          >
            {desc}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

// ─── COUNTER STAT ────────────────────────────────────────────

interface CounterStatProps {
  value: string;
  label: string;
  trigger: boolean;
}

export function CounterStat({ value, label, trigger }: CounterStatProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const numMatch = /^([<$]?)(\d+\.?\d*)([+%]?.*)/.exec(value);
  const prefix = numMatch ? numMatch[1] : "";
  const num = numMatch ? parseFloat(numMatch[2]) : 0;
  const suffix = numMatch ? numMatch[3] : value;
  const count = useCounter(num, 1600, trigger);

  return (
    <div
      style={{
        padding: isMobile ? "1.25rem 1rem" : "1.75rem 1.5rem",
        ...GLASS,
        borderRadius: "0.75rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: isMobile ? "1.5rem" : "2rem",
          fontWeight: 700,
          color: "#fafafa",
        }}
      >
        {numMatch ? `${prefix}${String(Math.round(count as number))}${suffix}` : value}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: isMobile ? "0.6875rem" : "0.8125rem",
          color: TEXT_DIM,
          marginTop: "0.25rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── BROWSER FRAME ───────────────────────────────────────────

interface BrowserFrameProps {
  title?: string;
  color?: string;
  children: React.ReactNode;
}

export function BrowserFrame({ title, color = "#1a1a2e", children }: BrowserFrameProps) {
  return (
    <div
      style={{
        borderRadius: "1rem",
        overflow: "hidden",
        border: "0.0625rem solid rgba(255,255,255,0.08)",
        boxShadow: "0 1.5rem 5rem rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          height: "2.25rem",
          background: "#111",
          display: "flex",
          alignItems: "center",
          padding: "0 0.875rem",
          gap: "0.5rem",
          borderBottom: "0.0625rem solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", gap: "0.375rem" }}>
          <div style={{ width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "0.1875rem 1.5rem",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "0.375rem",
              fontSize: "0.6875rem",
              fontFamily: FONT_MONO,
              color: TEXT_DIM,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "70%",
            }}
          >
            {title ?? "localhost:3000"}
          </div>
        </div>
        <div style={{ width: "2.75rem" }} />
      </div>
      <div style={{ background: color, minHeight: "12.5rem", position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

// ─── PROJECT MOCKUP ──────────────────────────────────────────

interface ProjectMockupProps {
  project: CaseStudy;
  carousel?: boolean;
}

export function ProjectMockup({ project, carousel = true }: ProjectMockupProps) {
  const c = project.mockupColor;
  const url = project.liveUrl
    ? project.liveUrl.replace("https://", "")
    : `${project.title.toLowerCase().replace(/\s+/g, "-")}.app`;

  // If project has real images, render carousel or single image
  if (project.images && project.images.length > 0) {
    if (carousel) {
      return <ImageMockup images={project.images} url={url} color={c} />;
    }
    return <ImageMockup images={[project.images[0]]} url={url} color={c} />;
  }

  return (
    <BrowserFrame title={url} color={c}>
      <div style={{ padding: "1.25rem", minHeight: "13.75rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <div
            style={{
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: "0.375rem",
              background: `${ACCENT}15`,
              border: `0.0625rem solid ${ACCENT}20`,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ height: "0.375rem", width: "40%", background: "rgba(255,255,255,0.1)", borderRadius: "0.1875rem", marginBottom: "0.375rem" }} />
            <div style={{ height: "0.25rem", width: "25%", background: "rgba(255,255,255,0.05)", borderRadius: "0.125rem" }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
          {[0.12, 0.08, 0.1].map((o, i) => (
            <div
              key={i}
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                background: `rgba(255,255,255,${String(o)})`,
                border: "0.0625rem solid rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ height: "0.25rem", width: "60%", background: `${ACCENT}30`, borderRadius: "0.125rem", marginBottom: "0.5rem" }} />
              <div style={{ height: "1.25rem", width: "80%", background: "rgba(255,255,255,0.08)", borderRadius: "0.25rem", marginBottom: "0.375rem" }} />
              <div style={{ height: "0.1875rem", width: "90%", background: "rgba(255,255,255,0.04)", borderRadius: "0.125rem" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.375rem" }}>
          <div style={{ height: "1.75rem", width: "5rem", borderRadius: "0.375rem", background: `${ACCENT}25` }} />
          <div style={{ height: "1.75rem", width: "3.75rem", borderRadius: "0.375rem", background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {[70, 50, 85, 40].map((w, i) => (
            <div
              key={i}
              style={{
                height: "0.1875rem",
                width: `${String(w)}%`,
                background: `rgba(255,255,255,${String(0.03 + i * 0.01)})`,
                borderRadius: "0.125rem",
              }}
            />
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── IMAGE MOCKUP (carousel for projects with real screenshots) ──

function ImageMockup({ images, url, color }: { images: string[]; url: string; color: string }) {
  const [idx, setIdx] = useState(0);

  return (
    <div>
      <BrowserFrame title={url} color={color}>
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16 / 10" }}>
          <Image
            src={images[idx]}
            alt={`Screenshot ${String(idx + 1)}`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
      </BrowserFrame>

      {images.length > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginTop: "0.75rem",
          }}
        >
          <button
            onClick={() => { setIdx((i) => (i - 1 + images.length) % images.length); }}
            aria-label="Previous screenshot"
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "0.0625rem solid rgba(255,255,255,0.1)",
              color: TEXT_DIM,
              fontSize: "0.875rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>
          <div style={{ display: "flex", gap: "0.375rem" }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIdx(i); }}
                aria-label={`Go to screenshot ${String(i + 1)}`}
                style={{
                  width: idx === i ? "1.25rem" : "0.375rem",
                  height: "0.375rem",
                  borderRadius: "0.1875rem",
                  background: idx === i ? ACCENT : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => { setIdx((i) => (i + 1) % images.length); }}
            aria-label="Next screenshot"
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "0.0625rem solid rgba(255,255,255,0.1)",
              color: TEXT_DIM,
              fontSize: "0.875rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}