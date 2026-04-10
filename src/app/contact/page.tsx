"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ACCENT } from "@/lib/constants";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { sendContactEmail } from "./action";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

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
    trackEvent("contact_form_submit", { project_type: form.type });
    const result = await sendContactEmail(form);
    setLoading(false);
    if (result.success) {
      trackEvent("contact_form_success");
      setSubmitted(true);
    } else {
      setServerError(result.error ?? "Something went wrong.");
    }
  };

  const sectionPx = isXs ? "0.75rem" : isMobile ? "1rem" : "2rem";

  const inputClasses = (_field: string) =>
    cn(
      "w-full rounded-[0.625rem] font-body outline-none transition-all duration-200",
      isXs ? "py-[0.6875rem] px-3" : isMobile ? "py-3 px-[0.875rem]" : "py-[0.875rem] px-4",
      isMobile ? "text-base" : "text-[0.9375rem]",
    );

  const inputDynamicStyle = (field: string): React.CSSProperties => ({
    background: errors[field]
      ? "rgba(239,68,68,0.05)"
      : focused === field
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.03)",
    border: `1px solid ${errors[field] ? "rgba(239,68,68,0.4)" : focused === field ? `${ACCENT}40` : "rgba(255,255,255,0.08)"}`,
    color: "var(--color-fg)",
  });

  /* ────────────────────── SUCCESS STATE ────────────────────── */
  if (submitted)
    return (
      <section
        className="max-w-[75rem] mx-auto pb-[3.75rem]"
        style={{ paddingTop: isMobile ? "6.25rem" : "8.125rem", paddingLeft: sectionPx, paddingRight: sectionPx }}
      >
        <div className="min-h-[60vh] flex items-center justify-center">
          <FadeIn>
            <div className={cn("text-center", isXs ? "px-1" : "px-0")}>
              <div
                className={cn(
                  "rounded-[1.25rem] flex items-center justify-center mx-auto mb-6",
                  isXs ? "w-16 h-16 text-[1.75rem]" : "w-20 h-20 text-[2.25rem]",
                )}
                style={{
                  background: `${ACCENT}12`,
                  border: `1px solid ${ACCENT}25`,
                }}
              >
                ✓
              </div>
              <h1
                className="font-display font-[800] text-fg mb-4"
                style={{
                  fontSize: isXs
                    ? "clamp(1.5rem, 9vw, 2rem)"
                    : isMobile
                      ? "clamp(2rem, 8vw, 2.75rem)"
                      : "3rem",
                }}
              >
                Message Sent!
              </h1>
              <p
                className={cn(
                  "font-body text-text-dim leading-[1.7] max-w-[27.5rem] mx-auto mb-8",
                  isXs ? "text-[0.8125rem]" : isMobile ? "text-[0.9375rem]" : "text-[1.0625rem]",
                )}
              >
                Thanks, {form.name}. I&apos;ll get back to you within 24 hours.
              </p>
              <Link
                href="/"
                className={cn(
                  "inline-block bg-accent text-accent-fg rounded-lg text-[0.9375rem] font-semibold font-body no-underline",
                  isXs ? "py-3 px-6" : "py-[0.875rem] px-8",
                )}
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
      className="max-w-[75rem] mx-auto pb-[3.75rem]"
      style={{ paddingTop: isMobile ? "6.25rem" : "8.125rem", paddingLeft: sectionPx, paddingRight: sectionPx }}
    >
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div
        className={cn(
          "grid items-start pt-5",
          isMobile ? "grid-cols-1 gap-8" : "grid-cols-2 gap-16",
        )}
      >
        {/* ── Left: Info panel ── */}
        <FadeIn>
          <div>
            <h1 className="font-display font-[800] tracking-[-0.04em] mb-5">
              <span
                className="block leading-[1.08] text-fg"
                style={{
                  fontSize: isXs
                    ? "clamp(1.375rem, 8.5vw, 1.75rem)"
                    : isMobile
                      ? "clamp(1.75rem, 8vw, 2.5rem)"
                      : "clamp(2.25rem, 5vw, 3.5rem)",
                }}
              >
                Let&apos;s build
              </span>
              <span
                className="block leading-[1.1] text-fg mt-0.5"
                style={{
                  fontSize: isXs
                    ? "clamp(1.25rem, 7.5vw, 1.5rem)"
                    : isMobile
                      ? "clamp(1.5rem, 7vw, 2.25rem)"
                      : "clamp(1.875rem, 4vw, 2.875rem)",
                }}
              >
                something great
              </span>
              <span
                className="block leading-[1.12] text-text-dim mt-1"
                style={{
                  fontSize: isXs
                    ? "clamp(1rem, 6vw, 1.25rem)"
                    : isMobile
                      ? "clamp(1.25rem, 6vw, 1.875rem)"
                      : "clamp(1.5rem, 3.2vw, 2.375rem)",
                }}
              >
                together.
              </span>
            </h1>

            <p
              className={cn(
                "font-body leading-[1.7] text-text-dim max-w-[27.5rem]",
                isXs ? "text-[0.8125rem]" : isMobile ? "text-[0.9375rem]" : "text-[1.0625rem]",
                isMobile ? "mb-6" : "mb-12",
              )}
            >
              Fill out the form or reach out directly.
            </p>

            {/* ── Contact links ── */}
            {/* 1-col on xs (320px), 2-col on mobile, vertical list on desktop */}
            <div
              className={cn(
                "grid",
                isXs ? "grid-cols-1 gap-3" : isMobile ? "grid-cols-2 gap-4" : "grid-cols-1 gap-5",
              )}
            >
              {[
                {
                  label: "Email",
                  value: "rufsanhossainsanto@gmail.com",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-[1.125rem] h-[1.125rem]">
                      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" fill="#fafafa" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/rufsan-hossain-santo",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-[1.125rem] h-[1.125rem]">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#fafafa" />
                    </svg>
                  ),
                },
                {
                  label: "GitHub",
                  value: "github.com/RufsanHossain",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-[1.125rem] h-[1.125rem]">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#fafafa" />
                    </svg>
                  ),
                },
                {
                  label: "X (Twitter)",
                  value: "@rufsanH",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#fafafa" />
                    </svg>
                  ),
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className={cn(
                    "flex items-center",
                    isXs ? "gap-2" : isMobile ? "gap-[0.625rem]" : "gap-4",
                  )}
                >
                  <div
                    className={cn(
                      "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border flex items-center justify-center shrink-0",
                      isXs ? "w-9 h-9 rounded-lg" : "w-11 h-11 rounded-xl",
                    )}
                  >
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "font-body text-text-dim mb-[0.0625rem]",
                        isXs ? "text-[0.625rem]" : "text-xs",
                      )}
                    >
                      {c.label}
                    </div>
                    <div
                      className={cn(
                        "font-mono text-text overflow-hidden text-ellipsis whitespace-nowrap",
                        isXs ? "text-[0.6875rem]" : isMobile ? "text-xs" : "text-sm",
                      )}
                    >
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Availability badge ── */}
            <div
              className={cn(
                "bg-overlay-subtle backdrop-blur-[20px] border rounded-[0.875rem] flex items-center gap-[0.625rem] w-fit",
                isXs ? "mt-5 py-3 px-3" : isMobile ? "mt-6 py-[0.875rem] px-4" : "mt-12 py-5 px-6",
              )}
              style={{ borderColor: `${ACCENT}15` }}
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span
                className={cn(
                  "font-body text-text leading-[1.4]",
                  isXs ? "text-[0.6875rem]" : isMobile ? "text-[0.8125rem]" : "text-sm",
                )}
              >
                Available — typical response within 24 hours.
              </span>
            </div>
          </div>
        </FadeIn>

        {/* ── Right: Form panel ── */}
        <FadeIn delay={0.15}>
          <div
            className={cn(
              "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border",
              isXs ? "rounded-2xl py-5 px-[0.875rem]" : isMobile ? "rounded-[1.25rem] py-7 px-5" : "rounded-[1.25rem] py-10 px-9",
            )}
          >
            <h3
              className={cn(
                "font-display font-bold text-fg mb-[0.375rem]",
                isXs ? "text-lg" : isMobile ? "text-xl" : "text-[1.375rem]",
              )}
            >
              Send a message
            </h3>
            <p
              className={cn(
                "font-body text-text-dim",
                isXs ? "text-xs mb-5" : "text-sm mb-8",
              )}
            >
              Tell me about your project.
            </p>

            <div className={cn("flex flex-col", isXs ? "gap-3" : "gap-4")}>
              {/* Name + Email — always stacked on mobile/xs */}
              <div
                className={cn(
                  "grid",
                  isMobile ? "grid-cols-1" : "grid-cols-2",
                  isXs ? "gap-3" : "gap-4",
                )}
              >
                <div>
                  <input
                    placeholder="Name"
                    aria-label="Name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    onFocus={() => { setFocused("name"); }}
                    onBlur={() => { setFocused(null); }}
                    className={inputClasses("name")}
                    style={inputDynamicStyle("name")}
                  />
                  {errors.name && (
                    <span className="text-[0.6875rem] text-[#ef4444] font-body mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Email"
                    aria-label="Email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                    onFocus={() => { setFocused("email"); }}
                    onBlur={() => { setFocused(null); }}
                    className={inputClasses("email")}
                    style={inputDynamicStyle("email")}
                  />
                  {errors.email && (
                    <span className="text-[0.6875rem] text-[#ef4444] font-body mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Project type */}
              <div>
                <select
                  value={form.type}
                  aria-label="Project type"
                  onChange={(e) => {
                    setForm({ ...form, type: e.target.value });
                    setErrors({ ...errors, type: "" });
                  }}
                  onFocus={() => { setFocused("type"); }}
                  onBlur={() => { setFocused(null); }}
                  className={cn(
                    inputClasses("type"),
                    "appearance-none pr-10",
                  )}
                  style={{
                    ...inputDynamicStyle("type"),
                    color: form.type ? "var(--color-fg)" : undefined,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="" className="bg-code-bg">Project type</option>
                  <option value="saas" className="bg-code-bg">SaaS Product</option>
                  <option value="ai" className="bg-code-bg">AI / ML Integration</option>
                  <option value="data" className="bg-code-bg">Data / Analytics</option>
                  <option value="consulting" className="bg-code-bg">Consulting</option>
                  <option value="other" className="bg-code-bg">Other</option>
                </select>
                {errors.type && (
                  <span className="text-[0.6875rem] text-[#ef4444] font-body mt-1 block">
                    {errors.type}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Tell me about your project..."
                  aria-label="Message"
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    setErrors({ ...errors, message: "" });
                  }}
                  onFocus={() => { setFocused("message"); }}
                  onBlur={() => { setFocused(null); }}
                  rows={isXs ? 4 : 5}
                  className={cn(
                    inputClasses("message"),
                    "resize-y",
                    isXs ? "min-h-[5.5rem]" : "min-h-[7.5rem]",
                  )}
                  style={inputDynamicStyle("message")}
                />
                {errors.message && (
                  <span className="text-[0.6875rem] text-[#ef4444] font-body mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div className="py-3 px-4 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.3)] rounded-lg text-[0.8125rem] text-[#ef4444] font-body">
                  {serverError}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={() => { void handleSubmit(); }}
                disabled={loading}
                className={cn(
                  "w-full border-none rounded-[0.625rem] text-[0.9375rem] font-semibold font-body transition-all duration-200",
                  isXs ? "py-[0.8125rem] mt-1" : "py-4 mt-2",
                  loading ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100",
                )}
                style={{
                  background: loading ? `${ACCENT}80` : ACCENT,
                  color: "var(--color-accent-fg)",
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
