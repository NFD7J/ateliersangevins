import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ArticleForm } from "@/components/admin/article-form";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Modifier l'article",
  robots: { index: false, follow: false },
};

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) notFound();

  return (
    <Container className="max-w-3xl py-12">
      <h1 className="font-display text-3xl font-semibold text-forest-900">Modifier l&apos;article</h1>
      <div className="mt-8">
        <ArticleForm article={article} />
      </div>
    </Container>
  );
}
