// Suspense fallback for /blog/[slug]. Mirrors the article header + hero +
// body block layout so the page doesn't jump when the real post hydrates.
export default function BlogPostLoading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading article">
      <article>
        {/* ── Header ── */}
        <section className="max-w-[75rem] mx-auto pt-[6.25rem] px-4 md:pt-[8.125rem] md:px-8">
          <div className="h-3 w-48 rounded bg-overlay-subtle" />
          <div className="max-w-[47.5rem] mx-auto pt-4">
            {/* Tag + date row */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="h-6 w-24 rounded-md bg-overlay-subtle" />
              <div className="h-3 w-20 rounded bg-overlay-subtle" />
              <div className="h-3 w-16 rounded bg-overlay-subtle" />
            </div>
            {/* Title */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="h-10 md:h-14 w-full rounded-lg bg-overlay-subtle" />
              <div className="h-10 md:h-14 w-[70%] rounded-lg bg-overlay-subtle" />
            </div>
            {/* Excerpt */}
            <div className="flex flex-col gap-2 mb-10">
              <div className="h-4 w-full rounded bg-overlay-subtle" />
              <div className="h-4 w-[88%] rounded bg-overlay-subtle" />
            </div>
            {/* Author block */}
            <div className="flex items-center gap-[0.875rem] pb-10 border-b border-border">
              <div className="w-11 h-11 rounded-xl bg-overlay-subtle" />
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 rounded bg-overlay-subtle" />
                <div className="h-3 w-56 rounded bg-overlay-subtle" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Hero image / browser frame ── */}
        <section className="max-w-[75rem] mx-auto py-8 px-4 md:py-10 md:px-8">
          <div className="max-w-[47.5rem] mx-auto">
            <div className="rounded-[0.875rem] border border-overlay-border bg-overlay-subtle h-9 mb-0" />
            <div className="rounded-b-[0.875rem] border-x border-b border-overlay-border bg-overlay-subtle min-h-40 md:min-h-60" />
          </div>
        </section>

        {/* ── Body ── */}
        <section className="max-w-[75rem] mx-auto pt-4 px-4 pb-10 md:pt-5 md:px-8 md:pb-[3.75rem]">
          <div className="max-w-[47.5rem] mx-auto flex flex-col gap-3">
            <div className="h-7 w-[55%] rounded bg-overlay-subtle mt-4" />
            <div className="h-3 w-full rounded bg-overlay-subtle" />
            <div className="h-3 w-[97%] rounded bg-overlay-subtle" />
            <div className="h-3 w-[92%] rounded bg-overlay-subtle" />
            <div className="h-3 w-[60%] rounded bg-overlay-subtle" />
            <div className="h-7 w-[45%] rounded bg-overlay-subtle mt-6" />
            <div className="h-3 w-full rounded bg-overlay-subtle" />
            <div className="h-3 w-[95%] rounded bg-overlay-subtle" />
            <div className="h-3 w-[70%] rounded bg-overlay-subtle" />
          </div>
        </section>
      </article>
    </div>
  );
}
