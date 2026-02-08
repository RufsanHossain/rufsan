"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ACCENT, TEXT_DIM, BORDER, BG, FONT_DISPLAY, FONT_BODY, FONT_MONO } from "@/lib/constants";
import { ROUTES } from "@/lib/navigation";
import { SearchIcon } from "@/components/ui/Icons";
import { useBreakpoint } from "@/hooks/useBreakpoint";

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
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(5,5,5,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `0.0625rem solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: "75rem",
            margin: "0 auto",
            padding: isMobile ? "0 1rem" : "0 2rem",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
                background: ACCENT,
                boxShadow: `0 0 0.75rem ${ACCENT}60`,
              }}
            />
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "#fafafa",
                letterSpacing: "-0.02em",
              }}
            >
              Rufsan
            </span>
          </Link>

          {/* Desktop nav links */}
          {!isCompact && (
            <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
              {ROUTES.map((r) => (
                <Link
                  key={r.key}
                  href={r.href}
                  style={{
                    background: isActive(r.key) ? "rgba(255,255,255,0.06)" : "transparent",
                    border: "none",
                    padding: "0.375rem 0.875rem",
                    borderRadius: "0.375rem",
                    color: isActive(r.key) ? "#fafafa" : TEXT_DIM,
                    fontSize: "0.8125rem",
                    fontFamily: FONT_BODY,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {r.label}
                </Link>
              ))}
              <button
                onClick={onCmdK}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "0.0625rem solid rgba(255,255,255,0.08)",
                  padding: "0.3125rem 0.75rem",
                  borderRadius: "0.375rem",
                  color: TEXT_DIM,
                  fontSize: "0.75rem",
                  fontFamily: FONT_MONO,
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                }}
              >
                <SearchIcon /> <span style={{ opacity: 0.6 }}>⌘K</span>
              </button>
            </div>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            {!isMobile && (
              <Link
                href="/contact"
                style={{
                  background: ACCENT,
                  color: "#050505",
                  border: "none",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  fontFamily: FONT_BODY,
                  textDecoration: "none",
                }}
              >
                Let&apos;s Talk
              </Link>
            )}

            {/* Hamburger */}
            {isCompact && (
              <button
                onClick={() => { setMenuOpen((p) => !p); }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: menuOpen ? 0 : "0.3125rem",
                  width: "2.5rem",
                  height: "2.5rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "0.0625rem solid rgba(255,255,255,0.08)",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "1.125rem",
                    height: "0.125rem",
                    background: "#fafafa",
                    borderRadius: "0.0625rem",
                    transition: "all 0.3s ease",
                    transform: menuOpen ? "rotate(45deg) translate(0, 0)" : "none",
                  }}
                />
                {!menuOpen && (
                  <span
                    style={{
                      display: "block",
                      width: "1.125rem",
                      height: "0.125rem",
                      background: "#fafafa",
                      borderRadius: "0.0625rem",
                    }}
                  />
                )}
                <span
                  style={{
                    display: "block",
                    width: "1.125rem",
                    height: "0.125rem",
                    background: "#fafafa",
                    borderRadius: "0.0625rem",
                    transition: "all 0.3s ease",
                    transform: menuOpen ? "rotate(-45deg) translate(0, 0)" : "none",
                  }}
                />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isCompact && menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => { setMenuOpen(false); }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 98,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              border: "none",
              cursor: "default",
              padding: 0,
              width: "100%",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "4rem",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: BG,
              padding: "1.5rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              overflowY: "auto",
            }}
          >
            {ROUTES.map((r) => (
              <Link
                key={r.key}
                href={r.href}
                onClick={() => { setMenuOpen(false); }}
                style={{
                  display: "block",
                  padding: "0.875rem 1rem",
                  borderRadius: "0.625rem",
                  background: isActive(r.key) ? "rgba(255,255,255,0.06)" : "transparent",
                  color: isActive(r.key) ? "#fafafa" : TEXT_DIM,
                  fontSize: "1rem",
                  fontFamily: FONT_BODY,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                {r.label}
              </Link>
            ))}

            <div style={{ height: "0.0625rem", background: "rgba(255,255,255,0.06)", margin: "0.75rem 0" }} />

            <button
              onClick={() => {
                setMenuOpen(false);
                onCmdK();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.875rem 1rem",
                background: "rgba(255,255,255,0.03)",
                border: "0.0625rem solid rgba(255,255,255,0.06)",
                borderRadius: "0.625rem",
                color: TEXT_DIM,
                fontSize: "0.9375rem",
                fontFamily: FONT_BODY,
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
            >
              <SearchIcon /> Search…
            </button>

            <Link
              href="/contact"
              onClick={() => { setMenuOpen(false); }}
              style={{
                display: "block",
                background: ACCENT,
                color: "#050505",
                padding: "1rem 1.25rem",
                borderRadius: "0.625rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
                fontFamily: FONT_BODY,
                textDecoration: "none",
                textAlign: "center",
                marginTop: "0.75rem",
              }}
            >
              Let&apos;s Talk
            </Link>
          </div>
        </>
      )}
    </>
  );
}