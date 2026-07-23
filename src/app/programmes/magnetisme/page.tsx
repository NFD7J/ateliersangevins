import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";
import { ModuleList, type Module } from "@/components/formations/module-list";

export const metadata: Metadata = {
  title: "Formation Magnétisme & Thérapies énergétiques",
  description:
    "Formation annuelle en magnétisme et thérapies énergétiques : 100 heures, 13 modules pour développer son ressenti, maîtriser des protocoles de soin et accompagner vers le mieux-être.",
};

const modules: Module[] = [
  {
    title:
      "Découverte des principes énergétiques du corps humain & art du ressenti et radiesthésie",
  },
  {
    title: "Développer sa sensibilité énergétique. Comment se protéger, se nettoyer",
  },
  {
    title:
      "Les possibilités et les limites du magnétisme. Pratique de base et équilibrage rapide pour des situations simples",
  },
  {
    title:
      "Détection et libération de présences parasites dans les champs d'énergie — Formes et outils de forme, niveau 1",
  },
  {
    title:
      "Détection et libération de présences parasites dans les champs d'énergie — Formes et outils de forme, niveau 2",
  },
  {
    title:
      "Détection et libération de présences parasites dans les champs d'énergie — Formes et outils de forme, niveau 3",
  },
  {
    title: "Mise en application de protocoles de soins",
  },
  {
    title: "Dissoudre les blocages énergétiques",
    points: [
      "Les blocages énergétiques : qu'est-ce que c'est ?",
      "D'où viennent-ils ?",
    ],
  },
  {
    title: "Protocoles de dissolution des blocages énergétiques — partie 1",
  },
  {
    title: "Protocoles de dissolution des blocages énergétiques — partie 2",
  },
  {
    title: "Points Knapp, lithothérapie, chromothérapie",
  },
  {
    title: "Initiation aux Fleurs de Bach et autres compléments naturels",
    points: ["Révision et bilan de l'année"],
  },
  {
    title: "Mise en pratique d'une consultation (cas réel) et évaluation",
  },
];

export default function MagnetismePage() {
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
            Magnétisme & Thérapies énergétiques
          </h1>
          <p className="mt-4 text-ink-soft">
            Le magnétisme, la chromothérapie et la thérapie par les formes au service
            de l&apos;équilibre du vivant.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="La discipline"
              title="Comprendre les équilibres du vivant"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Le corps, les dimensions énergétiques, l&#39;esprit et l&#39;âme interagissent en permanence. Lorsque cet équilibre est
              perturbé, il devient essentiel de disposer d&#39;outils adaptés pour mieux comprendre ces interactions et agir avec
              justesse.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Cette formation propose un parcours complet autour du magnétisme, de la chromothérapie, de la thérapie par les
              formes et de différents protocoles énergétiques. Vous développerez des compétences solides, une pratique structurée
              et une approche professionnelle fondée sur l&#39;expérience, la rigueur et la transmission.
            </p>
          </div>
          <div className="self-center rounded-2xl border border-forest-100 bg-forest-50 p-8 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-forest-900">
              À qui s&apos;adresse cette formation ?
            </h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
              {[
                "aux personnes en reconversion vers les métiers du bien-être",
                "aux praticiens souhaitant enrichir et structurer leur pratique énergétique",
                "à toute personne souhaitant développer son ressenti et sa sensibilité énergétique",
                "à celles et ceux qui recherchent une approche progressive, éthique et centrée sur la personne",
              ].map((profil) => (
                <li key={profil} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-600 text-xs font-bold text-white">
                    ✓
                  </span>
                  <span>{profil}</span>
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
                  description="Développer votre ressenti énergétique, structurer votre pratique et acquérir des protocoles concrets pour accompagner les personnes vers le mieux-être."
                />
                <p className="mt-6 leading-relaxed text-ink-soft w-[60%]">
                  À l&#39;issue du cursus, vous serez en mesure d'exercer en tant que 
                  practicien en thérapie énergétique, en mobilisant les outils et les approches enseignés tout au long de la formation :
                </p>
                <ul className="mt-4 space-y-3 leading-relaxed text-ink-soft">
                  {[
                    "développer votre ressenti et votre sensibilité énergétique",
                    "savoir vous protéger et vous nettoyer sur le plan énergétique",
                    "connaître les possibilités et les limites du magnétisme",
                    "détecter et libérer les blocages et présences parasites dans les champs d'énergie",
                    "mettre en œuvre différents protocoles de soin énergétique",
                    "intégrer la chromothérapie, la lithothérapie, les Fleurs de Bach et les compléments naturels",
                    "mener une consultation complète et accompagner une personne vers le mieux-être",
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
                  title="Une formation complète pour découvrir, pratiquer et accompagner"
                  description="100 heures de formation – 13 modules."
                />

                <ModuleList modules={modules} />
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24">
              <PracticalInfo
                items={[
                  { icon: "⏱️", label: "Durée", value: "100 heures" },
                  { icon: "📚", label: "Organisation", value: "13 modules" },
                  { icon: "💶", label: "Tarif", value: "1650 €" },
                  { icon: "✅", label: "Prérequis", value: "Aucun" },
                  { icon: "🚫", label: "Non inclus", value: "Repas, hébergement" },
                  { icon: "👋", label: "Accueil", value: "8h30" },
                  { icon: "🕘", label: "Horaires", value: "9h-12h30 / 13h30-18h00" },
                  { icon: "📍", label: "Lieu", value: "Centre Xian, La Haute Jeannière, 49220 Thorigné-d'Anjou" },
                ]}
                pdfProgramme="/documents/programme-therapie-energetique-2026.pdf"
                pdfInscription="/documents/inscription-therapie-energetique-2026.pdf"
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

      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Points forts" title="Les points forts de la formation" />
          <div className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {[
              "Plus de 100 heures de formation",
              "Plus de 20 protocoles pratiques",
              "Alternance permanente entre théorie et pratique",
              "Petit groupe favorisant un accompagnement personnalisé",
              "Formation progressive",
              "Support pédagogique complet",
              "Certification de fin de cursus",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-5 w-5 shrink-0 fill-terracotta-500"
                >
                  <path d="M8.2 14.3 4.4 10.5l1.4-1.4 2.4 2.4 6-6 1.4 1.4z" />
                </svg>
                <p className="text-base font-medium leading-snug text-forest-800">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-forest-100 bg-forest-100 p-8">
            <h3 className="font-display text-xl font-semibold text-forest-900">Notre engagement</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Former des praticiens compétents, responsables et respectueux de la personne, capables de
              mettre en œuvre des techniques énergétiques dans une démarche de bien-être, avec éthique,
              discernement et professionnalisme.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}