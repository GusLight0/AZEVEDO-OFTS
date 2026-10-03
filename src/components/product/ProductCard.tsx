"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";

export function ProductCard({
  product,
  horizontalOnMobile = false,
}: {
  product: Product;
  horizontalOnMobile?: boolean;
}) {
  const { addItem } = useCart();
  const { toggle, isFavorited } = useFavorites();
  const liked = isFavorited(product.id);
  const [selectedSize, setSelectedSize] = useState(() => {
    const availableSizes = product.sizes.filter(s => s !== "P" && s !== "XGG");
    return availableSizes[0] || product.sizes[0] || "";
  });

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product, selectedSize);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 ${
        horizontalOnMobile
          ? "flex flex-row shadow-md md:block md:shadow-none hover:translate-y-0 md:hover:-translate-y-2"
          : "hover:-translate-y-2"
      }`}
    >
      {/* Image */}
      <Link
        href={`/produto/${product.slug}`}
        className={`relative block overflow-hidden aspect-[3/4] ${
          horizontalOnMobile ? "w-[38%] min-h-[220px] shrink-0 aspect-auto md:w-full md:min-h-0 md:aspect-[3/4]" : ""
        }`}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            !product.inStock ? "grayscale" : ""
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        <ProductBadge badge={product.badge} discount={product.discount} />

        {/* Overlay esgotado */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-xs font-600 px-3 py-1 rounded-full">
              Esgotado
            </span>
          </div>
        )}
      </Link>

      <div className="absolute right-2 top-2 z-20">
        <button
          type="button"
          onClick={() => toggle(product)}
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white ${
            liked ? "text-red-500" : "text-gray-600"
          }`}
          aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart size={15} className={liked ? "fill-red-500" : ""} />
        </button>
      </div>

      {/* Info */}
      <div
        className={`p-3 ${
          horizontalOnMobile ? "flex min-w-0 flex-1 flex-col justify-between pt-12 md:block md:pt-3" : ""
        }`}
      >
        <Link href={`/produto/${product.slug}`}>
          <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
          <h3 className="text-sm font-600 text-gray-900 leading-tight line-clamp-2 hover:text-[#0b1f3a] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Sizes preview */}
        <div className="flex gap-1 mt-2 flex-wrap">
          {product.sizes
            .filter(s => s !== "P" && s !== "XGG")
            .slice(0, 4)
            .map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`text-xs px-1.5 py-0.5 rounded border transition-colors ${
                  selectedSize === s
                    ? "border-[#0b1f3a] bg-[#0b1f3a] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#0b1f3a]"
                }`}
              >
                {s}
              </button>
            ))}
          {product.sizes.filter(s => s !== "P" && s !== "XGG").length > 4 && (
            <span className="text-xs text-gray-400 self-center">
              +{product.sizes.filter(s => s !== "P" && s !== "XGG").length - 4}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-2">
          {product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-base font-700 text-[#0b1f3a]">
            {formatPrice(product.price)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Aceitamos Pix e Cartão
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-600 transition-all duration-200 ${
            product.inStock
              ? "bg-[#0b1f3a] text-white hover:bg-[#153a72] active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ShoppingCart size={15} />
          {product.inStock ? "Adicionar" : "Indisponível"}
        </button>
      </div>
    </motion.div>
  );
}
