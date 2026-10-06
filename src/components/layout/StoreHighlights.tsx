import {
  CreditCard,
  Camera,
  MessageCircle,
  Store,
  Truck,
} from "lucide-react";
import { getWhatsAppUrl, whatsappContacts } from "@/lib/whatsapp";

const highlights = [
  { id: "brand", label: "AZEVEDO OFTS" },
  { id: "shipping", label: "Frete grátis acima de R$ 299" },
  { id: "payment", label: "Aceitamos PIX e CARTÃO" },
  { id: "social", label: "WhatsApp e Instagram" },
] as const;

function HighlightItems({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="flex items-center gap-0 md:contents">
      {highlights.map((highlight) => (
        <li
          key={highlight.id}
          className="flex w-[210px] shrink-0 items-center justify-center gap-2 px-3 py-2 text-[11px] font-600 leading-tight text-[#0b1f3a] md:w-auto md:flex-1 md:gap-2.5 md:px-4 md:py-3 md:text-sm"
        >
          {highlight.id === "brand" && <Store size={16} className="shrink-0 md:h-5 md:w-5" aria-hidden="true" />}
          {highlight.id === "shipping" && <Truck size={16} className="shrink-0 md:h-5 md:w-5" aria-hidden="true" />}
          {highlight.id === "payment" && <CreditCard size={16} className="shrink-0 md:h-5 md:w-5" aria-hidden="true" />}
          {highlight.id === "social" && (
            <span className="flex shrink-0 items-center gap-1">
              {duplicate ? (
                <>
                  <MessageCircle size={15} className="md:h-[18px] md:w-[18px]" aria-hidden="true" />
                  <Camera size={15} className="md:h-[18px] md:w-[18px]" aria-hidden="true" />
                </>
              ) : (
                <>
                  <a
                    href={getWhatsAppUrl(whatsappContacts[0].phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fale conosco pelo WhatsApp"
                    className="transition-colors hover:text-green-600 [&_svg]:h-[15px] [&_svg]:w-[15px] md:[&_svg]:h-[18px] md:[&_svg]:w-[18px]"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                  </a>
                  <a
                    href="https://instagram.com/azevedoofts"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Acesse nosso Instagram"
                    className="transition-colors hover:text-pink-600 [&_svg]:h-[15px] [&_svg]:w-[15px] md:[&_svg]:h-[18px] md:[&_svg]:w-[18px]"
                  >
                    <Camera size={18} aria-hidden="true" />
                  </a>
                </>
              )}
            </span>
          )}
          <span className="whitespace-nowrap">{highlight.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function StoreHighlights() {
  return (
    <section
      aria-label="Informações da loja"
      className="border-y border-gray-100 bg-gray-50/80"
    >
      <div className="mx-auto max-w-7xl overflow-hidden md:px-4">
        <div className="store-highlights-marquee flex w-max md:grid md:w-full md:grid-cols-4">
          <HighlightItems />
          <div aria-hidden="true" className="md:hidden">
            <HighlightItems duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
