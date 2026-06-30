import Link from "next/link";
import { Container } from "@/components/ui/container";
import { formatDateRange } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/app/espace-equipe/logout-button";
import { DeleteEventButton } from "@/components/admin/delete-event-button";

export const metadata = {
  title: "Gestion de l'agenda",
  robots: { index: false, follow: false },
};

export default async function AgendaDashboardPage() {
  const session = await auth();
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <Container className="py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-soft">Connecté en tant que {session?.user?.name}</p>
          <h1 className="font-display text-3xl font-semibold text-forest-900">Agenda</h1>
          <div className="mt-3 flex gap-4 text-sm">
            <Link href="/espace-equipe/articles" className="text-ink-soft hover:text-forest-700">
              Articles
            </Link>
            <span className="font-semibold text-forest-700">Agenda</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/espace-equipe/agenda/nouveau"
            className="rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
          >
            + Nouvel événement
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-forest-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-forest-100 text-ink-soft">
            <tr>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Titre</th>
              <th className="px-5 py-3 font-medium">Catégorie</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  Aucun événement pour le moment.
                </td>
              </tr>
            )}
            {events.map((event) => (
              <tr key={event.id} className="border-b border-forest-50 last:border-none">
                <td className="px-5 py-4 text-ink-soft">
                  {formatDateRange(event.date, event.endDate)}
                </td>
                <td className="px-5 py-4 font-medium text-forest-900">{event.title}</td>
                <td className="px-5 py-4 text-ink-soft">{event.category}</td>
                <td className="px-5 py-4">
                  <span
                    className={
                      event.published
                        ? "rounded-full bg-forest-100 px-2.5 py-1 text-xs font-medium text-forest-700"
                        : "rounded-full bg-stone-deep px-2.5 py-1 text-xs font-medium text-ink-soft"
                    }
                  >
                    {event.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/espace-equipe/agenda/${event.id}`}
                      className="text-sm font-medium text-forest-700 hover:text-forest-900"
                    >
                      Modifier
                    </Link>
                    <DeleteEventButton id={event.id} />
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
