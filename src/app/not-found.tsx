import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "AI / ML", href: "/ai" },
  { label: "Development", href: "/dev" },
  { label: "Data Science", href: "/ds" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg p-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(141,234,178,0.03) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[560px] w-full text-center">
        {/* 404 code */}
        <p className="font-mono text-[0.8125rem] text-accent tracking-[0.15em] uppercase mb-6">
          404 &mdash; Page not found
        </p>

        {/* Heading */}
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold text-text leading-[1.15] mb-4">
          Nothing here<span className="text-accent">.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-body text-[1.0625rem] text-text-dim leading-[1.6] mb-10 max-w-[420px] mx-auto">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved. Let&rsquo;s get you back on track.
        </p>

        {/* Primary CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-[0.9375rem] font-medium text-bg bg-accent px-7 py-3 rounded-full no-underline transition-opacity duration-200 hover:opacity-90"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Link>

        {/* Quick links card */}
        <div className="bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border mt-12 rounded-2xl px-8 py-6">
          <p className="font-mono text-[0.6875rem] text-text-dim tracking-[0.1em] uppercase mb-4">
            Quick links
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[0.8125rem] text-text no-underline py-[0.375rem] px-[0.875rem] rounded-full border border-border transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
