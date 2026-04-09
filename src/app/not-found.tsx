import Link from "next/link";
import {
  ACCENT,
  BG,
  TEXT,
  TEXT_DIM,
  BORDER,
  GLASS,
  FONT_DISPLAY,
  FONT_BODY,
  FONT_MONO,
} from "@/lib/constants";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "AI / ML", href: "/ai" },
  { label: "Development", href: "/dev" },
  { label: "Data Science", href: "/ds" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BG,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "560px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* 404 code */}
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.8125rem",
            color: ACCENT,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          404 &mdash; Page not found
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: TEXT,
            lineHeight: 1.15,
            margin: "0 0 1rem",
          }}
        >
          Nothing here<span style={{ color: ACCENT }}>.</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: "1.0625rem",
            color: TEXT_DIM,
            lineHeight: 1.6,
            margin: "0 0 2.5rem",
            maxWidth: "420px",
            marginInline: "auto",
          }}
        >
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved. Let&rsquo;s get you back on track.
        </p>

        {/* Primary CTA */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: FONT_BODY,
            fontSize: "0.9375rem",
            fontWeight: 500,
            color: BG,
            background: ACCENT,
            padding: "0.75rem 1.75rem",
            borderRadius: "9999px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Link>

        {/* Quick links card */}
        <div
          style={{
            ...GLASS,
            marginTop: "3rem",
            borderRadius: "1rem",
            padding: "1.5rem 2rem",
          }}
        >
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.6875rem",
              color: TEXT_DIM,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Quick links
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "0.8125rem",
                  color: TEXT,
                  textDecoration: "none",
                  padding: "0.375rem 0.875rem",
                  borderRadius: "9999px",
                  border: `1px solid ${BORDER}`,
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
