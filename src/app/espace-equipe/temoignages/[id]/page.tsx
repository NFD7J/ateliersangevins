import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { AvisForm } from "@/components/admin/avis-form";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Modifier le témoignage",
  robots: { index: false, follow: false },
};

export default async function EditAvisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const temoignage = await prisma.avis.findUnique({ where: { id } });

  if (!temoignage) notFound();

  return (
    <Container className="max-w-3xl py-12">
      <h1 className="font-display text-3xl font-semibold text-forest-900">
        Modifier le témoignage
      </h1>
      <div className="mt-8">
        <AvisForm temoignage={temoignage} />
      </div>
    </Container>
  );
}
