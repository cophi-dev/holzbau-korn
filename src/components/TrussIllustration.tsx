"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Coordinates follow a 1024×576 artboard; the viewBox crops to the drawing.
// Truss: 45° rafters from (270,410) to apex (512,168) to (754,410), stroke 14.
const BEAM = 14;
const LEG = 7;

function shift(x: number, y: number, deg = 0): CSSProperties {
  return {
    transformBox: "fill-box",
    transformOrigin: "50% 100%",
    transform: `translate3d(calc(var(--p, 0) * ${x}px), calc(var(--p, 0) * ${y}px), 0) rotate(calc(var(--p, 0) * ${deg}deg))`,
    willChange: "transform",
  };
}

export function TrussIllustration({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = svg.getBoundingClientRect();
      const travel = rect.top + window.scrollY + rect.height;
      const p = Math.min(1, Math.max(0, window.scrollY / travel));
      svg.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="236 52 560 492"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="512" cy="245" r="180" className="fill-accent" style={shift(0, 14)} />

      <g
        className="stroke-ink"
        fill="none"
        strokeWidth={BEAM}
        strokeLinecap="butt"
        style={shift(0, -4)}
      >
        <polygon points="270,410 512,168 754,410" strokeLinejoin="miter" strokeMiterlimit={4} />
        <line x1="512" y1="168" x2="512" y2="410" />
        <line x1="385" y1="295" x2="639" y2="295" />
        <line x1="385" y1="295" x2="512" y2="410" />
        <line x1="639" y1="295" x2="512" y2="410" />
        <line x1="385" y1="295" x2="330" y2="410" />
        <line x1="639" y1="295" x2="694" y2="410" />
      </g>

      <g style={shift(-6, 0, -3)}>
        <g className="stroke-ink" strokeWidth={LEG} strokeLinecap="butt">
          <line x1="708" y1="444" x2="705" y2="522" />
          <line x1="752" y1="444" x2="755" y2="522" />
          <line x1="706" y1="504" x2="754" y2="504" />
          <line x1="690" y1="444" x2="683" y2="534" />
          <line x1="770" y1="444" x2="777" y2="534" />
          <line x1="687" y1="484" x2="773" y2="484" />
        </g>
        <polygon points="686,424 774,424 780,432 680,432" className="fill-accent-soft" />
        <rect x="680" y="432" width="100" height="14" className="fill-accent" />
      </g>
    </svg>
  );
}
