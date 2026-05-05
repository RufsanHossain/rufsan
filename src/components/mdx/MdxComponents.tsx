import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ACCENT } from "@/lib/constants";

/* MDX renderers — server-renderable (no hooks). Used by the article body
 * on /blog/[slug] and the optional extended writeup on /cases/[id]. */

function H2({ children }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 className="font-display font-bold text-fg tracking-[-0.02em] leading-[1.2] text-[1.375rem] mt-10 mb-4 md:text-[1.75rem] md:mt-12 md:mb-5">
      {children}
    </h2>
  );
}

function H3({ children }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className="font-display font-bold text-fg tracking-[-0.02em] leading-[1.25] text-[1.125rem] mt-8 mb-3 md:text-[1.375rem] md:mt-10 md:mb-4">
      {children}
    </h3>
  );
}

function P({ children }: ComponentPropsWithoutRef<"p">) {
  return (
    <p className="font-body leading-[1.9] text-text mb-5 text-[0.9375rem] md:text-[1.0625rem]">
      {children}
    </p>
  );
}

function Ul({ children }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className="font-body text-text mb-5 ml-5 list-disc text-[0.9375rem] md:text-[1.0625rem] flex flex-col gap-2">
      {children}
    </ul>
  );
}

function Ol({ children }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol className="font-body text-text mb-5 ml-5 list-decimal text-[0.9375rem] md:text-[1.0625rem] flex flex-col gap-2">
      {children}
    </ol>
  );
}

function Li({ children }: ComponentPropsWithoutRef<"li">) {
  return <li className="leading-[1.7]">{children}</li>;
}

function A({ href, children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      className="text-accent underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors"
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      {...rest}
    >
      {children}
    </a>
  );
}

function Code({ className, children }: ComponentPropsWithoutRef<"code">) {
  // Fenced code blocks come through with `language-*` from MDX.
  // Render them unstyled — the surrounding <Pre> handles presentation.
  if (className?.startsWith("language-")) {
    return <code className={className}>{children}</code>;
  }
  // Inline code (single backticks) gets the chip treatment.
  return (
    <code className="font-mono text-[0.875em] px-[0.375rem] py-[0.125rem] rounded-[0.25rem] bg-overlay-subtle border border-overlay-border text-accent">
      {children}
    </code>
  );
}

/** Triple-backtick fenced blocks — `pre` wraps a `code` element in MDX, so
 *  we render the macOS-style code window here and let the inner `code`
 *  handle font/whitespace via CSS. */
function Pre({ children }: ComponentPropsWithoutRef<"pre">) {
  return (
    <div className="rounded-[0.875rem] overflow-hidden border border-border my-5 md:my-7">
      <div className="h-9 bg-code-bg flex items-center px-4 gap-[0.375rem] border-b border-border">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[0.6875rem] text-text-dim">code</span>
      </div>
      <pre className="bg-code-bg m-0 overflow-x-auto p-4 md:py-6 md:px-5 [-webkit-overflow-scrolling:touch] font-mono leading-[1.7] text-text whitespace-pre-wrap break-words text-xs md:text-[0.8125rem]">
        {children}
      </pre>
    </div>
  );
}

/** Custom component — usage: `<Callout>Key takeaway: ...</Callout>` */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-[0.875rem] my-6 py-5 px-4 md:my-9 md:py-7 md:px-8"
      style={{
        background: `${ACCENT}06`,
        border: `0.0625rem solid ${ACCENT}20`,
        borderLeft: `0.1875rem solid ${ACCENT}`,
      }}
    >
      <p className="font-body leading-[1.8] text-text m-0 font-medium text-sm md:text-base">
        {children}
      </p>
    </div>
  );
}

/** Default component map for MDXRemote. Pass to `components` prop. */
export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: A,
  code: Code,
  pre: Pre,
  Callout,
};
