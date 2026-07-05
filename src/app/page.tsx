import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Badge } from "@/components/ui/badge";
import { domains, contact } from "@/lib/site-data";
import { categoryLabels } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

async function getLatestArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

// Les deux parcours principaux mis en avant sur la page d'accueil.
const MAIN_DOMAIN_SLUGS = ["geobiologie", "magnetisme"];

export default async function HomePage() {
  const latestArticles = await getLatestArticles();
  const mainDomains = domains.filter((domain) =>
    MAIN_DOMAIN_SLUGS.includes(domain.slug)
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/heros.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-forest-900/55" />
        </div>
        <Container className="flex min-h-[34rem] flex-col items-start justify-center py-24 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-300">
            Depuis 2005, à Daumeray
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            LES ATELIERS ANGEVINS
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-50">
            École de Thérapies Énergétiques et de la Géobiologie
            <br />
            Deux parcours d&#39;excellence – Deux spécialisations
            <br />
            Praticien en Thérapies Énergétiques Intégratives
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/programmes"
              className="rounded-full bg-terracotta-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-600"
            >
              Découvrir nos programmes
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Nous contacter
            </Link>
          </div>
        </Container>
      </section>

      {/* Domaines */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Nos domaines"
            title="Deux parcours d&#39;excellence – et des Ateliers complémentaires"
            description="Des ateliers, formations et accompagnements pensés pour découvrir ou approfondir chaque thématique, à votre rythme."
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {mainDomains.map((domain) => (
              <Link
                key={domain.slug}
                href={`/programmes/${domain.slug}`}
                className="group rounded-2xl border border-forest-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-4xl">{domain.icon}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-forest-900">
                  {domain.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {domain.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-forest-600 group-hover:text-forest-800">
                  En savoir plus →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/programmes#ateliers-complementaires"
              className="rounded-full border border-forest-300 px-6 py-3 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-100"
            >
              Voir les ateliers complémentaires →
            </Link>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="bg-forest-100 py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative h-100 w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/mission.jpg"
              alt="Marie et Jean-Pierre Brisseau, fondateurs de l'association Les Ateliers Angevins"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover object-bottom"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Notre mission"
              title="Plus de 20 ans de transmission et d&#39;expertise"
              description="Depuis 2005, Les Ateliers Angevins forment des praticiens en géobiologie et en thérapies énergétiques grâce à un
              enseignement exigeant, fondé sur l&#39;expérience, la pratique et la transmission. 
              Notre équipe de formateurs partage un même engagement : accompagner chaque étudiants dans l&#39;acquisition de
              compétences fiables, d&#39;une pratique éthique et d&#39;une véritable autonomie."
            />
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              <li>✓ Des parcours de formation complets et structurés</li>
              <li>✓ Des ateliers pour enrichir et perfectionner ses connaissances</li>
              <li>✓ Une équipe en géobiologie reconnue et accréditée par la Confédération Nationale de Géobiologie</li>
            </ul>
            <Link
              href="/a-propos"
              className="mt-8 inline-flex items-center font-semibold text-forest-700 hover:text-forest-900"
            >
              Découvrir l&apos;association →
            </Link>
          </div>
        </Container>
      </section>

      {/* Derniers articles */}
      {latestArticles.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Blog" title="Nos derniers articles" />
              <Link href="/blog" className="font-semibold text-forest-700 hover:text-forest-900">
                Tous les articles →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {latestArticles.map((article: any, i: any) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {article.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <PlaceholderImage icon="📰" variant={i} className="h-44 w-full" />
                  )}
                  <div className="p-5">
                    {article.categories[0] && (
                      <Badge>{categoryLabels[article.categories[0] as keyof typeof categoryLabels]}</Badge>
                    )}
                    <h3 className="mt-3 font-display text-lg font-semibold text-forest-900 group-hover:text-forest-700">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{formatDate(article.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Portes ouvertes */}
      <section className="bg-forest-900 py-16 text-white">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-semibold">Portes ouvertes 2026</h2>
          <p className="max-w-xl text-forest-100">
            Venez découvrir le programme 2026 et rencontrer l&apos;équipe lors de notre journée
            portes ouvertes. Une occasion privilégiée pour poser vos questions et échanger avec
            les formateurs.
          </p>
          <Link
            href="/agenda"
            className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-gold-300"
          >
            Voir les dates de l&apos;agenda
          </Link>
        </Container>
      </section>

      {/* Coordonnées rapides */}
      <section className="py-16">
        <Container className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Une question ?
          </p>
          <p className="text-ink-soft">
            {contact.phones.map((p) => `${p.name} : ${p.number}`).join("  ·  ")}
          </p>
          <p className="text-ink-soft">{contact.emails[0]}</p>
        </Container>
      </section>
    </>
  );
}
