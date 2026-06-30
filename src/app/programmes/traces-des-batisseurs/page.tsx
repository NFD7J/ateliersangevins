import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Atelier Tracés des bâtisseurs",
  description:
    "Atelier sur les tracés des bâtisseurs : des outils d'harmonisation d'un lieu inspirés de la géométrie sacrée employée par les architectes et artistes.",
};

export default function TracesDesBatisseursPage() {
  return (
    <>
      <section className="bg-forest-50 py-16">
        <Container className="max-w-3xl text-center">
          <Link
            href="/programmes"
            className="text-sm font-semibold text-forest-700 hover:text-forest-900"
          >
            ← Retour aux programmes
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Atelier complémentaire
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Les Tracés des Bâtisseurs
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="L'atelier"
              title="Des outils d'harmonisation inspirés du vivant"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Les tracés constituent des outils d&apos;harmonisation d&apos;un lieu et/ou
              d&apos;un bâtiment, en s&apos;inspirant des éléments naturels. Ils représentent une
              géométrie employée historiquement par les architectes et les artistes, en
              s&apos;appuyant sur les tracés régulateurs utilisés depuis des siècles dans
              l&apos;architecture sacrée.
            </p>
          </div>
          <PracticalInfo
            items={[
              { label: "Coût", value: "100 € par jour" },
              { label: "Accueil", value: "8h30" },
              { label: "Lieu", value: "6 rue de Grez, 49460 Feneu" },
              { label: "Repas / hébergement", value: "À la charge des participants" },
            ]}
            pdfInscription="/documents/inscription-modules-complementaires-2026.pdf"
          />
        </Container>
      </section>
    </>
  );
}
