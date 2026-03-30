import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Rufsan Hossain Santo — senior full-stack developer and agency founder with 5+ years building AI-integrated SaaS products.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
