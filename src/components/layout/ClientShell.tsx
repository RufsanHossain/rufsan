"use client";

import { useState, useEffect } from "react";
import { BG } from "@/lib/constants";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CmdPalette, CursorGlow } from "@/components/layout/CmdPalette";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);

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

  return (
    <div style={{ minHeight: "100vh", background: BG, position: "relative", overflowX: "hidden" }}>
      <CursorGlow />
      <Nav onCmdK={() => { setCmdOpen(true); }} />
      <CmdPalette open={cmdOpen} onClose={() => { setCmdOpen(false); }} />
      <main style={{ position: "relative", zIndex: 2 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}