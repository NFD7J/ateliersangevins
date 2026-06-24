export function ModuleList({ modules }: { modules: string[] }) {
  return (
    <ol className="mt-6 space-y-3">
      {modules.map((module, i) => (
        <li
          key={module}
          className="flex gap-4 rounded-xl border border-forest-100 bg-white p-4"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-600 text-sm font-semibold text-white">
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-ink-soft">{module}</span>
        </li>
      ))}
    </ol>
  );
}
