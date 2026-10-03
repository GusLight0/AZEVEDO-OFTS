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

export function calcDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
