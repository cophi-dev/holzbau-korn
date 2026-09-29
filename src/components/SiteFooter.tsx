import Link from "next/link";
import { business } from "@/content/site";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper py-8 text-sm text-ink-soft">
      <Container className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="text-ink">
          {business.name} ·{" "}
          <span className="whitespace-nowrap">
            {business.street}, {business.zip} {business.city}
          </span>
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <li>
            <a href={business.phoneHref} className="link-draw tabular-nums">
              {business.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${business.email}`} className="link-draw">
              {business.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Link href="/impressum" className="link-draw">
              Impressum
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/datenschutz" className="link-draw">
              Datenschutz
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
