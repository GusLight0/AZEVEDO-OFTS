import Link from "next/link";
import { MessageCircle, Camera, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0b1f3a] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-800 text-xl mb-3">
            AZEVEDO<span className="text-blue-400">OFTS</span>
          </h3>
          <p className="text-sm text-blue-200 leading-relaxed">
            Produtos esportivos premium com qualidade e estilo. Sua loja de confiança.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Instagram"
            >
              <Camera size={16} />
            </a>
              <a
              href="https://wa.me/5598991856123"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-600 text-sm mb-4 text-blue-200 uppercase tracking-wider">
            Navegação
          </h4>
          <ul className="space-y-2">
            {[
              { label: "Início", href: "/" },
              { label: "Produtos", href: "/produtos" },
              { label: "Como Comprar", href: "/como-comprar" },
              { label: "FAQ", href: "/faq" },
              { label: "Contato", href: "/contato" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-blue-100 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categorias */}
        <div>
          <h4 className="font-600 text-sm mb-4 text-blue-200 uppercase tracking-wider">
            Categorias
          </h4>
          <ul className="space-y-2">
            {["Camisas", "Calças", "Bermudas", "Bonés"].map((c) => (
              <li key={c}>
                <Link
                  href={`/produtos?categoria=${c.toLowerCase()}`}
                  className="text-sm text-blue-100 hover:text-white transition-colors"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-600 text-sm mb-4 text-blue-200 uppercase tracking-wider">
            Contato
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-blue-100">
              <MessageCircle size={15} className="mt-0.5 flex-shrink-0" />
              <div className="flex flex-col gap-1">
                <span className="font-600">WhatsApp:</span>
                <span className="pl-1 opacity-90">(98) 99185-6123</span>
                <span className="pl-1 opacity-90">(98) 98414-3767</span>
                <span className="pl-1 opacity-90">(98) 99116-8586</span>
              </div>
            </li>
            <li className="flex items-start gap-2 text-sm text-blue-100">
              <Clock size={15} className="mt-0.5 flex-shrink-0" />
              <span>Seg–Sex: 9h–18h<br />Sáb: 9h–13h</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-blue-100">
              <MapPin size={15} className="mt-0.5 flex-shrink-0" />
              <span>São Luís, MA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-300">
          <p>© {new Date().getFullYear()} AZEVEDO OFTS. Todos os direitos reservados.</p>
          <p>Pagamento exclusivo via WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
