"use client";

import { useState, useEffect, useCallback } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

/* Breakpoints stay in px — window.innerWidth returns px */
const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
} as const;

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  const update = useCallback(() => {
    const w = window.innerWidth;
    if (w < BREAKPOINTS.tablet) setBp("mobile");
    else if (w < BREAKPOINTS.desktop) setBp("tablet");
    else setBp("desktop");
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("resize", update); };
  }, [update]);

  return bp;
}

/** Pick a value based on current breakpoint */
export function responsive<T>(bp: Breakpoint, mobile: T, tablet: T, desktop: T): T {
  if (bp === "mobile") return mobile;
  if (bp === "tablet") return tablet;
  return desktop;
}