import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rufsan Hossain Santo — available for SaaS projects, AI/ML integrations, and consulting.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
