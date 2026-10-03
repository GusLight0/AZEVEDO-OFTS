"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart, MessageCircle, ChevronRight, Share2,
  ZoomIn, Minus, Plus, Truck, RefreshCw, Shield, Bike, Store,
} from "lucide-react";
import { products } from "@/lib/data";
import {
  formatPrice,
  getAvailableProductSizes,
  getColorClassName,
  getProductColors,
} from "@/lib/utils";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/lib/cart-context";
import { WhatsAppContactPicker } from "@/components/contact/WhatsAppContactPicker";
import { use, useRef } from "react";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const { addItem } = useCart();
  const colors = getProductColors(product.color);
  const availableSizes = getAvailableProductSizes(product.sizes);
  const hasSizeOptions = product.sizes.length > 0;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [showSelectionError, setShowSelectionError] = useState(false);
  const [whatsappPickerOpen, setWhatsappPickerOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState("");
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const related = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const handleAddToCart = () => {
    if ((colors.length > 0 && !selectedColor) || (hasSizeOptions && !selectedSize)) {
      setShowSelectionError(true);
      return;
    }
    setShowSelectionError(false);
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize, selectedColor || undefined);
    }
  };

  const handleWhatsAppOrder = () => {
    if ((colors.length > 0 && !selectedColor) || (hasSizeOptions && !selectedSize)) {
      setShowSelectionError(true);
      return;
    }
    setShowSelectionError(false);
    setWhatsappPickerOpen(true);
  };

  const handleShare = async () => {
    const url = new URL(`/produto/${product.slug}`, window.location.origin).toString();

    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: product.name, url });
          setShareFeedback("Produto compartilhado");
          window.setTimeout(() => setShareFeedback(""), 2500);
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;
        }
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("textarea");
        input.value = url;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("Não foi possível copiar o link.");
      }
      setShareFeedback("Link copiado");
    } catch {
      setShareFeedback("Não foi possível compartilhar.");
    }

    window.setTimeout(() => setShareFeedback(""), 2500);
  };

  const whatsappMessage = [
    "Olá! Tenho interesse no produto:",
    "",
    `*${product.name}*`,
    ...(selectedColor ? [`Cor: ${selectedColor}`] : []),
    ...(selectedSize ? [`Tamanho: ${selectedSize}`] : []),
    `Quantidade: ${qty}`,
    `Preço: ${formatPrice(product.price)}`,
  ].join("\n");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-[#0b1f3a] transition-colors">Início</Link>
        <ChevronRight size={12} />
        <Link href="/produtos" className="hover:text-[#0b1f3a] transition-colors">Produtos</Link>
        <ChevronRight size={12} />
        <Link href={`/produtos?categoria=${product.category}`} className="hover:text-[#0b1f3a] transition-colors capitalize">
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="space-y-3">
          {/* Main Image */}
          <div
            ref={imageRef}
            className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 ${
              zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => setZoomed(!zoomed)}
            onMouseMove={(e) => {
              if (!zoomed || !imageRef.current) return;
              const rect = imageRef.current.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setZoomPos({ x, y });
            }}
            onMouseLeave={() => {
              if (zoomed) setZoomPos({ x: 50, y: 50 });
            }}
            onTouchMove={(e) => {
              if (!zoomed || !imageRef.current) return;
              const touch = e.touches[0];
              const rect = imageRef.current.getBoundingClientRect();
              const x = ((touch.clientX - rect.left) / rect.width) * 100;
              const y = ((touch.clientY - rect.top) / rect.height) * 100;
              setZoomPos({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
            }}
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-200 ${
                !product.inStock ? "grayscale" : ""
              }`}
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: zoomed ? "scale(2.2)" : "scale(1)",
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <ProductBadge badge={product.badge} discount={product.discount} />
            {!zoomed && (
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 pointer-events-none">
                <ZoomIn size={15} />
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedImage(i); setZoomed(false); }}
                  className={`relative w-16 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-[#0b1f3a]" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-400 font-500">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-700 text-gray-900 leading-tight mt-1">
                {product.name}
              </h1>
            </div>
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => void handleShare()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#0b1f3a] transition-colors hover:border-[#0b1f3a] hover:bg-[#e8edf7]"
                aria-label={`Compartilhar ${product.name}`}
                title="Compartilhar produto"
              >
                <Share2 size={18} />
              </button>
              {shareFeedback && (
                <span
                  role="status"
                  className="absolute right-0 top-12 z-20 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white shadow"
                >
                  {shareFeedback}
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="bg-[#e8edf7] rounded-2xl p-4">
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-3xl font-800 text-[#0b1f3a]">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Aceitamos Pix e Cartão
            </p>
            {product.discount && (
              <span className="inline-block mt-2 bg-red-100 text-red-600 text-xs font-600 px-2 py-0.5 rounded-full">
                Economia de {formatPrice((product.originalPrice || 0) - product.price)}
              </span>
            )}
          </div>

          {/* Colors */}
          {colors.length > 0 && (
          <div className={!product.inStock ? "opacity-40 pointer-events-none select-none" : ""}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-600 text-gray-800">Cor</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  aria-pressed={selectedColor === color}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all ${
                    selectedColor === color
                      ? "border-[#0b1f3a] bg-[#e8edf7]"
                      : "border-gray-200 hover:border-[#0b1f3a]"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border border-gray-300 ${getColorClassName(color)}`} />
                  <span className={`text-xs font-500 transition-colors ${
                    selectedColor === color ? "text-[#0b1f3a]" : "text-gray-700"
                  }`}>
                    {color}
                  </span>
                </button>
              ))}
            </div>
          </div>
          )}

          {/* Size */}
          {product.sizes.length > 0 && (
          <div className={!product.inStock ? "opacity-40 pointer-events-none select-none" : ""}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-600 text-gray-800">Tamanho</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const isUnavailable = s === "P" || s === "XGG";
                return (
                  <button
                    key={s}
                    onClick={() => {
                      if (!isUnavailable) {
                        setSelectedSize(s);
                        setShowSelectionError(false);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-500 transition-all ${
                      isUnavailable
                        ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed opacity-60"
                        : selectedSize === s
                          ? "border-[#0b1f3a] bg-[#0b1f3a] text-white"
                          : "border-gray-200 text-gray-700 hover:border-[#0b1f3a]"
                    }`}
                  >
                    {isUnavailable ? s : s}
                  </button>
                );
              })}
            </div>
          </div>
          )}
          {showSelectionError && (
            <p className="text-xs text-red-500">
              {hasSizeOptions && availableSizes.length === 0
                ? "Não há tamanhos disponíveis para este produto."
                : `Selecione ${colors.length > 0 && !selectedColor ? "a cor" : ""}${
                    colors.length > 0 && !selectedColor && hasSizeOptions && !selectedSize ? " e " : ""
                  }${hasSizeOptions && !selectedSize ? "o tamanho" : ""} para continuar.`}
            </p>
          )}

          {/* Quantity */}
          <div className={!product.inStock ? "opacity-40 pointer-events-none select-none" : ""}>
            <p className="text-sm font-600 text-gray-800 mb-2">Quantidade</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-[#0b1f3a] transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-600 w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-[#0b1f3a] transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-600 transition-all active:scale-95 ${
                product.inStock
                  ? "bg-[#0b1f3a] text-white hover:bg-[#153a72]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={18} />
              {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-600 bg-green-600 text-white hover:bg-green-700 transition-colors active:scale-95"
            >
              <MessageCircle size={18} />
              Comprar via WhatsApp
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {[
              { icon: <Store size={16} />, text: "Retirada no local disponível" },
              { icon: <Bike size={16} />, text: "Entrega a combinar via WhatsApp" },
              { icon: <Shield size={16} />, text: "Taxa fixa de entrega: R$ 7,00" },
              { icon: <Shield size={16} />, text: "Produto original" },
            ].map((g) => (
              <div key={g.text} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-[#0b1f3a]">{g.icon}</span>
                <span className="text-xs text-gray-500 leading-tight">{g.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {whatsappPickerOpen && (
        <WhatsAppContactPicker
          message={whatsappMessage}
          onClose={() => setWhatsappPickerOpen(false)}
          onSelect={() => setWhatsappPickerOpen(false)}
        />
      )}

      {/* Description */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-700 text-[#0b1f3a] mb-4">Descrição</h2>
          <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-[#e8edf7] text-gray-600 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Size table */}
        <div>
          <h2 className="text-xl font-700 text-[#0b1f3a] mb-4">Tabela de Medidas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#0b1f3a] text-white">
                  <th className="px-4 py-2 text-left rounded-tl-lg">Tamanho</th>
                  <th className="px-4 py-2 text-left">Busto (cm)</th>
                  <th className="px-4 py-2 text-left rounded-tr-lg">Comprimento (cm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: "P", busto: "88–92", comp: "68" },
                  { size: "M", busto: "92–96", comp: "70" },
                  { size: "G", busto: "96–100", comp: "72" },
                  { size: "GG", busto: "100–106", comp: "74" },
                  { size: "XGG", busto: "106–112", comp: "76" },
                ].map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2 font-500">{row.size}</td>
                    <td className="px-4 py-2 text-gray-600">{row.busto}</td>
                    <td className="px-4 py-2 text-gray-600">{row.comp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-700 text-[#0b1f3a] mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
