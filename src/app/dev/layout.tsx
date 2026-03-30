import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Development",
  description: "Full-stack development — SaaS architecture, Next.js, API design, database engineering, auth, and DevOps for scalable production apps.",
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return children;
}
