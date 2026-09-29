import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
        Diese Seite gibt es nicht.
      </h1>
      <p className="mt-6 text-lg text-ink-soft">
        <Link href="/" className="link-text text-ink">
          Zur Startseite
        </Link>
      </p>
    </Container>
  );
}
