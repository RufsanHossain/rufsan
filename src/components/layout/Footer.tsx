import { BORDER, TEXT_DIM, ACCENT, FONT_BODY } from "@/lib/constants";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/RufsanHossain" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rufsan-hossain-santo/" },
  { label: "X", href: "https://x.com/RufsanH" },
  { label: "Email", href: "mailto:rufsanhossainsanto@gmail.com" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "2.5rem 2rem",
        maxWidth: "75rem",
        margin: "0 auto",
        borderTop: `1px solid ${BORDER}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div style={{ fontFamily: FONT_BODY, fontSize: "0.8125rem", color: TEXT_DIM }}>
        © {year} Rufsan · Built with Next.js & TypeScript
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {SOCIAL_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            style={{
              fontFamily: FONT_BODY,
              fontSize: "0.8125rem",
              color: TEXT_DIM,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = TEXT_DIM; }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}