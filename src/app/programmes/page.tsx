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
      "Une formation complète alliant les fondamentaux du magnétisme, des thérapies vibratoires et de la thérapie par les formes, afin d'acquérir des compétences solides et de développer une pratique énergétique rigoureuse, cohérente et structurée.",
    pdf: "/documents/programme-therapies-energetiques-2026.pdf",
  },
];

const complementaryWorkshops = [
  {
    id: "sourcellerie",
    href: "/programmes/sourcellerie",
    title: "Sourcellerie",
    icon: "💧",
    description:
      "Initiation et perfectionnement à la détection de l'eau souterraine grâce à des outils simples et à une sensibilité affinée par la pratique.",
  },
  {
    id: "sylvotherapie",
    href: "/programmes/sylvotherapie",
    title: "Sylvothérapie",
    icon: "🌳",
    description:
      "Des sorties en forêt pour se reconnecter à la nature : marche consciente, respiration et exercices de reconnexion énergétique au contact des arbres.",
  },
  {
    id: "radiesthesie",
    href: "/programmes/radiesthesie",
    title: "Radiesthésie",
    icon: "📡",
    description:
    "La radiesthésie est une pratique de détection bio-sensible utilisant des outils tels que le pendule ou la baguette, permettant d'explorer des informations non perceptibles par les sens habituels."
  },
  {
    id: "traces-des-batisseurs",
    href: "/programmes/traces-des-batisseurs",
    title: "Tracés des bâtisseurs",
    icon: "📐",
    description:
      "Les tracés des bâtisseurs sont des techniques géométriques anciennes utilisées pour harmoniser un lieu, en s'appuyant sur les tracés régulateurs employés depuis des siècles dans l'architecture sacrée.",
  },
  {
    id: "mandala",
    href: "/programmes/mandala",
    title: "Mandala",
    icon: "🌀",
    description:
      "Le mandala est un symbole spirituel et rituel représentant l'univers dans les traditions hindoues et bouddhistes. Il est utilisé comme outil de méditation et d'expression artistique, favorisant la concentration, l'équilibre intérieur et la créativité.",
  },
  {
    id: "acupressure",
    href: "/programmes/acupressure",
    title: "Acupressure",
    icon: "💆‍♂️",
    description:
      "L'acupressure repose sur la stimulation de points spécifiques du corps pour favoriser le bien-être et la relaxation. Elle utilise des techniques de pression et de massage pour améliorer la circulation de l'énergie et soulager les tensions.",
  }
];

const detailHrefBySlug: Record<string, string> = {
  radiesthesie: "/programmes/radiesthesie",
  "traces-des-batisseurs": "/programmes/traces-des-batisseurs",
};

export default function ProgrammesPage() {
  return (
    <>
      <section className=" py-16">
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
      <section className="py-20 bg-forest-100">
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
      <section id="ateliers-complementaires" className="scroll-mt-24  py-20">
        <Container>
          <SectionHeading
            eyebrow="Ateliers complémentaires"
            title="Des ateliers pour enrichir et perfectionner vos connaissances"
            description="Tout au long de l'année, Les Ateliers Angevins proposent également des ateliers complémentaires, ouverts à celles et ceux qui souhaitent découvrir de nouvelles disciplines, perfectionner leur pratique ou approfondir des connaissances spécifiques au travers d'une pédagogie mêlant théorie, pratique et échanges."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {complementaryWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                id={workshop.id}
                className="scroll-mt-24 rounded-2xl border border-forest-100 bg-white p-8 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-forest-900">
                  {workshop.icon} {workshop.title}
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
              href="/documents/inscription-modules-complementaires-2026.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-forest-300 px-5 py-2.5 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-100"
            >
              Télécharger le bulletin d&apos;inscription
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
