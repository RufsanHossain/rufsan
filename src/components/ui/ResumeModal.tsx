"use client";

import { useState, useEffect, useCallback } from "react";
import { ACCENT } from "@/lib/constants";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  resumeUrl: string;
}

export function ResumeModal({ open, onClose, resumeUrl }: ResumeModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

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
    if (downloading) return;
    setDownloading(true);
    setDone(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 18 + 6, 100);
      });
    }, 100);

    /* Trigger actual file download */
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Rufsan-Hossain-Santo-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setDone(true);
      setTimeout(() => {
        setDownloading(false);
        setProgress(0);
        setDone(false);
      }, 2000);
    }, 1400);
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
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "none",
          cursor: "default",
          padding: 0,
          width: "100%",
        }}
      />

      {/* Resume container — takes up most of the viewport */}
      <div
        role="dialog"
        aria-label="Resume preview"
        style={{
          position: "relative",
          zIndex: 1,
          width: "calc(100% - 3rem)",
          maxWidth: "48rem",
          height: "75vh",
          maxHeight: "700px",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "#111",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 2rem 6rem rgba(0,0,0,0.7)",
          animation: "resumeModalIn 0.25s ease-out",
        }}
      >
        {/* PDF — fills the entire modal */}
        <iframe
          src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1`}
          title="Resume"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />

        {/* Close button — top left, subtle */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fafafa",
            fontSize: "0.875rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 2,
          }}
        >
          ✕
        </button>

        {/* 3D Download Element — top right */}
        <button
          type="button"
          aria-label="Download resume"
          onClick={handleDownload}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            width: "3rem",
            height: "3rem",
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: downloading ? "default" : "pointer",
            zIndex: 2,
          }}
        >
          {/* 3D rotating cube face */}
          <div
            style={{
              width: "100%",
              height: "100%",
              perspective: "200px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                animation: downloading
                  ? "resumeSpin 0.8s ease-in-out infinite"
                  : "resumeFloat 3s ease-in-out infinite",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.75rem",
                  background: done
                    ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)`
                    : downloading
                      ? `linear-gradient(135deg, ${ACCENT}60, ${ACCENT}30)`
                      : "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(8px)",
                  border: downloading
                    ? `2px solid ${ACCENT}`
                    : "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: downloading
                    ? `0 0 1.5rem ${ACCENT}50`
                    : "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
                }}
              >
                {done ? (
                  <span style={{ fontSize: "1.125rem", color: "#050505" }}>✓</span>
                ) : downloading ? (
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      color: ACCENT,
                      fontFamily: "monospace",
                    }}
                  >
                    {Math.min(Math.round(progress), 100)}%
                  </span>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ opacity: 0.9 }}
                  >
                    <path
                      d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10"
                      stroke="#fafafa"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Progress ring */}
          {downloading && !done && (
            <svg
              style={{
                position: "absolute",
                top: "-4px",
                left: "-4px",
                width: "calc(100% + 8px)",
                height: "calc(100% + 8px)",
                transform: "rotate(-90deg)",
                pointerEvents: "none",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="46%"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />
              <circle
                cx="50%"
                cy="50%"
                r="46%"
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${String(Math.min(progress, 100) * 1.65)} 200`}
                style={{ transition: "stroke-dasharray 0.12s ease" }}
              />
            </svg>
          )}
        </button>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes resumeModalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes resumeFloat {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg) translateY(0); }
          25% { transform: rotateY(12deg) rotateX(4deg) translateY(-2px); }
          50% { transform: rotateY(0deg) rotateX(-4deg) translateY(0); }
          75% { transform: rotateY(-12deg) rotateX(4deg) translateY(-2px); }
        }
        @keyframes resumeSpin {
          0% { transform: rotateY(0deg) rotateX(0deg); }
          50% { transform: rotateY(180deg) rotateX(8deg); }
          100% { transform: rotateY(360deg) rotateX(0deg); }
        }
      `}</style>
    </div>
  );
}