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
            L'Acupressure
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Que signifie acupressure ?"
              title="Un procédé de stimulation énergétique"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              L&#39;acupressure est une technique énergétique issue de la tradition chinoise qui consiste à stimuler des points précis du corps afin de favoriser une circulation harmonieuse de l&#39;énergie vitale.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-forest-900">
              Le contenu du module
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Cet atelier vous permet d&#39;acquérir les fondamentaux de cette discipline, de maîtriser des protocoles pratiques et de
              développer un toucher précis pour accompagner l&#39;équilibre physique, émotionnel et énergétique.
              Une approche complète, alliant théorie et pratique, destinée aussi bien au développement personnel qu&#39;à la
              formation de futurs praticiens.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-forest-100 py-20">
        <Container className="max-w-xl">
          <PracticalInfo
            items={[
              { label: "Prix", value: "250 €" },
              { label: "Durée", value: "2 jours (8h par jours)" },
              { label: "Repas", value: "A la charge des participants" },

            ]}
            pdfInscription="/documents/inscription-modules-complementaires-2026.pdf"
          />
        </Container>
      </section>
    </>
  );
}
