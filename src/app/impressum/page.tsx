import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${business.name}, ${business.owner}, ${business.street}, ${business.zip} ${business.city}.`,
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section>
        <h2>Anbieter</h2>
        <p>
          {business.owner}
          <br />
          {business.name}
          <br />
          {business.street}
          <br />
          {business.zip} {business.city}
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon:{" "}
          <a href={business.phoneHref} className="link-text tabular-nums">
            {business.phoneDisplay}
          </a>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${business.email}`} className="link-text">
            {business.email}
          </a>
          <br />
          Facebook:{" "}
          <a href={business.facebook} className="link-text" rel="noopener noreferrer">
            Alexander Korn Möbel &amp; Holzbau
          </a>
        </p>
      </section>

      <section>
        <h2>Steuer- und Betriebsangaben</h2>
        <p>
          USt-IdNr.: {business.vatId}
          <br />
          Steuernr.: {business.taxNumber}
          <br />
          Betriebsnummer: {business.companyNumber}
        </p>
      </section>

      <section>
        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          {business.owner}, {business.street}, {business.zip} {business.city}
        </p>
      </section>
    </LegalPage>
  );
}
