import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { categoryLabels } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Témoignages",
  description:
    "Les retours de celles et ceux qui ont suivi les formations et accompagnements des Ateliers Angevins en géobiologie et thérapies énergétiques.",
};

async function getTemoignages() {
  try {
    return await prisma.avis.findMany({ orderBy: { date: "desc" } });
  } catch {
    return [];
  }
}

// Initiales (1 à 2 lettres) à partir du nom, pour l'avatar.
function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function TemoignagesPage() {
  const temoignages = await getTemoignages();

  return (
    <>
      <section className="bg-forest-100 py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Ils nous font confiance
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Témoignages
          </h1>
          <p className="mt-4 text-ink-soft">
            Les retours de celles et ceux qui ont suivi nos formations et accompagnements.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          {temoignages.length === 0 ? (
            <p className="text-center text-ink-soft">Aucun témoignage pour le moment.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {temoignages.map((t) => (
                <figure
                  key={t.id}
                  className="flex flex-col items-center rounded-2xl border border-forest-100 bg-white p-8 text-center shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 font-display text-lg font-semibold text-forest-700">
                    {initials(t.name)}
                  </div>
                  <figcaption className="mt-3 font-semibold text-forest-900">{t.name}</figcaption>
                  {t.formation.length > 0 && (
                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                      {t.formation.map((c) => (
                        <Badge key={c}>{categoryLabels[c]}</Badge>
                      ))}
                    </div>
                  )}

                  <div className="my-5 h-px w-10 bg-forest-100" />

                  <blockquote className="leading-relaxed text-ink-soft">
                    <span aria-hidden className="mr-0.5 font-display text-2xl leading-none text-forest-300">
                      &ldquo;
                    </span>
                    {t.avis}
                    <span aria-hidden className="ml-0.5 font-display text-2xl leading-none text-forest-300">
                      &rdquo;
                    </span>
                  </blockquote>
                </figure>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
