import Image from "next/image";
import { Gallery } from "@/components/Gallery";
import { TrussIllustration } from "@/components/TrussIllustration";
import { Arrow, CallButton, Container, SectionHead } from "@/components/ui";
import { holzbauPhotos, moebelbauPhotos, ogPhoto, portraitPhoto } from "@/content/photos";
import { business, serviceGroups, SITE_URL } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${SITE_URL}/#betrieb`,
  name: business.name,
  employee: { "@type": "Person", name: business.owner, jobTitle: "Zimmerer" },
  url: SITE_URL,
  image: `${SITE_URL}${ogPhoto.src}`,
  telephone: business.phoneE164,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    postalCode: business.zip,
    addressLocality: business.city,
    addressCountry: "DE",
  },
  areaServed: { "@type": "City", name: "Magdeburg" },
  sameAs: [business.facebook],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Work />
      <About />
      <Services />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20">
      <Container className="grid grid-cols-4 gap-x-5 gap-y-12 md:grid-cols-12 md:items-center md:gap-x-6">
        <div className="col-span-4 md:col-span-7">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-ink-soft">
            <span className="h-[2px] w-8 bg-accent" aria-hidden="true" />
            Zimmerer · Holzbau · Möbelbau
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.35rem,5.6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
          >
            Zimmerer aus Leidenschaft <span className="text-ink-soft">– für Holzbau und Möbel aus Massivholz in Magdeburg.</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft md:text-xl">
            Ich bin {business.owner}. Seit 2015 führe ich den Familienbetrieb weiter – schon mein Vater war
            Zimmerermeister.
          </p>
          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8 md:flex-col md:items-start md:gap-5 lg:flex-row lg:items-center lg:gap-8">
            <CallButton href={business.phoneHref} className="w-full sm:w-auto">
              Anrufen: {business.phoneDisplay}
            </CallButton>
            <a href={`mailto:${business.email}`} className="link-text text-base">
              oder per E-Mail schreiben
            </a>
          </div>
        </div>
        <div className="col-span-4 md:col-span-5">
          <TrussIllustration className="mx-auto block h-auto w-full max-w-[420px] md:max-w-none" />
        </div>
      </Container>
    </section>
  );
}

function Work() {
  return (
    <section id="arbeiten" aria-labelledby="arbeiten-titel" className="border-t border-line py-16 md:py-24">
      <Container>
        <SectionHead
          titleId="arbeiten-titel"
          index="01"
          label="Arbeiten"
          title="Einblick in meine Arbeit"
          intro="Vom Dachstuhl bis zum Möbelstück aus Massivholz – hier sehen Sie Projekte, die ich umgesetzt habe."
        />
        <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
          <Gallery title="Holzbau" photos={holzbauPhotos} />
          <Gallery title="Möbelbau" photos={moebelbauPhotos} />
        </div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="ueber-mich" aria-labelledby="ueber-mich-titel" className="border-t border-line bg-paper-deep/60 py-16 md:py-24">
      <Container className="grid grid-cols-4 gap-x-5 gap-y-10 md:grid-cols-12 md:gap-x-6">
        <div className="col-span-4 md:col-span-5" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: portraitPhoto.color }}>
            <Image
              src={portraitPhoto.src}
              alt={portraitPhoto.alt}
              fill
              sizes="(min-width: 1200px) 460px, (min-width: 768px) 40vw, 100vw"
              className="object-cover object-[34%_50%]"
            />
          </div>
        </div>
        <div className="col-span-4 md:col-span-7 md:pl-6 lg:pl-12">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-ink-soft" data-reveal>
            <span className="h-[2px] w-8 bg-accent" aria-hidden="true" />
            02 · Über mich
          </p>
          <h2
            id="ueber-mich-titel"
            className="mt-5 max-w-[18ch] text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-balance"
            data-reveal
          >
            Ich bin Alexander Korn – Zimmerer aus Leidenschaft.
          </h2>
          <div className="mt-7 max-w-[60ch] space-y-5 text-lg leading-relaxed text-ink-soft" data-reveal>
            <p>
              Nach meiner Freisprechung konnte ich über zehn Jahre hinweg umfassende Erfahrungen in unterschiedlichen
              Zimmerer- und Dachdeckereibetrieben sammeln und mein handwerkliches Können stetig weiterentwickeln.
            </p>
            <p>
              Das Arbeiten mit Holz begleitet mich seit meiner Kindheit, denn bereits mein Vater war Zimmerermeister.
              Seit 2015 führe ich den Familienbetrieb mit einem klaren Anspruch weiter: hochwertige Handwerksarbeit,
              präzise Ausführung und individuelle Lösungen mit Charakter.
            </p>
            <p className="text-ink">
              Ob traditionelles Handwerk oder moderne Umsetzung – im Mittelpunkt stehen für mich Qualität,
              Zuverlässigkeit und die Liebe zum Detail.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-y-5 border-t border-ink pt-6 sm:grid-cols-3 sm:gap-x-6" data-reveal>
            {[
              ["Seit 2015", "führe ich den Familienbetrieb weiter"],
              ["Über zehn Jahre", "in Zimmerer- und Dachdeckereibetrieben"],
              ["Magdeburg", business.street],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="text-xl font-semibold tracking-[-0.01em]">{term}</dt>
                <dd className="mt-1 text-ink-soft">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Services() {
  return (
    <section id="leistungen" aria-labelledby="leistungen-titel" className="border-t border-line py-16 md:py-24">
      <Container>
        <SectionHead
          titleId="leistungen-titel"
          index="03"
          label="Leistungen"
          title="Mein Tätigkeitsbereich"
          intro="Sie planen einen Neu- oder Umbau, möchten Ihr Dachtragwerk fachgerecht restaurieren oder sind auf der Suche nach einem individuellen Möbelstück aus Massivholz? Dann sind Sie bei mir genau richtig."
        />
        <div className="mt-12 grid grid-cols-4 gap-x-5 md:mt-16 md:grid-cols-12 md:gap-x-6">
          <ol className="col-span-4 grid grid-cols-1 gap-x-10 gap-y-10 md:col-span-9 md:col-start-4 md:grid-cols-2 md:gap-y-14">
            {serviceGroups.map((group, i) => (
              <li key={group.title} className="border-t border-ink pt-5" data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
                <p className="flex items-center gap-2 text-sm font-semibold text-ink-soft tabular-nums">
                  <span className="h-2 w-2 bg-accent" aria-hidden="true" />
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{group.title}</h3>
                <ul className="mt-4 space-y-2 text-[1.05rem] leading-snug text-ink-soft">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-soft" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="col-span-4 mt-10 text-lg text-ink-soft md:col-span-9 md:col-start-4">… und vieles mehr.</p>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-titel" className="bg-ink py-16 text-paper md:py-24">
      <Container>
        <SectionHead
          titleId="kontakt-titel"
          index="04"
          label="Kontakt"
          tone="dark"
          title="Gerne berate ich Sie persönlich."
          intro="Rufen Sie mich an oder schreiben Sie mir – gemeinsam mit Ihnen entwickle ich die passende Lösung für Ihr Vorhaben."
        />
        <div className="mt-12 grid grid-cols-4 gap-x-5 gap-y-10 md:mt-16 md:grid-cols-12 md:gap-x-6">
          <div className="col-span-4 md:col-span-9 md:col-start-4" data-reveal>
            <CallButton href={business.phoneHref} className="w-full sm:w-auto">
              Anrufen: {business.phoneDisplay}
            </CallButton>
          </div>
          <dl className="col-span-4 grid grid-cols-1 gap-y-8 border-t border-paper/25 pt-8 sm:grid-cols-3 sm:gap-x-6 md:col-span-9 md:col-start-4" data-reveal>
            <div>
              <dt className="text-sm text-paper/65">Telefon</dt>
              <dd className="mt-2 text-lg">
                <a href={business.phoneHref} className="link-draw tabular-nums">
                  {business.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-paper/65">E-Mail</dt>
              <dd className="mt-2 text-lg break-words">
                <a href={`mailto:${business.email}`} className="link-draw">
                  {business.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-paper/65">Adresse</dt>
              <dd className="mt-2 text-lg">
                <address className="not-italic">
                  {business.owner}
                  <br />
                  {business.street}
                  <br />
                  {business.zip} {business.city}
                </address>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-2 text-base link-draw"
                >
                  Adresse in Google Maps öffnen
                  <Arrow className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5" />
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
