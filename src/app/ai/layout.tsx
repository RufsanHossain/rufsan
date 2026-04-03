import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI / Machine Learning",
  description: "AI and ML capabilities — LLM integration, RAG pipelines, fine-tuning, computer vision, and MLOps for production-grade intelligent systems.",
  alternates: { canonical: "https://rufsansanto.com/ai" },
};

export default function AILayout({ children }: { children: React.ReactNode }) {
  return children;
}
