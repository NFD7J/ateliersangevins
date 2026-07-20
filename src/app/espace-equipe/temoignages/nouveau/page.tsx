import { Container } from "@/components/ui/container";
import { AvisForm } from "@/components/admin/avis-form";

export const metadata = {
  title: "Nouveau témoignage",
  robots: { index: false, follow: false },
};

export default function NewAvisPage() {
  return (
    <Container className="max-w-3xl py-12">
      <h1 className="font-display text-3xl font-semibold text-forest-900">
        Nouveau témoignage
      </h1>
      <div className="mt-8">
        <AvisForm />
      </div>
    </Container>
  );
}
