"use client";

import "@/app/globals.css";
import { useState, useEffect } from "react";
import { BG, TEXT, BORDER, ACCENT } from "@/lib/constants";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CmdPalette, CursorGlow } from "@/components/layout/CmdPalette";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- TODO: migrate to next/font/google */}
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: ${BG}; color: ${TEXT}; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
          ::-webkit-scrollbar { width: 0.375rem; }
          ::-webkit-scrollbar-track { background: ${BG}; }
          ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 0.1875rem; }
          ::selection { background: ${ACCENT}30; color: #fafafa; }
          img, video, svg { max-width: 100%; height: auto; }
        `}</style>
      </head>
      <body>
        <div style={{ minHeight: "100vh", background: BG, position: "relative", overflowX: "hidden" }}>
          <CursorGlow />
          <Nav onCmdK={() => { setCmdOpen(true); }} />
          <CmdPalette open={cmdOpen} onClose={() => { setCmdOpen(false); }} />
          <main style={{ position: "relative", zIndex: 2 }}>
            {children}
            <Analytics />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}