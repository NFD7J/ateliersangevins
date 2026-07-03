import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Atelier Sourcellerie",
  description:
    "Atelier d'initiation à la sourcellerie : apprenez à détecter l'eau souterraine grâce à la baguette, au pendule ou à votre ressenti.",
};

export default function SourcelleriePage() {
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
            La Sourcellerie
          </h1>
          <p className="mt-4 text-ink-soft">
            Un sourcier est une personne qui peut détecter l&apos;eau souterraine, les sources, au
            moyen d&apos;une baguette, d&apos;un pendule ou même de son ressenti.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="L'atelier"
              title="Un atelier ouvert à tous, sans prérequis"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Aucun prérequis n&#39;est nécessaire pour participer à cette initiation à la sourcellerie. Que vous soyez débutant,
              curieux ou en recherche de nouvelles perceptions, cet atelier vous permettra de découvrir les bases de cette pratique
              à travers deux axes principaux :
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>✓ Développer et affiner vos capacités de perception et votre sensibilité naturelle.</li>
              <li>
                ✓ Apprendre les techniques fondamentales de détection des veines d&#39;eau, de l&#39;estimation de leur profondeur, de
                  leur débit et de l&#39;identification des emplacements propices au forage.
              </li>
            </ul>
          </div>
          <PracticalInfo
            items={[
              { label: "Tarif", value: "125 €" },
              { label: "Accueil", value: "8h30" },
              { label: "Lieu", value: "Communiqué à l'inscription" },
              { label: "Repas", value: "À la charge des participants" },
            ]}
            pdfInscription="/documents/inscription-modules-complementaires-2026.pdf"
          />
        </Container>
      </section>
    </>
  );
}
