import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { contact } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité des Ateliers Angevins : données collectées, finalités et droits des utilisateurs.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <section className="bg-forest-100 py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
            Vos données
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-ink-soft">
            Dernière mise à jour : 26 juillet 2026
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl space-y-10 text-ink-soft">
          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Responsable du traitement
            </h2>
            <p className="mt-3 leading-relaxed">
              Les données personnelles collectées sur ce site sont traitées par
              l&apos;association <strong className="text-ink">Les Ateliers
              Angevins</strong>, dont le siège est situé{" "}
              {contact.address.slice(1).join(", ")}. Pour toute question relative à
              vos données, vous pouvez nous contacter à l&apos;adresse{" "}
              <a
                href={`mailto:${contact.emails[0]}`}
                className="font-medium text-forest-700 underline hover:text-forest-900"
              >
                {contact.emails[0]}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Données collectées et finalités
            </h2>
            <ul className="mt-3 list-disc space-y-3 pl-5 leading-relaxed">
              <li>
                <strong className="text-ink">Formulaire de contact</strong> : nom,
                adresse email, numéro de téléphone (facultatif) et contenu du
                message. Ces données servent uniquement à traiter votre demande et à
                y répondre. Base légale : votre consentement.
              </li>
              <li>
                <strong className="text-ink">Espace équipe</strong> : identifiants de
                connexion des membres autorisés, utilisés pour la gestion du site
                (articles, agenda, témoignages). Base légale : intérêt légitime de
                l&apos;association.
              </li>
              <li>
                <strong className="text-ink">Cookies techniques</strong> : cookies
                strictement nécessaires au fonctionnement de l&apos;espace de
                connexion. Ils ne nécessitent pas de consentement préalable.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Durée de conservation
            </h2>
            <p className="mt-3 leading-relaxed">
              Les messages envoyés via le formulaire de contact sont conservés le
              temps nécessaire au traitement de votre demande, puis archivés ou
              supprimés dans un délai de 12 mois. Les comptes de l&apos;espace équipe
              sont conservés tant que la
              personne est membre actif de l&apos;association.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Destinataires des données
            </h2>
            <p className="mt-3 leading-relaxed">
              Vos données sont destinées exclusivement à l&apos;association Les
              Ateliers Angevins. Elles ne sont ni vendues, ni cédées à des tiers.
              Elles peuvent transiter par nos prestataires techniques, dans le
              strict cadre de la fourniture de leurs services : l&apos;hébergeur{" "}
              <strong className="text-ink">Netlify, Inc.</strong> et le service
              d&apos;envoi d&apos;emails{" "}
              <strong className="text-ink">Resend</strong> (Resend, Inc.).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              Vos droits
            </h2>
            <p className="mt-3 leading-relaxed">
              Conformément au Règlement général sur la protection des données (RGPD)
              et à la loi Informatique et Libertés, vous disposez d&apos;un droit
              d&apos;accès, de rectification, d&apos;effacement, de limitation et
              d&apos;opposition au traitement de vos données, ainsi que d&apos;un
              droit à la portabilité. Vous pouvez exercer ces droits en nous écrivant
              à{" "}
              <a
                href={`mailto:${contact.emails[0]}`}
                className="font-medium text-forest-700 underline hover:text-forest-900"
              >
                {contact.emails[0]}
              </a>
              . Vous disposez également du droit d&apos;introduire une réclamation
              auprès de la CNIL (
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-forest-700 underline hover:text-forest-900"
              >
                www.cnil.fr
              </a>
              ).
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
