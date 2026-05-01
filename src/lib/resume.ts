export interface ExperienceEntry {
  title: string;
  date: string;
  org: string;
  type: string;
  bullets: string[];
}

export interface ProjectEntry {
  name: string;
  desc: string;
  tech: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  date: string;
  note: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export const RESUME = {
  name: "Rufsan Hossain Santo",
  title: "Full-Stack Developer & Agency Founder",
  location: "Dhaka, Bangladesh",
  email: "rufsanhossainsanto@gmail.com",
  site: "rufsansanto.com",
  github: "github.com/rufsan",
  linkedin: "linkedin.com/in/rufsan-hossain-santo",
  summary:
    "Full-stack developer at Media Pantheon and agency founder serving US-market clients. Building production SaaS, AI-integrated apps, and data pipelines with Next.js, TypeScript, and MERN. CS graduate from Eastern University.",
  experience: [
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
  ] satisfies ExperienceEntry[],
  projects: [
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
  ] satisfies ProjectEntry[],
  skills: {
    Frontend: "React, Next.js, TypeScript, Tailwind, HTML5, CSS3",
    Backend: "Node.js, Express, MongoDB, Mongoose, REST APIs, Python",
    "AI / ML": "LLM Integration, RAG Pipelines, OpenAI API, Prompt Eng.",
    Data: "Pandas, Pipelines, Visualization, Analytics",
    DevOps: "Vercel, Git, CI/CD, Docker, ESLint, QA",
    Security: "RBAC, JWT, Zod, Helmet, CORS, XSS Prevention",
    Design: "Figma, UI/UX, Mobile-First, a11y",
  } as Record<string, string>,
  education: [
    {
      degree: "B.Sc. Computer Science & Engineering",
      school: "Eastern University",
      date: "2018 – 2023",
      note: "GPA 3.52",
    },
    {
      degree: "HSC (Science)",
      school: "Dhaka College",
      date: "2015 – 2017",
      note: "GPA 5.00",
    },
  ] satisfies EducationEntry[],
  languages: [
    { name: "English", level: "Professional" },
    { name: "Bangla", level: "Native" },
  ] satisfies LanguageEntry[],
  approach: [
    "Domain modeling before code",
    "Security-first architecture",
    "Strict TypeScript, zero any",
    "Mobile-first responsive design",
    "Accessibility as standard",
    "Building in public",
  ],
};

export async function downloadResumePdf(): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });

  const PAGE_W = 612;
  const PAGE_H = 792;
  const MARGIN_X = 48;
  const MARGIN_TOP = 56;
  const MARGIN_BOTTOM = 56;
  const CONTENT_W = PAGE_W - MARGIN_X * 2;

  const COLOR_HEAD: [number, number, number] = [10, 10, 10];
  const COLOR_BODY: [number, number, number] = [38, 38, 38];
  const COLOR_MUTED: [number, number, number] = [115, 115, 115];
  const COLOR_ACCENT: [number, number, number] = [22, 142, 92];
  const COLOR_RULE: [number, number, number] = [220, 220, 220];

  let y = MARGIN_TOP;

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN_BOTTOM) {
      doc.addPage();
      y = MARGIN_TOP;
    }
  };

  const setColor = (c: [number, number, number]) => {
    doc.setTextColor(c[0], c[1], c[2]);
  };

  const text = (
    str: string,
    x: number,
    size: number,
    style: "normal" | "bold" | "italic" = "normal",
    color: [number, number, number] = COLOR_BODY,
  ) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    setColor(color);
    doc.text(str, x, y);
  };

  const wrapped = (
    str: string,
    x: number,
    size: number,
    maxW: number,
    style: "normal" | "bold" | "italic" = "normal",
    color: [number, number, number] = COLOR_BODY,
    lineHeight = 1.4,
  ) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    setColor(color);
    const lines = doc.splitTextToSize(str, maxW) as string[];
    const dy = size * lineHeight;
    lines.forEach((line, i) => {
      ensureSpace(dy);
      doc.text(line, x, y + i * dy);
    });
    y += dy * lines.length;
  };

  const sectionTitle = (label: string) => {
    ensureSpace(28);
    y += 8;
    text(label.toUpperCase(), MARGIN_X, 9, "bold", COLOR_ACCENT);
    y += 14;
  };

  const rule = () => {
    doc.setDrawColor(COLOR_RULE[0], COLOR_RULE[1], COLOR_RULE[2]);
    doc.setLineWidth(0.5);
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
    y += 14;
  };

  // Header
  text(RESUME.name, MARGIN_X, 22, "bold", COLOR_HEAD);
  y += 18;
  text(RESUME.title, MARGIN_X, 11, "normal", COLOR_ACCENT);
  y += 14;
  const contactLine = [
    RESUME.location,
    RESUME.email,
    RESUME.site,
    RESUME.github,
    RESUME.linkedin,
  ].join("  ·  ");
  wrapped(contactLine, MARGIN_X, 8.5, CONTENT_W, "normal", COLOR_MUTED, 1.4);
  y += 6;
  rule();

  // Summary
  sectionTitle("Summary");
  wrapped(RESUME.summary, MARGIN_X, 10, CONTENT_W, "normal", COLOR_BODY, 1.5);

  // Experience
  sectionTitle("Experience");
  RESUME.experience.forEach((exp) => {
    ensureSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    setColor(COLOR_HEAD);
    doc.text(exp.title, MARGIN_X, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setColor(COLOR_MUTED);
    doc.text(exp.date, PAGE_W - MARGIN_X, y, { align: "right" });
    y += 13;

    text(`${exp.org}  ·  ${exp.type}`, MARGIN_X, 9.5, "italic", COLOR_ACCENT);
    y += 13;

    exp.bullets.forEach((b) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      setColor(COLOR_BODY);
      const lines = doc.splitTextToSize(b, CONTENT_W - 14) as string[];
      const dy = 9.5 * 1.4;
      lines.forEach((line, i) => {
        ensureSpace(dy);
        if (i === 0) {
          setColor(COLOR_ACCENT);
          doc.text("•", MARGIN_X, y);
          setColor(COLOR_BODY);
        }
        doc.text(line, MARGIN_X + 12, y);
        y += dy;
      });
      y += 1;
    });
    y += 6;
  });

  // Projects
  sectionTitle("Key Projects");
  RESUME.projects.forEach((p) => {
    ensureSpace(36);
    text(p.name, MARGIN_X, 10.5, "bold", COLOR_HEAD);
    y += 13;
    wrapped(p.desc, MARGIN_X, 9.5, CONTENT_W, "normal", COLOR_BODY, 1.45);
    text(p.tech.join("  ·  "), MARGIN_X, 8.5, "normal", COLOR_MUTED);
    y += 14;
  });

  // Skills
  sectionTitle("Skills");
  Object.entries(RESUME.skills).forEach(([cat, items]) => {
    ensureSpace(16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    setColor(COLOR_HEAD);
    doc.text(cat, MARGIN_X, y);
    doc.setFont("helvetica", "normal");
    setColor(COLOR_BODY);
    const labelW = 70;
    const lines = doc.splitTextToSize(items, CONTENT_W - labelW) as string[];
    const dy = 9.5 * 1.4;
    lines.forEach((line, i) => {
      ensureSpace(dy);
      doc.text(line, MARGIN_X + labelW, y + i * dy);
    });
    y += dy * Math.max(1, lines.length) + 2;
  });

  // Education
  sectionTitle("Education");
  RESUME.education.forEach((ed) => {
    ensureSpace(30);
    text(ed.degree, MARGIN_X, 10, "bold", COLOR_HEAD);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setColor(COLOR_MUTED);
    doc.text(ed.date, PAGE_W - MARGIN_X, y, { align: "right" });
    y += 13;
    text(`${ed.school}  ·  ${ed.note}`, MARGIN_X, 9.5, "normal", COLOR_BODY);
    y += 14;
  });

  // Languages
  sectionTitle("Languages");
  const langLine = RESUME.languages
    .map((l) => `${l.name} (${l.level})`)
    .join("  ·  ");
  text(langLine, MARGIN_X, 9.5, "normal", COLOR_BODY);
  y += 14;

  // Approach
  sectionTitle("Approach");
  wrapped(
    RESUME.approach.join("  ·  "),
    MARGIN_X,
    9.5,
    CONTENT_W,
    "normal",
    COLOR_BODY,
    1.5,
  );

  doc.save("Rufsan-Hossain-Santo-Resume.pdf");
}
