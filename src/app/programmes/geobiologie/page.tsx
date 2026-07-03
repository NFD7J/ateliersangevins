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
      <section className="bg-forest-100 py-16">
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
              La géobiologie est une discipline qui étudie l&#39;influence de notre environnement sur le vivant. Elle analyse les interactions
              entre les lieux de vie, les constructions, les phénomènes naturels, les rayonnements et leurs effets sur le bien-être des
              personnes, des animaux et des végétaux.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Véritable démarche d&#39;observation et d&#39;analyse, la géobiologie vise à créer ou restaurer un environnement harmonieux,
              propice à l&#39;équilibre et à la qualité de vie.
              Une approche à la fois sensible et technologique
            </p>
          </div>
          <div className="self-center rounded-2xl border border-forest-100 bg-forest-50 p-8 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-forest-900">
              Quand faire appel à un géobiologue ?
            </h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
              {[
                "avant une construction, pour le choix du terrain et l'implantation du bâtiment",
                "lors de l'achat, de la rénovation ou de l'agrandissement d'un logement",
                "pour évaluer les pollutions électromagnétiques liées aux installations électriques ou à l'environnement",
                "lors de l'aménagement de locaux professionnels, d'entreprises ou d'espaces recevant du public",
                "lorsqu'un lieu semble générer un inconfort persistant ou lorsque l'on souhaite optimiser son cadre de vie ou de travail",
              ].map((raison) => (
                <li key={raison} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-600 text-xs font-bold text-white">
                    ✓
                  </span>
                  <span>{raison}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-forest-100 pt-20 pb-10">
        <div className="ml-8 mr-6 px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_28rem] lg:items-start">
            <div>
              <div className="rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
                <SectionHeading
                  eyebrow="Objectifs"
                  title="Les objectifs de la formation"
                  description="Une familiarisation progressive aux techniques de détection, un ressenti affiné et une meilleure reconnaissance des déséquilibres pour rétablir l'harmonie d'un lieu."
                />
                <p className="mt-6 leading-relaxed text-ink-soft">
                  À l&#39;issue du cursus, vous serez en mesure de :
                </p>
                <ul className="mt-4 space-y-3 leading-relaxed text-ink-soft">
                  {[
                    "maîtriser les principales techniques de détection en géobiologie",
                    "développer votre perception bio-sensible et votre capacité d'analyse",
                    "comprendre les influences naturelles et artificielles de l'environnement sur le vivant",
                    "réaliser un diagnostic géobiologique complet d'un habitat ou d'un terrain",
                    "mettre en œuvre des méthodes d'harmonisation adaptées",
                    "acquérir une méthodologie rigoureuse applicable dans un cadre personnel ou professionnel",
                  ].map((objectif) => (
                    <li key={objectif} className="flex gap-2.5">
                      <span className="shrink-0 text-forest-600">✓</span>
                      <span>{objectif}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 mb-20">
                <SectionHeading
                  eyebrow="Le programme"
                  title="Une formation complète pour comprendre, analyser et harmoniser les lieux de vie"
                  description="120 heures de formation – 15 modules progressifs."
                />
                
                <ModuleList modules={modules} />
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24">
              <PracticalInfo
                items={[
                  { icon: "⏱️", label: "Durée", value: "120 heures" },
                  { icon: "📚", label: "Organisation", value: "15 modules progressifs (1 par mois)" },
                  { icon: "💶", label: "Tarif", value: "1900 €" },
                  { icon: "✅", label: "Prérequis", value: "Aucun" },
                  { icon: "🚫", label: "Non inclus", value: "Repas, hébergement" },
                  { icon: "👋", label: "Accueil", value: "8h30" },
                  { icon: "🕘", label: "Horaires", value: "9h-12h30 / 13h30-18h00" },
                  { icon: "📍", label: "Lieu", value: "Centre Xian, La Haute Jeannière, 49220 Thorigné-d'Anjou" },
                ]}
                pdfProgramme="/documents/programme-geobiologie-2026.pdf"
                pdfInscription="/documents/inscription-geobiologie-2026.pdf"
              />
              <ul className="space-y-2 px-1 text-xs leading-relaxed text-ink-soft">
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
            </aside>

          </div>
        </div>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl text-center">
          <SectionHeading
            eyebrow="Reconnaissance"
            title="Une formation reconnue"
            align="center"
          />
          <p className="mt-4 leading-relaxed text-ink-soft">
            Les Ateliers Angevins sont membres de la <a href="https://www.confederation-geobiologie.fr/" className="text-forest-600">Confédération Nationale de Géobiologie </a> et s&#39;inscrivent dans une démarche de transmission
            fondée sur la rigueur, l&#39;expérience de terrain et le respect du
            vivant.
          </p>
        </Container>
      </section>
    </>
  );
}
