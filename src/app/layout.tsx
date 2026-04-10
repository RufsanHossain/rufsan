import "@/app/globals.css";
import { siteMetadata } from "@/lib/metadata";
import { ClientShell } from "@/components/layout/ClientShell";
import { Analytics } from "@vercel/analytics/next";
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
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}else if(window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.setAttribute("data-theme","light")}else{document.documentElement.setAttribute("data-theme","dark")}}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`,
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="Rufsan Hossain Santo — Blog" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://rufsansanto.com/#person",
                  name: "Rufsan Hossain Santo",
                  url: "https://rufsansanto.com",
                  jobTitle: "Senior Full-Stack Developer & Agency Founder",
                  sameAs: [
                    "https://github.com/rufsan",
                    "https://linkedin.com/in/rufsan",
                  ],
                  image: "https://rufsansanto.com/media/rufsan.png",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://rufsansanto.com/#website",
                  url: "https://rufsansanto.com",
                  name: "Rufsan Hossain Santo",
                  publisher: { "@id": "https://rufsansanto.com/#person" },
                },
              ],
            }),
          }}
        />
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
