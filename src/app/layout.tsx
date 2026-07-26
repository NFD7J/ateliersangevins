import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Les Ateliers Angevins — Géobiologie & thérapies énergétiques",
    template: "%s — Les Ateliers Angevins",
  },
  description:
    "Association angevine fondée en 2005, dédiée à la géobiologie, aux thérapies énergétiques et au bien-être : formations, ateliers et accompagnement à Daumeray (49).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* Umami : chargé après l'hydratation pour ne pas peser sur le LCP.
            L'identifiant de site est public par nature (il figure dans le HTML). */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="fbd3c6ce-c6fd-4bf0-a5dc-e84a448958ce"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
