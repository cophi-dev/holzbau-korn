import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${business.name}: keine Cookies, kein Tracking, keine eingebetteten Inhalte.`,
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <section>
        <h2>Verantwortlicher</h2>
        <p>
          {business.owner}, {business.name}, {business.street}, {business.zip} {business.city}
          <br />
          Telefon:{" "}
          <a href={business.phoneHref} className="link-text tabular-nums">
            {business.phoneDisplay}
          </a>
          , E-Mail:{" "}
          <a href={`mailto:${business.email}`} className="link-text">
            {business.email}
          </a>
        </p>
      </section>

      <section>
        <h2>Kurz gesagt</h2>
        <p>
          Diese Website setzt keine Cookies, verwendet kein Tracking und keine Analyse-Werkzeuge und bindet keine Inhalte
          fremder Anbieter ein (keine Karten, Videos oder Social-Media-Plugins). Auch die Schriftart wird direkt von
          dieser Website geladen, nicht von Servern Dritter.
        </p>
      </section>

      <section>
        <h2>Hosting und Server-Logfiles</h2>
        <p>
          Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der
          Seiten verarbeitet Vercel technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene
          Adresse, Referrer-URL sowie Browser- und Betriebssystemangaben. Diese Daten werden nur verwendet, um die
          Website auszuliefern und ihre Sicherheit und Stabilität zu gewährleisten, und nicht mit anderen Daten
          zusammengeführt.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt in einer sicheren und
          funktionsfähigen Bereitstellung der Website. Vercel verarbeitet die Daten als Auftragsverarbeiter. Eine
          Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss zum EU-US Data Privacy Framework, unter
          dem Vercel zertifiziert ist, sowie ergänzend auf Standardvertragsklauseln der EU-Kommission.
        </p>
      </section>

      <section>
        <h2>Kontakt per Telefon oder E-Mail</h2>
        <p>
          Wenn Sie mich anrufen oder mir schreiben, verarbeite ich Ihre Angaben (etwa Name, Telefonnummer, E-Mail-Adresse
          und Ihr Anliegen), um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es
          um ein Angebot oder einen Auftrag geht, sonst Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht, sobald sie
          nicht mehr benötigt werden, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
        </p>
      </section>

      <section>
        <h2>Links zu anderen Anbietern</h2>
        <p>
          Die Website enthält einfache Links, zum Beispiel zu Google Maps und Facebook. Daten werden an diese Anbieter
          erst übertragen, wenn Sie einen solchen Link anklicken; ab dann gelten die Datenschutzbestimmungen des
          jeweiligen Anbieters.
        </p>
      </section>

      <section>
        <h2>Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten, auf
          Datenübertragbarkeit sowie auf Widerspruch gegen eine Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO (Art. 15 bis 21 DSGVO). Wenden Sie sich dazu einfach an die oben genannten Kontaktdaten.
        </p>
        <p>
          Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der
          Landesbeauftragten für den Datenschutz Sachsen-Anhalt, Otto-von-Guericke-Straße 34a, 39104 Magdeburg.
        </p>
      </section>
    </LegalPage>
  );
}
