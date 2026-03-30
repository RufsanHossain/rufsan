"use client";

import Link from "next/link";
import { ACCENT, TEXT_DIM, FONT_BODY } from "@/lib/constants";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem", flexWrap: "wrap" }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          {i > 0 && <span aria-hidden="true" style={{ color: TEXT_DIM, fontSize: "0.6875rem" }}>/</span>}
          {item.href ? (
            <Link
              href={item.href}
              style={{ fontFamily: FONT_BODY, fontSize: "0.8125rem", color: TEXT_DIM, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_DIM)}
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" style={{ fontFamily: FONT_BODY, fontSize: "0.8125rem", color: ACCENT }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
