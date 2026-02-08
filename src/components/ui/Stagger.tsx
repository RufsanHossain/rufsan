"use client";

import React from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FadeIn } from "./FadeIn";

interface StaggerProps {
  children: React.ReactNode;
  gap?: number;
  columns?: number;
  mobileColumns?: number;
  tabletColumns?: number;
  style?: React.CSSProperties;
}

export function Stagger({
  children,
  gap = 16,
  columns = 3,
  mobileColumns,
  tabletColumns,
  style = {},
}: StaggerProps) {
  const bp = useBreakpoint();

  const resolvedColumns =
    bp === "mobile"
      ? (mobileColumns ?? (columns >= 3 ? 1 : columns))
      : bp === "tablet"
        ? (tabletColumns ?? Math.min(columns, 2))
        : columns;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${String(resolvedColumns)}, 1fr)`,
        gap: bp === "mobile" ? Math.min(gap, 12) : gap,
        ...style,
      }}
    >
      {React.Children.map(children, (child, i) => (
        <FadeIn key={i} delay={i * 0.08}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
}