type PracticalInfoItem = {
  label: string;
  value: string;
};

export function PracticalInfo({
  items,
  pdfProgramme,
  pdfInscription,
}: {
  items: PracticalInfoItem[];
  pdfProgramme?: string;
  pdfInscription?: string;
}) {
  return (
    <div className="rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
      <h3 className="font-display text-xl font-semibold text-forest-900">
        Informations pratiques
      </h3>
      <dl className="mt-4 space-y-3 text-sm">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex justify-between gap-4 border-b border-forest-50 pb-2 last:border-0 last:pb-0"
          >
            <dt className="font-medium text-forest-700">{item.label}</dt>
            <dd className="text-right text-ink-soft">{item.value}</dd>
          </div>
        ))}
      </dl>
      {(pdfProgramme || pdfInscription) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {pdfInscription && (
            <a
              href={pdfInscription}
              className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
            >
              Bulletin d&apos;inscription (PDF)
            </a>
          )}
          {pdfProgramme && (
            <a
              href={pdfProgramme}
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
