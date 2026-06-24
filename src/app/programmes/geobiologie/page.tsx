import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";
import { ModuleList } from "@/components/formations/module-list";

export const metadata: Metadata = {
  title: "Formation Géobiologie",
  description:
    "Formation annuelle en géobiologie : 14 modules pour apprendre à détecter et harmoniser les perturbations d'un lieu et retrouver un habitat sain.",
};

const modules = [
  "Concept énergétique",
  "Détection bio-sensible",
  "Perceptions bio-sensibles",
  "Failles et veines d'eau",
  "Électromagnétisme",
  "Formes et champs de cohérence",
  "Habitat sain",
  "Feng Shui traditionnel (2 jours)",
  "Phénomènes particuliers",
  "Tracés régulateurs (2 niveaux)",
  "Diagnostic et harmonisation",
];

export default function GeobiologiePage() {
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
            La Géobiologie
          </h1>
          <p className="mt-4 text-ink-soft">
            L&apos;étude des relations de l&apos;environnement avec le Vivant.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="La discipline"
              title="Une discipline au service de l'habitat sain"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              La géobiologie traite des relations de l&apos;environnement, des constructions et
              des modes de vie avec le Vivant. Le géobiologue mène une enquête sur le terrain,
              s&apos;appuie sur l&apos;observation et la détection bio-sensible pour identifier
              les perturbations d&apos;un lieu.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Notre corps agit comme une antenne, à la fois émettrice et réceptrice, aux ondes qui
              nous environnent. La formation invite à comprendre cet équilibre entre courants
              électro-telluriques et atmosphériques pour mieux le restaurer.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-forest-900">
              Quand faire appel à un géobiologue ?
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>✓ Avant une construction</li>
              <li>✓ Avant un achat immobilier</li>
              <li>✓ Pour mesurer une pollution électromagnétique</li>
              <li>✓ Pour l&apos;aménagement d&apos;un espace professionnel</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-forest-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Le programme"
            title="14 modules pour découvrir, comprendre, ressentir, partager"
            description="Un module mensuel, sans prérequis, alternant théorie, pratique, détection et harmonisation."
          />
          <ModuleList modules={modules} />
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Objectifs"
              title="Ce que vous développerez"
              description="Une familiarisation progressive aux techniques de détection, un ressenti affiné et une meilleure reconnaissance des déséquilibres pour rétablir l'harmonie d'un lieu."
            />
          </div>
          <PracticalInfo
            items={[
              { label: "Tarif", value: "1900 € (14 modules sur 15 jours dans l'année)" },
              { label: "Inclus", value: "Cours, supports, outils niveau 1" },
              { label: "Non inclus", value: "Repas, hébergement" },
              { label: "Accueil", value: "8h30" },
              { label: "Horaires", value: "9h-12h30 / 14h-17h30" },
              { label: "Lieu", value: "Centre Xian, La Haute Jeannière, 49220 Thorigné-d'Anjou" },
            ]}
            pdfProgramme="/documents/programme-geobiologie-2026.pdf"
            pdfInscription="/documents/inscription-geobiologie-2026.pdf"
          />
        </Container>
      </section>
    </>
  );
}
