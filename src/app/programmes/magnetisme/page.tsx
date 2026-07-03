import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Formation Magnétisme & Thérapies énergétiques",
  description:
    "Formation annuelle en magnétisme et thérapies énergétiques : 12 modules pour découvrir l'univers énergétique et constituer sa boîte à outils.",
};

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
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
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
        </Container>
      </section>

      <section className="bg-forest-100 py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Le programme"
              title="13 modules pour apprendre, pratiquer et accompagner"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Depuis toujours, l&#39;être humain recherche l&#39;équilibre entre le corps, les émotions et
              l&#39;énergie. Les Ateliers Angevins ont conçu une formation complète permettant d&#39;acquérir
              des techniques énergétiques complémentaires, dans une approche structurée, progressive et
              centrée sur la personne.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Au fil des 13 modules, vous développerez votre ressenti, apprendrez différents protocoles
              énergétiques et intégrerez les compétences nécessaires pour accompagner les personnes dans
              une démarche de mieux-être.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Cette formation s&#39;adresse aussi bien aux personnes en reconversion qu&#39;aux praticiens
              souhaitant enrichir leur pratique.
            </p>
          </div>
          <PracticalInfo
            items={[
              { label: "Durée", value: "Programme annuel, 13 modules" },
              { label: "Prérequis", value: "Aucun" },
              { label: "Format", value: "Théorie et pratique" },
            ]}
            pdfProgramme="/documents/programme-therapies-energetiques.pdf"
            pdfInscription="/documents/bulletin-inscription.pdf"
          />
          </div>

          <div className="mt-14">
            <h3 className="font-display text-2xl font-semibold text-forest-900">
              Le déroulé des 13 modules
            </h3>
            <ol className="mt-6 divide-y divide-forest-100 overflow-hidden rounded-2xl border border-forest-100 bg-white">
              {(
                [
                  { title: "Découverte des principes énergétiques du corps humain & art du ressenti et radiesthésie" },
                  { title: "Développer sa sensibilité énergétique. Comment se protéger, se nettoyer" },
                  { title: "Les possibilités et les limites du magnétisme. Pratique de base et équilibrage rapide pour des situations simples" },
                  { title: "Détection et libération de présences parasites dans les champs d'énergie — Formes et outils de forme, niveau 1" },
                  { title: "Détection et libération de présences parasites dans les champs d'énergie — Formes et outils de forme, niveau 2" },
                  { title: "Détection et libération de présences parasites dans les champs d'énergie — Formes et outils de forme, niveau 3" },
                  { title: "Mise en application de protocoles de soins" },
                  {
                    title: "Dissoudre les blocages énergétiques",
                    details: ["Les blocages énergétiques : qu'est-ce que c'est ?", "D'où viennent-ils ?"],
                  },
                  { title: "Protocoles de dissolution des blocages énergétiques — partie 1" },
                  { title: "Protocoles de dissolution des blocages énergétiques — partie 2" },
                  { title: "Points Knapp, lithothérapie, chromothérapie" },
                  {
                    title: "Initiation aux Fleurs de Bach et autres compléments naturels",
                    details: ["Révision et bilan de l'année"],
                  },
                  { title: "Mise en pratique d'une consultation (cas réel) et évaluation" },
                ] as { title: string; details?: string[] }[]
              ).map((mod, i) => (
                <li key={mod.title} className="flex gap-4 p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-100 font-display text-sm font-semibold text-forest-800">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-forest-900">{mod.title}</p>
                    {mod.details && (
                      <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-ink-soft">
                        {mod.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
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
