import { Suspense } from "react";
import ProdutosClient from "./client";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

export const metadata = {
  title: "Produtos",
  description: "Explore toda a linha de produtos esportivos da AZEVEDO OFTS.",
};

function LoadingGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={<LoadingGrid />}>
      <ProdutosClient />
    </Suspense>
  );
}
