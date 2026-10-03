"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { WhatsAppContactPicker } from "@/components/contact/WhatsAppContactPicker";

function buildWhatsAppMessage(items: ReturnType<typeof useCart>["items"], total: number) {
  const lines = items
    .map((i) => `• ${i.product.name} - Tamanho: ${i.size}\n  Quantidade: ${i.quantity}`)
    .join("\n\n");

  return `Olá! Gostaria de fazer um pedido.\n\n*Produtos:*\n\n${lines}\n\n*Total:*\n${formatPrice(total)}\n\nMeu nome é: `;
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count } = useCart();
  const [whatsappPickerOpen, setWhatsappPickerOpen] = useState(false);

  // Bloquear scroll quando aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const whatsappMessage = buildWhatsAppMessage(items, total);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
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
                <ShoppingBag size={20} className="text-[#0b1f3a]" />
                <h2 className="font-700 text-gray-900">
                  Carrinho {count > 0 && <span className="text-[#0b1f3a]">({count})</span>}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fechar carrinho"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={48} className="text-gray-200" />
                  <p className="text-gray-500 text-sm">Seu carrinho está vazio.</p>
                  <Link
                    href="/produtos"
                    onClick={closeCart}
                    className="text-sm text-[#0b1f3a] font-600 hover:underline"
                  >
                    Ver produtos
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <Link
                      href={`/produto/${item.product.slug}`}
                      onClick={closeCart}
                      className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-600 text-gray-900 leading-tight line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Tamanho: {item.size}</p>
                      <p className="text-sm font-700 text-[#0b1f3a] mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#0b1f3a] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-600 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#0b1f3a] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="font-700 text-gray-900">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  {total >= 299
                    ? "✓ Frete grátis aplicado!"
                    : `Faltam ${formatPrice(299 - total)} para frete grátis`}
                </p>
                <button
                  onClick={() => setWhatsappPickerOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-600 transition-colors active:scale-95"
                >
                  <MessageCircle size={18} />
                  Finalizar pelo WhatsApp
                </button>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors py-1"
                >
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.div>
          {whatsappPickerOpen && (
            <WhatsAppContactPicker
              message={whatsappMessage}
              onClose={() => setWhatsappPickerOpen(false)}
              onSelect={() => {
                setWhatsappPickerOpen(false);
                closeCart();
              }}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
