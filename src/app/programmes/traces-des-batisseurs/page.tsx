import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Atelier Tracés des bâtisseurs",
  description:
    "Atelier sur les tracés des bâtisseurs : des outils d'harmonisation d'un lieu inspirés de la géométrie sacrée employée par les architectes et artistes.",
};

export default function TracesDesBatisseursPage() {
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
            Les Tracés des Bâtisseurs
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="L'atelier"
                title="L&#39;harmonie des lieux par la géométrie sacrée"
              />
              <p className="mt-4 leading-relaxed text-ink-soft">
                Les tracés bâtisseurs sont des outils d&#39;harmonisation des lieux inspirés des lois du vivant et des géométries
                présentes dans la nature. Hérités des traditions des bâtisseurs, ils s&#39;appuient sur les tracés régulateurs qui ont guidé
                la conception de nombreux édifices remarquables au fil des siècles.
                Utilisés en géobiologie, ils contribuent à rééquilibrer les énergies d&#39;un lieu, à renforcer son harmonie et à favoriser
                le bien-être de ses occupants, dans le respect de son identité et de son environnement.
              </p>
            </div>
          {/* <div>
            <SectionHeading title="Un atelier accessible à tous" />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Aucun prérequis n&#39;est nécessaire pour participer à cette initiation à la sourcellerie. Que vous soyez débutant,
              curieux ou en recherche de nouvelles perceptions, cet atelier vous permettra de découvrir les bases de cette pratique
              à travers deux axes principaux :
            </p>
            <ul className="mt-4 space-y-3 leading-relaxed text-ink-soft">
              <li className="flex gap-2">
                <span className="shrink-0 text-forest-600">✓</span>
                <span>
                  Développer et affiner vos capacités de perception et votre
                  sensibilité naturelle.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-forest-600">✓</span>
                <span>
                  Apprendre les techniques fondamentales de détection des veines
                  d&#39;eau, de l&#39;estimation de leur profondeur, de leur débit et
                  de l&#39;identification des emplacements propices au forage.
                </span>
              </li>
            </ul>
          </div> */}
            <div className="mx-auto w-full max-w-md">
              <PracticalInfo
                items={[
                  { label: "Coût", value: "125 € par jour" },
                  { label: "Accueil", value: "8h30" },
                  { label: "Lieu", value: "centre XIAN" },
                  { label: "Repas / hébergement", value: "À la charge des participants" },
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
