"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "completing">("idle");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathname = useRef(pathname);

  const start = useCallback(() => {
    setState("loading");
    setProgress(0);

    if (timerRef.current) clearInterval(timerRef.current);

    let p = 0;
    timerRef.current = setInterval(() => {
      p += (90 - p) * 0.08;
      setProgress(p);
      if (p >= 89.5) {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 50);
  }, []);

  const complete = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);
    setState("completing");

    const timeout = setTimeout(() => {
      setState("idle");
      setProgress(0);
    }, 400);

    return () => { clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      if (state === "loading") {
        complete();
      }
    }
  }, [pathname, state, complete]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      ) {
        return;
      }

      if (href === pathname || href === pathname + "/") return;

      start();
    };

    document.addEventListener("click", handleClick, true);
    return () => { document.removeEventListener("click", handleClick, true); };
  }, [pathname, start]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (state === "idle") return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5 pointer-events-none">
      <div
        className="h-full bg-accent rounded-r-[1px]"
        style={{
          width: `${String(progress)}%`,
          boxShadow: "0 0 8px rgba(141,234,178,0.5), 0 0 2px #8deab2",
          transition:
            state === "completing"
              ? "width 0.2s ease-out, opacity 0.3s ease 0.1s"
              : "width 0.15s linear",
          opacity: state === "completing" ? 0 : 1,
        }}
      />
    </div>
  );
}
