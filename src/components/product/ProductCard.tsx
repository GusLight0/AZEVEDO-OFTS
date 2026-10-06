"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { useFavorites } from "@/lib/favorites-context";

export function ProductCard({
  product,
  horizontalOnMobile = false,
  hideLaunchBadge = false,
}: {
  product: Product;
  horizontalOnMobile?: boolean;
  hideLaunchBadge?: boolean;
}) {
  const { toggle, isFavorited } = useFavorites();
  const liked = isFavorited(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`group relative h-full overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-xl ${
        horizontalOnMobile
          ? "flex flex-row shadow-md md:flex-col md:shadow-none hover:translate-y-0 md:hover:-translate-y-2"
          : "flex flex-col hover:-translate-y-2"
      }`}
    >
      <Link
        href={`/produto/${product.slug}`}
        className={`flex min-w-0 flex-1 ${
          horizontalOnMobile ? "flex-row md:flex-col" : "flex-col"
        }`}
      >
        <div
          className={`relative block aspect-[3/4] overflow-hidden ${
            horizontalOnMobile
              ? "w-[38%] min-h-[168px] shrink-0 aspect-auto bg-gray-50 md:w-full md:min-h-0 md:aspect-[3/4] md:bg-transparent"
              : "w-full"
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
          {!(hideLaunchBadge && product.badge === "LANÇAMENTO") && (
            <ProductBadge badge={product.badge} discount={product.discount} />
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-600 text-gray-800">
                Esgotado
              </span>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-3">
          <p className="mb-0.5 text-xs text-gray-500">{product.brand}</p>
          <h3 className="min-h-10 text-sm font-600 leading-tight text-gray-900 line-clamp-2 transition-colors group-hover:text-[#0b1f3a]">
            {product.name}
          </h3>

          <div className="pt-1">
            <div className="min-h-[18px]">
              {product.originalPrice && (
                <p className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
            <p className="text-base font-700 text-[#0b1f3a]">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-xs text-gray-500">Aceitamos Pix e Cartão</p>
          </div>
        </div>
      </Link>

      <div
        className={`absolute top-2 z-20 ${
          horizontalOnMobile
            ? "left-[calc(38%_-_2.5rem)] md:left-auto md:right-2"
            : "right-2"
        }`}
      >
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
    </motion.div>
  );
}
