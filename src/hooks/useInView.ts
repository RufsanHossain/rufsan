"use client";

import { useRef, useState, useEffect } from "react";

/* ── Shared IntersectionObserver registry ──
   Elements with the same threshold + rootMargin share a single observer.
   When an element intersects, its callback fires and it's unobserved.
   When the last element unregisters, the observer is cleaned up. */

type ObserverCallback = (isIntersecting: boolean) => void;

interface ObserverEntry {
  observer: IntersectionObserver;
  elements: Map<Element, ObserverCallback>;
}

const observers = new Map<string, ObserverEntry>();

function getKey(threshold: number, rootMargin: string): string {
  return `${String(threshold)}|${rootMargin}`;
}

function subscribe(
  el: Element,
  callback: ObserverCallback,
  threshold: number,
  rootMargin: string
): () => void {
  const key = getKey(threshold, rootMargin);

  if (!observers.has(key)) {
    const elements = new Map<Element, ObserverCallback>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = elements.get(entry.target);
            if (cb) {
              cb(true);
              observer.unobserve(entry.target);
              elements.delete(entry.target);
            }
            // Clean up observer when no elements remain
            if (elements.size === 0) {
              observer.disconnect();
              observers.delete(key);
            }
          }
        }
      },
      { threshold, rootMargin }
    );
    observers.set(key, { observer, elements });
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed to exist, just set above
  const entry = observers.get(key)!;
  entry.elements.set(el, callback);
  entry.observer.observe(el);

  // Return unsubscribe function
  return () => {
    entry.observer.unobserve(el);
    entry.elements.delete(el);
    if (entry.elements.size === 0) {
      entry.observer.disconnect();
      observers.delete(key);
    }
  };
}

/* ── Hook (public API unchanged) ── */

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInView(opts: UseInViewOptions = {}): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const threshold = opts.threshold ?? 0.15;
  const rootMargin = opts.rootMargin ?? "0px";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return subscribe(el, () => { setVisible(true); }, threshold, rootMargin);
  }, [threshold, rootMargin]);

  return [ref, visible];
}
