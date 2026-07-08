import Link from "next/link";
import { contact, nav } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-forest-100 bg-forest-900 text-forest-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="font-display text-lg font-semibold">Les Ateliers Angevins</p>
          <p className="mt-3 text-sm leading-relaxed text-forest-200">
            Deux parcours d&#39;excellence – Deux spécialisations <br/>
            Association angevine fondée en 2005, dédiée au bien-être physique et psychique par la
            géobiologie, les thérapies énergétiques et les techniques de connaissance de soi.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-300">
            Navigation
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-forest-100 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-300">
            Coordonnées
          </p>
          <address className="mt-3 space-y-1 text-sm not-italic text-forest-100">
            {contact.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
          <ul className="mt-3 space-y-1 text-sm text-forest-100">
            {contact.phones.map((p) => (
              <li key={p.number}>
                {p.name} — {p.number}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-300">Suivez-nous</p>
          <ul className="mt-3 space-y-2 text-sm">
            {contact.emails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className="text-forest-100 hover:text-white">
                  {email}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-forest-100 hover:text-white"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                  href={contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-forest-100 hover:text-white"
                >
                  Youtube
                </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-300">
            Partenaires
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://www.centre-xian.fr/"
                target="_blank"
                rel="noreferrer"
                className="text-forest-100 hover:text-white"
              >
                Centre Xian
              </a>
            </li>
            <li>
              <a
                href="https://www.confederation-geobiologie.fr/"
                target="_blank"
                rel="noreferrer"
                className="text-forest-100 hover:text-white"
              >
                Confédération Nationale de Géobiologie
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-800/60 px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-forest-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Les Ateliers Angevins. Tous droits réservés.</p>
          <Link href="/espace-equipe" className="text-forest-400 hover:text-forest-200">
            Espace équipe
          </Link>
        </div>
      </div>
    </footer>
  );
}
