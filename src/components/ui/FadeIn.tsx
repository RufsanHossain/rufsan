"use client";

import { useInView } from "@/hooks/useInView";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  style?: React.CSSProperties;
}

const TRANSFORMS: Record<string, string> = {
  up: "translateY(40px)",
  down: "translateY(-40px)",
  left: "translateX(40px)",
  right: "translateX(-40px)",
  none: "translateY(0)",
};

export function FadeIn({ children, delay = 0, direction = "up", style = {} }: FadeInProps) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : TRANSFORMS[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${String(delay)}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${String(delay)}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}