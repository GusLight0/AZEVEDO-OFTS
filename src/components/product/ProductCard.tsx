"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Heart, X } from "lucide-react";
import { Product } from "@/types";
import {
  formatPrice,
  getAvailableProductSizes,
  getColorClassName,
  getProductColors,
} from "@/lib/utils";
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
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const colors = getProductColors(product.color);
  const availableSizes = getAvailableProductSizes(product.sizes);
  const hasSizeOptions = product.sizes.length > 0;
  const canAdd = (!colors.length || !!selectedColor) &&
    (!hasSizeOptions || !!selectedSize);

  const handleAdd = () => {
    if (!product.inStock) return;
    if (!colors.length && !hasSizeOptions) {
      addItem(product, "");
      return;
    }

    setSelectedColor("");
    setSelectedSize("");
    setSelectionOpen(true);
  };

  const confirmAdd = () => {
    if (!canAdd) return;
    addItem(product, selectedSize, selectedColor || undefined);
    setSelectionOpen(false);
  };

  return (
    <>
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
      {selectionOpen && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectionOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`product-options-${product.id}`}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                  <h2 id={`product-options-${product.id}`} className="text-lg font-700 text-[#0b1f3a]">
                    Selecione as opções
                  </h2>
                  <p className="text-sm text-gray-500">Escolha a cor e o tamanho do produto.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectionOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
                  aria-label="Fechar seleção de opções"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-[160px_1fr]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="160px" />
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3 className="mt-1 font-600 text-gray-900">{product.name}</h3>
                    <p className="mt-2 text-lg font-700 text-[#0b1f3a]">{formatPrice(product.price)}</p>
                  </div>

                  {colors.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-600 text-gray-800">Cor</p>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            aria-pressed={selectedColor === color}
                            className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm transition-colors ${
                              selectedColor === color
                                ? "border-[#0b1f3a] bg-[#e8edf7]"
                                : "border-gray-200 hover:border-[#0b1f3a]"
                            }`}
                          >
                            <span className={`h-4 w-4 rounded-full border border-gray-300 ${getColorClassName(color)}`} />
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasSizeOptions && (
                    <div>
                      <p className="mb-2 text-sm font-600 text-gray-800">Tamanho</p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => {
                          const isAvailable = availableSizes.includes(size);
                          return (
                            <button
                              key={size}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => setSelectedSize(size)}
                              aria-pressed={selectedSize === size}
                              className={`rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                                !isAvailable
                                  ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through"
                                  : selectedSize === size
                                    ? "border-[#0b1f3a] bg-[#0b1f3a] text-white"
                                    : "border-gray-200 text-gray-700 hover:border-[#0b1f3a]"
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={confirmAdd}
                    disabled={!canAdd}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1f3a] py-3 text-sm font-600 text-white transition-colors hover:bg-[#153a72] disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <ShoppingCart size={17} />
                    Adicionar ao carrinho
                  </button>
                  {!canAdd && (
                    <p className="text-center text-xs text-gray-500">
                      {hasSizeOptions && availableSizes.length === 0
                        ? "Não há tamanhos disponíveis para este produto."
                        : `Selecione ${
                            colors.length && !selectedColor ? "a cor" : ""
                          }${
                            colors.length && !selectedColor && hasSizeOptions && !selectedSize ? " e " : ""
                          }${
                            hasSizeOptions && !selectedSize ? "o tamanho" : ""
                          } para continuar.`}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
          document.body
      )}
    </>
  );
}
