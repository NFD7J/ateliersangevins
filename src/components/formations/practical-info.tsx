type PracticalInfoItem = {
  label: string;
  value: string;
  /** Icône (emoji) affichée à gauche du label. Optionnelle. */
  icon?: string;
};

import { cn } from "@/lib/utils";

export function PracticalInfo({
  items,
  pdfProgramme,
  pdfInscription,
  className,
}: {
  items: PracticalInfoItem[];
  pdfProgramme?: string;
  pdfInscription?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-forest-100 bg-white p-8 shadow-sm",
        className
      )}
    >
      <h3 className="font-display text-2xl font-semibold text-forest-900">
        Informations pratiques
      </h3>
      <dl className="mt-6 space-y-5">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            {item.icon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-lg">
                {item.icon}
              </span>
            )}
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-forest-600">
                {item.label}
              </dt>
              <dd className="mt-0.5 leading-relaxed text-ink-soft">
                {item.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
      {(pdfProgramme || pdfInscription) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {pdfInscription && (
            <a
              href={pdfInscription}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
            >
              Bulletin d&apos;inscription (PDF)
            </a>
          )}
          {pdfProgramme && (
            <a
              href={pdfProgramme}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-forest-300 px-5 py-2.5 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-100"
            >
              Voir le programme (PDF)
            </a>
          )}
        </div>
      )}
    </div>
  );
}
