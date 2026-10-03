import { cn } from "@/lib/utils";
import { Badge as BadgeType } from "@/types";

const styles: Record<NonNullable<BadgeType>, string> = {
  NOVO: "bg-[#153a72] text-white",
  "LANÇAMENTO": "bg-black text-white",
  "MAIS VENDIDO": "bg-amber-500 text-white",
  ESGOTADO: "bg-gray-500 text-white",
};

export function ProductBadge({ badge, discount }: { badge: BadgeType; discount?: number }) {
  if (!badge && !discount) return null;

  if (discount && discount > 0) {
    return (
      <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-700 px-2 py-0.5 rounded-full">
        -{discount}%
      </span>
    );
  }

  if (!badge) return null;

  return (
    <span
      className={cn(
        "absolute top-2 left-2 z-10 text-xs font-600 px-2 py-0.5 rounded-full",
        styles[badge]
      )}
    >
      {badge}
    </span>
  );
}
