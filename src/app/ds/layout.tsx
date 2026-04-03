import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Science",
  description: "Data science capabilities — ETL pipelines, visualization, statistical modeling, predictive analytics, and business intelligence.",
  alternates: { canonical: "https://rufsansanto.com/ds" },
};

export default function DSLayout({ children }: { children: React.ReactNode }) {
  return children;
}
