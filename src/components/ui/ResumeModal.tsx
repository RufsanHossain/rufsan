"use client";

import { useState, useEffect, useCallback } from "react";
import { ACCENT, TEXT_DIM, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  resumeUrl: string;
}

export function ResumeModal({ open, onClose, resumeUrl }: ResumeModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);

    /* Simulate progress for visual feedback */
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    /* Trigger actual download */
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Rufsan-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setDownloading(false);
        setProgress(0);
      }, 1200);
    }, 1500);
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close resume preview"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          border: "none",
          cursor: "default",
          padding: 0,
          width: "100%",
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-label="Resume preview"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "56rem",
          height: "85vh",
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "1.25rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: `0 2rem 6rem rgba(0,0,0,0.6), 0 0 3rem ${ACCENT}08`,
          animation: "modalIn 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.625rem",
                background: `${ACCENT}10`,
                border: `1px solid ${ACCENT}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.125rem",
              }}
            >
              📄
            </div>
            <div>
              <h3
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#fafafa",
                  margin: 0,
                }}
              >
                Resume
              </h3>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.6875rem",
                  color: TEXT_DIM,
                  margin: 0,
                }}
              >
                Rufsan-Resume.pdf
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* 3D Rotating Download Indicator */}
            <div
              style={{
                position: "relative",
                width: "2.75rem",
                height: "2.75rem",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  animation: downloading
                    ? "spin3d 1.2s ease-in-out infinite"
                    : "floatRotate 4s ease-in-out infinite",
                  transformStyle: "preserve-3d",
                  perspective: "200px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.75rem",
                    background: downloading
                      ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT}60)`
                      : `linear-gradient(135deg, ${ACCENT}20, ${ACCENT}08)`,
                    border: `1.5px solid ${downloading ? ACCENT : `${ACCENT}30`}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    boxShadow: downloading
                      ? `0 0 1.5rem ${ACCENT}40, inset 0 0 0.5rem ${ACCENT}15`
                      : `0 0 0.75rem ${ACCENT}10`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {downloading ? (
                    <span style={{ color: "#050505", fontWeight: 700, fontSize: "0.75rem" }}>
                      {Math.min(Math.round(progress), 100)}%
                    </span>
                  ) : (
                    <span>↓</span>
                  )}
                </div>
              </div>

              {/* Progress ring */}
              {downloading && (
                <svg
                  style={{
                    position: "absolute",
                    top: "-3px",
                    left: "-3px",
                    width: "calc(100% + 6px)",
                    height: "calc(100% + 6px)",
                    transform: "rotate(-90deg)",
                  }}
                >
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    fill="none"
                    stroke={`${ACCENT}20`}
                    strokeWidth="2"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.min(progress, 100) * 1.445} 200`}
                    style={{ transition: "stroke-dasharray 0.15s ease" }}
                  />
                </svg>
              )}
            </div>

            {/* Download button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              style={{
                background: downloading ? `${ACCENT}40` : ACCENT,
                color: "#050505",
                border: "none",
                padding: "0.625rem 1.25rem",
                borderRadius: "0.5rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                fontFamily: FONT_BODY,
                cursor: downloading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s ease",
              }}
            >
              {downloading ? "Downloading..." : "Download ↓"}
            </button>

            {/* Close button */}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "0.5rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: TEXT_DIM,
                fontSize: "1.125rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div style={{ flex: 1, position: "relative", background: "#111" }}>
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0`}
            title="Resume preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes floatRotate {
          0%, 100% {
            transform: rotateY(0deg) rotateX(0deg) translateY(0);
          }
          25% {
            transform: rotateY(15deg) rotateX(5deg) translateY(-2px);
          }
          50% {
            transform: rotateY(0deg) rotateX(-5deg) translateY(0);
          }
          75% {
            transform: rotateY(-15deg) rotateX(5deg) translateY(-2px);
          }
        }

        @keyframes spin3d {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(10deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
}