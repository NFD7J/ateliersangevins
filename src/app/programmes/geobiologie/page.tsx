import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";
import { ModuleList, type Module } from "@/components/formations/module-list";

export const metadata: Metadata = {
  title: "Formation Géobiologie & Habitat Sain",
  description:
    "Formation en géobiologie : 120 heures, 15 modules progressifs pour apprendre à détecter et harmoniser les perturbations d'un lieu et retrouver un habitat sain.",
};

const modules: Module[] = [
  {
    title: "Les fondamentaux de la géobiologie",
    points: [
      "Comprendre les principes énergétiques du vivant et de l'habitat",
      "Découvrir les bases de la géobiologie",
      "Déontologie, éthique et cadre professionnel",
      "Les premières étapes d'une intervention",
    ],
  },
  {
    title: "Radiesthésie et outils de détection",
    points: [
      "Découverte des différents outils de détection",
      "Initiation à la radiesthésie",
      "Évaluation de l'ambiance globale d'un lieu",
      "Premiers protocoles de mesure",
    ],
  },
  {
    title: "Développer ses perceptions",
    points: [
      "Sensibilisation aux perceptions biosensibles",
      "Développement des capacités de ressenti",
      "Comprendre et utiliser la notion de polarité",
    ],
  },
  {
    title: "Géologie du sous-sol et influences géopathogènes",
    points: [
      "Lecture énergétique du sous-sol",
      "Détection des failles, diaclases, veines d'eau et discontinuités",
      "Comprendre leurs effets sur le vivant",
      "Méthodes d'harmonisation adaptées",
    ],
  },
  {
    title: "Qualité de l'environnement intérieur",
    points: [
      "Qualité de l'air et de l'eau",
      "Principaux polluants de l'habitat",
      "Le radon : mesure, réglementation et recommandations",
      "Conseils d'amélioration pour les occupants",
    ],
  },
  {
    title: "Champs électromagnétiques basse fréquence",
    points: [
      "Comprendre les champs électriques et magnétiques",
      "Identifier les sources de perturbations",
      "Réaliser les principales mesures",
      "Normes et solutions correctives",
    ],
  },
  {
    title: "Champs électromagnétiques haute fréquence",
    points: [
      "Téléphonie mobile, Wi-Fi et objets connectés",
      "Comprendre les différentes fréquences",
      "Évaluer leur impact sur le vivant",
      "Mesures, normes et préconisations",
    ],
  },
  {
    title: "Habitat sain",
    points: [
      "Les principes de l'habitat sain",
      "Les matériaux de construction",
      "Implantation, orientation et organisation énergétique d'un lieu",
      "Méridienne, exposition et environnement",
    ],
  },
  {
    title: "Étude des formes",
    points: [
      "Les champs de cohérence",
      "Les EIFS et leurs caractéristiques",
      "Influence des formes sur le vivant",
      "Identification et corrections éventuelles",
    ],
  },
  {
    title: "Phénomènes particuliers",
    points: [
      "Empreintes énergétiques",
      "Objets chargés",
      "Présences et perturbations subtiles",
      "Protocoles d'identification et d'harmonisation",
    ],
  },
  {
    number: "11-12",
    title: "Initiation au Feng Shui traditionnel",
    points: [
      "Les principes fondamentaux du Feng Shui traditionnel",
      "Comprendre la circulation des énergies dans l'habitat",
      "Optimiser l'équilibre énergétique d'un lieu",
    ],
  },
  {
    number: "13",
    title: "Tracés régulateurs – Niveau 1",
    points: [
      "Les fondements des tracés régulateurs",
      "Les différentes formes et leurs orientations",
      "La respiration de la Terre",
      "Premiers outils d'harmonisation",
    ],
  },
  {
    number: "14",
    title: "Tracés régulateurs – Niveau 2",
    points: [
      "Applications avancées",
      "Études de cas",
      "Duplication et module solaire",
      "Mise en œuvre d'un quadrilatère solsticial",
    ],
  },
  {
    number: "15",
    title: "Diagnostic complet et harmonisation d'un lieu",
    points: [
      "Protocole d'intervention",
      "Méthodologie de diagnostic",
      "Mise en pratique sur un cas réel",
      "Recherche et application des différentes techniques d'harmonisation",
    ],
  },
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
            title="Programme de la formation en Géobiologie & Habitat Sain"
            description="120 heures de formation – 15 modules progressifs."
          />
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            Cette formation suit le tronc commun défini par la Confédération
            Nationale de Géobiologie. Elle associe apports théoriques, mises en
            pratique sur le terrain et développement des capacités
            d&apos;observation afin de former des praticiens capables de réaliser
            un diagnostic global d&apos;un lieu de vie.
          </p>
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
          <div className="space-y-4">
            <PracticalInfo
              items={[
                { label: "Durée", value: "120 heures" },
                { label: "Organisation", value: "15 modules progressifs" },
                { label: "Tarif", value: "1900 €" },
                { label: "Inclus", value: "Cours, supports, outils niveau 1" },
                { label: "Non inclus", value: "Repas, hébergement" },
                { label: "Accueil", value: "8h30" },
                { label: "Horaires", value: "9h-12h30 / 13h30-18h00" },
                { label: "Lieu", value: "Centre Xian, La Haute Jeannière, 49220 Thorigné-d'Anjou" },
              ]}
              pdfProgramme="/documents/programme-geobiologie-2026.pdf"
              pdfInscription="/documents/inscription-geobiologie-2026.pdf"
            />
            <ul className="space-y-2 px-1 text-xs leading-relaxed text-ink-soft">
              <li>
                La seconde partie du dernier module est réalisée sur site (hors
                Centre Xian).
              </li>
              <li>
                Les modules constituent un parcours pédagogique complet et ne
                peuvent être suivis séparément.
              </li>
              <li>
                Les Ateliers Angevins se réservent le droit d&apos;apporter toute
                modification utile au contenu du programme en fonction des
                évolutions pédagogiques.
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
