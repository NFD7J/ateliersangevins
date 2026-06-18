import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-forest-600 via-forest-500 to-terracotta-400",
  "from-forest-700 via-forest-600 to-gold-400",
  "from-terracotta-500 via-terracotta-400 to-gold-300",
  "from-forest-800 via-forest-600 to-forest-300",
];

export function PlaceholderImage({
  icon = "🌿",
  variant = 0,
  className,
}: {
  icon?: string;
  variant?: number;
  className?: string;
}) {
  const gradient = GRADIENTS[variant % GRADIENTS.length];
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-linear-to-br text-5xl",
        gradient,
        className
      )}
      aria-hidden
    >
      <span className="drop-shadow-sm">{icon}</span>
    </div>
  );
}
