"use client";

import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "28rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-fg)",
            margin: "0 0 0.75rem",
          }}
        >
          Failed to load post
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.9375rem",
            color: "#71717a",
            lineHeight: 1.7,
            margin: "0 0 2rem",
          }}
        >
          {error.message || "This blog post could not be loaded."}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              background: "#8deab2",
              color: "var(--color-on-accent)",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              fontFamily: "var(--font-dm-sans), sans-serif",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link
            href="/blog"
            style={{
              background: "var(--color-overlay-active)",
              color: "var(--color-fg)",
              border: "1px solid var(--color-overlay-border)",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              fontFamily: "var(--font-dm-sans), sans-serif",
              textDecoration: "none",
            }}
          >
            All posts
          </Link>
        </div>
      </div>
    </section>
  );
}
