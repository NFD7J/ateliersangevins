import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCategory } from "@prisma/client";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { categoryLabels, categoryOptions } from "@/lib/categories";
import { formatDate, cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles et actualités des Ateliers Angevins : géobiologie, thérapies énergétiques, sourcellerie, sylvothérapie et plus encore.",
};

async function getArticles(category?: string) {
  try {
    return await prisma.article.findMany({
      where: {
        published: true,
        ...(category ? { categories: { has: category as ArticleCategory } } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const articles = await getArticles(cat);

  return (
    <>
      <section className="py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Blog
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Articles & actualités
          </h1>
          <p className="mt-4 text-ink-soft">
            Conseils, retours d&apos;expérience et actualités de l&apos;association autour de la
            géobiologie et des thérapies énergétiques.
          </p>
        </Container>
      </section>

      <section className="bg-forest-100 py-16">
        <Container>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                !cat
                  ? "border-forest-600 bg-forest-600 text-white"
                  : "border-forest-200 text-ink-soft hover:border-forest-400"
              )}
            >
              Tous
            </Link>
            {categoryOptions.map((option: { value: string; label: string }) => (
              <Link
                key={option.value}
                href={`/blog?cat=${option.value}`}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  cat === option.value
                    ? "border-forest-600 bg-forest-600 text-white"
                    : "border-forest-200 text-ink-soft hover:border-forest-400"
                )}
              >
                {option.label}
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <p className="mt-12 text-center text-ink-soft">
              Aucun article publié pour le moment{cat ? " dans cette catégorie" : ""}.
            </p>
          ) : (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article: any, i: any) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center"
                        loading="eager"
                      />
                    ) : (
                      <PlaceholderImage icon="📰" variant={i} className="h-48 w-full" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {article.categories.map((c: string) => (
                        <Badge key={c}>{categoryLabels[c as keyof typeof categoryLabels]}</Badge>
                      ))}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-semibold text-forest-900 group-hover:text-forest-700">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft line-clamp-2">{article.excerpt}</p>
                    <p className="mt-3 text-xs text-ink-soft">{formatDate(article.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
