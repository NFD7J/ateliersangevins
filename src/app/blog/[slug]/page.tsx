import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { categoryLabels } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

const getArticle = cache(async (slug: string) => {
  try {
    return await prisma.article.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article || !article.published) notFound();

  return (
    <article>
      {article.coverImage ? (
        <Image
          src={article.coverImage}
          alt={article.title}
          width={1200}
          height={384}
          priority
          className="h-72 w-full object-cover sm:h-96"
        />
      ) : (
        <PlaceholderImage icon="📰" className="h-72 w-full sm:h-96" />
      )}

      <Container className="max-w-3xl py-16">
        <Link href="/blog" className="text-sm font-semibold text-forest-700 hover:text-forest-900">
          ← Tous les articles
        </Link>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {article.categories.map((c) => (
            <Badge key={c}>{categoryLabels[c]}</Badge>
          ))}
        </div>

        <h1 className="mt-4 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-3 text-sm text-ink-soft">
          Par {article.author.name} · {formatDate(article.createdAt)}
        </p>

        <div className="prose-article mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        </div>
      </Container>
    </article>
  );
}
