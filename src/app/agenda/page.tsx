import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contact } from "@/lib/site-data";
import { prisma } from "@/lib/prisma";
import { AgendaList } from "@/components/agenda/agenda-list";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Sorties touristiques et énergétiques, stages et portes ouvertes des Ateliers Angevins.",
};

export default async function AgendaPage() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const agendaEvents = await prisma.event.findMany({
    where: { published: true, date: { gte: oneYearAgo } },
    orderBy: { date: "desc" },
  });

  return (
    <>
      <section className="bg-forest-100 py-16">
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
          <AgendaList events={agendaEvents} />
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
