import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Formation Magnétisme & Thérapies énergétiques",
  description:
    "Formation annuelle en magnétisme et thérapies énergétiques : 12 modules pour découvrir l'univers énergétique et constituer sa boîte à outils.",
};

export default function MagnetismePage() {
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
            Formation annuelle
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Magnétisme & Thérapies énergétiques
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="La discipline"
            title="Un ensemble indissociable"
          />
          <p className="mt-4 leading-relaxed text-ink-soft">
            Le corps physique, les corps subtils, l&apos;esprit et l&apos;âme forment un ensemble
            indissociable qui compose le vivant. Nos modes de vie modernes créent souvent stress
            et malaise, déséquilibrant cet ensemble.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Cette formation propose de découvrir le magnétisme, la chromothérapie et la thérapie
            par les formes pour développer une pratique de soin énergétique sérieuse et
            structurée.
          </p>
        </Container>
      </section>

      <section className="bg-forest-50 py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Le programme"
              title="12 modules, ouverts à tous"
              description="Aucun prérequis n'est nécessaire. La formation alterne théorie et pratique pour vous permettre de découvrir l'univers énergétique, de développer votre perception extrasensorielle et de constituer votre propre boîte à outils énergétique."
            />
          </div>
          <PracticalInfo
            items={[
              { label: "Durée", value: "Programme annuel, 12 modules" },
              { label: "Prérequis", value: "Aucun" },
              { label: "Format", value: "Théorie et pratique" },
            ]}
            pdfProgramme="/documents/programme-therapies-energetiques.pdf"
            pdfInscription="/documents/bulletin-inscription.pdf"
          />
        </Container>
      </section>
    </>
  );
}
