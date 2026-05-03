// Suspense fallback for /cases/[id]. Mirrors the hero + metrics + challenge/
// solution structure of CaseStudyPage so the layout is stable on swap.
export default function CaseStudyLoading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading case study">
      {/* ── Hero ── */}
      <section className="sc-case-hero">
        <div className="h-3 w-56 rounded bg-overlay-subtle" />

        <div className="sc-case-grid">
          {/* Text */}
          <div>
            <div className="flex gap-[0.625rem] mb-6 flex-wrap">
              <div className="h-7 w-28 rounded-lg bg-overlay-subtle" />
              <div className="h-7 w-24 rounded-lg bg-overlay-subtle" />
              <div className="h-7 w-32 rounded-lg bg-overlay-subtle" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-10 md:h-14 w-full rounded-lg bg-overlay-subtle" />
              <div className="h-10 md:h-14 w-[70%] rounded-lg bg-overlay-subtle" />
            </div>
            <div className="flex flex-col gap-2 mt-6 max-w-[32.5rem]">
              <div className="h-3 w-full rounded bg-overlay-subtle" />
              <div className="h-3 w-[92%] rounded bg-overlay-subtle" />
              <div className="h-3 w-[78%] rounded bg-overlay-subtle" />
            </div>
          </div>

          {/* Mockup */}
          <div className="rounded-2xl border border-overlay-border bg-overlay-subtle min-h-[18rem]" />
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="sc-case-metrics">
        <div
          className="sc-metrics-grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="sc-case-card-sm bg-overlay-subtle border border-overlay-border text-center flex flex-col items-center gap-3"
            >
              <div className="h-8 w-20 rounded bg-overlay-active" />
              <div className="h-3 w-24 rounded bg-overlay-active" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Challenge / Solution ── */}
      <section className="sc-section-tight">
        <div className="sc-case-cs-grid">
          <div className="sc-case-card bg-overlay-subtle border border-overlay-border flex flex-col gap-3">
            <div className="h-5 w-40 rounded bg-overlay-active mb-2" />
            <div className="h-3 w-full rounded bg-overlay-active" />
            <div className="h-3 w-[95%] rounded bg-overlay-active" />
            <div className="h-3 w-[80%] rounded bg-overlay-active" />
          </div>
          <div className="sc-case-card bg-overlay-subtle border border-overlay-border flex flex-col gap-3">
            <div className="h-5 w-40 rounded bg-overlay-active mb-2" />
            <div className="h-3 w-full rounded bg-overlay-active" />
            <div className="h-3 w-[95%] rounded bg-overlay-active" />
            <div className="h-3 w-[88%] rounded bg-overlay-active" />
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="sc-section-tight">
        <div className="h-4 w-32 rounded bg-overlay-subtle mb-4" />
        <div className="flex gap-[0.625rem] flex-wrap">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-24 rounded-xl bg-overlay-subtle border border-overlay-border" />
          ))}
        </div>
      </section>
    </div>
  );
}
