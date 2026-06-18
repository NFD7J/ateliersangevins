import Link from "next/link";
import { Container } from "@/components/ui/container";
import { categoryLabels } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/app/espace-equipe/logout-button";
import { DeleteArticleButton } from "@/components/admin/delete-article-button";

export const metadata = {
  title: "Gestion des articles",
  robots: { index: false, follow: false },
};

export default async function ArticlesDashboardPage() {
  const session = await auth();
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Container className="py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-soft">Connecté en tant que {session?.user?.name}</p>
          <h1 className="font-display text-3xl font-semibold text-forest-900">Articles</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/espace-equipe/articles/nouveau"
            className="rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
          >
            + Nouvel article
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-forest-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-forest-100 text-ink-soft">
            <tr>
              <th className="px-5 py-3 font-medium">Titre</th>
              <th className="px-5 py-3 font-medium">Catégories</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  Aucun article pour le moment.
                </td>
              </tr>
            )}
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-forest-50 last:border-none">
                <td className="px-5 py-4 font-medium text-forest-900">{article.title}</td>
                <td className="px-5 py-4 text-ink-soft">
                  {article.categories.map((c) => categoryLabels[c]).join(", ") || "—"}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={
                      article.published
                        ? "rounded-full bg-forest-100 px-2.5 py-1 text-xs font-medium text-forest-700"
                        : "rounded-full bg-stone-deep px-2.5 py-1 text-xs font-medium text-ink-soft"
                    }
                  >
                    {article.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-5 py-4 text-ink-soft">{formatDate(article.createdAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/espace-equipe/articles/${article.id}`}
                      className="text-sm font-medium text-forest-700 hover:text-forest-900"
                    >
                      Modifier
                    </Link>
                    <DeleteArticleButton id={article.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
