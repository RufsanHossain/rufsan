import type { Metadata } from "next";

export const SITE_URL = "https://rufsansanto.com";
const SITE_NAME = "Rufsan Hossain Santo";
const SITE_DESCRIPTION =
  "Senior Full-Stack Developer & Agency Founder specializing in AI-integrated SaaS products, scalable architectures, and data-driven solutions.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Full-Stack Developer & Agency Founder`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "SaaS",
    "AI Integration",
    "MERN Stack",
    "MongoDB",
    "Node.js",
    "Agency",
    "Dhaka",
    "Bangladesh",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Full-Stack Developer & Agency Founder`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Full-Stack Developer & Agency Founder`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Full-Stack Developer & Agency Founder`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};