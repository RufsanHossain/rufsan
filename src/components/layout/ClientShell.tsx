"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CmdPalette, CursorGlow } from "@/components/layout/CmdPalette";
import { RouteProgress } from "@/components/layout/RouteProgress";
import { trackEvent } from "@/lib/analytics";
import { useTheme } from "@/hooks/useTheme";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((p) => !p);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => { window.removeEventListener("keydown", handler); };
  }, []);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";

    const frame = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    return () => { cancelAnimationFrame(frame); };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-bg relative overflow-x-hidden">
      <RouteProgress />
      <CursorGlow />
      <Nav
        onCmdK={() => { trackEvent("cmd_palette_open"); setCmdOpen(true); }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <CmdPalette open={cmdOpen} onClose={() => { setCmdOpen(false); }} />
      <main
        ref={mainRef}
        className="relative z-2 will-change-[opacity,transform]"
        style={{ opacity: 1, transform: "translateY(0)" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
