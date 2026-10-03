import { Hero } from "@/components/layout/Hero";
import { CategoriesSection } from "@/components/layout/CategoriesSection";
import { ProductsSection } from "@/components/layout/ProductsSection";
import { BenefitsSection } from "@/components/layout/BenefitsSection";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { products } from "@/lib/data";

export default function HomePage() {
  const lancamentos = products.filter((p) => p.badge === "LANÇAMENTO" || p.badge === "NOVO");
  const maisVendidos = products.filter((p) => p.badge === "MAIS VENDIDO");
  const promocoes = products.filter((p) => p.discount && p.discount > 0 && p.inStock);

  return (
    <>
      <Hero />
      <BlurReveal>
        <CategoriesSection />
      </BlurReveal>
      {lancamentos.length > 0 && (
        <BlurReveal>
          <ProductsSection
            title="Lançamentos"
            products={lancamentos}
            viewAllHref="/produtos"
            horizontalCardsOnMobile
          />
        </BlurReveal>
      )}
      <BlurReveal>
        <BenefitsSection />
      </BlurReveal>
      {maisVendidos.length > 0 && (
        <BlurReveal>
          <ProductsSection
            title="Mais Vendidos"
            products={maisVendidos}
            viewAllHref="/produtos"
          />
        </BlurReveal>
      )}
      {promocoes.length > 0 && (
        <BlurReveal>
          <ProductsSection
            title="Promoções"
            products={promocoes}
            viewAllHref="/produtos?promo=true"
          />
        </BlurReveal>
      )}
    </>
  );
}
