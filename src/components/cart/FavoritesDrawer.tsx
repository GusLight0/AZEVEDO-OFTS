"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/lib/favorites-context";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export function FavoritesDrawer() {
  const { items, isOpen, closeFavorites, toggle } = useFavorites();
  const { addItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeFavorites}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-[#0b1f3a]" />
                <h2 className="font-700 text-gray-900">
                  Favoritos {items.length > 0 && <span className="text-[#0b1f3a]">({items.length})</span>}
                </h2>
              </div>
              <button
                onClick={closeFavorites}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <Heart size={48} className="text-gray-200" />
                  <p className="text-gray-500 text-sm">Nenhum produto salvo ainda.</p>
                  <Link
                    href="/produtos"
                    onClick={closeFavorites}
                    className="text-sm text-[#0b1f3a] font-600 hover:underline"
                  >
                    Ver produtos
                  </Link>
                </div>
              ) : (
                items.map((product) => (
                  <div key={product.id} className="flex gap-3">
                    <Link
                      href={`/produto/${product.slug}`}
                      onClick={closeFavorites}
                      className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400">{product.brand}</p>
                      <Link
                        href={`/produto/${product.slug}`}
                        onClick={closeFavorites}
                        className="text-sm font-600 text-gray-900 leading-tight line-clamp-2 hover:text-[#0b1f3a] transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm font-700 text-[#0b1f3a] mt-1">
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => addItem(product, product.sizes[0])}
                          disabled={!product.inStock}
                          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-500 transition-colors ${
                            product.inStock
                              ? "bg-[#0b1f3a] text-white hover:bg-[#153a72]"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingCart size={12} />
                          {product.inStock ? "Adicionar" : "Esgotado"}
                        </button>
                        <button
                          onClick={() => toggle(product)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors font-500"
                          aria-label="Remover dos salvos"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
