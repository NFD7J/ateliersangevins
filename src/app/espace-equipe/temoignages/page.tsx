import Link from "next/link";
import { Container } from "@/components/ui/container";
import { categoryLabels } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/app/espace-equipe/logout-button";
import { DeleteAvisButton } from "@/components/admin/delete-avis-button";

export const metadata = {
  title: "Gestion des témoignages",
  robots: { index: false, follow: false },
};

export default async function TemoignagesDashboardPage() {
  const session = await auth();
  const temoignages = await prisma.avis.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <Container className="py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-soft">Connecté en tant que {session?.user?.name}</p>
          <h1 className="font-display text-3xl font-semibold text-forest-900">Témoignages</h1>
          <div className="mt-3 flex gap-4 text-sm">
            <Link href="/espace-equipe/articles" className="text-ink-soft hover:text-forest-700">
              Articles
            </Link>
            <Link href="/espace-equipe/agenda" className="text-ink-soft hover:text-forest-700">
              Agenda
            </Link>
            <span className="font-semibold text-forest-700">Témoignages</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/espace-equipe/temoignages/nouveau"
            className="rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
          >
            + Nouveau témoignage
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-forest-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-forest-100 text-ink-soft">
            <tr>
              <th className="px-5 py-3 font-medium">Nom</th>
              <th className="px-5 py-3 font-medium">Témoignage</th>
              <th className="px-5 py-3 font-medium">Catégories</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {temoignages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  Aucun témoignage pour le moment.
                </td>
              </tr>
            )}
            {temoignages.map((t) => (
              <tr key={t.id} className="border-b border-forest-50 last:border-none">
                <td className="px-5 py-4 font-medium text-forest-900">{t.name}</td>
                <td className="max-w-xs px-5 py-4 text-ink-soft">
                  <span className="line-clamp-2">{t.avis}</span>
                </td>
                <td className="px-5 py-4 text-ink-soft">
                  {t.formation.map((c) => categoryLabels[c]).join(", ") || "—"}
                </td>
                <td className="px-5 py-4 text-ink-soft">{formatDate(t.date)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/espace-equipe/temoignages/${t.id}`}
                      className="text-sm font-medium text-forest-700 hover:text-forest-900"
                    >
                      Modifier
                    </Link>
                    <DeleteAvisButton id={t.id} />
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
