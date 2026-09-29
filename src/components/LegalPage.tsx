import type { ReactNode } from "react";
import { Container } from "./ui";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Container className="grid grid-cols-4 gap-x-5 py-14 md:grid-cols-12 md:gap-x-6 md:py-20">
      <div className="col-span-4 md:col-span-8 md:col-start-3">
        <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.03em]">{title}</h1>
        <div className="mt-10 space-y-10 text-[1.05rem] leading-relaxed text-ink-soft [&_a]:text-ink [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-ink [&_p+p]:mt-3">
          {children}
        </div>
      </div>
    </Container>
  );
}
