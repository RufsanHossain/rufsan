"use client";

import { useState } from "react";
import Image from "next/image";
import { ACCENT, TEXT_DIM, GLASS, PHOTO_URL, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DownloadIcon } from "@/components/ui/Icons";
import { useBreakpoint } from "@/hooks/useBreakpoint";

// ─── HERO PHOTO ──────────────────────────────────────────────

export function HeroPhoto() {
  const [loaded, setLoaded] = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <FadeIn delay={0.2} direction={isMobile ? "up" : "left"}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "110%",
            height: "110%",
            background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            width: "100%",
            maxWidth: isMobile ? "17.5rem" : "26.25rem",
            aspectRatio: "3/4",
            borderRadius: "1.5rem",
            overflow: "hidden",
            border: "none",
            position: "relative",
            boxShadow: `0 1.5rem 5rem rgba(0,0,0,0.4)`,
            margin: isMobile ? "0 auto" : undefined,
          }}
        >
          <Image
            src={PHOTO_URL}
            alt="Rufsan"
            fill
            sizes="(max-width: 640px) 17.5rem, 26.25rem"
            priority
            onLoad={() => { setLoaded(true); }}
            style={{
              objectFit: "cover",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
          {!loaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "1.25rem",
                  background: `${ACCENT}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_DISPLAY,
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: ACCENT,
                }}
              >
                R
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroSectionProps {
  breadcrumb?: BreadcrumbItem[];
  badge?: string;
  badgeIcon?: string;
  h1: [string, string, string];
  subtitle: string;
  btn1: string;
  btn2: string;
  on1: () => void;
  on2: () => void;
  btn2Resume?: boolean;
}

export function HeroSection({
  breadcrumb,
  badge,
  badgeIcon,
  h1,
  subtitle,
  btn1,
  btn2,
  on1,
  on2,
  btn2Resume,
}: HeroSectionProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  return (
    <section
      style={{
        padding: isMobile ? "6.25rem 1rem 2.5rem" : "8.125rem 2rem 3.75rem",
        maxWidth: "75rem",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : isTablet ? "1fr 0.8fr" : "1.15fr 0.85fr",
          gap: isMobile ? "2.5rem" : "3.5rem",
          alignItems: "center",
          minHeight: isMobile ? "auto" : "32.5rem",
        }}
      >
        {/* Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            order: isMobile ? 2 : 1,
          }}
        >
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          {badge && (
            <FadeIn delay={0}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.375rem 1rem",
                  ...GLASS,
                  border: `0.0625rem solid ${ACCENT}20`,
                  borderRadius: "6.25rem",
                  marginBottom: isMobile ? "1.25rem" : "1.75rem",
                  width: "fit-content",
                }}
              >
                {badgeIcon === "pulse" ? (
                  <div
                    style={{
                      width: "0.375rem",
                      height: "0.375rem",
                      borderRadius: "50%",
                      background: ACCENT,
                      animation: "pulse 2s infinite",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "0.875rem" }}>{badgeIcon}</span>
                )}
                <span style={{ fontSize: "0.8125rem", color: ACCENT, fontFamily: FONT_MONO, fontWeight: 500 }}>
                  {badge}
                </span>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.1}>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, letterSpacing: "-0.04em", margin: 0 }}>
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "clamp(1.75rem, 8vw, 2.5rem)" : "clamp(2.25rem, 5vw, 3.5rem)",
                  lineHeight: 1.08,
                  color: "#fafafa",
                }}
              >
                {h1[0]}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "clamp(1.5rem, 7vw, 2.125rem)" : "clamp(1.875rem, 4vw, 2.875rem)",
                  lineHeight: 1.1,
                  color: "#fafafa",
                  marginTop: "0.125rem",
                }}
              >
                {h1[1]}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "clamp(1.25rem, 6vw, 1.75rem)" : "clamp(1.5rem, 3.2vw, 2.375rem)",
                  lineHeight: 1.12,
                  color: TEXT_DIM,
                  marginTop: "0.25rem",
                }}
              >
                {h1[2]}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: isMobile ? "0.9375rem" : "1.0625rem",
                lineHeight: 1.7,
                color: TEXT_DIM,
                maxWidth: "31.25rem",
                marginTop: isMobile ? "1.25rem" : "1.75rem",
                marginBottom: isMobile ? "1.75rem" : "2.25rem",
              }}
            >
              {subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div
              style={{
                display: "flex",
                gap: isMobile ? "0.75rem" : "1rem",
                flexDirection: isMobile ? "column" : "row",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={on1}
                style={{
                  background: ACCENT,
                  color: "#050505",
                  border: "none",
                  padding: isMobile ? "0.875rem 1.5rem" : "0.875rem 2rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  fontFamily: FONT_BODY,
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: `0 0 0 0 ${ACCENT}00`,
                  width: isMobile ? "100%" : "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-0.125rem)";
                  e.currentTarget.style.boxShadow = `0 0.5rem 1.875rem ${ACCENT}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 0 0 0 ${ACCENT}00`;
                }}
              >
                {btn1}
              </button>
              <button
                onClick={on2}
                style={{
                  background: `${ACCENT}08`,
                  color: ACCENT,
                  border: `1.5px solid ${ACCENT}50`,
                  padding: isMobile ? "0.875rem 1.5rem" : "0.875rem 2rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  fontFamily: FONT_BODY,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 0.25s ease",
                  width: isMobile ? "100%" : "auto",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${ACCENT}15`;
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.boxShadow = `0 0 1.5rem ${ACCENT}20, inset 0 0 1rem ${ACCENT}06`;
                  e.currentTarget.style.transform = "translateY(-0.125rem)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${ACCENT}08`;
                  e.currentTarget.style.borderColor = `${ACCENT}50`;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {btn2}
                {btn2Resume && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      animation: "heroDownloadBounce 2s ease-in-out infinite",
                    }}
                  >
                    <DownloadIcon />
                  </span>
                )}
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Photo */}
        <div style={{ order: isMobile ? 1 : 2 }}>
          <HeroPhoto />
        </div>
      </div>

      <style>{`
        @keyframes heroDownloadBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
}