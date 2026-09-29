# Möbel & Holzbau Korn

Website für Alexander Korn, Zimmerer in Magdeburg. Next.js (App Router) + Tailwind CSS, vollständig statisch, keine Umgebungsvariablen nötig.

## Entwicklung

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint         # ESLint, Warnungen = Fehler
pnpm typecheck
pnpm test         # Jest + React Testing Library
pnpm build
```

## Inhalte

- Texte, Kontaktdaten und Leistungen: `src/content/site.ts`
- Fotos: `public/arbeiten/`, Metadaten (Alt-Text, Maße, Kategorie) in `src/content/photos.json`

Die Fotos stammen von der bisherigen Jimdo-Seite. `pnpm images` lädt jeweils die größte verfügbare Version jeder Bild-ID, entfernt alle Metadaten (die Originale enthalten GPS-Daten), skaliert auf max. 2000 px und schreibt `photos.json` sowie `public/og.jpg` neu. Reihenfolge, Kategorie und Alt-Texte werden in `scripts/jimdo-images.json` gepflegt; die ersten zwölf Fotos je Kategorie bilden das hervorgehobene Raster.

## Deployment

Vercel, Canonical-URL `https://holzbau-korn.vercel.app` (`SITE_URL` in `src/content/site.ts`).
