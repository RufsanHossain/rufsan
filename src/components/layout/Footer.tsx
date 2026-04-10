"use client";

import { trackEvent } from "@/lib/analytics";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/RufsanHossain" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rufsan-hossain-santo/" },
  { label: "X", href: "https://x.com/RufsanH" },
  { label: "Email", href: "mailto:rufsanhossainsanto@gmail.com" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-8 py-10 max-w-[75rem] mx-auto border-t border-border flex justify-between items-center flex-wrap gap-4">
      <div className="font-body text-[0.8125rem] text-text-dim">
        &copy; {year} Rufsan &middot; Built with Next.js &amp; TypeScript
      </div>
      <div className="flex gap-6">
        {SOCIAL_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="font-body text-[0.8125rem] text-text-dim no-underline transition-colors hover:text-accent"
            onClick={() => { trackEvent("external_link", { label: l.label, href: l.href }); }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
