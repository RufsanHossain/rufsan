"use client";

import Link from "next/link";
import { ACCENT } from "@/lib/constants";
import { FadeIn } from "@/components/ui/FadeIn";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post: p, index }: BlogCardProps) {
  return (
    <FadeIn delay={index * 0.1}>
      <Link
        href={`/blog/${p.slug}`}
        className="no-underline group"
      >
        <div
          className="sc-blog-card-grid bg-white/[0.03] backdrop-blur-[20px] border border-white/[0.07] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent/[0.15] hover:shadow-[0_0.5rem_2.5rem_rgba(141,234,178,0.024)]"
        >
          {/* Text side */}
          <div className="sc-blog-card-text flex flex-col justify-center">
            <div className="sc-blog-card-meta-gap flex items-center mb-4 flex-wrap">
              <span
                className="py-1 px-3 bg-accent/[0.03] border border-accent/[0.08] rounded-[0.375rem] text-xs font-mono text-accent font-medium"
              >
                {p.tag}
              </span>
              <span className="font-mono text-xs text-text-dim">{p.date}</span>
              <span className="font-mono text-xs text-text-dim">&middot;</span>
              <span className="font-mono text-xs text-text-dim">{p.readTime}</span>
            </div>
            <h2
              className="sc-blog-card-title font-display font-bold text-[#fafafa] m-0 mb-3 leading-[1.25] tracking-[-0.02em]"
            >
              {p.title}
            </h2>
            <p className="sc-blog-card-excerpt font-body leading-[1.7] text-text-dim m-0 mb-5">
              {p.excerpt}
            </p>
            <span className="font-body text-sm text-text-dim font-medium transition-colors duration-300 group-hover:text-accent">
              Read Article &rarr;
            </span>
          </div>

          {/* Visual side */}
          <div
            className="sc-blog-card-visual flex items-center justify-center"
            style={{ background: p.heroImage }}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[1.375rem]"
                style={{
                  background: `${ACCENT}12`,
                  border: `0.0625rem solid ${ACCENT}20`,
                }}
              >
                {p.tag === "AI / ML" ? "\u{1F9E0}" : p.tag === "Engineering" ? "\u26A1" : "\u{1F5C2}"}
              </div>
              <div className="h-1 w-[3.75rem] bg-white/[0.08] rounded-sm" />
              <div className="h-[0.1875rem] w-10 bg-white/[0.05] rounded-sm" />
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
