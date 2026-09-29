"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui";
import { business } from "@/content/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Seitenfehler", { message: error.message, digest: error.digest, stack: error.stack });
  }, [error]);

  return (
    <Container className="py-24 md:py-32">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
        Hier ist etwas schiefgelaufen.
      </h1>
      <p className="mt-6 max-w-[50ch] text-lg text-ink-soft">
        Bitte laden Sie die Seite neu. Sie erreichen mich auch direkt unter{" "}
        <a href={business.phoneHref} className="link-text text-ink tabular-nums">
          {business.phoneDisplay}
        </a>
        .
      </p>
      <button type="button" onClick={reset} className="mt-8 border-b-2 border-ink pb-1 font-semibold hover:border-accent">
        Erneut versuchen
      </button>
    </Container>
  );
}
