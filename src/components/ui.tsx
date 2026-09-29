import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 ${className}`} {...props} />;
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-5 w-5 ${className}`} aria-hidden="true" focusable="false">
      <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CallButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-between gap-4 rounded-[2px] bg-accent px-6 py-4 text-lg font-semibold text-ink transition-colors duration-300 hover:bg-accent-soft ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <Arrow className="transition-transform duration-300 ease-calm group-hover:translate-x-1" />
    </a>
  );
}

export function SectionHead({
  index,
  label,
  title,
  intro,
  titleId,
  tone = "light",
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  titleId: string;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-paper/70" : "text-ink-soft";
  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-5 md:grid-cols-12 md:gap-x-6" data-reveal>
      <p className={`col-span-4 flex items-center gap-3 text-sm font-medium tracking-wide md:col-span-3 md:pt-3 ${muted}`}>
        <span className="h-[2px] w-8 bg-accent" aria-hidden="true" />
        <span>
          {index} · {label}
        </span>
      </p>
      <div className="col-span-4 md:col-span-9">
        <h2
          id={titleId}
          className="max-w-[20ch] text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-balance"
        >
          {title}
        </h2>
        {intro ? <p className={`mt-5 max-w-[58ch] text-lg leading-relaxed ${muted}`}>{intro}</p> : null}
      </div>
    </div>
  );
}
