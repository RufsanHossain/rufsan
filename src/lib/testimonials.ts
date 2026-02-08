export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { name: "Sarah Chen", role: "CTO", company: "FinScale", quote: "Rufsan didn't just build our platform — he architected a system that scaled from 0 to 500+ organizations without a single rewrite. His understanding of multi-tenant architecture is exceptional.", avatar: "SC" },
  { name: "Marcus Webb", role: "VP of Engineering", company: "DataSync", quote: "The real-time collaboration engine Rufsan built handles 50K concurrent users flawlessly. His CRDT implementation was elegant and his documentation was immaculate.", avatar: "MW" },
  { name: "Priya Patel", role: "Head of Product", company: "IntelliDoc", quote: "Our document processing went from 15 minutes per document to under 90 seconds. Rufsan's AI pipeline didn't just automate — it outperformed our human reviewers on accuracy.", avatar: "PP" },
  { name: "James Morrison", role: "Founder & CEO", company: "QABolt", quote: "Hiring Rufsan was the best technical decision we made. He reduced our QA cycle by 60% and the codebase he delivered was the cleanest I've seen in 20 years of engineering.", avatar: "JM" },
];
