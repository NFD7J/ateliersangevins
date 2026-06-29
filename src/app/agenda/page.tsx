import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { contact } from "@/lib/site-data";
import { cn, formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Sorties touristiques et énergétiques, stages et portes ouvertes des Ateliers Angevins.",
};

export default async function AgendaPage() {
  const agendaEvents = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  return (
    <>
      <section className="bg-forest-50 py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Agenda
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Sorties, stages et événements à venir
          </h1>
          <p className="mt-4 text-ink-soft">
            Retrouvez ici les prochaines sorties touristiques et énergétiques, stages et journées
            portes ouvertes. Le calendrier complet est également partagé sur notre page Facebook.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Prochainement" title="Les prochains rendez-vous" />
          <ol className="mt-10 space-y-6">
            {agendaEvents.map((event) => {
              const isPast = new Date(event.date) < new Date();

              return (
                <li
                  key={event.title + event.date}
                  className={cn(
                    "flex flex-col gap-4 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:gap-8",
                    isPast && "opacity-60"
                  )}
                >
                  <div
                    className={cn(
                      "flex shrink-0 flex-col items-center justify-center rounded-xl px-5 py-3 text-white",
                      isPast ? "bg-ink-soft" : "bg-forest-600"
                    )}
                  >
                    <span className="text-2xl font-semibold">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs uppercase tracking-wide">
                      {new Date(event.date).toLocaleDateString("fr-FR", { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge>{event.category}</Badge>
                      {isPast && <Badge className="bg-ink-soft/20 text-ink-soft">Terminé</Badge>}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-forest-900">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{formatDate(event.date)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{event.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="bg-forest-900 py-16 text-white">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-2xl font-semibold">Une question sur une date ?</h2>
          <p className="text-forest-100">
            Contactez-nous directement : {contact.phones[0].name} au {contact.phones[0].number}
          </p>
        </Container>
      </section>
    </>
  );
}
