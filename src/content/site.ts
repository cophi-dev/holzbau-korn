export const SITE_URL = "https://holzbau-korn.vercel.app";

export const business = {
  name: "Möbel & Holzbau Korn",
  owner: "Alexander Korn",
  street: "Friesenstraße 2",
  zip: "39108",
  city: "Magdeburg",
  phoneDisplay: "0176 96788140",
  phoneHref: "tel:+4917696788140",
  phoneE164: "+4917696788140",
  email: "moebel.holzbau.korn@web.de",
  facebook: "https://www.facebook.com/Alexander-Korn-Möbel-Holzbau-798029883597021",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Friesenstra%C3%9Fe%202%2C%2039108%20Magdeburg",
  vatId: "80719439651",
  taxNumber: "102/240/18652",
  companyNumber: "46330",
} as const;

export const nav = [
  { href: "/#arbeiten", label: "Arbeiten" },
  { href: "/#ueber-mich", label: "Über mich" },
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

export const serviceGroups = [
  {
    title: "Dachstuhl & Holzbau",
    items: [
      "Dachstühle",
      "Wechsel einsetzen & Sparren austauschen",
      "Sanierung von Deckenbalken & Sparren",
      "Einschalen von Flachdächern, Schornsteinen & Giebel",
      "Dacheindeckung",
    ],
  },
  {
    title: "Gauben, Dachfenster & Vordächer",
    items: [
      "Gaubenbau",
      "Einbau von Dachfenstern",
      "Herstellung & Aufbau von Vordächern, Balkonen & Simskästen",
    ],
  },
  {
    title: "Innenausbau & Treppen",
    items: [
      "Innenausbau",
      "Treppenbau",
      "Einbau von Bodentreppen",
      "Holzfußböden & Verlegen von Laminat",
      "Ziehen von Trockenbauwänden",
    ],
  },
  {
    title: "Möbelbau & Instandsetzung",
    items: [
      "Möbelbau & Instandsetzung von Möbeln",
      "Fertigen von Türen & Toren",
      "Fertigen von Kleintierställen",
      "Arbeiten mit Maschinen & Oberflächenbehandlung, Holzschutz",
    ],
  },
] as const;
