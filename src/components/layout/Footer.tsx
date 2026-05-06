"use client";

import { trackEvent } from "@/lib/analytics";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/RufsanHossain" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rufsan-hossain-santo/" },
  { label: "X", href: "https://x.com/RufsanH" },
  { label: "Email", href: "mailto:rufsanhossainsanto@gmail.com" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-8 py-10 max-w-[75rem] mx-auto border-t border-border flex flex-col gap-6">
      {/* Newsletter signup row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <p className="font-display font-bold text-fg text-sm mb-1">Rufsan Shares</p>
          <p className="font-body text-[0.8125rem] text-text-dim max-w-[24rem]">
            Engineering deep dives in your inbox. Same cadence as the blog.
          </p>
        </div>
        <NewsletterForm variant="compact" source="footer" />
      </div>

      {/* Bottom row: copyright + social */}
      <div className="flex justify-between items-center flex-wrap gap-4 pt-6 border-t border-overlay-border-subtle">
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
      </div>
    </footer>
  );
}
