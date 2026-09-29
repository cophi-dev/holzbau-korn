"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { business, nav } from "@/content/site";
import { Container } from "./ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/92 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-[-0.01em]" onClick={() => setOpen(false)}>
          <span className="h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
          {business.name}
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={business.phoneHref} className="link-draw font-semibold tabular-nums">
                {business.phoneDisplay}
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 flex items-center gap-3 px-2 py-2 text-[0.95rem] font-medium md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Schließen" : "Menü"}
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-[2px] w-5 bg-ink transition-transform duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-[2px] w-5 bg-ink transition-transform duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`}
            />
          </span>
        </button>
      </Container>

      <div id={panelId} hidden={!open} className="border-t border-line/70 bg-paper md:hidden">
        <Container className="py-6">
          <nav aria-label="Hauptnavigation">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-line/70">
                  <Link href={item.href} className="block py-4 text-2xl font-semibold tracking-[-0.02em]" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href={business.phoneHref} className="mt-6 inline-block text-lg font-semibold tabular-nums link-text">
            {business.phoneDisplay}
          </a>
        </Container>
      </div>
    </header>
  );
}
