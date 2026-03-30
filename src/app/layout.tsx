import "@/app/globals.css";
import { siteMetadata } from "@/lib/metadata";
import { ClientShell } from "@/components/layout/ClientShell";
import { Analytics } from "@vercel/analytics/next";
import { BG, TEXT, BORDER, ACCENT } from "@/lib/constants";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <ClientShell>
          {children}
        </ClientShell>
        <Analytics />
      </body>
    </html>
  );
}