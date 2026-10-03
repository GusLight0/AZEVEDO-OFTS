"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartItem, Product } from "@/types";
import { getProductColors } from "@/lib/utils";

const STORAGE_KEY = "azevedo-cart";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string, color?: string) => void;
  removeItem: (productId: string, size: string, color?: string) => void;
  updateQty: (productId: string, size: string, qty: number, color?: string) => void;
  total: number;
  count: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const items: CartItem[] = JSON.parse(raw);
    return items.map((item) => {
      if (item.color) return item;

      const legacyColor = getProductColors(item.product.color).find((color) =>
        item.size.startsWith(`${color} - `)
      );
      if (!legacyColor) return item;

      return {
        ...item,
        color: legacyColor,
        size: item.size.slice(legacyColor.length + 3),
      };
    });
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");

  // Carregar do localStorage após montar no cliente
  useEffect(() => {
    setItems(loadFromStorage());
    setHydrated(true);
  }, []);

  // Salvar no localStorage sempre que items mudar
  useEffect(() => {
    if (hydrated) saveToStorage(items);
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, size: string, color?: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, size, color, quantity: 1 }];
    });
    setToast(product.name);
    setTimeout(() => setToast(""), 2500);
  }, []);

  const removeItem = useCallback((productId: string, size: string, color?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size && i.color === color))
    );
  }, []);

  const updateQty = useCallback((productId: string, size: string, qty: number, color?: string) => {
    if (qty <= 0) {
      setItems((prev) =>
        prev.filter((i) => !(i.product.id === productId && i.size === size && i.color === color))
      );
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity: qty }
            : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQty, total, count, clearCart }}
    >
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0b1f3a] text-white text-sm font-500 px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-green-400">✓</span>
            Adicionado ao carrinho
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
