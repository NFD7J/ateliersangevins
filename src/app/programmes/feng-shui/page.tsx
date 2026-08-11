import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Atelier Feng Shui",
  description:
    "Atelier de feng shui : découvrir les principes de l'harmonisation spatiale et améliorer votre environnement pour favoriser le bien-être.",
};

export default function FengshuiPage() {
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
            Le Feng Shui
          </h1>
          <p className="mt-4 text-ink-soft">
            Offrez-vous une immersion dans l’univers subtil du Feng Shui, un art ancestral qui révèle l’influence profonde de notre environnement sur notre équilibre, notre vitalité et notre qualité de vie.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="L'approche"
                title="Le Feng Shui, un art ancestral"
              />
              <p className="mt-4 leading-relaxed text-ink-soft">
                Au cours de cette journée d’initiation proposée par les Ateliers Angevins, 
                animée par Jocelyne Pivette, vous découvrirez les principes essentiels 
                permettant d’harmoniser les énergies d’un lieu afin de favoriser sérénité, 
                clarté, élan et bien-être au quotidien. Entre tradition et regard contemporain, 
                cette approche vous apportera des clés concrètes pour transformer votre habitat 
                en un véritable espace ressource.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Une expérience enrichissante pour porter un nouveau regard sur les liens qui unissent l’être humain à son environnement.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md">
              <PracticalInfo
                items={[
                  { label: "Tarif", value: "non renseigné" },
                  { label: "Durée", value: "1 jour" },
                  { label: "Accueil", value: "8h30" },
                  { label: "Repas", value: "non inclus" },
                  { label: "Lieu", value: "Centre Xian, La Haute Jeannière, 49220 Thorigné-d'Anjou" },
                ]}
                pdfInscription="/documents/inscription-modules-complementaires-2026.pdf"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
