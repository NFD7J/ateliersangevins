import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { contact } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Coordonnées et localisation des Ateliers Angevins à Daumeray.",
};

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`;

  return (
    <>
      <section className="bg-forest-50 py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Contact
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Une question ? Appelez-nous ou écrivez-nous
          </h1>
          <p className="mt-4 text-ink-soft">
            N&apos;hésitez pas à nous contacter : nous prenons le temps de répondre à chaque
            demande.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
              <h2 className="font-display text-xl font-semibold text-forest-900">Téléphone</h2>
              <ul className="mt-4 space-y-3">
                {contact.phones.map((p) => (
                  <li key={p.number}>
                    <a
                      href={`tel:${p.number.replace(/\s/g, "")}`}
                      className="text-lg font-medium text-forest-700 hover:text-forest-900"
                    >
                      {p.name} — {p.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
              <h2 className="font-display text-xl font-semibold text-forest-900">Email</h2>
              <ul className="mt-4 space-y-2">
                {contact.emails.map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className="text-forest-700 hover:text-forest-900">
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
              <h2 className="font-display text-xl font-semibold text-forest-900">Adresse</h2>
              <address className="mt-4 not-italic leading-relaxed text-ink-soft">
                {contact.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center font-semibold text-forest-700 hover:text-forest-900"
              >
                Suivez-nous sur Facebook →
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-forest-100 shadow-sm">
            <iframe
              title="Localisation des Ateliers Angevins"
              src={mapSrc}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
