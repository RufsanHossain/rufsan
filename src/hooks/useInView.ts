"use client";

import { useRef, useState, useEffect } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInView(opts: UseInViewOptions = {}): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? "0px" }
    );

    observer.observe(el);
    return () => { observer.disconnect(); };
  }, [opts.threshold, opts.rootMargin]);

  return [ref, visible];
}
