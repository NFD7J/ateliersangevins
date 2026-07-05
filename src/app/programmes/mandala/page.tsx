import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Atelier Mandala",
  description:
    "Atelier de mandala : exploration artistique et méditative à travers la création de mandalas.",
};

export default function MandalaPage() {
  return (
    <>
      <section className="bg-forest-100 py-16">
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
            Le Mandala
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Que signifie mandala ?"
              title="Une exploration artistique et méditative"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Lors de cet atelier, vous réaliserez votre mandala personnel à partir de votre lieu et date de
              naissance , selon les principes de la géométrie harmonique. Véritable carte symbolique de
              votre parcours, il met en lumière vos ressources, les défis rencontrés et les potentiels qui vous
              accompagnent tout au long de votre vie.
              À travers sa lecture, vous serez invité(e) à porter un regard nouveau sur votre histoire, à mieux
              comprendre certaines étapes de votre évolution et à renouer avec votre élan intérieur.
              Un atelier à la fois créatif, symbolique et profondément enrichissant, pour celles et ceux qui
              souhaitent mieux se connaître, donner du sens à leur parcours et explorer les liens entre géométrie
              harmonique, symbolisme et développement personnel.
            </p>
          </div>
          <div className="mx-auto mt-12 w-full max-w-md">
            <PracticalInfo
            items={[{label: "Prérequis", value: "Aucun"},{ label: "Modalité d'inscription", value: "Voir le bulletin d'inscription" }]}
            pdfInscription="/documents/inscription-modules-complementaires-2026.pdf"
          />
          </div>
        </Container>
      </section>
    </>
  );
}
