"use client";

import { useState } from "react";
import Image from "next/image";
import { PHOTO_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";
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
      <div className="relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(141,234,178,0.03) 0%, transparent 70%)",
          }}
        />
        <div
          className={cn(
            "w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden border-none relative shadow-[0_1.5rem_5rem_rgba(0,0,0,0.4)]",
            isMobile ? "max-w-[17.5rem] mx-auto" : "max-w-[26.25rem]"
          )}
        >
          <Image
            src={PHOTO_URL}
            alt="Rufsan"
            fill
            sizes="(max-width: 640px) 17.5rem, 26.25rem"
            priority
            onLoad={() => { setLoaded(true); }}
            className={cn(
              "object-cover transition-opacity duration-[600ms] ease-in-out",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
          {!loaded && (
            <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
              <div className="w-20 h-20 rounded-[1.25rem] bg-accent/[0.06] flex items-center justify-center font-display text-[1.75rem] font-extrabold text-accent">
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
      className={cn(
        "max-w-[75rem] mx-auto relative",
        isMobile ? "pt-[6.25rem] px-4 pb-10" : "pt-[8.125rem] px-8 pb-[3.75rem]"
      )}
    >
      <div
        className={cn(
          "items-center",
          isMobile
            ? "flex flex-col gap-10"
            : "grid gap-[3.5rem] min-h-[32.5rem]"
        )}
        style={
          !isMobile
            ? { gridTemplateColumns: isTablet ? "1fr 0.8fr" : "1.15fr 0.85fr" }
            : undefined
        }
      >
        {/* Text content */}
        <div
          className={cn(
            "flex flex-col justify-center",
            isMobile ? "order-2" : "order-1"
          )}
        >
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          {badge && (
            <FadeIn delay={0}>
              <div
                className={cn(
                  "inline-flex items-center gap-2 py-[0.375rem] px-4",
                  "bg-white/[0.03] backdrop-blur-[20px] border border-accent/[0.125]",
                  "rounded-[6.25rem] w-fit",
                  isMobile ? "mb-5" : "mb-7"
                )}
              >
                {badgeIcon === "pulse" ? (
                  <div className="w-[0.375rem] h-[0.375rem] rounded-full bg-accent animate-[pulse_2s_infinite]" />
                ) : (
                  <span className="text-sm">{badgeIcon}</span>
                )}
                <span className="text-[0.8125rem] text-accent font-mono font-medium">
                  {badge}
                </span>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.1}>
            <h1 className="font-display font-extrabold tracking-[-0.04em] m-0">
              <span
                className={cn(
                  "block leading-[1.08] text-[#fafafa]",
                  isMobile
                    ? "text-[clamp(1.75rem,8vw,2.5rem)]"
                    : "text-[clamp(2.25rem,5vw,3.5rem)]"
                )}
              >
                {h1[0]}
              </span>
              <span
                className={cn(
                  "block leading-[1.1] text-[#fafafa] mt-[0.125rem]",
                  isMobile
                    ? "text-[clamp(1.5rem,7vw,2.125rem)]"
                    : "text-[clamp(1.875rem,4vw,2.875rem)]"
                )}
              >
                {h1[1]}
              </span>
              <span
                className={cn(
                  "block leading-[1.12] text-text-dim mt-1",
                  isMobile
                    ? "text-[clamp(1.25rem,6vw,1.75rem)]"
                    : "text-[clamp(1.5rem,3.2vw,2.375rem)]"
                )}
              >
                {h1[2]}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className={cn(
                "font-body leading-[1.7] text-text-dim max-w-[31.25rem]",
                isMobile
                  ? "text-[0.9375rem] mt-5 mb-7"
                  : "text-[1.0625rem] mt-7 mb-9"
              )}
            >
              {subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div
              className={cn(
                "flex flex-wrap",
                isMobile ? "flex-col gap-3" : "flex-row gap-4"
              )}
            >
              <button
                onClick={on1}
                className={cn(
                  "bg-accent text-[#050505] border-none rounded-lg text-[0.9375rem] font-semibold font-body cursor-pointer",
                  "transition-[transform,box-shadow] duration-200",
                  "hover:-translate-y-0.5 hover:shadow-[0_0.5rem_1.875rem_rgba(141,234,178,0.19)]",
                  isMobile
                    ? "py-3.5 px-6 w-full"
                    : "py-3.5 px-8 w-auto"
                )}
              >
                {btn1}
              </button>
              <button
                onClick={on2}
                className={cn(
                  "bg-accent/[0.03] text-accent border-[1.5px] border-accent/[0.31] rounded-lg",
                  "text-[0.9375rem] font-semibold font-body cursor-pointer",
                  "inline-flex items-center justify-center gap-2",
                  "transition-all duration-[250ms] ease-in-out relative overflow-hidden",
                  "hover:bg-accent/[0.08] hover:border-accent hover:shadow-[0_0_1.5rem_rgba(141,234,178,0.125),inset_0_0_1rem_rgba(141,234,178,0.024)] hover:-translate-y-0.5",
                  isMobile
                    ? "py-3.5 px-6 w-full"
                    : "py-3.5 px-8 w-auto"
                )}
              >
                {btn2}
                {btn2Resume && (
                  <span className="inline-flex items-center animate-[heroDownloadBounce_2s_ease-in-out_infinite]">
                    <DownloadIcon />
                  </span>
                )}
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Photo */}
        <div className={isMobile ? "order-1" : "order-2"}>
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
