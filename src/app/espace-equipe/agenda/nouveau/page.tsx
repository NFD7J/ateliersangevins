import { Container } from "@/components/ui/container";
import { EventForm } from "@/components/admin/event-form";

export const metadata = {
  title: "Nouvel événement",
  robots: { index: false, follow: false },
};

export default function NewEventPage() {
  return (
    <Container className="max-w-3xl py-12">
      <h1 className="font-display text-3xl font-semibold text-forest-900">Nouvel événement</h1>
      <div className="mt-8">
        <EventForm />
      </div>
    </Container>
  );
}
