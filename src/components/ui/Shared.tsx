"use client";

import { useState } from "react";
import Image from "next/image";
import { ACCENT } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useCounter } from "@/hooks/useCounter";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FadeIn } from "./FadeIn";
import type { CaseStudy } from "@/lib/cases";

// ---- SECTION HEADER ------------------------------------------------

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
      <div className={cn(isMobile ? "mb-9" : "mb-14")}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[0.8125rem] text-accent font-medium">{number}</span>
          <div className="h-px w-12 bg-accent/40" />
        </div>
        <h2
          className={cn(
            "font-display font-bold text-fg tracking-[-0.03em] m-0",
            isMobile
              ? "text-[clamp(1.625rem,7vw,2.25rem)]"
              : "text-[clamp(2rem,4vw,3rem)]",
          )}
        >
          {title}
        </h2>
        {desc && (
          <p
            className={cn(
              "font-body text-text-dim leading-[1.7] mt-3 max-w-[37.5rem]",
              isMobile ? "text-sm" : "text-base",
            )}
          >
            {desc}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

// ---- COUNTER STAT ---------------------------------------------------

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
      className={cn(
        "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-xl text-center",
        isMobile ? "py-5 px-4" : "py-7 px-6",
      )}
    >
      <div
        className={cn(
          "font-display font-bold text-fg",
          isMobile ? "text-2xl" : "text-[2rem]",
        )}
      >
        {numMatch ? `${prefix}${String(Math.round(count as number))}${suffix}` : value}
      </div>
      <div
        className={cn(
          "font-body text-text-dim mt-1",
          isMobile ? "text-[0.6875rem]" : "text-[0.8125rem]",
        )}
      >
        {label}
      </div>
    </div>
  );
}

// ---- BROWSER FRAME --------------------------------------------------

interface BrowserFrameProps {
  title?: string;
  color?: string;
  children: React.ReactNode;
}

export function BrowserFrame({ title, color = "#1a1a2e", children }: BrowserFrameProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-overlay-border shadow-[0_1.5rem_5rem_rgba(0,0,0,0.4)]">
      <div className="h-9 bg-code-bg flex items-center px-3.5 gap-2 border-b border-overlay-border-subtle">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="py-[0.1875rem] px-6 bg-white/[0.05] rounded-[0.375rem] text-[0.6875rem] font-mono text-text-dim overflow-hidden text-ellipsis whitespace-nowrap max-w-[70%]">
            {title ?? "localhost:3000"}
          </div>
        </div>
        <div className="w-11" />
      </div>
      <div className="min-h-[12.5rem] relative overflow-hidden" style={{ background: color }}>
        {children}
      </div>
    </div>
  );
}

// ---- PROJECT MOCKUP -------------------------------------------------

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
      <div className="p-5 min-h-[13.75rem]">
        <div className="flex gap-2 mb-4">
          <div
            className="w-7 h-7 rounded-[0.375rem]"
            style={{
              background: `${ACCENT}15`,
              border: `0.0625rem solid ${ACCENT}20`,
            }}
          />
          <div className="flex-1">
            <div className="h-1.5 w-[40%] bg-white/10 rounded-[0.1875rem] mb-1.5" />
            <div className="h-1 w-[25%] bg-white/[0.05] rounded-sm" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[0.12, 0.08, 0.1].map((o, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border border-white/[0.05]"
              style={{ background: `rgba(255,255,255,${String(o)})` }}
            >
              <div className="h-1 w-[60%] rounded-sm mb-2" style={{ background: `${ACCENT}30` }} />
              <div className="h-5 w-[80%] bg-white/[0.08] rounded mb-1.5" />
              <div className="h-[0.1875rem] w-[90%] bg-white/[0.04] rounded-sm" />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <div className="h-7 w-20 rounded-[0.375rem]" style={{ background: `${ACCENT}25` }} />
          <div className="h-7 w-[3.75rem] rounded-[0.375rem] bg-overlay-active" />
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {[70, 50, 85, 40].map((w, i) => (
            <div
              key={i}
              className="h-[0.1875rem] rounded-sm"
              style={{
                width: `${String(w)}%`,
                background: `rgba(255,255,255,${String(0.03 + i * 0.01)})`,
              }}
            />
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ---- IMAGE MOCKUP (carousel for projects with real screenshots) -----

function ImageMockup({ images, url, color }: { images: string[]; url: string; color: string }) {
  const [idx, setIdx] = useState(0);

  return (
    <div>
      <BrowserFrame title={url} color={color}>
        <div className="relative overflow-hidden aspect-[16/10]">
          <Image
            src={images[idx]}
            alt={`Screenshot ${String(idx + 1)}`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-top transition-opacity duration-300"
          />
        </div>
      </BrowserFrame>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            onClick={() => { setIdx((i) => (i - 1 + images.length) % images.length); }}
            aria-label="Previous screenshot"
            className="w-8 h-8 rounded-full bg-overlay-active border border-overlay-border text-text-dim text-sm cursor-pointer flex items-center justify-center"
          >
            &lsaquo;
          </button>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIdx(i); }}
                aria-label={`Go to screenshot ${String(i + 1)}`}
                className={cn(
                  "h-1.5 rounded-[0.1875rem] border-none cursor-pointer p-0 transition-all duration-300",
                  idx === i
                    ? "w-5 bg-accent"
                    : "w-1.5 bg-white/[0.15]",
                )}
              />
            ))}
          </div>
          <button
            onClick={() => { setIdx((i) => (i + 1) % images.length); }}
            aria-label="Next screenshot"
            className="w-8 h-8 rounded-full bg-overlay-active border border-overlay-border text-text-dim text-sm cursor-pointer flex items-center justify-center"
          >
            &rsaquo;
          </button>
        </div>
      )}
    </div>
  );
}
