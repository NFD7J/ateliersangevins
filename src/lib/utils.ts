export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateRange(start: Date | string, end?: Date | string | null) {
  const startDate = new Date(start);
  if (!end) return formatDate(startDate);

  const endDate = new Date(end);
  if (startDate.toDateString() === endDate.toDateString()) {
    return formatDate(startDate);
  }

  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();

  if (sameMonth) {
    return `${startDate.getDate()} - ${formatDate(endDate)}`;
  }

  const startLabel = sameYear
    ? startDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
    : formatDate(startDate);

  return `${startLabel} - ${formatDate(endDate)}`;
}
