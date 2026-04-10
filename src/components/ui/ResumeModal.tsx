"use client";

import { useState, useEffect, useCallback } from "react";
import { ACCENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

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

    trackEvent("resume_download");

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close resume preview"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-[10px] border-none cursor-default p-0 w-full"
      />

      {/* Resume container */}
      <div
        role="dialog"
        aria-label="Resume preview"
        className="relative z-[1] w-[calc(100%-3rem)] max-w-3xl h-[75vh] max-h-[700px] rounded-2xl overflow-hidden bg-code-bg border border-overlay-border shadow-[0_2rem_6rem_rgba(0,0,0,0.7)]"
        style={{ animation: "resumeModalIn 0.25s ease-out" }}
      >
        {/* PDF */}
        <iframe
          src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1`}
          title="Resume"
          className="w-full h-full border-none block"
        />

        {/* Close button */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-[8px] border border-white/10 text-fg text-sm cursor-pointer flex items-center justify-center transition-all duration-200 z-[2]"
        >
          &#x2715;
        </button>

        {/* 3D Download Element -- JS-driven animations stay inline */}
        <button
          type="button"
          aria-label="Download resume"
          onClick={handleDownload}
          className="absolute top-3 right-3 w-12 h-12 p-0 border-none bg-transparent z-[2]"
          style={{ cursor: downloading ? "default" : "pointer" }}
        >
          {/* 3D rotating cube face */}
          <div style={{ width: "100%", height: "100%", perspective: "200px" }}>
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
                className="w-full h-full rounded-xl flex items-center justify-center"
                style={{
                  background: done
                    ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)`
                    : downloading
                      ? `linear-gradient(135deg, ${ACCENT}60, ${ACCENT}30)`
                      : "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(8px)",
                  border: downloading
                    ? `2px solid ${ACCENT}`
                    : "1px solid rgba(255,255,255,0.12)",
                  boxShadow: downloading
                    ? `0 0 1.5rem ${ACCENT}50`
                    : "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
                }}
              >
                {done ? (
                  <span className="text-lg text-on-accent">&#x2713;</span>
                ) : downloading ? (
                  <span className="text-[0.625rem] font-bold text-accent font-mono">
                    {Math.min(Math.round(progress), 100)}%
                  </span>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="opacity-90 text-fg"
                  >
                    <path
                      d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10"
                      stroke="currentColor"
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
              className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none"
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
