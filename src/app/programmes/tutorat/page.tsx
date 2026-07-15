import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticalInfo } from "@/components/formations/practical-info";

export const metadata: Metadata = {
  title: "Atelier Tutorat",
  description:
    "Atelier de tutorat : un accompagnement personnalisé pour approfondir vos connaissances et compétences dans un domaine spécifique.",
};

export default function TutoratPage() {
  return (
    <>
      <section className="bg-forest-100 py-16">
        <Container className="max-w-3xl text-center">
          <Link
            href="/programmes"
            className="text-sm font-semibold text-forest-700 hover:text-forest-900"
          >
            ← Retour aux programmes
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Atelier complémentaire
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Journées de tutorat – Thérapie vibratoire &amp; Géobiologie
          </h1>
          <p className="mt-4 text-ink-soft">
            Le tutorat offre un accompagnement personnalisé pour approfondir vos connaissances et compétences dans un domaine spécifique, avec des conseils et un suivi adaptés à vos besoins.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
                <SectionHeading
                    eyebrow="L'approche"
                    title="Un accompagnement personnalisé pour progresser"
                />
                <p className="mt-4 leading-relaxed text-ink-soft">
                    Ces journées de tutorat sont dédiées à l&#39;approfondissement des pratiques et à l&#39;évolution de
                    chacun dans son parcours. <br/><br/>
                    À travers des échanges, des mises en situation et des études de cas, elles offrent un espace
                    pour affiner sa perception, renforcer sa pratique et développer une approche toujours plus
                    juste de l&#39;accompagnement en thérapie vibratoire comme en géobiologie.<br/><br/>
                    Chaque rencontre est un moment de partage, d&#39;écoute et de transmission, où l&#39;expérience de
                    chacun nourrit la réflexion collective. Elles permettent de gagner en confiance, d&#39;intégrer de
                    nouveaux outils et de poursuivre son évolution dans un cadre bienveillant et convivial.
                </p>
            </div>
            <PracticalInfo
                items={[
                { label: "Tarif", value: "10 €" },
                { label: "Durée", value: "1 jour" },
                { label: "Repas", value: "non inclus" },
                { label: "Lieu", value: "Centre Xian, La Haute Jeannière, 49220 Thorigné-d'Anjou" },
                ]}
                pdfInscription="/documents/inscription-modules-complementaires-2026.pdf"
            />
        </Container>
      </section>
    </>
  );
}
