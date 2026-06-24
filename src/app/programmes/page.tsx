import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { domains } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Formations annuelles en géobiologie, magnétisme et thérapies énergétiques, ateliers complémentaires : sourcellerie, sylvothérapie et plus encore.",
};

const mainPrograms = [
  {
    id: "geobiologie",
    href: "/programmes/geobiologie",
    title: "Formation Géobiologie",
    duration: "120 heures",
    description:
      "Une formation complète, théorique et pratique, pour apprendre à identifier les perturbations d'un lieu (réseaux telluriques, ondes électromagnétiques, pollutions diverses) et restaurer un habitat sain.",
    pdf: "/documents/programme-geobiologie-2026.pdf",
  },
  {
    id: "magnetisme",
    href: "/programmes/magnetisme",
    title: "Formation Magnétisme & Thérapies énergétiques",
    duration: "Programme annuel",
    description:
      "Des bases solides en magnétisme, chromothérapie et thérapie par les formes, pour développer une pratique de soin énergétique sérieuse et structurée.",
    pdf: "/documents/programme-therapies-energetiques-2026.pdf",
  },
];

const complementaryWorkshops = [
  {
    id: "sourcellerie",
    href: "/programmes/sourcellerie",
    title: "Sourcellerie",
    description:
      "Initiation et perfectionnement à la détection de l'eau souterraine grâce à des outils simples et à une sensibilité affinée par la pratique.",
  },
  {
    id: "sylvotherapie",
    href: "/programmes/sylvotherapie",
    title: "Sylvothérapie",
    description:
      "Des sorties en forêt pour se reconnecter à la nature : marche consciente, respiration et exercices de reconnexion énergétique au contact des arbres.",
  },
];

const detailHrefBySlug: Record<string, string> = {
  radiesthesie: "/programmes/radiesthesie",
  "traces-des-batisseurs": "/programmes/traces-des-batisseurs",
};

export default function ProgrammesPage() {
  return (
    <>
      <section className="bg-forest-50 py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Programmes
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Des formations pour progresser, à votre rythme
          </h1>
          <p className="mt-4 text-ink-soft">
            Nous proposons diverses formations pour découvrir de nouveaux thèmes ou approfondir
            vos connaissances, avec des éléments de base à la fois théoriques et pratiques.
          </p>
        </Container>
      </section>

      {/* Programmes annuels */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Programmes annuels" title="Nos deux formations principales" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {mainPrograms.map((program) => (
              <div
                key={program.id}
                id={program.id}
                className="scroll-mt-24 rounded-2xl border border-forest-100 bg-white p-8 shadow-sm"
              >
                <span className="inline-flex rounded-full bg-terracotta-50 px-3 py-1 text-xs font-semibold text-terracotta-600">
                  {program.duration}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-forest-900">
                  {program.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{program.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={program.href}
                    className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
                  >
                    Voir le détail
                  </Link>
                  <a
                    href={program.pdf}
                    className="text-sm font-semibold text-forest-700 hover:text-forest-900"
                    target="_blank"
                  >
                    Programme (PDF)
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Ateliers complémentaires */}
      <section id="ateliers-complementaires" className="scroll-mt-24 bg-forest-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Ateliers complémentaires"
            title="Sourcellerie et sylvothérapie"
            description="Deux ateliers accessibles pour découvrir des pratiques complémentaires à nos formations principales."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {complementaryWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                id={workshop.id}
                className="scroll-mt-24 rounded-2xl border border-forest-100 bg-white p-8 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-forest-900">
                  {workshop.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{workshop.description}</p>
                <Link
                  href={workshop.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-forest-700 hover:text-forest-900"
                >
                  Voir le détail →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="/documents/bulletin-inscription-2026.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-forest-300 px-5 py-2.5 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-100"
            >
              Télécharger le bulletin d&apos;inscription
            </a>
          </div>
        </Container>
      </section>

      {/* Autres ateliers / domaines */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Autres domaines"
            title="Et bien d'autres pratiques à explorer"
            align="center"
            className="mx-auto"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domains
              .filter((d) => !["geobiologie", "magnetisme", "sourcellerie", "sylvotherapie"].includes(d.slug))
              .map((domain) => (
                <div
                  key={domain.slug}
                  id={domain.slug}
                  className="scroll-mt-24 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm"
                >
                  <span className="text-3xl">{domain.icon}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">
                    {domain.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {domain.description}
                  </p>
                  {detailHrefBySlug[domain.slug] && (
                    <Link
                      href={detailHrefBySlug[domain.slug]}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-forest-700 hover:text-forest-900"
                    >
                      Voir le détail →
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </Container>
      </section>
    </>
  );
}
