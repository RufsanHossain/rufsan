"use client";

import { useEffect, useCallback } from "react";


interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const EXPERIENCE = [
  {
    title: "Full-Stack Developer",
    date: "Jan 2025 – Present",
    org: "Media Pantheon, Inc.",
    type: "Full-time",
    bullets: [
      "Building production web applications with TypeScript, React, and modern full-stack frameworks.",
      "Architecting scalable front-end and back-end systems for enterprise-grade products.",
      "Implementing CI/CD pipelines, automated testing, and code quality tooling.",
    ],
  },
  {
    title: "Founder & Lead Developer",
    date: "2024 – Present",
    org: "Agency / Freelance",
    type: "Remote",
    bullets: [
      "Founded agency building SaaS, AI integrations, and data solutions for US-market clients.",
      "Delivering apps with Next.js, strict TypeScript, MongoDB, and enterprise-grade security.",
    ],
  },
  {
    title: "Brand Representative",
    date: "Dec 2023 – Mar 2024",
    org: "Interactive Cares",
    type: "Dhaka",
    bullets: [
      "Product research and software industry representation in the Dhaka tech ecosystem.",
    ],
  },
  {
    title: "Senior Content Writer",
    date: "Jun 2023 – Feb 2024",
    org: "A1 DIGI",
    type: "Dhaka",
    bullets: [
      "SEO-optimized content strategy, product research, and multi-project editorial management.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Mizan",
    desc: "Prayer-based daily planner for Muslim professionals. Structures productivity around Salah times.",
    tech: ["Next.js", "TypeScript", "MongoDB"],
  },
  {
    name: "Audex",
    desc: "Code quality analysis tool with automated audits, linting reports, and actionable recommendations.",
    tech: ["React", "Node.js", "AST"],
  },
  {
    name: "Portfolio",
    desc: "Custom Next.js 16 site with strict ESLint, accessibility enforcement, and Vercel CI/CD.",
    tech: ["Next.js 16", "Vercel", "a11y"],
  },
];

const SKILLS: Record<string, string> = {
  Frontend: "React, Next.js, TypeScript, Tailwind, HTML5, CSS3",
  Backend: "Node.js, Express, MongoDB, Mongoose, REST APIs, Python",
  "AI / ML": "LLM Integration, RAG Pipelines, OpenAI API, Prompt Eng.",
  Data: "Pandas, Pipelines, Visualization, Analytics",
  DevOps: "Vercel, Git, CI/CD, Docker, ESLint, QA",
  Security: "RBAC, JWT, Zod, Helmet, CORS, XSS Prevention",
  Design: "Figma, UI/UX, Mobile-First, a11y",
};

const APPROACH = [
  "Domain modeling before code",
  "Security-first architecture",
  "Strict TypeScript, zero any",
  "Mobile-first responsive design",
  "Accessibility as standard",
  "Building in public",
];

export function ResumeModal({ open, onClose }: ResumeModalProps) {
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
              Rufsan Hossain Santo
            </h1>
            <p className="font-body text-accent text-sm md:text-base font-semibold mb-2">
              Full-Stack Developer &amp; Agency Founder
            </p>
            <p className="font-mono text-[0.6875rem] md:text-xs text-text-dim leading-relaxed">
              Dhaka, Bangladesh &middot; rufsanhossainsanto@gmail.com &middot; rufsansanto.com &middot; github.com/rufsan &middot; linkedin.com/in/rufsan-hossain-santo
            </p>

            <div className="h-px bg-overlay-border my-6" />

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_16rem] gap-8 md:gap-10">
              {/* Left column */}
              <div>
                {/* Summary */}
                <SectionTitle>Summary</SectionTitle>
                <p className="font-body text-[0.8125rem] md:text-sm text-text-dim leading-[1.7] mb-8">
                  Full-stack developer at Media Pantheon and agency founder serving US-market clients. Building production SaaS, AI-integrated apps, and data pipelines with Next.js, TypeScript, and MERN. CS graduate from Eastern University.
                </p>

                {/* Experience */}
                <SectionTitle>Experience</SectionTitle>
                <div className="flex flex-col gap-5 mb-8">
                  {EXPERIENCE.map((exp) => (
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
                  {PROJECTS.map((proj) => (
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
                  {Object.entries(SKILLS).map(([cat, items]) => (
                    <div key={cat}>
                      <h4 className="font-body text-[0.8125rem] font-semibold text-fg mb-0.5">{cat}</h4>
                      <p className="font-body text-xs text-text-dim leading-[1.6]">{items}</p>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <SectionTitle>Education</SectionTitle>
                <div className="flex flex-col gap-3 mb-8">
                  <div>
                    <h4 className="font-body text-[0.8125rem] font-semibold text-fg">B.Sc. Computer Science &amp; Engineering</h4>
                    <p className="font-body text-xs text-text-dim">Eastern University</p>
                    <p className="font-mono text-[0.6875rem] text-text-dim">2018 – 2023 &middot; GPA 3.52</p>
                  </div>
                  <div>
                    <h4 className="font-body text-[0.8125rem] font-semibold text-fg">HSC (Science)</h4>
                    <p className="font-body text-xs text-text-dim">Dhaka College</p>
                    <p className="font-mono text-[0.6875rem] text-text-dim">2015 – 2017 &middot; GPA 5.00</p>
                  </div>
                </div>

                {/* Languages */}
                <SectionTitle>Languages</SectionTitle>
                <div className="mb-8">
                  <p className="font-body text-[0.8125rem] text-text-dim"><strong className="text-fg">English</strong> — Professional</p>
                  <p className="font-body text-[0.8125rem] text-text-dim"><strong className="text-fg">Bangla</strong> — Native</p>
                </div>

                {/* Approach */}
                <SectionTitle>Approach</SectionTitle>
                <ul className="list-none m-0 p-0 flex flex-col gap-1">
                  {APPROACH.map((item) => (
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
              <p className="font-mono text-[0.625rem] text-text-dim">Rufsan Hossain Santo &middot; rufsansanto.com</p>
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
