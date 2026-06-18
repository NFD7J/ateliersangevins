import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-semibold text-forest-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-ink-soft leading-relaxed">{description}</p>}
    </div>
  );
}
