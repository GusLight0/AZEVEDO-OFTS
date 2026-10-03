export type Badge = "NOVO" | "LANÇAMENTO" | "MAIS VENDIDO" | "ESGOTADO" | null;

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  tags: string[];
  team?: string;
  color?: string;
  sizes: string[];
  stock?: number;
  badge: Badge;
  inStock: boolean;
  /** Quando false, o produto fica oculto de listagens, busca e página de detalhe. */
  active?: boolean;
  sold?: number;
  rating?: number;
  reviews?: number;
  collection?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  image: string;
  subcategories: { name: string; slug: string }[];
}
