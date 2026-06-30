import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Atelier Sylvothérapie",
  description:
    "Atelier de sylvothérapie : se reconnecter à la nature et aux arbres pour apaiser le corps et l'esprit, à travers marche consciente et respiration.",
};

export default function SylvotherapiePage() {
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
            La Sylvothérapie
          </h1>
          <p className="mt-4 text-ink-soft">
            En regardant attentivement un arbre, on peut réaliser à quel point il peut être le
            reflet de notre propre vie.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="L'approche"
            title="Une interaction avec l'environnement forestier"
          />
          <p className="mt-4 leading-relaxed text-ink-soft">
            L&apos;atelier propose des parallèles symboliques entre l&apos;arbre et notre propre
            vie : les racines représentent nos origines et nos valeurs fondamentales, le tronc
            notre force intérieure et notre résilience, les branches nos expériences de vie
            variées, et les feuilles nos idées et émotions en évolution.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Une « méditation de l&apos;arbre » est proposée pour se centrer, dans l&apos;esprit de
            cette citation de Mario Mercier : « Tout ce qui vit a besoin de vos regards... » — nous
            faisons partie intégrante de la nature.
          </p>
        </Container>
      </section>

      <section className="bg-forest-50 py-20">
        <Container className="max-w-xl">
          <PracticalInfo
            items={[
              { label: "Tarif", value: "140 € (individuel, repas inclus)" },
              { label: "Durée", value: "1 jour" },
              { label: "Accueil", value: "8h30" },
              { label: "Lieu", value: "Centre Xian, La Haute Jeannière, 49220 Thorigné-d'Anjou" },
            ]}
            pdfInscription="/documents/inscription-modules-complementaires-2026.pdf"
          />
        </Container>
      </section>
    </>
  );
}
