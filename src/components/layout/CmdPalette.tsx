"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RESUME_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/navigation";
import { CASES } from "@/lib/cases";
import { BLOG_POSTS } from "@/lib/blog";
import { SearchIcon } from "@/components/ui/Icons";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/lib/cn";

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
      className={cn(
        "fixed inset-0 z-200 flex justify-center",
        isMobile ? "items-end pt-0" : "items-start pt-40",
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close command palette"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-[8px] border-none cursor-default p-0 w-full"
      />
      <div
        role="dialog"
        aria-label="Command palette"
        className={cn(
          "relative z-1 overflow-hidden bg-code-bg/95 backdrop-blur-[20px] border border-overlay-border",
          isMobile
            ? "w-full max-h-[80vh] rounded-t-[1rem] rounded-b-none"
            : "w-[35rem] max-h-[26.25rem] rounded-[1rem]",
        )}
        style={{ boxShadow: "0 1.5rem 5rem rgba(0,0,0,0.6), 0 0 3.75rem rgba(141,234,178,0.02)" }}
      >
        <div className={cn(
          "flex items-center gap-3 border-b border-overlay-border-subtle",
          isMobile ? "py-3.5 px-4" : "py-4 px-5",
        )}>
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
            className={cn(
              "flex-1 bg-transparent border-none outline-none text-fg font-body",
              isMobile ? "text-base" : "text-[0.9375rem]",
            )}
          />
          <kbd className="py-0.5 px-2 bg-overlay-active rounded text-[0.6875rem] font-mono text-text-dim">
            ESC
          </kbd>
        </div>
        <div
          ref={listRef}
          id="cmd-palette-list"
          role="listbox"
          className="overflow-y-auto p-2"
          style={{ maxHeight: isMobile ? "calc(80vh - 3.25rem)" : "21.25rem" }}
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
              className={cn(
                "w-full flex items-center justify-between border-none rounded-lg text-sm font-body cursor-pointer text-left transition-[background] duration-100 outline-none",
                isMobile ? "py-3.5 px-4" : "py-3 px-4",
                i === activeIndex
                  ? "bg-overlay-active text-fg"
                  : "bg-transparent text-text",
              )}
            >
              <span>{item.label}</span>
              <span className="text-[0.6875rem] text-text-dim font-mono uppercase">
                {item.type}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="py-6 text-center text-text-dim text-sm">
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
      className="fixed top-0 left-0 w-[25rem] h-[25rem] rounded-full pointer-events-none z-1 will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(141,234,178,0.024) 0%, transparent 70%)",
        transform: "translate(-200px, -200px)",
      }}
    />
  );
}
