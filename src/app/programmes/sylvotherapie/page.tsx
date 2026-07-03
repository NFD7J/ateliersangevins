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
            title="Une rencontre sensible avec le monde forestier"
          />
          <p className="mt-4 leading-relaxed text-ink-soft">
            Cet atelier invite à vivre une expérience immersive en lien avec la forêt, en explorant les résonances entre l&#39;arbre et
            notre propre parcours de vie.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Les racines évoquent nos origines et nos valeurs, le tronc notre stabilité et notre capacité d&#39;adaptation, les branches
            symbolisent nos chemins de vie et les feuilles notre évolution, nos émotions et notre créativité.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Au cœur de cette expérience, une méditation guidée autour de l&#39;arbre favorise le recentrage, l&#39;écoute de soi et la
            qualité de présence. Un temps privilégié pour renouer avec la nature, développer son ressenti et retrouver un
            équilibre intérieur, dans le respect du vivant.
          </p>
        </Container>
      </section>

      <section className="bg-forest-100 py-20">
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
