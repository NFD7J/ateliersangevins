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

const partners = [
  {
    name: "Centre Xian",
    description:
      "Le lieu qui accueille nos formations et ateliers, à Thorigné-d'Anjou.",
    href: "https://www.centre-xian.fr/",
    image: "/images/partners/centre-xian.jpg",
  },
  {
    name: "Confédération Nationale de Géobiologie",
    description:
      "L'organisme de référence auquel notre école adhère pour la géobiologie.",
    href: "https://www.confederation-geobiologie.fr/",
    image: "/images/partners/CNG.jpg",
  },
];

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
              description="Fondés en septembre 2005 par Marie et Jean-Pierre Brisseau, Les Ateliers Angevins sont une école de formation spécialisée dans les Thérapies Énergétiques et la Géobiologie."
            />
            <p className="mt-6 leading-relaxed text-ink-soft">
              Depuis plus de vingt ans, notre mission est de transmettre des compétences solides, fondées sur l&#39;expérience de
              terrain, la rigueur pédagogique et le respect de l&#39;éthique professionnelle. Nous accompagnons chaque stagiaire dans
              l&#39;acquisition d&#39;un savoir-faire opérationnel lui permettant d&#39;exercer avec confiance, compétence et responsabilité. <br /><br />
              <strong className="text-forest-800">Former des praticiens compétents, transmettre un savoir d&#39;excellence.</strong>
            </p>
          </div>
          <div className="relative h-full w-110 rounded-2xl overflow-hidden">
            <Image src="/images/logo.jpg" alt="Description" fill sizes="1000px" className="object-contain object-center rounded-2xl" />
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
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="flex basis-full flex-col items-center rounded-2xl border border-forest-100 bg-white p-6 shadow-sm sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
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

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Notre mission"
            title="Former avec exigence, transmettre avec passion."
            align="center"
            className="mx-auto"
          />

          <div className="mx-auto mt-8 grid max-w-3xl gap-x-10 gap-y-4 sm:grid-cols-2">
            {[
              "L'excellence de la transmission au service du vivant.",
              "Former aujourd'hui les praticiens de demain.",
              "Plus de 20 ans d'expertise au service de la transmission.",
              "Une école d'excellence en géobiologie et thérapies énergétiques.",
            ].map((slogan) => (
              <div key={slogan} className="flex items-start gap-3">
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-5 w-5 shrink-0 fill-terracotta-500"
                >
                  <path d="M8.2 14.3 4.4 10.5l1.4-1.4 2.4 2.4 6-6 1.4 1.4z" />
                </svg>
                <p className="text-base font-medium leading-snug text-forest-800">
                  {slogan}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6 leading-relaxed text-ink-soft">
            <p>
              Depuis 2005, Les Ateliers Angevins s&#39;engagent à transmettre un enseignement exigeant
              dans les domaines de la géobiologie et des thérapies énergétiques. Fondée par Marie et
              Jean-Pierre Brisseau, l&#39;école s&#39;est construite autour d&#39;une conviction forte : la
              qualité de l&#39;accompagnement repose sur la maîtrise des connaissances, la pratique de
              terrain et une transmission fidèle de savoir-faire éprouvés.
            </p>
            <p>
              Aujourd&#39;hui, notre équipe de formateurs accompagne chaque stagiaire dans un parcours
              progressif, alliant enseignements théoriques, mises en pratique et développement des
              compétences, afin de former des praticiens compétents, autonomes et responsables.
            </p>
            <p>
              Parce que chaque parcours est unique, nous privilégions un enseignement à taille humaine,
              fondé sur l&#39;écoute, l&#39;exigence pédagogique et le respect de l&#39;éthique.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-forest-100 bg-forest-100 p-8">
            <h3 className="font-display text-xl font-semibold text-forest-900">Nos engagements</h3>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {[
                "Des cursus complets et progressifs, conçus pour acquérir des compétences solides et durables.",
                "Une pédagogie qui associe théorie, pratique et accompagnement personnalisé.",
                "Des ateliers et stages de perfectionnement pour approfondir ses connaissances tout au long de son parcours.",
                "Une équipe de formateurs expérimentés, engagés dans une démarche de transmission de qualité.",
                "Une école adhérente à la Confédération Nationale de Géobiologie, gage de sérieux et de professionnalisme pour l'enseignement de la géobiologie.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-1 text-terracotta-500">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Partenaires"
            title="Ils nous accompagnent"
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[3/2] w-full bg-forest-50">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-contain p-6"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-forest-900 group-hover:text-forest-700">
                    {partner.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {partner.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-forest-600 group-hover:text-forest-800">
                    Visiter le site →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-forest-100">
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
