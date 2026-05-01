"use client";

import { useEffect, useCallback, useState } from "react";
import { RESUME, downloadResumePdf } from "@/lib/resume";
import { trackEvent } from "@/lib/analytics";


interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const [downloading, setDownloading] = useState(false);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, handleEsc]);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      trackEvent("resume_download");
      await downloadResumePdf();
    } catch (err) {
      console.error("Resume PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close resume preview"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-[10px] border-none cursor-default p-0 w-full"
      />

      {/* Resume container */}
      <div
        role="dialog"
        aria-label="Resume preview"
        className="relative z-[1] w-[calc(100%-2rem)] max-w-[52rem] h-[85vh] max-h-[800px] rounded-2xl overflow-hidden bg-[#0e0e0e] border border-overlay-border shadow-[0_2rem_6rem_rgba(0,0,0,0.7)] flex flex-col"
        style={{ animation: "resumeModalIn 0.25s ease-out" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-overlay-border-subtle shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[0.6875rem] text-text-dim">resume.pdf</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { void handleDownload(); }}
              disabled={downloading}
              aria-label={downloading ? "Generating PDF" : "Download resume as PDF"}
              className="h-7 px-3 rounded-md bg-accent/10 border border-accent/30 text-accent text-[0.6875rem] font-mono cursor-pointer flex items-center gap-1.5 hover:bg-accent/15 disabled:opacity-60 disabled:cursor-wait transition-colors"
            >
              <span aria-hidden="true">&#x2913;</span>
              <span>{downloading ? "Generating…" : "Download"}</span>
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="w-7 h-7 rounded-md bg-overlay-subtle border border-overlay-border text-text-dim text-sm cursor-pointer flex items-center justify-center hover:text-fg transition-colors"
            >
              &#x2715;
            </button>
          </div>
        </div>

        {/* Resume content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10">
          <div className="max-w-[46rem] mx-auto">
            {/* Header */}
            <h1 className="font-display font-[800] text-[1.75rem] md:text-[2.25rem] text-fg tracking-[-0.03em] leading-[1.1] mb-1">
              {RESUME.name}
            </h1>
            <p className="font-body text-accent text-sm md:text-base font-semibold mb-2">
              {RESUME.title}
            </p>
            <p className="font-mono text-[0.6875rem] md:text-xs text-text-dim leading-relaxed">
              {[RESUME.location, RESUME.email, RESUME.site, RESUME.github, RESUME.linkedin].join(" · ")}
            </p>

            <div className="h-px bg-overlay-border my-6" />

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_16rem] gap-8 md:gap-10">
              {/* Left column */}
              <div>
                {/* Summary */}
                <SectionTitle>Summary</SectionTitle>
                <p className="font-body text-[0.8125rem] md:text-sm text-text-dim leading-[1.7] mb-8">
                  {RESUME.summary}
                </p>

                {/* Experience */}
                <SectionTitle>Experience</SectionTitle>
                <div className="flex flex-col gap-5 mb-8">
                  {RESUME.experience.map((exp) => (
                    <div key={exp.title + exp.org}>
                      <div className="flex justify-between items-baseline gap-3 flex-wrap">
                        <h3 className="font-body text-sm font-semibold text-fg">{exp.title}</h3>
                        <span className="font-mono text-[0.6875rem] text-text-dim whitespace-nowrap">{exp.date}</span>
                      </div>
                      <p className="font-body text-xs text-accent mb-1.5">
                        {exp.org} &middot; {exp.type}
                      </p>
                      <ul className="list-none m-0 p-0 flex flex-col gap-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="font-body text-[0.8125rem] text-text-dim leading-[1.65] flex gap-2">
                            <span className="text-accent mt-[0.375rem] shrink-0">&#x2022;</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Key Projects */}
                <SectionTitle>Key Projects</SectionTitle>
                <div className="flex flex-col gap-4">
                  {RESUME.projects.map((proj) => (
                    <div key={proj.name}>
                      <h3 className="font-body text-sm font-semibold text-fg mb-0.5">{proj.name}</h3>
                      <p className="font-body text-[0.8125rem] text-text-dim leading-[1.6] mb-2">{proj.desc}</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="py-[0.1875rem] px-2.5 rounded-md text-[0.625rem] font-mono text-accent font-medium bg-accent/[0.08] border border-accent/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div>
                {/* Skills */}
                <SectionTitle>Skills</SectionTitle>
                <div className="flex flex-col gap-3 mb-8">
                  {Object.entries(RESUME.skills).map(([cat, items]) => (
                    <div key={cat}>
                      <h4 className="font-body text-[0.8125rem] font-semibold text-fg mb-0.5">{cat}</h4>
                      <p className="font-body text-xs text-text-dim leading-[1.6]">{items}</p>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <SectionTitle>Education</SectionTitle>
                <div className="flex flex-col gap-3 mb-8">
                  {RESUME.education.map((ed) => (
                    <div key={ed.degree}>
                      <h4 className="font-body text-[0.8125rem] font-semibold text-fg">{ed.degree}</h4>
                      <p className="font-body text-xs text-text-dim">{ed.school}</p>
                      <p className="font-mono text-[0.6875rem] text-text-dim">{ed.date} &middot; {ed.note}</p>
                    </div>
                  ))}
                </div>

                {/* Languages */}
                <SectionTitle>Languages</SectionTitle>
                <div className="mb-8">
                  {RESUME.languages.map((l) => (
                    <p key={l.name} className="font-body text-[0.8125rem] text-text-dim">
                      <strong className="text-fg">{l.name}</strong> — {l.level}
                    </p>
                  ))}
                </div>

                {/* Approach */}
                <SectionTitle>Approach</SectionTitle>
                <ul className="list-none m-0 p-0 flex flex-col gap-1">
                  {RESUME.approach.map((item) => (
                    <li key={item} className="font-body text-[0.8125rem] text-text-dim flex gap-2">
                      <span className="text-accent mt-px shrink-0">&#x2022;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="h-px bg-overlay-border mt-8 mb-4" />
            <div className="flex justify-between items-center">
              <p className="font-mono text-[0.625rem] text-text-dim">{RESUME.name} &middot; {RESUME.site}</p>
              <p className="font-mono text-[0.625rem] text-text-dim">References available upon request</p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes resumeModalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-accent text-xs font-bold uppercase tracking-[0.1em] mb-3">
      {children}
    </h2>
  );
}
