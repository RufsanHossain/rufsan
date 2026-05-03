// Suspense fallback for /blog. Mirrors the shape of BlogIndexPage so content
// doesn't visually shift when the real page swaps in.
export default function BlogIndexLoading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading blog">
      {/* ── Header ── */}
      <section className="sc-blog-header">
        {/* Breadcrumb stub */}
        <div className="h-3 w-32 rounded bg-overlay-subtle" />
        <div className="max-w-[45rem] pt-4">
          {/* Title (two lines, like "Writing / & deep dives.") */}
          <div className="mb-5 flex flex-col gap-3">
            <div className="h-12 w-[60%] rounded-lg bg-overlay-subtle" />
            <div className="h-12 w-[75%] rounded-lg bg-overlay-subtle" />
          </div>
          {/* Description (three lines) */}
          <div className="flex flex-col gap-2 max-w-[33.75rem]">
            <div className="h-3 w-full rounded bg-overlay-subtle" />
            <div className="h-3 w-[92%] rounded bg-overlay-subtle" />
            <div className="h-3 w-[60%] rounded bg-overlay-subtle" />
          </div>
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="sc-blog-cards">
        <div className="flex flex-col gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-overlay-subtle border border-overlay-border rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="flex gap-2">
                <div className="h-5 w-20 rounded bg-overlay-active" />
                <div className="h-5 w-16 rounded bg-overlay-active" />
              </div>
              <div className="h-6 w-[70%] rounded bg-overlay-active" />
              <div className="h-3 w-full rounded bg-overlay-active" />
              <div className="h-3 w-[85%] rounded bg-overlay-active" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
