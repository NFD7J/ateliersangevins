import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-forest-100 px-3 py-1 text-xs font-medium text-forest-700",
        className
      )}
    >
      {children}
    </span>
  );
}
