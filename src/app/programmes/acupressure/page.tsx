import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Atelier Acupressure",
  description:
    "Atelier d'acupressure : initiation aux techniques d'acupression pour le bien-être et la relaxation.",
};

export default function AcupressurePage() {
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
            L'Acupressure
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Que signifie radiesthésie ?"
              title="Un procédé de détection bio-sensible"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              L'acupressure repose sur la stimulation de points spécifiques du corps pour favoriser le bien-être et la relaxation. Elle utilise des techniques de pression et de massage pour améliorer la circulation de l'énergie et soulager les tensions.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-forest-900">
              Le contenu du module
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft">
              L&apos;atelier aborde l&apos;historique de la pratique, le contexte dans lequel elle
              s&apos;exerce, les différentes techniques de stimulation, le lâcher-prise et le
              développement de la réceptivité, à travers des mises en pratique concrètes.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-forest-50 py-20">
        <Container className="max-w-xl">
          <PracticalInfo
            items={[{ label: "Informations pratiques", value: "Voir le programme téléchargeable" }]}
            pdfInscription="/documents/inscription-modules-complementaires-2026.pdf"
          />
        </Container>
      </section>
    </>
  );
}
