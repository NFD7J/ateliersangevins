import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { team, contact } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Histoire, mission et équipe de l'association Les Ateliers Angevins, fondée en 2005 à Daumeray.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-forest-100 py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            À propos
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Une association angevine au service du bien-être
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Notre histoire"
              title="Fondée en septembre 2005"
              description="L'association Les Ateliers Angevins a été fondée en septembre 2005 par Marie et Jean-Pierre Brisseau. Son objectif principal est de favoriser le bien-être physique et psychique de toute personne grâce à l'apprentissage et à la pratique de techniques et outils de connaissance de soi, de développement personnel et de bien-être."
            />
            <p className="mt-6 leading-relaxed text-ink-soft">
              Au fil des années, nos domaines d&apos;intervention se sont élargis : thérapie
              énergétique, géobiologie, mais aussi ateliers spécialisés en sourcellerie,
              numérologie, lithothérapie et tarot thérapeutique. Notre équipe est accréditée par
              la <strong className="text-forest-800">Confédération Nationale de Géobiologie</strong>.
            </p>
          </div>
          <div className="relative h-full w-110 rounded-2xl overflow-hidden">
            <Image src="/images/logo.jpg" alt="Description" fill sizes="1000px" className="object-cover object-center rounded-2xl" />
          </div>
        </Container>
      </section>

      <section className="bg-forest-100 py-20">
        <Container>
          <SectionHeading
            eyebrow="L'équipe"
            title="Des formateurs passionnés et expérimentés"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-2xl border border-forest-100 bg-white p-6 shadow-sm"
              >
                <div className="relative h-25 w-25 rounded-full bg-forest-100 text-2xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="object-cover object-center"
                    loading="lazy"
                    fill
                    sizes="100px"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-terracotta-500">{member.role}</p>
                <p className="text-center mt-3 text-sm leading-relaxed text-ink-soft">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-2xl text-center">
          <SectionHeading
            eyebrow="Nous trouver"
            title="Daumeray, Maine-et-Loire"
            align="center"
            className="mx-auto"
            description={contact.address.join(", ")}
          />
        </Container>
      </section>
    </>
  );
}
