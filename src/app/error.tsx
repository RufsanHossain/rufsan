"use client";

import Link from "next/link";

export default function GlobalError({
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
        <div
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "1rem",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            fontSize: "1.5rem",
          }}
        >
          !
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#fafafa",
            margin: "0 0 0.75rem",
          }}
        >
          Something went wrong
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
          {error.message || "An unexpected error occurred."}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              background: "#8deab2",
              color: "#050505",
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
            href="/"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#fafafa",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              fontFamily: "var(--font-dm-sans), sans-serif",
              textDecoration: "none",
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
