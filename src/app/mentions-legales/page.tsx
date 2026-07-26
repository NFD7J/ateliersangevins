import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { contact } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site des Ateliers Angevins : éditeur, responsable de publication et hébergeur.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="bg-forest-100 py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Informations légales
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Mentions légales
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl space-y-10 text-ink-soft">
          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Éditeur du site
            </h2>
            <p className="mt-3 leading-relaxed">
              Le présent site est édité par l&apos;association{" "}
              <strong className="text-ink">Les Ateliers Angevins</strong>,
              association loi 1901.
            </p>
            <address className="mt-3 not-italic leading-relaxed">
              {contact.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
            <ul className="mt-3 space-y-1 leading-relaxed">
              <li>
                Téléphone :{" "}
                {contact.phones.map((p, i) => (
                  <span key={p.number}>
                    {i > 0 && " / "}
                    {p.number}
                  </span>
                ))}
              </li>
              <li>Email : {contact.emails[0]}</li>
              <li>Numéro RNA (déclaration en préfecture) : W491000283</li>
              <li>Numéro SIREN : 909 464 679</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Responsable de la publication
            </h2>
            <p className="mt-3 leading-relaxed">
              Raymond Denis, président de l&apos;association Les Ateliers Angevins.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Hébergeur
            </h2>
            <p className="mt-3 leading-relaxed">
              Ce site est hébergé par{" "}
              <strong className="text-ink">Netlify, Inc.</strong>
            </p>
            <address className="mt-2 not-italic leading-relaxed">
              <p>512 2nd Street, Suite 200</p>
              <p>San Francisco, CA 94107</p>
              <p>États-Unis</p>
              <p className="mt-2">
                Site :{" "}
                <a
                  href="https://www.netlify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-forest-700 underline hover:text-forest-900"
                >
                  www.netlify.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Propriété intellectuelle
            </h2>
            <p className="mt-3 leading-relaxed">
              L&apos;ensemble des contenus présents sur ce site (textes, images,
              logos, éléments graphiques) est la propriété de l&apos;association Les
              Ateliers Angevins ou de leurs auteurs respectifs, sauf mention
              contraire. Toute reproduction, représentation ou diffusion, totale ou
              partielle, sans autorisation préalable, est interdite.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Données personnelles
            </h2>
            <p className="mt-3 leading-relaxed">
              Les modalités de collecte et de traitement des données personnelles
              sont détaillées dans notre{" "}
              <a
                href="/politique-de-confidentialite"
                className="font-medium text-forest-700 underline hover:text-forest-900"
              >
                politique de confidentialité
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
