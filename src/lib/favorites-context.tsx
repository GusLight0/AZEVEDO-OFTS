"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Product } from "@/types";

const STORAGE_KEY = "azevedo-favorites";

interface FavoritesContextType {
  items: Product[];
  isOpen: boolean;
  openFavorites: () => void;
  closeFavorites: () => void;
  toggle: (product: Product) => void;
  isFavorited: (id: string) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

function loadFromStorage(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
    }
  }, [items, hydrated]);

  const openFavorites = useCallback(() => setIsOpen(true), []);
  const closeFavorites = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback((product: Product) => {
    setItems((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const isFavorited = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items]
  );

  return (
    <FavoritesContext.Provider
      value={{ items, isOpen, openFavorites, closeFavorites, toggle, isFavorited, count: items.length }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
