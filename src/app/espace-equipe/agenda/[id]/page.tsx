import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { EventForm } from "@/components/admin/event-form";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Modifier l'événement",
  robots: { index: false, follow: false },
};

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) notFound();

  return (
    <Container className="max-w-3xl py-12">
      <h1 className="font-display text-3xl font-semibold text-forest-900">Modifier l&apos;événement</h1>
      <div className="mt-8">
        <EventForm event={event} />
      </div>
    </Container>
  );
}
