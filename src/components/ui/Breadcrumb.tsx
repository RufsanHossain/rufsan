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
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {i > 0 && <span style={{ color: TEXT_DIM, fontSize: 11 }}>/</span>}
          {item.href ? (
            <Link
              href={item.href}
              style={{ fontFamily: FONT_BODY, fontSize: 13, color: TEXT_DIM, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_DIM)}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: ACCENT }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
