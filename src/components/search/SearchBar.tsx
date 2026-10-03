"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { searchMatch, formatPrice } from "@/lib/utils";

interface SearchBarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function SearchBar({ mobile = false, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? products.filter((p) =>
        searchMatch(
          query,
          p.name,
          p.description,
          p.category,
          p.brand,
          p.team,
          p.color,
          p.collection,
          ...(p.tags || [])
        )
      ).slice(0, 6)
    : [];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/produtos?q=${encodeURIComponent(query.trim())}`);
        setQuery("");
        onClose?.();
      }
    },
    [query, router, onClose]
  );

  const handleSelect = useCallback(() => {
    setQuery("");
    setFocused(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (mobile) inputRef.current?.focus();
  }, [mobile]);

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Buscar produtos, times, marcas..."
          className="w-full pl-9 pr-9 py-2.5 bg-[#e8edf7] rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0b1f3a]/30 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {focused && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {results.length > 0 ? (
              <>
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/produto/${p.slug}`}
                    onClick={handleSelect}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-500 text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.brand}</p>
                    </div>
                    <p className="text-sm font-600 text-[#0b1f3a] flex-shrink-0">
                      {formatPrice(p.price)}
                    </p>
                  </Link>
                ))}
                <Link
                  href={`/produtos?q=${encodeURIComponent(query)}`}
                  onClick={handleSelect}
                  className="block px-4 py-3 text-center text-sm text-[#0b1f3a] font-500 bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-100"
                >
                  Ver todos os resultados para &quot;{query}&quot;
                </Link>
              </>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-500">Nenhum produto encontrado.</p>
                <Link
                  href="/produtos"
                  onClick={handleSelect}
                  className="text-sm text-[#0b1f3a] font-500 hover:underline mt-1 block"
                >
                  Ver todos os produtos
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
