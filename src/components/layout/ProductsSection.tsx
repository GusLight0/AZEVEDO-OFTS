import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductsSectionProps {
  title: string;
  products: Product[];
  viewAllHref?: string;
  horizontalCardsOnMobile?: boolean;
}

export function ProductsSection({
  title,
  products,
  viewAllHref,
  horizontalCardsOnMobile = false,
}: ProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-700 text-[#0b1f3a]">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-[#153a72] font-500 hover:underline">
            Ver todos
          </Link>
        )}
      </div>
      <div
        className={`grid ${
          horizontalCardsOnMobile ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-2"
        } md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4`}
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            horizontalOnMobile={horizontalCardsOnMobile}
          />
        ))}
      </div>
    </section>
  );
}