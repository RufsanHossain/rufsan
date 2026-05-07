"use client";

import { useState, type SyntheticEvent } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Variant = "compact" | "full";

interface NewsletterFormProps {
  /** "compact" fits in a footer row; "full" is the larger CTA-style block. */
  variant?: Variant;
  /** Where on the page this instance lives — sent to analytics so we can
   *  see which placement converts best. */
  source: string;
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({ variant = "compact", source, className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    const result = await subscribeToNewsletter(email, source);

    if (result.success) {
      setStatus("success");
      setEmail("");
      trackEvent("newsletter_signup", { source });
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong.");
    }
  }

  if (variant === "full") {
    return (
      <div
        className={cn(
          "bg-overlay-subtle backdrop-blur-[20px] border border-overlay-border rounded-2xl p-8 md:p-10",
          className,
        )}
      >
        <div className="max-w-[36rem]">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.1em] mb-3">
            // Rufsan Shares
          </p>
          <h3 className="font-display font-bold text-fg text-2xl md:text-[1.75rem] tracking-[-0.02em] leading-[1.2] mb-3">
            New essays in your inbox.
          </h3>
          <p className="font-body text-text-dim text-sm md:text-base leading-[1.7] mb-6">
            Engineering deep dives, architecture decisions, and lessons from
            building production systems. No spam — same cadence as the blog.
          </p>

          <form
            onSubmit={(e) => { void handleSubmit(e); }}
            className="flex flex-col sm:flex-row gap-3"
            aria-label="Subscribe to Rufsan Shares newsletter"
          >
            <label className="sr-only" htmlFor={`newsletter-email-${source}`}>
              Email address
            </label>
            <input
              id={`newsletter-email-${source}`}
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
              disabled={status === "submitting" || status === "success"}
              placeholder="you@example.com"
              className="flex-1 bg-overlay-subtle border border-overlay-border rounded-lg px-4 py-3 font-body text-sm text-fg placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="bg-accent text-accent-fg font-body font-semibold text-sm px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity whitespace-nowrap"
            >
              {status === "submitting" ? "Subscribing…" : status === "success" ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>

          <p
            className={cn(
              "font-body text-xs mt-3 min-h-[1rem]",
              status === "success" ? "text-accent" : "text-red-400",
            )}
            role={status === "error" ? "alert" : undefined}
            aria-live="polite"
          >
            {status === "success" && "You're in. Welcome to Rufsan Shares."}
            {status === "error" && errorMsg}
          </p>
        </div>
      </div>
    );
  }

  // compact variant — fits in the footer
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <form
        onSubmit={(e) => { void handleSubmit(e); }}
        className="flex gap-2 items-center"
        aria-label="Subscribe to Rufsan Shares newsletter"
      >
        <label className="sr-only" htmlFor={`newsletter-email-${source}`}>
          Email address
        </label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); }}
          disabled={status === "submitting" || status === "success"}
          placeholder="Subscribe to Rufsan Shares"
          className="bg-overlay-subtle border border-overlay-border rounded-md px-3 py-2.5 font-body text-[0.8125rem] text-fg placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-60 w-56"
        />
        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="bg-accent text-accent-fg font-body font-semibold text-[0.8125rem] px-3 py-2.5 rounded-md cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          {status === "submitting" ? "…" : status === "success" ? "✓" : "Subscribe"}
        </button>
      </form>
      <p
        className={cn(
          "font-body text-[0.6875rem] min-h-[0.875rem]",
          status === "success" ? "text-accent" : "text-red-400",
        )}
        role={status === "error" ? "alert" : undefined}
        aria-live="polite"
      >
        {status === "success" && "Subscribed. Check your inbox."}
        {status === "error" && errorMsg}
      </p>
    </div>
  );
}
