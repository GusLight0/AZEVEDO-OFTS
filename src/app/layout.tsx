import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FavoritesDrawer } from "@/components/cart/FavoritesDrawer";

export const metadata: Metadata = {
  title: {
    default: "AZEVEDO OFTS",
    template: "%s | AZEVEDO OFTS",
  },
  description:
    "Camisas de times, tênis, bermudas e acessórios esportivos com qualidade premium. Frete grátis acima de R$299.",
  keywords: ["camisas de time", "tênis", "produtos esportivos", "futebol", "azevedo ofts"],
  icons: {
    icon: "/images/logo-branca.png",
  },
  openGraph: {
    title: "AZEVEDO OFTS",
    description: "Camisas de times, tênis e acessórios esportivos premium.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="no-overflow" suppressHydrationWarning>
        <CartProvider>
          <FavoritesProvider>
            <ScrollToTop />
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <FavoritesDrawer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
