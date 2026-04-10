"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-[0.625rem] mb-4 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-[0.625rem]">
          {i > 0 && <span aria-hidden="true" className="text-text-dim text-[0.6875rem]">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="font-body text-[0.8125rem] text-text-dim no-underline transition-colors duration-200 hover:text-accent"
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="font-body text-[0.8125rem] text-accent">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
