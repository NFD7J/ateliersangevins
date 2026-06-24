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
              Cet atelier d&apos;initiation à la sourcellerie est accessible à tous, débutants
              comme curieux. Il couvre deux grands thèmes :
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>✓ L&apos;exploration de votre potentiel naturel dormant (don ou hypersensibilité)</li>
              <li>
                ✓ Les techniques fondamentales pour localiser les veines d&apos;eau, leurs débits,
                profondeurs et les points de forage
              </li>
            </ul>
          </div>
          <PracticalInfo
            items={[
              { label: "Tarif", value: "125 € par personne" },
              { label: "Accueil", value: "8h30" },
              { label: "Lieu", value: "Communiqué à l'inscription" },
              { label: "Repas", value: "À la charge des participants" },
            ]}
            pdfInscription="/documents/bulletin-inscription.pdf"
          />
        </Container>
      </section>
    </>
  );
}
