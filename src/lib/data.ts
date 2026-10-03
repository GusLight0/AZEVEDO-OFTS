import { Product, Category } from "@/types";

const allProducts: Product[] = [
  {
    id: "polo-premium",
    name: "Camisa Gola Polo Premium",
    slug: "camisa-gola-polo-premium",
    description:
      "Camisa polo de alta qualidade em malha piquet, com corte moderno e acabamento premium. Ideal para qualquer ocasião, unindo elegância e conforto.",
    price: 84.99,
    originalPrice: 99.99,
    discount: 15,
    images: [
      "/images/roupas/camisa-polo-1.png",
      "/images/roupas/camisa-polo-2.png",
      "/images/roupas/camisa-polo-3.png",
      "/images/roupas/camisa-polo-4.png",
      "/images/roupas/camisa-polo-5.png",
      "/images/roupas/camisa-polo-6.png",
    ],
    category: "camisas",
    subcategory: "polo",
    brand: "Azevedo Ofts",
    tags: ["camisa polo", "polo", "casual", "premium"],
    color: "Preto, Branco, Musgo, Bege, Marrom",
    sizes: ["P", "M", "G", "GG", "XGG"],
    badge: "LANÇAMENTO",
    inStock: true,
    active: true,
    sold: 0,
    stock: 50,
    rating: 5.0,
    reviews: 0,
    collection: "Essenciais",
  },
];

// Produtos ativos exibidos na loja
export const products: Product[] = allProducts.filter((p) => p.active !== false);

export const categories: Category[] = [
  {
    name: "Camisas",
    slug: "camisas",
    icon: "Shirt",
    image: "/images/categorias/img-categorias-camisa.png",
    subcategories: [
      { name: "Camisas Polo", slug: "polo" },
    ],
  },
  {
    name: "Conjuntos",
    slug: "conjuntos",
    icon: "Package",
    image: "/images/categorias/img-categorias-conjuntos.png",
    subcategories: [],
  },
  {
    name: "Calças",
    slug: "calcas",
    icon: "RectangleVertical",
    image: "/images/categorias/img-categorias-calca.png",
    subcategories: [],
  },
  {
    name: "Bermudas",
    slug: "bermudas",
    icon: "Layers",
    image: "/images/categorias/img-categorias-bermuda.png",
    subcategories: [],
  },
  {
    name: "Bonés",
    slug: "bones",
    icon: "HardHat",
    image: "/images/categorias/img-categorias-boné.png",
    subcategories: [],
  },
];
