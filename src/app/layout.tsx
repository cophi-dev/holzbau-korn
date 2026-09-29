import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ogPhoto } from "@/content/photos";
import { business, SITE_URL } from "@/content/site";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const title = `${business.name} – Zimmerer in Magdeburg`;
const description =
  "Ich bin Alexander Korn, Zimmerer aus Leidenschaft in Magdeburg: Dachstühle, Holzbau, Innenausbau und Möbel aus Massivholz. Seit 2015 führe ich den Familienbetrieb weiter.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s – ${business.name}` },
  description,
  applicationName: business.name,
  authors: [{ name: business.owner }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: business.name,
    title,
    description,
    images: [{ url: ogPhoto.src, width: ogPhoto.width, height: ogPhoto.height, alt: ogPhoto.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogPhoto.src] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${interTight.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#inhalt"
          className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
