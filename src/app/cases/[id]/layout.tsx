import type { Metadata } from "next";
import { getCaseBySlug } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cs = getCaseBySlug(id);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.title} — Case Study`,
    description: cs.overview,
    alternates: { canonical: `https://rufsansanto.com/cases/${id}` },
  };
}

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
