import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[-_]/g, " ")           // hífen/underscore → espaço
    .replace(/[^a-z0-9\s]/g, "")    // remove especiais
    .replace(/\s+/g, " ")            // espaços extras
    .trim();
}

export function searchMatch(query: string, ...fields: (string | undefined)[]): boolean {
  const q = normalizeString(query);
  if (!q) return true;
  const terms = q.split(" ").filter(Boolean);
  const haystack = fields
    .filter(Boolean)
    .map((f) => normalizeString(f!))
    .join(" ");
  return terms.every((term) => haystack.includes(term));
}

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getProductColors(color?: string): string[] {
  return color?.split(",").map((value) => value.trim()).filter(Boolean) ?? [];
}

export function getColorClassName(color: string): string {
  const colorMap: Record<string, string> = {
    Preto: "bg-black",
    Branco: "bg-white",
    Musgo: "bg-[#4b5320]",
    Bege: "bg-[#f5f5dc]",
    Marrom: "bg-[#5d4037]",
    "Off-white": "bg-[#faf9f6]",
    "Azul Marinho": "bg-[#000080]",
    "Azul Escuro": "bg-[#00008b]",
    "Vermelho": "bg-red-600",
    "Azul Claro": "bg-blue-300",
    Cinza: "bg-gray-400",
    "Preto com branco": "bg-gradient-to-br from-black to-white",
    "Azul-marinho com branco": "bg-gradient-to-br from-[#000080] to-white",
    "Vermelho com preto": "bg-gradient-to-br from-red-600 to-black",
    "Branco com preto": "bg-gradient-to-br from-white to-black",
    "Bege com branco": "bg-gradient-to-br from-[#f5f5dc] to-white",
    "Verde com branco": "bg-gradient-to-br from-green-600 to-white",
    "Preto com azul": "bg-gradient-to-br from-black to-blue-600",
    "Estampados e outras combinações de cores":
      "bg-gradient-to-br from-red-500 via-yellow-400 to-blue-600",
  };

  return colorMap[color] || "bg-gray-300";
}

export function getAvailableProductSizes(sizes: string[]): string[] {
  return sizes.filter((size) => size !== "P" && size !== "XGG");
}

export function calcDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
