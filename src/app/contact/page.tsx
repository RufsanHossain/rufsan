"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ACCENT, TEXT, TEXT_DIM, GLASS, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { sendContactEmail } from "./action";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  /* ── Extra-small breakpoint for iPhone SE / 320px class ── */
  const [isXs, setIsXs] = useState(false);
  const checkXs = useCallback(() => { setIsXs(window.innerWidth < 380); }, []);
  useEffect(() => {
    checkXs();
    window.addEventListener("resize", checkXs);
    return () => { window.removeEventListener("resize", checkXs); };
  }, [checkXs]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.type) e.type = "Select a project type";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20) e.message = "Tell me a bit more (20+ chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setServerError(null);
    const result = await sendContactEmail(form);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error ?? "Something went wrong.");
    }
  };

  const sectionPx = isXs ? "0.75rem" : isMobile ? "1rem" : "2rem";

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: isXs ? "0.6875rem 0.75rem" : isMobile ? "0.75rem 0.875rem" : "0.875rem 1rem",
    background: errors[field]
      ? "rgba(239,68,68,0.05)"
      : focused === field
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.03)",
    border: `1px solid ${errors[field] ? "rgba(239,68,68,0.4)" : focused === field ? `${ACCENT}40` : "rgba(255,255,255,0.08)"}`,
    borderRadius: "0.625rem",
    color: "#fafafa",
    /* 1rem minimum on mobile prevents iOS auto-zoom on focus */
    fontSize: isMobile ? "1rem" : "0.9375rem",
    fontFamily: FONT_BODY,
    outline: "none",
    transition: "all 0.2s ease",
  });

  /* ────────────────────── SUCCESS STATE ────────────────────── */
  if (submitted)
    return (
      <section
        style={{
          padding: `${isMobile ? "6.25rem" : "8.125rem"} ${sectionPx} 3.75rem`,
          maxWidth: "75rem",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", padding: isXs ? "0 0.25rem" : "0" }}>
              <div
                style={{
                  width: isXs ? "4rem" : "5rem",
                  height: isXs ? "4rem" : "5rem",
                  borderRadius: "1.25rem",
                  background: `${ACCENT}12`,
                  border: `1px solid ${ACCENT}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  fontSize: isXs ? "1.75rem" : "2.25rem",
                }}
              >
                ✓
              </div>
              <h1
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: isXs
                    ? "clamp(1.5rem, 9vw, 2rem)"
                    : isMobile
                      ? "clamp(2rem, 8vw, 2.75rem)"
                      : "3rem",
                  fontWeight: 800,
                  color: "#fafafa",
                  margin: "0 0 1rem",
                }}
              >
                Message Sent!
              </h1>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: isXs ? "0.8125rem" : isMobile ? "0.9375rem" : "1.0625rem",
                  color: TEXT_DIM,
                  lineHeight: 1.7,
                  maxWidth: "27.5rem",
                  margin: "0 auto 2rem",
                }}
              >
                Thanks, {form.name}. I&apos;ll get back to you within 24 hours.
              </p>
              <Link
                href="/"
                style={{
                  display: "inline-block",
                  background: ACCENT,
                  color: "#050505",
                  padding: isXs ? "0.75rem 1.5rem" : "0.875rem 2rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  fontFamily: FONT_BODY,
                  textDecoration: "none",
                }}
              >
                ← Back to Home
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    );

  /* ────────────────────── FORM STATE ────────────────────── */
  return (
    <section
      style={{
        padding: `${isMobile ? "6.25rem" : "8.125rem"} ${sectionPx} 3.75rem`,
        maxWidth: "75rem",
        margin: "0 auto",
      }}
    >
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "4rem",
          alignItems: "start",
          paddingTop: "1.25rem",
        }}
      >
        {/* ── Left: Info panel ── */}
        <FadeIn>
          <div>
            <h1
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: "0 0 1.25rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: isXs
                    ? "clamp(1.375rem, 8.5vw, 1.75rem)"
                    : isMobile
                      ? "clamp(1.75rem, 8vw, 2.5rem)"
                      : "clamp(2.25rem, 5vw, 3.5rem)",
                  lineHeight: 1.08,
                  color: "#fafafa",
                }}
              >
                Let&apos;s build
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: isXs
                    ? "clamp(1.25rem, 7.5vw, 1.5rem)"
                    : isMobile
                      ? "clamp(1.5rem, 7vw, 2.25rem)"
                      : "clamp(1.875rem, 4vw, 2.875rem)",
                  lineHeight: 1.1,
                  color: "#fafafa",
                  marginTop: "0.125rem",
                }}
              >
                something great
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: isXs
                    ? "clamp(1rem, 6vw, 1.25rem)"
                    : isMobile
                      ? "clamp(1.25rem, 6vw, 1.875rem)"
                      : "clamp(1.5rem, 3.2vw, 2.375rem)",
                  lineHeight: 1.12,
                  color: TEXT_DIM,
                  marginTop: "0.25rem",
                }}
              >
                together.
              </span>
            </h1>

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: isXs ? "0.8125rem" : isMobile ? "0.9375rem" : "1.0625rem",
                lineHeight: 1.7,
                color: TEXT_DIM,
                maxWidth: "27.5rem",
                marginBottom: isMobile ? "1.5rem" : "3rem",
              }}
            >
              Fill out the form or reach out directly.
            </p>

            {/* ── Contact links ── */}
            {/* 1-col on xs (320px), 2-col on mobile, vertical list on desktop */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isXs ? "1fr" : isMobile ? "1fr 1fr" : "1fr",
                gap: isXs ? "0.75rem" : isMobile ? "1rem" : "1.25rem",
              }}
            >
              {[
                {
                  label: "Email",
                  value: "hello@rufsan.dev",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.125rem", height: "1.125rem" }}>
                      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" fill="#fafafa" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/rufsan",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.125rem", height: "1.125rem" }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#fafafa" />
                    </svg>
                  ),
                },
                {
                  label: "GitHub",
                  value: "github.com/rufsan",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.125rem", height: "1.125rem" }}>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#fafafa" />
                    </svg>
                  ),
                },
                {
                  label: "X (Twitter)",
                  value: "@rufsan",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: "1rem", height: "1rem" }}>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#fafafa" />
                    </svg>
                  ),
                },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isXs ? "0.5rem" : isMobile ? "0.625rem" : "1rem",
                  }}
                >
                  <div
                    style={{
                      width: isXs ? "2.25rem" : "2.75rem",
                      height: isXs ? "2.25rem" : "2.75rem",
                      borderRadius: isXs ? "0.5rem" : "0.75rem",
                      ...GLASS,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: isXs ? "0.625rem" : "0.75rem",
                        color: TEXT_DIM,
                        marginBottom: "0.0625rem",
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: isXs ? "0.6875rem" : isMobile ? "0.75rem" : "0.875rem",
                        color: TEXT,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Availability badge ── */}
            <div
              style={{
                marginTop: isXs ? "1.25rem" : isMobile ? "1.5rem" : "3rem",
                padding: isXs
                  ? "0.75rem 0.75rem"
                  : isMobile
                    ? "0.875rem 1rem"
                    : "1.25rem 1.5rem",
                ...GLASS,
                borderRadius: "0.875rem",
                border: `1px solid ${ACCENT}15`,
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  borderRadius: "50%",
                  background: ACCENT,
                  animation: "pulse 2s infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: isXs ? "0.6875rem" : isMobile ? "0.8125rem" : "0.875rem",
                  color: TEXT,
                  lineHeight: 1.4,
                }}
              >
                Available — typical response within 24 hours.
              </span>
            </div>
          </div>
        </FadeIn>

        {/* ── Right: Form panel ── */}
        <FadeIn delay={0.15}>
          <div
            style={{
              ...GLASS,
              borderRadius: isXs ? "1rem" : "1.25rem",
              padding: isXs
                ? "1.25rem 0.875rem"
                : isMobile
                  ? "1.75rem 1.25rem"
                  : "2.5rem 2.25rem",
            }}
          >
            <h3
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: isXs ? "1.125rem" : isMobile ? "1.25rem" : "1.375rem",
                fontWeight: 700,
                color: "#fafafa",
                marginBottom: "0.375rem",
              }}
            >
              Send a message
            </h3>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: isXs ? "0.75rem" : "0.875rem",
                color: TEXT_DIM,
                marginBottom: isXs ? "1.25rem" : "2rem",
              }}
            >
              Tell me about your project.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isXs ? "0.75rem" : "1rem",
              }}
            >
              {/* Name + Email — always stacked on mobile/xs */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isXs ? "0.75rem" : "1rem",
                }}
              >
                <div>
                  <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    onFocus={() => { setFocused("name"); }}
                    onBlur={() => { setFocused(null); }}
                    style={inputStyle("name")}
                  />
                  {errors.name && (
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        color: "#ef4444",
                        fontFamily: FONT_BODY,
                        marginTop: "0.25rem",
                        display: "block",
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                    onFocus={() => { setFocused("email"); }}
                    onBlur={() => { setFocused(null); }}
                    style={inputStyle("email")}
                  />
                  {errors.email && (
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        color: "#ef4444",
                        fontFamily: FONT_BODY,
                        marginTop: "0.25rem",
                        display: "block",
                      }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Project type */}
              <div>
                <select
                  value={form.type}
                  onChange={(e) => {
                    setForm({ ...form, type: e.target.value });
                    setErrors({ ...errors, type: "" });
                  }}
                  onFocus={() => { setFocused("type"); }}
                  onBlur={() => { setFocused(null); }}
                  style={{
                    ...inputStyle("type"),
                    appearance: "none" as const,
                    color: form.type ? "#fafafa" : TEXT_DIM,
                  }}
                >
                  <option value="" style={{ background: "#111" }}>Project type</option>
                  <option value="saas" style={{ background: "#111" }}>SaaS Product</option>
                  <option value="ai" style={{ background: "#111" }}>AI / ML Integration</option>
                  <option value="data" style={{ background: "#111" }}>Data / Analytics</option>
                  <option value="consulting" style={{ background: "#111" }}>Consulting</option>
                  <option value="other" style={{ background: "#111" }}>Other</option>
                </select>
                {errors.type && (
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#ef4444",
                      fontFamily: FONT_BODY,
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    {errors.type}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    setErrors({ ...errors, message: "" });
                  }}
                  onFocus={() => { setFocused("msg"); }}
                  onBlur={() => { setFocused(null); }}
                  rows={isXs ? 4 : 5}
                  style={{
                    ...inputStyle("message"),
                    resize: "vertical" as const,
                    minHeight: isXs ? "5.5rem" : "7.5rem",
                  }}
                />
                {errors.message && (
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#ef4444",
                      fontFamily: FONT_BODY,
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: "0.5rem",
                    fontSize: "0.8125rem",
                    color: "#ef4444",
                    fontFamily: FONT_BODY,
                  }}
                >
                  {serverError}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={() => { void handleSubmit(); }}
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? `${ACCENT}80` : ACCENT,
                  color: "#050505",
                  border: "none",
                  padding: isXs ? "0.8125rem" : "1rem",
                  borderRadius: "0.625rem",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  fontFamily: FONT_BODY,
                  cursor: loading ? "not-allowed" : "pointer",
                  marginTop: isXs ? "0.25rem" : "0.5rem",
                  opacity: loading ? 0.7 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}