"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";

export function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-700 text-[#0b1f3a]">Categorias</h2>
        <Link href="/produtos" className="text-sm text-[#153a72] font-500 hover:underline">
          Ver todos
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 md:gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            {cat.slug === "camisas" ? (
              <Link
                href={`/produtos?categoria=${cat.slug}`}
                className="group flex flex-col items-center gap-2 md:gap-3 w-[90px] md:w-[100px] flex-shrink-0"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-gray-200 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
                <span className="text-xs md:text-sm font-600 text-[#0b1f3a] text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            ) : (
              <div className="group flex flex-col items-center gap-2 md:gap-3 w-[90px] md:w-[100px] flex-shrink-0 cursor-not-allowed opacity-60 grayscale">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-gray-200">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
                <span className="text-xs md:text-sm font-600 text-gray-500 text-center leading-tight">
                  {cat.name}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}