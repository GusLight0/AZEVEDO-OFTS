"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ShoppingCart, ChevronDown, Search, Heart,
  Shirt, Layers, RectangleVertical, HardHat,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { SearchBar } from "@/components/search/SearchBar";
import { categories } from "@/lib/data";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contato" },
  { label: "Como Comprar", href: "/como-comprar" },
];

const iconMap: Record<string, React.ReactNode> = {
  Shirt: <Shirt size={16} />,
  Layers: <Layers size={16} />,
  RectangleVertical: <RectangleVertical size={16} />,
  HardHat: <HardHat size={16} />,
  Package: <Layers size={16} />,
};

export function Header() {
  const { count, openCart } = useCart();
  const { count: favCount, openFavorites } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fechar mega menu ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Bloquear scroll no mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0b1f3a] text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <span className="font-regular">Entrega em toda São Luís</span>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        animate={{
          height: scrolled ? 64 : 80,
          backgroundColor: scrolled ? "rgba(0,0,0,0.88)" : "rgba(255,255,255,1)",
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-30 w-full backdrop-blur-md shadow-sm"
        style={{ backdropFilter: scrolled ? "blur(12px)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-4">
          {/* Mobile: Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden flex-shrink-0 ${scrolled ? "text-white" : "text-gray-800"}`}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-90">
            <Image
              src="/images/Azevedo-logo.png"
              alt="AZEVEDO OFTS"
              width={48}
              height={48}
              className="rounded-full object-cover"
              priority
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-auto">
            <SearchBar />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`md:hidden ml-auto ${scrolled ? "text-white" : "text-gray-700"}`}
            aria-label="Pesquisar"
          >
            <Search size={20} />
          </button>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5 flex-shrink-0">
            <button
              onClick={openFavorites}
              className={`relative flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
                scrolled ? "text-white hover:text-blue-300" : "text-gray-700 hover:text-[#0b1f3a]"
              }`}
              aria-label="Favoritos"
            >
              <Heart size={18} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-700 leading-none">
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </button>
            <button
              onClick={openCart}
              className={`relative flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
                scrolled ? "text-white hover:text-blue-300" : "text-gray-700 hover:text-[#0b1f3a]"
              }`}
              aria-label="Carrinho"
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-700 leading-none">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Favorites */}
          <button
            onClick={openFavorites}
            className={`md:hidden relative flex-shrink-0 cursor-pointer ${scrolled ? "text-white" : "text-gray-700"}`}
            aria-label="Favoritos"
          >
            <Heart size={20} />
            {favCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-700 leading-none">
                {favCount > 9 ? "9+" : favCount}
              </span>
            )}
          </button>

          {/* Mobile Cart */}
          <button
            onClick={openCart}
            className={`md:hidden relative flex-shrink-0 cursor-pointer ${scrolled ? "text-white" : "text-gray-700"}`}
            aria-label="Carrinho"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-700 leading-none">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 py-3 sticky top-16 z-20 overflow-hidden"
          >
            <SearchBar mobile onClose={() => setSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Nav Bar */}
      <nav
        className="hidden md:block bg-white border-b border-gray-100 sticky z-20"
        style={{ top: scrolled ? 64 : 80, transition: "top 0.3s" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-11">
          {/* Mega Menu Trigger */}
          <div ref={megaRef} className="relative">
            <button
              onMouseEnter={() => setMegaOpen(true)}
              onClick={() => setMegaOpen(!megaOpen)}
              className="flex items-center gap-1.5 text-sm font-500 text-gray-700 hover:text-[#0b1f3a] transition-colors h-11"
            >
              <Menu size={16} />
              Categorias
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Mega Menu */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  onMouseLeave={() => setMegaOpen(false)}
                  className="absolute top-full left-0 mt-0 bg-white shadow-2xl border border-gray-100 rounded-b-xl rounded-tr-xl p-5 min-w-[480px] grid grid-cols-3 gap-4 z-50"
                >
                  {categories.map((cat) => (
                    <div key={cat.slug}>
                      <Link
                        href={`/produtos?categoria=${cat.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="flex items-center gap-2 font-600 text-sm text-[#0b1f3a] hover:text-[#153a72] mb-2 transition-colors"
                      >
                        {iconMap[cat.icon]}
                        {cat.name}
                      </Link>
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/produtos?categoria=${cat.slug}&sub=${sub.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="block text-xs text-gray-500 hover:text-[#0b1f3a] py-0.5 pl-5 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-[#0b1f3a] font-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Image
                src="/images/Azevedo-logo.png"
                alt="AZEVEDO OFTS"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <p className="px-5 text-xs font-600 text-gray-400 uppercase tracking-wider mb-2">
                    Menu
                  </p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-5 py-2.5 text-sm font-500 text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div>
                  <p className="px-5 text-xs font-600 text-gray-400 uppercase tracking-wider mb-2">
                    Categorias
                  </p>
                  {categories.map((cat) => (
                    <div key={cat.slug}>
                      <Link
                        href={`/produtos?categoria=${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm font-500 text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        {iconMap[cat.icon]}
                        {cat.name}
                      </Link>
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/produtos?categoria=${cat.slug}&sub=${sub.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block pl-12 pr-5 py-1.5 text-xs text-gray-500 hover:text-[#0b1f3a] hover:bg-gray-50 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
