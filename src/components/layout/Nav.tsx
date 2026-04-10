"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/navigation";
import { SearchIcon } from "@/components/ui/Icons";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/lib/cn";

interface NavProps {
  onCmdK: () => void;
}

export function Nav({ onCmdK }: NavProps) {
  const pathname = usePathname();
  const bp = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = bp === "mobile";
  const isCompact = bp === "mobile" || bp === "tablet";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (key: string) => {
    if (key === "home") return pathname === "/";
    return pathname.startsWith(`/${key}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 bg-[rgba(5,5,5,0.7)] backdrop-blur-[20px] border-b border-border">
        <div className={cn(
          "max-w-[75rem] mx-auto h-16 flex items-center justify-between",
          isMobile ? "px-4" : "px-8",
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_0.75rem_rgba(141,234,178,0.38)]" />
            <span className="font-display font-bold text-lg text-[#fafafa] tracking-[-0.02em]">
              Rufsan
            </span>
          </Link>

          {/* Desktop nav links */}
          {!isCompact && (
            <div className="flex gap-1.5 items-center">
              {ROUTES.map((r) => (
                <Link
                  key={r.key}
                  href={r.href}
                  className={cn(
                    "border-none py-1.5 px-3.5 rounded-md text-[0.8125rem] font-body font-medium no-underline transition-all duration-200",
                    isActive(r.key)
                      ? "bg-white/[0.06] text-[#fafafa]"
                      : "bg-transparent text-text-dim",
                  )}
                >
                  {r.label}
                </Link>
              ))}
              <button
                onClick={onCmdK}
                className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] py-[0.3125rem] px-3 rounded-md text-text-dim text-xs font-mono cursor-pointer ml-2"
              >
                <SearchIcon /> <span className="opacity-60">&#8984;K</span>
              </button>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            {!isMobile && (
              <Link
                href="/contact"
                className="bg-accent text-[#050505] border-none py-2 px-5 rounded-md text-[0.8125rem] font-semibold font-body no-underline"
              >
                Let&apos;s Talk
              </Link>
            )}

            {/* Hamburger */}
            {isCompact && (
              <button
                onClick={() => { setMenuOpen((p) => !p); }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="flex flex-col justify-center items-center w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-lg cursor-pointer p-2"
                style={{ gap: menuOpen ? 0 : "0.3125rem" }}
              >
                <span
                  className="block w-[1.125rem] h-0.5 bg-[#fafafa] rounded-[0.0625rem] transition-all duration-300"
                  style={{ transform: menuOpen ? "rotate(45deg) translate(0, 0)" : "none" }}
                />
                {!menuOpen && (
                  <span className="block w-[1.125rem] h-0.5 bg-[#fafafa] rounded-[0.0625rem]" />
                )}
                <span
                  className="block w-[1.125rem] h-0.5 bg-[#fafafa] rounded-[0.0625rem] transition-all duration-300"
                  style={{ transform: menuOpen ? "rotate(-45deg) translate(0, 0)" : "none" }}
                />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isCompact && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => { setMenuOpen(false); }}
            className={cn(
              "fixed inset-0 z-[98] bg-black/60 border-none cursor-default p-0 w-full transition-all duration-300",
              menuOpen
                ? "opacity-100 pointer-events-auto backdrop-blur-[4px]"
                : "opacity-0 pointer-events-none backdrop-blur-0",
            )}
          />
          <div
            className={cn(
              "fixed top-16 left-0 right-0 bottom-0 z-[99] bg-bg py-6 px-5 flex flex-col gap-1 overflow-y-auto will-change-[transform,opacity]",
              menuOpen
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-full opacity-0 pointer-events-none",
            )}
            style={{ transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease" }}
          >
            {ROUTES.map((r, i) => (
              <Link
                key={r.key}
                href={r.href}
                onClick={() => { setMenuOpen(false); }}
                className={cn(
                  "block py-3.5 px-4 rounded-[0.625rem] text-base font-body font-medium no-underline",
                  isActive(r.key)
                    ? "bg-white/[0.06] text-[#fafafa]"
                    : "bg-transparent text-text-dim",
                )}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(-0.75rem)",
                  transitionDelay: menuOpen ? `${String(i * 0.04)}s` : "0s",
                  transitionProperty: "opacity, transform, background, color",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease",
                }}
              >
                {r.label}
              </Link>
            ))}

            <div className="h-px bg-white/[0.06] my-3" />

            <button
              onClick={() => {
                setMenuOpen(false);
                onCmdK();
              }}
              className="flex items-center gap-2.5 py-3.5 px-4 bg-white/[0.03] border border-white/[0.06] rounded-[0.625rem] text-text-dim text-[0.9375rem] font-body cursor-pointer w-full text-left"
            >
              <SearchIcon /> Search&hellip;
            </button>

            <Link
              href="/contact"
              onClick={() => { setMenuOpen(false); }}
              className="block bg-accent text-[#050505] py-4 px-5 rounded-[0.625rem] text-[0.9375rem] font-semibold font-body no-underline text-center mt-3"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </>
      )}
    </>
  );
}
