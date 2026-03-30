"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ACCENT, TEXT, TEXT_DIM, GLASS, FONT_BODY, FONT_MONO, RESUME_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/navigation";
import { CASES } from "@/lib/cases";
import { BLOG_POSTS } from "@/lib/blog";
import { SearchIcon } from "@/components/ui/Icons";
import { useBreakpoint } from "@/hooks/useBreakpoint";

// ─── COMMAND PALETTE ─────────────────────────────────────────

interface CmdPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface PaletteItem {
  label: string;
  type: string;
  href: string;
}

export function CmdPalette({ open, onClose }: CmdPaletteProps) {
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  const items: PaletteItem[] = [
    ...ROUTES.map((r) => ({ label: r.label, type: "page", href: r.href })),
    { label: "Download Resume", type: "action", href: RESUME_URL },
    ...CASES.map((c) => ({ label: c.title, type: "case study", href: `/cases/${c.slug}` })),
    ...BLOG_POSTS.map((b) => ({ label: b.title, type: "article", href: `/blog/${b.slug}` })),
  ];

  const filtered = q
    ? items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()))
    : items;

  useEffect(() => {
    setActiveIndex(0);
  }, [q]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      setQ("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem && listRef.current) {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleSelect = useCallback(
    (item: PaletteItem) => {
      onClose();
      if (item.type === "action") {
        const link = document.createElement("a");
        link.href = item.href;
        link.download = "Rufsan-Hossain-Santo-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        router.push(item.href);
      }
    },
    [onClose, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (filtered[activeIndex]) handleSelect(filtered[activeIndex]);
          break;
        }
        case "Escape": {
          e.preventDefault();
          onClose();
          break;
        }
        case "Home": {
          e.preventDefault();
          setActiveIndex(0);
          break;
        }
        case "End": {
          e.preventDefault();
          setActiveIndex(filtered.length - 1);
          break;
        }
        default:
          break;
      }
    },
    [filtered, activeIndex, handleSelect, onClose]
  );

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "flex-start",
        justifyContent: "center",
        paddingTop: isMobile ? 0 : "10rem",
      }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close command palette"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          border: "none",
          cursor: "default",
          padding: 0,
          width: "100%",
        }}
      />
      <div
        role="dialog"
        aria-label="Command palette"
        style={{
          position: "relative",
          zIndex: 1,
          width: isMobile ? "100%" : "35rem",
          maxHeight: isMobile ? "80vh" : "26.25rem",
          ...GLASS,
          background: "rgba(10,10,10,0.95)",
          borderRadius: isMobile ? "1rem 1rem 0 0" : "1rem",
          overflow: "hidden",
          boxShadow: `0 1.5rem 5rem rgba(0,0,0,0.6), 0 0 3.75rem ${ACCENT}06`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
            borderBottom: "0.0625rem solid rgba(255,255,255,0.06)",
          }}
        >
          <SearchIcon />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); }}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, projects, actions..."
            aria-label="Search command palette"
            aria-activedescendant={filtered.length > 0 ? `cmd-item-${String(activeIndex)}` : undefined}
            role="combobox"
            aria-expanded
            aria-controls="cmd-palette-list"
            aria-autocomplete="list"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fafafa",
              fontSize: isMobile ? "1rem" : "0.9375rem",
              fontFamily: FONT_BODY,
            }}
          />
          <kbd
            style={{
              padding: "0.125rem 0.5rem",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "0.25rem",
              fontSize: "0.6875rem",
              fontFamily: FONT_MONO,
              color: TEXT_DIM,
            }}
          >
            ESC
          </kbd>
        </div>
        <div
          ref={listRef}
          id="cmd-palette-list"
          role="listbox"
          style={{
            maxHeight: isMobile ? "calc(80vh - 3.25rem)" : "21.25rem",
            overflowY: "auto",
            padding: "0.5rem",
          }}
        >
          {filtered.map((item, i) => (
            <button
              key={`${item.href}-${String(i)}`}
              id={`cmd-item-${String(i)}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              role="option"
              aria-selected={i === activeIndex}
              onClick={() => { handleSelect(item); }}
              onMouseEnter={() => { setActiveIndex(i); }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? "0.875rem 1rem" : "0.75rem 1rem",
                background: i === activeIndex ? "rgba(255,255,255,0.06)" : "transparent",
                border: "none",
                borderRadius: "0.5rem",
                color: i === activeIndex ? "#fafafa" : TEXT,
                fontSize: "0.875rem",
                fontFamily: FONT_BODY,
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.1s",
                outline: "none",
              }}
            >
              <span>{item.label}</span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: TEXT_DIM,
                  fontFamily: FONT_MONO,
                  textTransform: "uppercase",
                }}
              >
                {item.type}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "1.5rem", textAlign: "center", color: TEXT_DIM, fontSize: "0.875rem" }}>
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CURSOR GLOW ─────────────────────────────────────────────

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const bp = useBreakpoint();

  useEffect(() => {
    if (bp === "mobile") return;
    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${String(e.clientX - 200)}px, ${String(e.clientY - 200)}px)`;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => { window.removeEventListener("mousemove", handleMove); };
  }, [bp]);

  if (bp === "mobile") return null;

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "25rem",
        height: "25rem",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}06 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 1,
        transform: "translate(-200px, -200px)",
        willChange: "transform",
      }}
    />
  );
}